import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Card, CardBody } from "reactstrap";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { BASE_URL } from "../utils/config";
import axios from "axios";
import TrekCard from "../shared/TrekCard";
import CommonSection from "../shared/CommonSection";
import "./user-profile.css";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("account");

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const [profile, setProfile] = useState({});
  const [bookings, setBookings] = useState([]);
  const [visited, setVisited] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: true,
      };

      // Fetch Profile
      const profileRes = await axios.get(`${BASE_URL}/users/profile`, axiosConfig);
      if (profileRes.data.success) {
        setProfile(profileRes.data.data);
      }

      // Fetch Bookings
      const bookRes = await axios.get(`${BASE_URL}/bookings/user`, axiosConfig);
      if (bookRes.data.success) {
        setBookings(bookRes.data.data);
      }

      // Fetch Visited
      const visitRes = await axios.get(`${BASE_URL}/visited`, axiosConfig);
      if (visitRes.data.success) {
        // extract the actual populated tour from the mapping
        const visitedTreks = visitRes.data.data.map(item => item.tourId);
        setVisited(visitedTreks);
      }
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <h4 className="text-center mt-5">Please login to view dashboard.</h4>;
  }

  return (
    <>
      <CommonSection title="My Dashboard" />

      <section className="profile-container">
        <Container>
          {user && (
            <div className="welcome-text">
              Welcome back, {user.username} 👋 <br/>
              <span style={{fontSize: "0.95rem", color: "#666"}}>Here’s your trekking activity</span>
            </div>
          )}
          <Row className="justify-content-center">
            <Col lg="10" md="12" sm="12">
              {loading ? (
                <h4 className="text-center">Loading dashboard...</h4>
              ) : (
                <div className="dashboard-content">
                  
                  {/* ACCOUNT TAB */}
                  {activeTab === "account" && (
                    <Card className="dashboard-card">
                      <CardBody className="p-4">
                        <h4 className="mb-3"><i className="ri-user-settings-line border p-2 rounded bg-light mr-2"></i> Account Details</h4>
                        <hr className="mb-4"/>
                        {profile ? (
                          <div style={{fontSize: "1.05rem", color: "#444"}}>
                            <p className="mb-2"><strong>Name:</strong> {profile.username}</p>
                            <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
                            <p className="mb-2"><strong>Role:</strong> <span className="text-capitalize">{profile.role}</span></p>
                            <p className="mb-0"><strong>Member Since:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
                          </div>
                        ) : (
                          <p className="text-secondary">No profile data found.</p>
                        )}
                      </CardBody>
                    </Card>
                  )}

                  {/* BOOKINGS TAB */}
                  {activeTab === "bookings" && (
                    <Card className="dashboard-card">
                      <CardBody className="p-4">
                        <h4 className="mb-3"><i className="ri-calendar-check-line border p-2 rounded bg-light mr-2"></i> My Bookings</h4>
                        <hr className="mb-4"/>
                        {bookings.length === 0 ? (
                          <p className="text-secondary">You have no recent bookings.</p>
                        ) : (
                          <Row>
                            {bookings.map((book) => (
                              <Col lg="6" className="mb-3" key={book._id}>
                                <div className="booking-card">
                                  <span className="status-badge">[ BOOKED ]</span>
                                  <h5 className="booking-title mt-2 mb-3">{book.trekName}</h5>
                                  
                                  <div className="booking-detail-item">
                                    <i className="ri-user-line"></i> <span><strong>Name:</strong> {book.fullName}</span>
                                  </div>
                                  <div className="booking-detail-item">
                                    <i className="ri-team-line"></i> <span><strong>Guests:</strong> {book.guestSize} Explorer(s)</span>
                                  </div>
                                  {book.bookAt && (
                                    <div className="booking-detail-item border-top pt-2 mt-2">
                                      <i className="ri-calendar-line text-primary"></i> <span><strong>Travel Date:</strong> {new Date(book.bookAt).toLocaleDateString()}</span>
                                    </div>
                                  )}
                                </div>
                              </Col>
                            ))}
                          </Row>
                        )}
                      </CardBody>
                    </Card>
                  )}

                  {/* VISITED TAB */}
                  {activeTab === "visited" && (
                    <Card className="dashboard-card">
                      <CardBody className="p-4">
                        <h4 className="mb-3"><i className="ri-map-pin-user-line border p-2 rounded bg-light mr-2"></i> Visited Treks</h4>
                        <hr className="mb-4"/>
                        {visited.length === 0 ? (
                          <p className="text-secondary">You haven't marked any treks as visited yet.</p>
                        ) : (
                          <Row>
                            {visited.map((trek) => (
                              <Col lg="4" md="6" xs="12" className="mb-4" key={trek._id}>
                                <TrekCard trek={trek} />
                              </Col>
                            ))}
                          </Row>
                        )}
                      </CardBody>
                    </Card>
                  )}

                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default UserProfile;
