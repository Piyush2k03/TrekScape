// src/Pages/AdminDashboard.jsx

import React, { useContext } from "react";
import { Container, Row, Col, Card, CardBody, Spinner } from "reactstrap";
import { BASE_URL } from "../utils/config";
import useFetch from "../hooks/useFetch";
import { AuthContext } from "../Context/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AdminLayout from "../components/Admin/AdminLayout";
import "./admin.css";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  // Fetch counts & data
  const { data: trekCountData, loading: trekCountLoading } = useFetch(
    `${BASE_URL}/tours/count`
  );

  const { data: usersData, loading: usersLoading } = useFetch(
    `${BASE_URL}/users`
  );

  const { data: bookingsData, loading: bookingsLoading } = useFetch(
    `${BASE_URL}/bookings`
  );

  const { data: mostReviewedData, loading: mostReviewedLoading } = useFetch(
    `${BASE_URL}/tours/most-reviewed`
  );

  // Derive values safely
  const totalTreks = trekCountData || 0;
  const totalUsers = Array.isArray(usersData) ? usersData.length : 0;
  const totalBookings = Array.isArray(bookingsData) ? bookingsData.length : 0;

  // Simple revenue estimation (you can refine later)
  const estimatedRevenue = totalBookings * 1000;

  // Recent lists (limit to 5 items for tables)
  const recentTreks = (Array.isArray(bookingsData) ? bookingsData : []).slice(0, 5);
  const recentUsers = (Array.isArray(usersData) ? usersData : []).slice(0, 5);
  const recentBookings = (Array.isArray(bookingsData) ? bookingsData : []).slice(0, 5);

  const anyLoading = trekCountLoading || usersLoading || bookingsLoading || mostReviewedLoading;

  // Prepare chart data - useFetch already extracts the data field
  const chartData = Array.isArray(mostReviewedData) 
    ? mostReviewedData.map(trek => ({
        name: trek.title && trek.title.length > 20 ? trek.title.substring(0, 20) + '...' : (trek.title || 'Unknown'),
        reviews: trek.reviewCount || 0
      }))
    : [];

  // Debug logging
  console.log("Most Reviewed Data:", mostReviewedData);
  console.log("Chart Data:", chartData);

  return (
    <AdminLayout>
      <Container fluid>
          <h1>Welcome, {user?.username || "Admin"} 👋</h1>

          {anyLoading ? (
            <div className="d-flex align-items-center gap-2">
              <Spinner size="sm" /> <span>Loading dashboard data...</span>
            </div>
          ) : null}

          {/* DASHBOARD CARDS */}
          <section className="admin-cards">
            <Card className="admin-card">
              <CardBody>
                <h3>Total Treks</h3>
                <p>{totalTreks}</p>
              </CardBody>
            </Card>

            <Card className="admin-card">
              <CardBody>
                <h3>Total Users</h3>
                <p>{totalUsers}</p>
              </CardBody>
            </Card>

            <Card className="admin-card">
              <CardBody>
                <h3>Total Bookings</h3>
                <p>{totalBookings}</p>
              </CardBody>
            </Card>

            <Card className="admin-card">
              <CardBody>
                <h3>Estimated Revenue</h3>
                <p>₹{estimatedRevenue}</p>
              </CardBody>
            </Card>
          </section>

          {/* RECENT BOOKINGS TABLE */}
          <section className="admin-table-container">
            <h4 className="mb-3">Recent Bookings</h4>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Email</th>
                  <th>Trek Name</th>
                  <th>Guests</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan="5">No bookings found.</td>
                  </tr>
                ) : (
                  recentBookings.map((b, index) => (
                    <tr key={b._id || index}>
                      <td>{index + 1}</td>
                      <td>{b.userEmail}</td>
                      <td>{b.trekName || b.tourName}</td>
                      <td>{b.guestSize}</td>
                      <td>
                        {b.bookAt
                          ? new Date(b.bookAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>

          {/* MOST REVIEWED TREKS CHART */}
          <section className="admin-table-container mt-4">
            <h4 className="mb-3">Top 5 Most Reviewed Treks</h4>
            {mostReviewedLoading ? (
              <div className="d-flex align-items-center gap-2">
                <Spinner size="sm" /> <span>Loading chart data...</span>
              </div>
            ) : Array.isArray(mostReviewedData) && chartData.length > 0 ? (
              <div style={{ width: '100%', height: '400px', minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 80,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      interval={0}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="reviews" fill="#8884d8" name="Number of Reviews" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center p-4">
                <p className="text-muted">
                  {mostReviewedLoading === false && !mostReviewedData
                    ? "Failed to load review data. Please check backend connection." 
                    : "No review data available yet. Add reviews to treks to see the chart."}
                </p>
              </div>
            )}
          </section>

          {/* RECENT USERS & TREKS (SIDE BY SIDE) */}
          <Row className="mt-4">
            <Col lg="6" md="12">
              <div className="admin-table-container">
                <h4 className="mb-3">Recent Users</h4>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.length === 0 ? (
                      <tr>
                        <td colSpan="3">No users found.</td>
                      </tr>
                    ) : (
                      recentUsers.map((u, index) => (
                        <tr key={u._id || index}>
                          <td>{index + 1}</td>
                          <td>{u.username}</td>
                          <td>{u.email}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Col>

            <Col lg="6" md="12">
              <div className="admin-table-container">
                <h4 className="mb-3">Recent Treks (from bookings)</h4>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Trek Name</th>
                      <th>Booked By</th>
                      <th>Guests</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTreks.length === 0 ? (
                      <tr>
                        <td colSpan="4">No trek booking activity yet.</td>
                      </tr>
                    ) : (
                      recentTreks.map((b, index) => (
                        <tr key={b._id || index}>
                          <td>{index + 1}</td>
                          <td>{b.trekName || b.tourName}</td>
                          <td>{b.userEmail}</td>
                          <td>{b.guestSize}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
    </AdminLayout>
  );
};

export default AdminDashboard;
