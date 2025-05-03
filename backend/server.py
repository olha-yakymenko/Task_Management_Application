import os
from fastapi import FastAPI, Request, Header, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt, JWTError
from dotenv import load_dotenv
import asyncpg
from typing import List, Optional
from pydantic import BaseModel
import logging


load_dotenv()

app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def get_db():
    return await asyncpg.connect(
        user=os.getenv("PGUSER"),
        password=os.getenv("PGPASSWORD"),
        database=os.getenv("PGDATABASE"),
        host=os.getenv("PGHOST"),
        port=os.getenv("PGPORT")
    )

@app.on_event("startup")
async def startup():
    conn = await get_db()
    await conn.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL,
            completed BOOLEAN DEFAULT false,
            employees TEXT[] NOT NULL 
        );
                       
        CREATE TABLE IF NOT EXISTS task_status (
        task_id INT REFERENCES tasks(id) ON DELETE CASCADE,  
        username VARCHAR(255) NOT NULL,  
        completed BOOLEAN DEFAULT false, 
        PRIMARY KEY (task_id, username)  
);

    """)
    await conn.close()



logger = logging.getLogger("verify_token")
logging.basicConfig(level=logging.INFO)


def verify_token(authorization: Optional[str] = Header(None)) -> dict:
    logger.info("=== START TOKEN VERIFICATION ===")
    
    if not authorization:
        logger.error("Brak nagłówka Authorization")
        raise HTTPException(status_code=401, detail="Brak nagłówka Authorization")

    logger.info("Authorization header received: %s", authorization)

    if not authorization.startswith("Bearer "):
        logger.error("Niepoprawny format nagłówka Authorization")
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.replace("Bearer ", "")
    logger.info("Token extracted: %s", token)

    public_key_path = os.getenv("PUBLIC_KEY_FILE", "/run/secrets/jwt_private_key")

    try:
        with open(public_key_path, "r") as key_file:
            formatted_key = key_file.read()
        public_key = f"-----BEGIN PUBLIC KEY-----\n{formatted_key.strip()}\n-----END PUBLIC KEY-----"
        logger.info("Public key loaded from file: %s", public_key_path)
    except Exception as e:
        logger.error("Błąd podczas odczytu klucza publicznego z pliku: %s", str(e))
        raise HTTPException(status_code=500, detail="Błąd podczas odczytu klucza publicznego")

    try:
        audience = "account"
        unverified_payload = jwt.get_unverified_claims(token)
        logger.info("Unverified token payload: %s", unverified_payload)

        payload = jwt.decode(token, public_key, algorithms=["RS256"], audience=audience)
        logger.info("Token verified successfully: %s", payload)

        if "realm_access" in payload and "roles" in payload["realm_access"]:
            logger.info("User roles: %s", payload["realm_access"]["roles"])
        else:
            logger.info("No roles found in the token.")

        logger.info("=== END TOKEN VERIFICATION ===")
        return payload

    except JWTError as err:
        logger.error("Token verification error: %s", str(err))
        raise HTTPException(status_code=401, detail="Invalid or expired token")


def check_admin(decoded_token: dict):
    roles = decoded_token.get("realm_access", {}).get("roles", [])
    if "admin" not in roles:
        raise HTTPException(status_code=403, detail="Admin role required")

