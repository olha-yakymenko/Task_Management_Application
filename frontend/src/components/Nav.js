// import React from "react";
// import { useKeycloak } from "@react-keycloak/web";

// const Nav = () => {
//   const { keycloak, initialized } = useKeycloak();

//   return (
//     <div>
//       <div className="top-0 w-full flex flex-wrap">
//         <section className="x-auto">
//           <nav className="flex justify-between bg-gray-200 text-blue-800 w-screen">
//             <div className="px-5 xl:px-12 py-6 flex w-full items-center">
//               <h1 className="text-3xl font-bold font-heading">
//                 Keycloak React AUTH.
//               </h1>
//               <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
//                 <li>
//                   <a className="hover:text-blue-800" href="/">
//                     Home
//                   </a>
//                 </li>
//                 <li>
//                   <a className="hover:text-blue-800" href="/secured">
//                     my-todos
//                   </a>
//                 </li>
//               </ul>
//               <div className="hidden xl:flex items-center space-x-5">
//                 <div className="hover:text-gray-200">
//                   {!keycloak.authenticated && (
//                     <button
//                       type="button"
//                       className="text-blue-800"
//                       onClick={() => keycloak.login()}
//                     >
//                       Login
//                     </button>
//                   )}

//                   {!!keycloak.authenticated && (
//                     <button
//                       type="button"
//                       className="text-blue-800"
//                       onClick={() => keycloak.logout()}
//                     >
//                       Logout ({keycloak.tokenParsed.preferred_username})
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </nav>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Nav;






// import React from "react";
// import { useKeycloak } from "@react-keycloak/web";

// const Nav = () => {
//   const { keycloak, initialized } = useKeycloak();

//   const isAdmin = () => {
//     if (!keycloak?.tokenParsed) return false;
//     const roles = keycloak.tokenParsed.realm_access?.roles || [];
//     return roles.includes("admin");
//   };

//   return (
//     <div>
//       <div className="top-0 w-full flex flex-wrap">
//         <section className="x-auto">
//           <nav className="flex justify-between bg-gray-200 text-blue-800 w-screen">
//             <div className="px-5 xl:px-12 py-6 flex w-full items-center">
//               <h1 className="text-3xl font-bold font-heading">
//                 Keycloak React AUTH.
//               </h1>
//               <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
//                 <li>
//                   <a className="hover:text-blue-800" href="/">
//                     Home
//                   </a>
//                 </li>
//                 <li>
//                   <a className="hover:text-blue-800" href="/secured">
//                     My tasks
//                   </a>
//                 </li>
//                 {isAdmin() && (
//                   <li>
//                     <a className="hover:text-blue-800" href="/admin">
//                       Admin panel
//                     </a>
//                   </li>
//                 )}
//               </ul>
//               <div className="hidden xl:flex items-center space-x-5">
//                 <div className="hover:text-gray-200">
//                   {!keycloak.authenticated && (
//                     <button
//                       type="button"
//                       className="text-blue-800"
//                       onClick={() => keycloak.login()}
//                     >
//                       Login
//                     </button>
//                   )}

//                   {!!keycloak.authenticated && (
//                     <button
//                       type="button"
//                       className="text-blue-800"
//                       onClick={() => keycloak.logout()}
//                     >
//                       Logout ({keycloak.tokenParsed.preferred_username})
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </nav>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Nav;




import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import "./Nav.css"; 

const Nav = () => {
  const { keycloak } = useKeycloak();

  const isAdmin = () => {
    const roles = keycloak.tokenParsed?.realm_access?.roles || [];
    return roles.includes("admin");
  };

  return (
    <header className="nav-header">
      <nav className="nav-container">
        <div className="nav-left">
          <h1 className="nav-title">Manage tasks app</h1>
        </div>

        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/secured">My Tasks</a></li>
          {isAdmin() && <li><a href="/admin">Admin Panel</a></li>}
        </ul>

        <div className="nav-auth">
          {!keycloak.authenticated ? (
            <button onClick={() => keycloak.login()} className="btn-login">
              Login
            </button>
          ) : (
            <>
              <span className="username">
                {keycloak.tokenParsed?.preferred_username}
              </span>
              <button onClick={() => keycloak.logout()} className="btn-logout">
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
