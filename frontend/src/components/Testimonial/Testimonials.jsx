import React from 'react'
import Slider from "react-slick";
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'


const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true, 
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,

        responsive : [
          {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
            },
          },
          { 
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
            },
        ]

    }
  return( <Slider {...settings}>
      {/* Testimonial 1 */}
      <div className="testimonial py-4 px-3">
        <p>"I love how simple the site is to use. Found treks in seconds, and the visited feature is super helpful to track my hikes."</p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Keshav Patil</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="testimonial py-4 px-3">
        <p>"The platform feels very personal. I discovered new trails I never knew about, and the historical details about forts are a nice touch!"</p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Shruti Bhangale</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      {/* Testimonial 3 */}
      <div className="testimonial py-4 px-3">
        <p>"It was my first trek and I couldn’t have asked for a better experience. Highly recommend Trekscape!"</p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Satyam Zope</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

    {/* Testimonial 4 */}
      <div className="testimonial py-4 px-3">
        <p>"Trekscape made it so easy to plan my weekend trek. The details were clear, and the experience was amazing. Definitely coming back for my next adventure!"</p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Yash Pardeshi</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonials;