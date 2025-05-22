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





import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import "./Home.css";

const HomePage = () => {
  const { keycloak } = useKeycloak();
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = keycloak.token;

        if (!token) {
          console.warn("Token is not available yet.");
          return;
        }

        const response = await axios.get("/api/summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Pobrano summary");
        setSummary(response.data);
      } catch (err) {
        console.error("Błąd podczas pobierania podsumowania:", err);
        setError("Nie udało się pobrać danych.");
      }
    };

    if (keycloak.authenticated && keycloak.token) {
      fetchSummary();
    }
  }, [keycloak.authenticated, keycloak.token]);

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
          {error && <p className="error-message">{error}</p>}

          {summary && (
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
        </>
      )}
    </div>
  );
};

export default HomePage;
