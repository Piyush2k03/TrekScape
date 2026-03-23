import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2>Trekscape Admin</h2>
        <ul>
          <li className={isActive("/admin/dashboard")}>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li className={isActive("/admin/treks")}>
            <Link to="/admin/treks">Treks Management</Link>
          </li>
          <li className={isActive("/admin/users")}>
            <Link to="/admin/users">Users Management</Link>
          </li>
          <li className={isActive("/admin/bookings")}>
            <Link to="/admin/bookings">Bookings Management</Link>
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">{children}</main>
    </div>
  );
};

export default AdminLayout;



