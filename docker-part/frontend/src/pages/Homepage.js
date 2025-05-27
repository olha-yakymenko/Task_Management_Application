// import React from "react";
// import { useKeycloak } from "@react-keycloak/web";

// const Home = () => {
//   const { keycloak } = useKeycloak();

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-green-800 text-4xl font-bold mb-4">
//         Welcome to the MANAGE-TASKS-APP
//       </h1>
      
//       {!keycloak.authenticated ? (
//         <>
//           <h2 className="text-xl mb-4">
//             Please log in or create an account if you don't have one
//           </h2>
//         </>
//       ) : (
//         <>
//           <h2 className="text-xl mb-4">
//             Now you can go to your tasks
//           </h2>
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;




// import React, { useEffect, useState } from "react";
// import { useKeycloak } from "@react-keycloak/web";
// import axios from "axios";
// import './Home.css';


// const Home = () => {
//   const { keycloak } = useKeycloak();
//   const [summary, setSummary] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const token = keycloak.token;

//         if (!token) {
//           console.warn("Token is not available yet.");
//           return;
//         }

//         const response = await axios.get("/api/summary", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Pobrano summary");
//         setSummary(response.data);
//       } catch (err) {
//         console.error("Błąd podczas pobierania podsumowania:", err);
//         setError("Nie udało się pobrać danych.");
//       }
//     };

//     if (keycloak.authenticated && keycloak.token) {
//       fetchSummary();
//     }

//   }, [keycloak.authenticated, keycloak.token]); // <-- dodajemy token do zależności

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-green-800 text-4xl font-bold mb-4">
//         Welcome to the MANAGE-TASKS-APP
//       </h1>

//       {!keycloak.authenticated ? (
//         <h2 className="text-xl mb-4">
//           Please log in or create an account if you don't have one
//         </h2>
//       ) : (
//         <>
//           <h2 className="text-xl mb-4">Now you can go to your tasks</h2>

//           {error && <p className="text-red-500">{error}</p>}


// {summary && (
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
//     <div className="bg-gradient-to-br from-blue-100 to-blue-200 border-l-4 border-blue-500 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
//       <h4 className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Assigned Tasks</h4>
//       <p className="text-3xl font-extrabold text-blue-900 mt-2">{summary.assigned_tasks}</p>
//     </div>

//     <div className="bg-gradient-to-br from-green-100 to-green-200 border-l-4 border-green-500 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
//       <h4 className="text-sm font-semibold text-green-700 uppercase tracking-wide">Completed</h4>
//       <p className="text-3xl font-extrabold text-green-900 mt-2">{summary.completed}</p>
//     </div>

//     <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-l-4 border-yellow-500 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
//       <h4 className="text-sm font-semibold text-yellow-700 uppercase tracking-wide">Pending</h4>
//       <p className="text-3xl font-extrabold text-yellow-900 mt-2">{summary.pending}</p>
//     </div>

//     <div className="bg-gradient-to-br from-purple-100 to-purple-200 border-l-4 border-purple-500 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
//       <h4 className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Completion Rate</h4>
//       <p className="text-3xl font-extrabold text-purple-900 mt-2">{summary.completion_rate}%</p>
//     </div>
//   </div>
// )}


//         </>
//       )}
//     </div>
//   );
// };

// export default Home;





// import React, { useEffect, useState } from "react";
// import { useKeycloak } from "@react-keycloak/web";
// import axios from "axios";
// import "./Home.css";

// const HomePage = () => {
//   const { keycloak } = useKeycloak();
//   const [summary, setSummary] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const token = keycloak.token;

//         if (!token) {
//           console.warn("Token is not available yet.");
//           return;
//         }

//         const response = await axios.get("/api/summary", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Pobrano summary");
//         setSummary(response.data);
//       } catch (err) {
//         console.error("Błąd podczas pobierania podsumowania:", err);
//         setError("Nie udało się pobrać danych.");
//       }
//     };

//     if (keycloak.authenticated && keycloak.token) {
//       fetchSummary();
//     }
//   }, [keycloak.authenticated, keycloak.token]);

//   return (
//     <div className="home-container">
//       <h1 className="home-title">Welcome to the MANAGE-TASKS-APP</h1>

//       {!keycloak.authenticated ? (
//         <h2 className="home-subtitle">
//           Please log in or create an account if you don't have one
//         </h2>
//       ) : (
//         <>
//           <h2 className="home-subtitle">Now you can go to your tasks</h2>
//           {error && <p className="error-message">{error}</p>}

//           {summary && (
//             <div className="summary-grid">
//               <div className="summary-card card-blue">
//                 <h4 className="card-title">Assigned Tasks</h4>
//                 <p className="card-value">{summary.assigned_tasks}</p>
//               </div>

//               <div className="summary-card card-green">
//                 <h4 className="card-title">Completed</h4>
//                 <p className="card-value">{summary.completed}</p>
//               </div>

//               <div className="summary-card card-yellow">
//                 <h4 className="card-title">Pending</h4>
//                 <p className="card-value">{summary.pending}</p>
//               </div>

//               <div className="summary-card card-purple">
//                 <h4 className="card-title">Completion Rate</h4>
//                 <p className="card-value">{summary.completion_rate}%</p>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default HomePage;




import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import "./Home.css";

const HomePage = () => {
  const { keycloak } = useKeycloak();
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [requests, setRequests] = useState([]);
  const [infoMessage, setInfoMessage] = useState("");

  const token = keycloak.token;
  const isAdmin = keycloak.tokenParsed?.realm_access?.roles?.includes("admin");

  // Fetch user summary
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get("/api/summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSummary(response.data);
      } catch (err) {
        console.error("Błąd podczas pobierania podsumowania:", err);
        setError("Nie udało się pobrać danych.");
      }
    };

    if (keycloak.authenticated && token) {
      fetchSummary();
    }
  }, [keycloak.authenticated, token]);

  // Fetch admin requests (only if admin)
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("/api-ex/admin/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data.requests);
      } catch (err) {
        console.warn("Brak dostępu do zgłoszeń lub nie jesteś adminem.");
      }
    };

    if (isAdmin) {
      fetchRequests();
    }
  }, [isAdmin, token]);

  // Send request to become admin
  const handleRequestAdmin = async () => {
    try {
      await axios.post("/api-ex/request-admin", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInfoMessage("Zgłoszenie wysłane pomyślnie.");
    } catch (err) {
      console.error("Błąd zgłoszenia:", err);
      setInfoMessage("Nie udało się wysłać zgłoszenia.");
    }
  };

  // Approve/reject request
  const handleAction = async (username, action) => {
    try {
      await axios.post(`/api-ex/admin/${action}`, { username }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(prev => prev.filter(req => req.username !== username));
    } catch (err) {
      console.error(`Błąd podczas ${action}:`, err);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the MANAGE-TASKS-APP</h1>

      {!keycloak.authenticated ? (
        <h2 className="home-subtitle">
          Please log in or create an account if you don't have one
        </h2>
      ) : (
        <>
          <h2 className="home-subtitle">Now you can go to your tasks</h2>
          {infoMessage && <p className="info-message">{infoMessage}</p>}
          {error && <p className="error-message">{error}</p>}

          {/* {summary && (
            <div className="summary-grid">
              <div className="summary-card card-blue">
                <h4 className="card-title">Assigned Tasks</h4>
                <p className="card-value">{summary.assigned_tasks}</p>
              </div>

              <div className="summary-card card-green">
                <h4 className="card-title">Completed</h4>
                <p className="card-value">{summary.completed}</p>
              </div>

              <div className="summary-card card-yellow">
                <h4 className="card-title">Pending</h4>
                <p className="card-value">{summary.pending}</p>
              </div>

              <div className="summary-card card-purple">
                <h4 className="card-title">Completion Rate</h4>
                <p className="card-value">{summary.completion_rate}%</p>
              </div>
            </div>
          )} */}

{summary && summary.type === "user" && (
  <div className="summary-grid">
    <div className="summary-card card-blue">
      <h4 className="card-title">Assigned Tasks</h4>
      <p className="card-value">{summary.assigned_tasks}</p>
    </div>
    <div className="summary-card card-green">
      <h4 className="card-title">Completed</h4>
      <p className="card-value">{summary.completed}</p>
    </div>
    <div className="summary-card card-yellow">
      <h4 className="card-title">Pending</h4>
      <p className="card-value">{summary.pending}</p>
    </div>
    <div className="summary-card card-purple">
      <h4 className="card-title">Completion Rate</h4>
      <p className="card-value">{summary.completion_rate}%</p>
    </div>
  </div>
)}

{summary && summary.type === "admin" && (
  <div className="summary-grid">
    <div className="summary-card card-blue">
      <h4 className="card-title">Total Tasks</h4>
      <p className="card-value">{summary.total_tasks}</p>
    </div>
    <div className="summary-card card-green">
      <h4 className="card-title">Completed Statuses</h4>
      <p className="card-value">{summary.completed_statuses}</p>
    </div>
    <div className="summary-card card-yellow">
      <h4 className="card-title">Pending Statuses</h4>
      <p className="card-value">{summary.pending_statuses}</p>
    </div>
    <div className="summary-card card-purple">
      <h4 className="card-title">Total Employees</h4>
      <p className="card-value">{summary.total_employees}</p>
    </div>
  </div>
)}


          {!isAdmin && (
            <button className="btn-request-admin" onClick={handleRequestAdmin}>
              Request Admin Access
            </button>
          )}

          {isAdmin && requests.length > 0 && (
            <div className="admin-requests">
              <h3>Admin Access Requests</h3>
              <table className="requests-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id}>
                      <td>{req.username}</td>
                      <td>{req.status}</td>
                      <td>
                        <button onClick={() => handleAction(req.username, "approve")}>Approve</button>
                        <button onClick={() => handleAction(req.username, "reject")}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
