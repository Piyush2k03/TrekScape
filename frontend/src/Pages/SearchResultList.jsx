import React,{useState} from 'react'
import CommonSection from './../shared/CommonSection.jsx'; 
import {Container, Row, Col} from 'reactstrap';
import TrekCard from './../shared/TrekCard.jsx';
import { useLocation } from 'react-router-dom';
import NewsLetter from './../shared/NewsLetter.jsx';

const SearchResultList = () => {
const location = useLocation();


   const [data] = useState(
    Array.isArray(location.state?.tours) ? location.state.tours : []
     );

  return (
  <>
    <CommonSection title="Search Results" />
    <section>
      <Container>
        <Row>
          {data.length === 0 ? (
            <h4 className='text-center'>No tours found</h4>
          ) : ( 
            data.map((tour) => (
              <Col lg='3' md='4' sm='6' xs='12' className='mb-4' key={tour._id}>
                <TrekCard trek={tour} />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </section>
    <NewsLetter />
  </>
  )
}

export default SearchResultList
