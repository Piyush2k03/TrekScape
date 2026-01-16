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

import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import "./trek-card.css";

const TrekCard = ({ trek }) => {
  const { _id, title, photo, state, address, DifLevel, reviews, price, featured } = trek;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // -------------------------------
  // VISITED FEATURE (LOCAL STORAGE)
  // -------------------------------
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    const visitedTreks = JSON.parse(localStorage.getItem("visitedTreks")) || [];
    setVisited(visitedTreks.includes(_id)); // use _id (MongoDB id)
  }, [_id]);

  const toggleVisited = () => {
    const visitedTreks = JSON.parse(localStorage.getItem("visitedTreks")) || [];
    let updatedTreks;

    if (visited) {
      updatedTreks = visitedTreks.filter((trekId) => trekId !== _id);
    } else {
      updatedTreks = [...visitedTreks, _id];
    }

    localStorage.setItem("visitedTreks", JSON.stringify(updatedTreks));
    setVisited(!visited);
  };

  // -------------------------------
  // UI JSX
  // -------------------------------
  return (
    <div className="trek__card">
      <Card>
        <div className="tour__img">
          <img src={photo} alt={title} />
          {featured && <span className="featured-tag">Featured</span>}
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
