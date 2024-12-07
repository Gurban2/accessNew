import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { loginSuccess, loginFailure } from '../../../store/reducers/authReducer';
import { login } from "../../../api/authApi";
// import { useAuth } from '../../../contexts/auth/AuthContext';
import "./style.scss"; // Import the SCSS file for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false); // State for "Keep me logged in"
  // const { login } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the authentication state from Redux
  const { user, isAuthenticated, error } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      console.log("Sending login request with data:", { email, password });
      await login(email, password, dispatch);
      navigate("/"); // Redirect after successful login
    } catch (err) {
      console.error("Login failed:", err.response?.data); // Log the full error response
      setErrorMessage("Invalid email or password. Please try again."); // Show specific error message
    }
  };

  // const handleLogout = () => {
  //   logout(dispatch);
  //   navigate('/login'); // Redirect to the login page after logout
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin();
    // try {
    //   // Fetch users from JSON
    //   const response = await fetch('/users.json');
    //   const users = await response.json();

    //   // Find the user that matches the credentials
    //   const user = users.find(
    //     (user) => user.email === email && user.password === password
    //   );

    //   if (user) {
    //     dispatch(loginSuccess(user));
    //     login();

    //     // Persist login if "Keep me logged in" is checked
    //     if (keepLoggedIn) {
    //       localStorage.setItem('isAuthenticated', 'true'); // Store login status in localStorage
    //     }

    //     navigate('/'); // Navigate to the main page
    //   } else {
    //     // Dispatch login failure action with error message
    //     dispatch(loginFailure('Invalid email or password'));
    //     alert('Invalid email or password');
    //   }
    // } catch (error) {
    //   dispatch(loginFailure('Something went wrong'));
    //   console.error('Login error:', error);
    //   alert('Something went wrong, please try again.');
    // }
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
                >
                  <span>Login</span>
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
