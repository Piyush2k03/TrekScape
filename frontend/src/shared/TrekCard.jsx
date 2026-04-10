// import React from 'react'
// import { Card, CardBody } from 'reactstrap';
// import { Link } from 'react-router-dom';


// const TrekCard = ({ trek }) => {

//   const { id, title, photo, state, address, DifLevel, avgRating, reviews } = trek;
//  return (
//     <div className="trek__card">
//       <Card>
//         <div className="tour__img">
//           <img src={photo} alt="tour-img" />
//           <span>Featured</span>
//         </div>
//   </Card >
//   <CardBody>
//     <div className="card__top d-flex align-items-center justify-content-between">
//       <span className="tour__location d-flex align-items-center gap-1">
//         <i className="ri-map-pin-line"></i> {state}
//       </span>
//       <span className="tour__rating d-flex align-items-center gap-1">
//         <i className="ri-star-fill"></i> {avgRating} 
//         <span>({reviews.length})</span>
//       </span>
//     </div>

//     <h5 className="tour__title">
//       <Link to={`/trek/${id}`}>{title}</Link>
//     </h5>

//     <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
//       <h5>${DifLevel} </h5>
//       <Link to={`/trek/${id}`} className="btn booking__btn">
//         Book Now
//       </Link>
//     </div>
//   </CardBody>
//   </div >
//  );
// };




// export default TrekCard
// import React from 'react';
// import { Card, CardBody } from 'reactstrap';
// import { Link } from 'react-router-dom';

// const TrekCard = ({ trek }) => {
//   const { id, title, photo, state, address, DifLevel, avgRating, reviews, featured } = trek;

//   return (
//     <div className="trek__card">
//       <Card>
//         <div className="tour__img">
//           <img src={photo} alt={title} />
//           {featured && <span className="badge">Featured</span>}
//         </div>

//         <CardBody>
//           {/* Top section: location + rating */}
//           <div className="card__top d-flex align-items-center justify-content-between">
//             <span className="tour__location d-flex align-items-center gap-1">
//               <i className="ri-map-pin-line"></i> {state}
//             </span>
//             <span className="tour__rating d-flex align-items-center gap-1">
//               <i className="ri-star-fill"></i> {avgRating} 
//               <span>({reviews?.length || 0})</span>
//             </span>
//           </div>

//           {/* Trek title */}
//           <h5 className="tour__title">
//             <Link to={`/trek/${id}`}>{title}</Link>
//           </h5>

//           {/* Address (optional) */}
//           {address && <p className="tour__address">{address}</p>}

//           {/* Bottom section: difficulty + book button */}
//           <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
//             <h6 className="difficulty">Difficulty: {DifLevel}</h6>
//             <Link to={`/trek/${id}`} className="btn booking__btn">
//               Book Now
//             </Link>
//           </div>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import "./trek-card.css";
import { AuthContext } from "../Context/AuthContext";
import { BASE_URL } from "../utils/config";
import axios from "axios";

const TrekCard = ({ trek }) => {
  const { _id, title, photo, state, address, DifLevel, reviews, price, featured } = trek;

  const { totalRating, avgRating } = calculateAvgRating(reviews);
  const { user } = useContext(AuthContext);

  // -------------------------------
  // WISHLIST FEATURE
  // -------------------------------
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      // Check if this tour is in the user's wishlist
      const fetchWishlist = async () => {
        try {
          const res = await fetch(`${BASE_URL}/wishlist`, {
            headers: {
              "Authorization": `Bearer ${user.token || ""}` // if using cookies, maybe not needed, but good practice
            },
            credentials: "include"
          });
          const result = await res.json();
          if (result.success) {
            const savedTours = result.data.map(item => item.tourId._id || item.tourId);
            setIsSaved(savedTours.includes(_id));
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchWishlist();
    }
  }, [user, _id]);

  const toggleWishlist = async () => {
    if (!user) {
      alert("Please login to use wishlist");
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/wishlist/${_id}`, {
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

  // -------------------------------
  // VISITED FEATURE (BACKEND)
  // -------------------------------
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchVisited = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/visited`, {
            headers: { Authorization: `Bearer ${user.token || ""}` },
            withCredentials: true
          });
          if (res.data.success) {
            const visitedTours = res.data.data.map(item => item.tourId._id || item.tourId);
            setVisited(visitedTours.includes(_id));
          }
        } catch (err) {
          console.error("Visited fetch error:", err);
        }
      };
      fetchVisited();
    }
  }, [user, _id]);

  const toggleVisited = async () => {
    if (!user) {
      alert("Please login to mark as visited");
      return;
    }
    try {
      const res = await axios.post(`${BASE_URL}/visited/${_id}`, {}, {
        headers: { Authorization: `Bearer ${user.token || ""}` },
        withCredentials: true
      });
      if (res.data.success) {
        setVisited(res.data.action === "added");
      }
    } catch (err) {
      alert("Failed to update visited status");
    }
  };

  // -------------------------------
  // UI JSX
  // -------------------------------
  return (
    <div className="trek__card">
      <Card>
        <div className="tour__img" style={{position: "relative"}}>
          <img src={photo} alt={title} />
          {featured && <span className="featured-tag">Featured</span>}
          <button 
            onClick={toggleWishlist} 
            className="wishlist-heart-btn"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              fontSize: "1.5rem",
              color: isSaved ? "red" : "white",
              textShadow: "0 0 2px black",
              cursor: "pointer",
              zIndex: 10
            }}
          >
            {isSaved ? "❤️" : "🤍"}
          </button>
        </div>

        <CardBody>
          {/* TOP: LOCATION + RATING */}
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className="ri-map-pin-line"></i> {state}
            </span>

            <span className="tour__rating d-flex align-items-center gap-1">
              <i className="ri-star-s-fill"></i>
              {avgRating === 0 ? "Not rated" : `${avgRating} (${reviews?.length})`}
            </span>
          </div>

          {/* TITLE */}
          <h5 className="tour__title">
            <Link to={`/treks/${_id}`}>{title}</Link>
          </h5>

          {/* ADDRESS IF AVAILABLE */}
          {address && <p className="tour__address">{address}</p>}

          <p>Difficulty: {DifLevel}</p>
          <p>Price: ₹{price}</p>

          {/* BUTTONS */}
          <div className="buttons">
            <Link to={`/treks/${_id}`} className="book-btn btn">
              Book Now
            </Link>

            <button
              className={`visited-btn ${visited ? "visited" : ""}`}
              onClick={toggleVisited}
            >
              {visited ? "Visited ✅" : "Mark as Visited"}
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TrekCard;
