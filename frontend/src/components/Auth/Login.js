import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData); // Call API
      login(response.data.token); // Save token to context/localStorage
      navigate("/dashboard"); // Navigate to dashboard after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
  const handleSignup=()=>{
    navigate("/signup");
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button><br/><br/>
        <button onClick={handleSignup}>Sign Up</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../../services/api";
// import { saveToken, setAuthToken } from "../../services/auth";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await loginUser({ email, password });
//       const token = response.data.token;

//       // Save token and set it for future API requests
//       saveToken(token);
//       setAuthToken(token);

//       // Navigate to dashboard or another page after successful login
//       navigate("/dashboard");
//     } catch (err) {
//       setError("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default Login;


// import React, { useContext, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";
// import { saveToken, setAuthToken } from "../../utils/auth";


// const Login = () => {
//   const { login } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/auth/login", { email, password });
//       login(response.data.token);
//       alert("Login successful!");
//     } catch (err) {
//       console.error(err);
//       alert("Login failed!");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
