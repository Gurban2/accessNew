import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/authApi";
import { fetchDepartments } from "../../../api/departmentsApi";
import { fetchOffices } from "../../../api/officesApi";
import { fetchVisitors } from "../../../api/visitorsApi";
import "./style.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false); // State for "Keep me logged in"
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // Loading state for button
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the authentication state from Redux
  const { user, isAuthenticated, error } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      console.log("Sending login request with data:", { email, password });
      await login(email, password, dispatch);
      // Fetch all necessary data after login
      await fetchAllData(); // Fetch departments, offices, and persona non grata
      navigate("/"); // Redirect after successful login
    } catch (err) {
      console.error("Login failed:", err.response?.data); // Log the full error response
      setErrorMessage("Invalid email or password. Please try again."); // Show specific error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Fetch departments, offices, and persona non grata data after login with timeout
  const fetchAllData = async () => {
    const timeout = 50000; // Timeout duration in milliseconds (10 seconds)

    const fetchDataWithTimeout = async () => {
      try {
        // Define the promise for fetching data
        const dataPromise = Promise.all([
          fetchDepartments(),
          fetchOffices(),
          fetchVisitors(),
        ]);

        // Create a timeout promise
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), timeout),
        );

        // Use Promise.race to race the data fetch against the timeout
        const [departments, offices, visitors] = await Promise.race([
          dataPromise,
          timeoutPromise,
        ]);

        // Optionally, store the fetched data in Redux, Context, or useState
        console.log("Fetched all data:", { departments, offices, visitors });
        // Dispatch actions to store the data in Redux or handle it as necessary
        // dispatch({ type: 'SET_DEPARTMENTS', payload: departments });
        // dispatch({ type: 'SET_OFFICES', payload: offices });
      } catch (error) {
        console.error("Error fetching data after login:", error.message);
        // Show error message if timeout or fetch fails
        setErrorMessage("Failed to fetch data. Please try again later.");
      }
    };

    await fetchDataWithTimeout();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url('/assets/images/auth-bg.jpg')` }}
    >
      <div className="login-card">
        {/* Left section - Login Form */}
        <div className="login-form">
          <div className="form-content">
            <div className="form-header">
              <h4 className="form-subtitle">Welcome Back</h4>
              <h1 className="form-title">Login with Email or Username</h1>
            </div>
            <div className="form-body">
              <Form onSubmit={handleSubmit}>
                {/* Email/Username Input */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address or username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email or username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="password-input-container">
                    <Form.Control
                      type={passwordVisible ? "text" : "password"} // Toggle input type
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className="password-toggle-icon"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check
                    type="checkbox"
                    label="Keep me logged in"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  />
                </Form.Group>
                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="submit-button w-100"
                  disabled={loading} // Disable the button while loading
                >
                  <span>{loading ? "Logging in..." : "Login"}</span>
                  <FaArrowRight />
                </Button>
              </Form>
            </div>
          </div>
        </div>

        {/* Right section - Image */}
        <div
          className="login-image"
          style={{
            backgroundImage: `url('/assets/images/login.png')`, // Correct path
          }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
