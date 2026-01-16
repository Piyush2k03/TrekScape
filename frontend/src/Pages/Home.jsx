// import React from 'react'
// import '../styles/home.css';

// import { Container, Row, Col } from 'reactstrap';
// import heroImg from '../assets/images/hero-img01.jpg';
// import heroImg02 from '../assets/images/hero-img02.jpg';
// import heroVideo from '../assets/images/hero-video.mp4';
// import Subtitle from '../shared/Subtitle';
// import worldImg from '../assets/images/world.png';
// import SearchBar from '../shared/SearchBar';

// const Home = () => {
//   return <>

//     {/* Hero Section */}
//     <section>
//       <Container>
//         <Row>
//           <Col lg='6'>
//             <div className='hero__content'>
//               <div className="hero__subtitle d-flex align-items-center ">
//                 <Subtitle subtitle={'Know Before You Go'} />
//                 <img src={worldImg} alt="" />
//               </div>
//               <h1>Traveling opens the door to creating unforgettable <span className='highlighted'>memories</span></h1>
//               <p>
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa in officia tenetur adipisci assumenda, non dolore nesciunt sit a dolorum. Veritatis magnam molestiae sunt! Magnam itaque voluptate dolorem exercitationem! Omnis.
//               </p>
//             </div>
//           </Col>

//           <Col lg='2'>
//             <div className='hero__img-box'>
//               <img src={heroImg} alt="hero-img" />
//             </div>
//           </Col>
//           <Col lg='2'>
//             <div className='hero__img-box mt-4'>
//               <video src={heroVideo} alt="hero-img" controls />
//             </div>
//           </Col>
//           <Col lg='2'>
//             <div className='hero__img-box mt-5'>
//               <img src={heroImg02} alt="hero-img" />
//             </div>
//            </Col>
//           <SearchBar />
//         </Row>
//       </Container>
//     </section>
//     {/*hero section start*/}
//     <section>
//       <Container>
//         <Row>
//           <Col lg="3">
//             <h5 className="services_subtitle">What we Serve</h5>
//             <h2 className='services_title'>We offer our best services</h2>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   </>



// }

// export default Home;

import React from 'react'
import '../styles/home.css';

import { Container, Row, Col, Spinner } from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import experienceImg from '../assets/images/experience.png';
import Subtitle from '../shared/Subtitle';

import worldImg from '../assets/images/world.png';
import SearchBar from '../shared/SearchBar';
import ServiceList from '../services/ServiceList';
import FeaturedTrekList from '../components/Featured-treks/FeaturedTrekList';
import MasonryImagesGallery from '../components/image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonial/Testimonials';
import NewsLetter from '../shared/NewsLetter';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BASE_URL } from '../utils/config';
import useFetch from '../hooks/useFetch';


const Home = () => {
  // Fetch most reviewed treks data
  const { data: mostReviewedData, loading: mostReviewedLoading } = useFetch(
    `${BASE_URL}/tours/most-reviewed`
  );

  // Prepare chart data
  const chartData = Array.isArray(mostReviewedData) 
    ? mostReviewedData.map(trek => ({
        name: trek.title && trek.title.length > 20 ? trek.title.substring(0, 20) + '...' : (trek.title || 'Unknown'),
        reviews: trek.reviewCount || 0
      }))
    : [];

  return (
    <>
      {/* Hero Section */}
   <section>
  <Container>
    <Row className="align-items-center">

      <Col lg="6">
        <div className="hero__content">
          <div className="hero__subtitle d-flex align-items-center">
            <Subtitle subtitle="Know Before You Go" />
            <img src={worldImg} alt="world" />
          </div>

          <h1>
            Traveling opens the door to creating unforgettable{" "}
            <span className="highlighted">memories</span>
          </h1>

          <p>
            "Trekscape is your gateway to explore the forts, trails, and hidden gems
            of Maharashtra. Find treks by state, category, and difficulty and start
            your adventure today."
          </p>
        </div>
      </Col>

      <Col lg="2">
        <div className="hero__img-box">
          <img src={heroImg} alt="hero-img" />
        </div>
      </Col>

      <Col lg="2">
        <div className="hero__img-box hero__video-box mt-4">
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            style={{ borderRadius: "15px", pointerEvents: "none" }}
          />
        </div>
      </Col>

      <Col lg="2">
        <div className="hero__img-box mt-5">
          <img src={heroImg02} alt="hero-img2" />
        </div>
      </Col>

      <Col lg="12" className="mt-4">
        <SearchBar />
      </Col>

    </Row>
  </Container>
</section>


      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What we Serve</h5>
              <h2 className='services__title'>We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>
      {/* Featured Treks Section */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className='featured__treks-title'>Our Featured Treks</h2>
            </Col>
            <FeaturedTrekList />
          </Row>
        </Container>
      </section>
      {/* Featured Treks Section end */}

      {/* Most Reviewed Treks Chart Section */}
      <section className="most-reviewed-section">
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <Subtitle subtitle={"Popular Choice"} />
              <h2 className='featured__treks-title'>Top 5 Most Reviewed Treks</h2>
              <p style={{ color: 'var(--text-color)', fontSize: '1.1rem', marginTop: '1rem' }}>
                Discover the treks that adventurers love the most
              </p>
            </Col>
            <Col lg="12">
              {mostReviewedLoading ? (
                <div className="text-center py-5">
                  <Spinner color="warning" /> 
                  <span className="ms-2" style={{ color: 'var(--text-color)' }}>Loading chart data...</span>
                </div>
              ) : Array.isArray(mostReviewedData) && chartData.length > 0 ? (
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={450} className="chart-responsive">
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 30,
                        right: 40,
                        left: 20,
                        bottom: 100,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={120}
                        interval={0}
                        tick={{ fill: 'var(--heading-color)', fontSize: 12 }}
                      />
                      <YAxis 
                        tick={{ fill: 'var(--heading-color)', fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '2px solid var(--secondary-color)',
                          borderRadius: '8px',
                          color: 'var(--heading-color)'
                        }}
                      />
                      <Legend 
                        wrapperStyle={{ paddingTop: '20px' }}
                      />
                      <Bar 
                        dataKey="reviews" 
                        fill="var(--secondary-color)" 
                        name="Number of Reviews"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-5">
                  <p style={{ color: 'var(--text-color)', fontSize: '1.1rem' }}>
                    No review data available yet. Add reviews to treks to see the chart.
                  </p>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
      {/* Most Reviewed Treks Chart Section end */}

      {/* Experience section */}
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className="experience__content">
                <Subtitle subtitle={'Experience'} />
                <h2>With our all experience <br /> we will serve you</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
              </div>
              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successful Trips</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular Clients</h6>
                </div>
                <div className="counter__box">
                  <span>15</span>
                  <h6>Years of Experience</h6>
                </div>
              </div>
            </Col>
            <Col lg='6'>
              <div className="experience__img">
                <img src={experienceImg} alt="experience-img" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Experience section end*/}
      {/* Gallery section */}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Gallery'} />
              <h2 className='gallery__title'>Visit our customers tour gallery</h2>
            </Col>
            <Col lg='12'>
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/*Gallery section end*/}

      {/* Testimonial section */}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Fans Love'} />
              <h2 className='testimonial__title'>What our fans say about us</h2>
            </Col>
            <Col lg='12'>
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
      {/* testimonial section end */}

      <NewsLetter />
    </>
  );
};

export default Home;
