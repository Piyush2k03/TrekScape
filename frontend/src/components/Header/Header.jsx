import React, { useRef, useEffect, useContext, useState } from "react";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

                {/* ADMIN PANEL BUTTON (Moved to dropdown for cleanliness) */}

                {/* LOGIN / LOGOUT */}
                {user ? (
                  <div className="profile__dropdown" style={{position: "relative"}}>
                    {/* Circle Profile Icon */}
                    <div 
                      className="profile__icon" 
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      style={{
                        width: "45px", 
                        height: "45px", 
                        borderRadius: "50%", 
                        background: "#faa935", 
                        color: "white", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "1.4rem",
                        userSelect: "none"
                      }}
                    >
                      {user.username.charAt(0).toUpperCase()}
                    </div>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <div className="dropdown-menu show" style={{
                        position: "absolute",
                        top: "115%",
                        right: "0",
                        minWidth: "180px",
                        padding: "15px",
                        border: "none"
                      }}>
                        <h6 className="text-center pb-2 mb-1" style={{fontWeight: "600", color: "#2c3e50"}}>
                          Hi, {user.username}
                        </h6>
                        <hr className="mt-1 mb-2"/>
                        <Link to="/profile" state={{ tab: "account" }} className="dropdown-item d-flex align-items-center" onClick={() => setDropdownOpen(false)}>
                          <i className="ri-user-line" style={{marginRight: "8px", fontSize: "1.1rem"}}></i> My Account
                        </Link>
                        <Link to="/profile" state={{ tab: "bookings" }} className="dropdown-item d-flex align-items-center" onClick={() => setDropdownOpen(false)}>
                          <i className="ri-calendar-event-line" style={{marginRight: "8px", fontSize: "1.1rem"}}></i> My Bookings
                        </Link>
                        <Link to="/profile" state={{ tab: "visited" }} className="dropdown-item d-flex align-items-center" onClick={() => setDropdownOpen(false)}>
                          <i className="ri-checkbox-circle-line" style={{marginRight: "8px", fontSize: "1.1rem"}}></i> Visited Treks
                        </Link>
                        <Link to="/my-wishlist" className="dropdown-item d-flex align-items-center" onClick={() => setDropdownOpen(false)}>
                          <i className="ri-heart-line" style={{marginRight: "8px", fontSize: "1.1rem"}}></i> Wishlist ❤️
                        </Link>
                        {user.role === "admin" && (
                          <Link to="/admin/dashboard" className="dropdown-item d-flex align-items-center" onClick={() => setDropdownOpen(false)}>
                            <i className="ri-dashboard-line" style={{marginRight: "8px", fontSize: "1.1rem"}}></i> Admin Panel
                          </Link>
                        )}
                        <hr className="my-2" />
                        <span onClick={() => { logout(); setDropdownOpen(false); }} className="dropdown-item d-flex align-items-center" style={{cursor: "pointer", color: "#e74c3c", fontWeight: "500"}}>
                          <i className="ri-logout-circle-line" style={{marginRight: "8px", fontSize: "1.1rem"}}></i> Logout
                        </span>
                      </div>
                    )}
                  </div>
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
