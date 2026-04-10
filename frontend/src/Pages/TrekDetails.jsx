// src/Pages/TrekDetails.jsx

import React, { useRef, useState, useEffect, useContext } from "react";
import "../styles/trek.css";
import "../styles/trek-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import { BASE_URL } from "../utils/config";
import useFetch from "../hooks/useFetch";
import NewsLetter from "../shared/NewsLetter";
import { AuthContext } from "../Context/AuthContext";
import Weather from "../components/Weather/Weather";

const TrekDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [trekRating, setTrekRating] = useState(null);
  const { user } = useContext(AuthContext);

  const { data: trek, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  // -------------------------------
  // WISHLIST FEATURE
  // -------------------------------
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user && trek?._id) {
      const fetchWishlist = async () => {
        try {
          const res = await fetch(`${BASE_URL}/wishlist`, {
            headers: {
              "Authorization": `Bearer ${user.token || ""}`
            },
            credentials: "include"
          });
          const result = await res.json();
          if (result.success) {
            const savedTours = result.data.map(item => item.tourId._id || item.tourId);
            setIsSaved(savedTours.includes(trek._id));
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchWishlist();
    }
  }, [user, trek]);

  const toggleWishlist = async () => {
    if (!user) {
      alert("Please login to use wishlist");
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/wishlist/${trek._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const result = await res.json();
      if (result.success) {
        setIsSaved(result.action === "added");
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert("Failed to update wishlist");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [trek]);

  if (loading) {
    return (
      <section>
        <h2 className="text-center">Loading trek details...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h2 className="text-center text-danger">{error}</h2>
      </section>
    );
  }

  if (!trek) {
    return (
      <section>
        <h2 className="text-center">Trek not found</h2>
      </section>
    );
  }

  const {
    title,
    desc,
    photo,
    state,
    address,
    DifLevel,
    reviews,
    price,
    mapLink,
  } = trek;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  console.log("REVIEWS FROM BACKEND: ", reviews);


  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  // ------------------ SUBMIT REVIEW HANDLER ------------------
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!user) {
      return alert("Please login before submitting a review.");
    }

    if (!trekRating) {
      return alert("Please select a star rating.");
    }

    try {
      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: trekRating,
      };

      const res = await fetch(`${BASE_URL}/reviews/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }

      alert(result.message || "Review submitted!");
      window.location.reload(); // refresh page to show new review

    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <section>
        <Container>

          {/* ERROR / LOADING STATES */}
          {loading && <h2 className="text-center">Loading trek details...</h2>}
          {error && <h2 className="text-center text-danger">{error}</h2>}

          {!loading && !error && (
            <Row>

              {/* LEFT COLUMN */}
              <Col lg="8">
                <div className="tour__content" style={{position: "relative"}}>
                  <img src={photo} alt={title} />
                  <button 
                    onClick={toggleWishlist} 
                    className="wishlist-heart-btn"
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      background: "transparent",
                      border: "none",
                      fontSize: "2rem",
                      color: isSaved ? "red" : "white",
                      textShadow: "0 0 4px black",
                      cursor: "pointer",
                      zIndex: 10
                    }}
                  >
                    {isSaved ? "❤️" : "🤍"}
                  </button>

                  <div className="tour__info" style={{ marginTop: "15px" }}>

                    {/* Trek Title */}
                    <h2 style={{ fontWeight: "700", fontSize: "28px" }}>{title}</h2>

                    {/* Rating + Location */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        marginTop: "10px",
                        marginBottom: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      {/* Rating */}
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <i
                          className="ri-star-s-fill"
                          style={{ color: "#f5a623", fontSize: "22px" }}
                        ></i>
                        <span style={{ fontWeight: "600", fontSize: "18px" }}>
                          {avgRating === 0 ? "Not rated" : avgRating}
                        </span>
                        <span style={{ color: "gray", fontSize: "14px" }}>
                          ({reviews?.length})
                        </span>
                      </div>

                      {/* Address */}
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <i className="ri-map-pin-line" style={{ fontSize: "20px" }}></i>
                        <span style={{ fontSize: "16px" }}>{address}</span>
                      </div>
                    </div>

                    {/* Extra Trek Details */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "25px",
                        marginBottom: "15px",
                        color: "#333",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <i className="ri-map-pin-2-fill"></i> {state}
                      </span>

                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <i className="ri-currency-rupee-line"></i> {price}/person
                      </span>

                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <i className="ri-bar-chart-line"></i> {DifLevel}
                      </span>

                      {mapLink && (
                        <a
                          href={mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            color: "#007bff",
                            textDecoration: "none",
                            fontWeight: "500",
                          }}
                        >
                          <i className="ri-road-map-line"></i> View on Map
                        </a>
                      )}
                    </div>

                    {/* Weather Component */}
                    <div style={{ marginBottom: "25px" }}>
                      <Weather location={address} fallbackLocation={state} />
                    </div>

                    {/* Description */}
                    <h5 style={{ fontWeight: "600", marginBottom: "10px" }}>Description</h5>
                    <p style={{ lineHeight: "1.7", fontSize: "16px", color: "#444" }}>{desc}</p>

                  </div>


                  {/* REVIEWS SECTION */}
                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews?.length})</h4>

                    {/* ADD REVIEW FORM */}
                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            onClick={() => setTrekRating(star)}
                            className={
                              trekRating >= star ? "active__rating" : ""
                            }
                          >
                            {star}
                            <i className="ri-star-s-fill"></i>
                          </span>
                        ))}
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Share your thoughts"
                          required
                        />
                        <button className="btn primary__btn text-white" type="submit">
                          Submit
                        </button>
                      </div>
                    </Form>

                    {/* EXISTING REVIEWS */}
                    <ListGroup className="user__reviews">
                      {reviews?.map((review, index) => (
                        <div
                          key={index}
                          className="review-card d-flex gap-3 mb-4 p-3"
                          style={{
                            background: "#fafafa",
                            borderRadius: "12px",
                            border: "1px solid #e5e5e5",
                          }}
                        >
                          {/* Avatar */}
                          <img
                            src={avatar}
                            alt="avatar"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />

                          {/* Review Content */}
                          <div className="w-100">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <div>
                                <h5 style={{ margin: 0, fontWeight: "600" }}>{review.username}</h5>
                                <small style={{ color: "gray" }}>
                                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </small>
                              </div>

                              {/* Rating */}
                              <span
                                className="d-flex align-items-center gap-1"
                                style={{
                                  background: "#fff3cd",
                                  padding: "4px 8px",
                                  borderRadius: "8px",
                                  fontWeight: "600",
                                }}
                              >
                                {review.rating}
                                <i
                                  className="ri-star-s-fill"
                                  style={{ color: "#f5a623", marginLeft: "2px" }}
                                ></i>
                              </span>
                            </div>

                            {/* Review Text */}
                            <p style={{ marginTop: "8px", marginBottom: 0 }}>{review.reviewText}</p>
                          </div>
                        </div>
                      ))}
                    </ListGroup>


                  </div>
                </div>
              </Col>

              {/* RIGHT COLUMN */}
              <Col lg="4">
                <Booking trek={trek} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>

      <NewsLetter />
    </>
  );
};

export default TrekDetails;
