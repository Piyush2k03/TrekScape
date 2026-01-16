import React from 'react'
import "./service-card.css";


const ServiceCard = ({item}) => {
    const {title, imgUrl, desc} = item;
  return <div className="service__card">
    <div className="service__img">
        <img src={imgUrl} alt="service-img" />
    </div>
    <h5>{title}</h5>
    <p>{desc}</p>
    </div>
};
export default ServiceCard;
