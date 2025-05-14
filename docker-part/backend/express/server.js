const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const fsp = require("fs/promises");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(express.json());

const origins = ["http://localhost:3000", "http://localhost"];
app.use(cors({
  origin: origins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

let configMap = {};
try {
  const configData = fs.readFileSync("/config/ex-backend-config.env", "utf8");
  configData.split("\n").forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      configMap[key.trim()] = value.trim().replace(/^"|"$/g, '');
    }
  });
} catch (e) {
  console.warn("Nie znaleziono /config/ex-backend-config.env. Kontynuuję bez niego.");
}

let publicKey = null;
try {
  const publicKeyRaw = fs.readFileSync(process.env.PUBLIC_KEY_FILE, "utf8").trim();
  publicKey = `-----BEGIN PUBLIC KEY-----\n${publicKeyRaw}\n-----END PUBLIC KEY-----`;
} catch (e) {
  console.error("Nie można załadować klucza publicznego:", e.message);
}

let pool;
async function connectToDatabase() {
  try {
    const secretPath = process.env.PGPASSWORD_FILE;
    let password = process.env.PGPASSWORD;

    if (secretPath && fs.existsSync(secretPath)) {
      password = (await fsp.readFile(secretPath, "utf8")).trim();
    }

    pool = new Pool({
      user: configMap.PGUSER || process.env.PGUSER,
      host: configMap.PGHOST || process.env.PGHOST,
      database: configMap.PGDATABASE || process.env.PGDATABASE,
      password,
      port: parseInt(configMap.PGPORT || process.env.PGPORT),
    });

    await pool.connect();
    console.info("Successfully connected to the database.");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Brak tokena" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
      audience: "account",
    });
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token nieprawidłowy lub wygasł" });
  }
}


app.get("/health", (req, res) => res.json({ status: "OK" }));

app.get("/api-ex/my-tasks", authenticateToken, async (req, res) => {
  const username = req.user.preferred_username;

  try {
    const result = await pool.query(`
      SELECT t.*, ts.completed 
      FROM tasks t
      JOIN task_status ts ON t.id = ts.task_id
      WHERE ts.username = $1
    `, [username]);

    res.json({ tasks: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

app.get("/api-ex/task", authenticateToken, async (req, res) => {
  const username = req.user.preferred_username;

  try {
    const result = await pool.query(`
      SELECT t.id, t.title, t.date, t.username, ts.completed
      FROM tasks t
      JOIN task_status ts ON t.id = ts.task_id
      WHERE ts.username = $1
      ORDER BY t.date DESC
    `, [username]);

    res.json({ tasks: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

app.put("/api-ex/task", authenticateToken, async (req, res) => {
  const { task_id, completed } = req.body;
  const username = req.user.preferred_username;

  try {
    const assigned = await pool.query(
      "SELECT 1 FROM tasks WHERE id = $1 AND $2 = ANY(employees)",
      [task_id, username]
    );

    if (assigned.rowCount === 0) {
      return res.status(403).json({ error: "Nie jesteś przypisany do tego zadania" });
    }

    await pool.query(
      "UPDATE task_status SET completed = $1 WHERE task_id = $2 AND username = $3",
      [completed, task_id, username]
    );

    res.json({ message: "Status zaktualizowany" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// === Start serwera ===
const PORT = process.env.PORT || 3002;
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

