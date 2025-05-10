import React from "react";
import { useKeycloak } from "@react-keycloak/web";

const Home = () => {
  const { keycloak } = useKeycloak();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-green-800 text-4xl font-bold mb-4">
        Welcome to the MANAGE-TASKS-APP
      </h1>
      
      {!keycloak.authenticated ? (
        <>
          <h2 className="text-xl mb-4">
            Please log in or create an account if you don't have one
          </h2>
        </>
      ) : (
        <>
          <h2 className="text-xl mb-4">
            Now you can go to your tasks
          </h2>
        </>
      )}
    </div>
  );
};

export default Home;