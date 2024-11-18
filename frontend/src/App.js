import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./pages/Dashboard";
import CarDetailPage from "./pages/CarDetailPage";
import { setAuthToken } from "./services/api";
import { useEffect } from "react";

function App() {
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        setAuthToken(token); // Ensure token is set for API calls
      }
    }, []);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cars/:id"
        element={
          <ProtectedRoute>
            <CarDetailPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
