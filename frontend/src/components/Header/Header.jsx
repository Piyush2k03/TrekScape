import React, { useRef, useEffect, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./Header.css";
import { AuthContext } from "../../Context/AuthContext";

const nav__links = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About" },
  { path: "/treks", display: "Treks" },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  // LOGOUT HANDLER
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  // STICKY HEADER FUNCTION
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (!headerRef.current) return;

      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  // MOBILE MENU TOGGLE
  const toggleMenu = () => {
    if (!menuRef.current) return;
    menuRef.current.classList.toggle("show__menu");
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">

            {/* LOGO */}
            <div className="logo">
              <img src={logo} alt="TrekScape Logo" />
            </div>

            {/* NAVIGATION */}
            <div className="navigation" ref={menuRef}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT SIDE BUTTONS */}
            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">

                {/* ADMIN PANEL BUTTON */}
                {user && user.role === "admin" && (
                  <Button className="btn btn-warning">
                    <Link to="/admin/dashboard">Admin Panel</Link>
                  </Button>
                )}

                {/* LOGIN / LOGOUT */}
                {user ? (
                  <>
                    <h5 className="mb-0">Hello, {user.username}</h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* MOBILE MENU ICON */}
              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>

          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
