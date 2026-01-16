import React from 'react';
import ServiceCard from './ServiceCard';
import { Col } from 'reactstrap';

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';


const servicesData = [
    {
        imgUrl: weatherImg,
        title: 'Calculate Weather',
        desc: 'Get accurate weather updates for your travel destinations.',
    },
    {
        imgUrl: guideImg,
        title: "Best Tour Guide",
        desc: "Get connected with the best local guides for an unforgettable experience.",
    },
    {
        imgUrl: customizationImg,
        title: "Customization",
        desc: "Tailor your travel plans to fit your unique preferences and needs.",
    }
]
const ServiceList = () => {
    return <>
        {
            servicesData.map((item, index) => <Col lg='3' key={index}><ServiceCard item={item} /></Col>
            )
        }
    </>;

};

export default ServiceList;
