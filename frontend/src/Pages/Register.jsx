import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/register.css';
import registerImg from '../assets/images/register.png';
import userIcon from '../assets/images/user.png';

import { AuthContext } from '../Context/AuthContext';
import { BASE_URL } from '../utils/config';

// Validation helper functions
const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
const validatePassword = (password) => password.length >= 6;
const validateUsername = (name) => /^[A-Za-z ]{3,}$/.test(name);

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // for error messages

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Validate all fields before submitting
  const validateForm = () => {
    let newErrors = {};

    if (!validateUsername(credentials.username))
      newErrors.username = "Enter a valid name (min 3 letters).";

    if (!validateEmail(credentials.email))
      newErrors.email = "Enter a valid email address.";

    if (!validatePassword(credentials.password))
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // return true if valid
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // stop submit if invalid

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }

      dispatch({ type: "REGISTER_SUCCESS" });
      alert("Registration Successful!");
      navigate("/login");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="register__container d-flex justify-content-between">
              <div className="register__img">
                <img src={registerImg} alt="register" />
              </div>

              <div className="register__form">
                <div className="user">
                  <img src={userIcon} alt="user" />
                </div>

                <h2>Register</h2>

                <Form onSubmit={handleClick}>
                  {/* Username */}
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      id="username"
                      onChange={handleChange}
                    />
                    {errors.username && (
                      <small className="text-danger">{errors.username}</small>
                    )}
                  </FormGroup>

                  {/* Email */}
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

                  {/* Password */}
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
                    Register
                  </Button>
                </Form>

                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
