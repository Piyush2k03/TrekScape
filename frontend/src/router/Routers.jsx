import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../Pages/Home.jsx';
import Treks from '../Pages/Treks.jsx';
import TrekDetails from '../Pages/TrekDetails.jsx';
import Login from '../Pages/Login.jsx';
import Register from '../Pages/Register.jsx';
import UserProfile from '../Pages/UserProfile.jsx';
import SearchResultList from '../Pages/SearchResultList.jsx';
import ThankYou from '../Pages/ThankYou.jsx';
import About from '../Pages/About.jsx';
import AdminDashboard from "../Pages/AdminDashboard.jsx";
import AdminTours from "../Pages/AdminTours.jsx";
import AdminUsers from "../Pages/AdminUsers.jsx";
import AdminBookings from "../Pages/AdminBookings.jsx";
import AdminRoute from "./AdminRoute.jsx";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />

      <Route path="/home" element={<Home />} />
      <Route path="/treks" element={<Treks />} />
      <Route path="/treks/:id" element={<TrekDetails />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/profile" element={<UserProfile />} />

      <Route path="/tours/search" element={<SearchResultList />} />

      {/*  ADMIN DASHBOARD (Protected Route) */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/treks"
        element={
          <AdminRoute>
            <AdminTours />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <AdminRoute>
            <AdminBookings />
          </AdminRoute>
        }
      />

      {/*  About */}
      <Route path="/about" element={<About />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default Routers;
