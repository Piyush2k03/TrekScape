import React from "react";
import "../styles/about.css";
import { RiRoadMapLine, RiTeamFill, RiCompassDiscoverLine } from "react-icons/ri";

const About = () => {
  return (
    <div className="about-wrapper">

      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <h1 className="about-hero-title">Discover India, One Trek at a Time</h1>
        <p className="about-hero-subtitle">
          Explore breathtaking trails, majestic mountains and unforgettable journeys.
        </p>
      </section>

      {/* ABOUT CONTENT */}
      <section className="about-content container">
        <h2 className="about-heading">Who We Are</h2>
        <p className="about-description">
          Trekscape is India’s fast-growing trekking exploration platform, designed 
          to help adventurers discover verified treks across the country. Whether you 
          are exploring the mighty Himalayas, the green Western Ghats or hidden gems 
          in the North-East — we bring every trek closer to you.
        </p>

        {/* GRID FEATURES */}
        <div className="about-features">
          <div className="feature-box">
            <RiRoadMapLine className="feature-icon" />
            <h4>Pan-India Treks</h4>
            <p>
              From Himachal to Kerala, Sikkim to Maharashtra — explore treks 
              from every region with accurate details.
            </p>
          </div>

          <div className="feature-box">
            <RiCompassDiscoverLine className="feature-icon" />
            <h4>Verified Information</h4>
            <p>
              Difficulty levels, routes, tips, best seasons — everything you need 
              to plan your perfect trek.
            </p>
          </div>

          <div className="feature-box">
            <RiTeamFill className="feature-icon" />
            <h4>Trekker Community</h4>
            <p>
              Read real reviews from real trekkers. Share your experience & help 
              others explore with confidence.
            </p>
          </div>
        </div>

        {/* STATES COVERED */}
        <h2 className="about-heading mt-5">States We Cover</h2>
        <div className="states-grid">
          {[
            "Himachal Pradesh",
            "Uttarakhand",
            "Jammu & Kashmir",
            "Maharashtra",
            "Karnataka",
            "Kerala",
            "Sikkim",
            "Meghalaya",
            "West Bengal",
          ].map((state, i) => (
            <div className="state-pill" key={i}>{state}</div>
          ))}
        </div>

        {/* STATS SECTION */}
        <section className="stats-section">
          <div className="stat-box">
            <h2>50+</h2>
            <p>Verified Treks</p>
          </div>
          <div className="stat-box">
            <h2>15+</h2>
            <p>Indian States</p>
          </div>
          <div className="stat-box">
            <h2>500+</h2>
            <p>Community Reviews</p>
          </div>
          <div className="stat-box">
            <h2>10,000+</h2>
            <p>Web Visitors</p>
          </div>
        </section>

        {/* TEAM / MISSION */}
        <h2 className="about-heading mt-5">Our Mission</h2>
        <p className="about-description">
          We aim to make trekking accessible, safe and exciting for everyone.  
          Trekscape is built with passion by trekkers and developers who believe 
          in promoting adventure and responsible travel.
        </p>
      </section>
    </div>
  );
};

export default About;

