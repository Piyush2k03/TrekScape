import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';

import { AuthContext } from '../Context/AuthContext';
import { BASE_URL } from '../utils/config';

// Validation helpers
const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
const validatePassword = (password) => password.length >= 6;

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // store validation errors

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Validate fields before submitting
  const validateForm = () => {
    let newErrors = {};

    if (!validateEmail(credentials.email))
      newErrors.email = "Enter a valid email address.";

    if (!validatePassword(credentials.password))
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // form is valid only when no errors
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // stop login if invalid

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Invalid credentials");
        dispatch({ type: "LOGIN_FAILURE", payload: result.message });
        return;
      }

      // Save token for protected routes
      localStorage.setItem("token", result.token);

      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });

      alert("Login successful!");
      navigate("/");
    } catch (err) {
      alert("Error: " + err.message);
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="login" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="user" />
                </div>

                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  {/* Email Input */}
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <small className="text-danger">{errors.email}</small>
                    )}
                  </FormGroup>

                  {/* Password Input */}
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <small className="text-danger">{errors.password}</small>
                    )}
                  </FormGroup>

                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Login
                  </Button>
                </Form>

                <p>
                  Don't have an account? <Link to="/register">Create an account</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
