import React from 'react';
import TrekCard from '../../shared/TrekCard';
import { Col, Row } from 'reactstrap';

import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';

const FeaturedTrekList = () => {
  const { data: featuredTours, loading, error } = useFetch(
    `${BASE_URL}/tours/search/getFeaturedTours`
  );

  console.log("Featured Treks Data:", featuredTours);

  if (loading) return <h5>Loading featured treks...</h5>;
  if (error) return <h5>Error: {error}</h5>;
  if (!featuredTours || featuredTours.length === 0)
    return <h5>No featured treks found.</h5>;

  return (
    <>
    {
      loading && <h5>Loading featured treks...</h5>
    }
    {
      error && <h4>{error}</h4>
    }
      {!loading && !error &&
      featuredTours.map((tour) => (
        <Col lg="3" md="4" sm="6" xs="12" className="mb-4" key={tour._id}>
          <TrekCard trek={tour} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedTrekList;
