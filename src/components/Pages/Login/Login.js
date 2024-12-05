import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  loginSuccess,
  loginFailure,
} from '../../../store/reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import './style.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch users from JSON
      const response = await fetch('/users.json');
      const users = await response.json();

      // Find the user that matches the credentials
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        // Dispatch login success action and pass user data
        dispatch(loginSuccess(user));
        navigate('/dashboard'); // Redirect to dashboard after successful login
      } else {
        // Dispatch login failure action with error message
        dispatch(loginFailure('Invalid email or password'));
        alert('Invalid email or password');
      }
    } catch (error) {
      dispatch(loginFailure('Something went wrong'));
      console.error('Login error:', error);
      alert('Something went wrong, please try again.');
    }
  };

  return (
    <div className="login-container">
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col
            lg={6}
            className="d-flex align-items-center justify-content-center"
          >
            <div className="login-form">
              <h4>Welcome back</h4>
              <h1>Login with Email or Username</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email Address or Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email or username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="login-button"
                >
                  Login <FaArrowRight />
                </Button>
              </Form>
            </div>
          </Col>
          <Col lg={6} className="d-none d-lg-block bg-image"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
