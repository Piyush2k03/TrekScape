// src/Pages/ThankYou.jsx

import React from 'react';
import { useLocation, Link } from 'react-router-dom'; 
import { Container, Row, Col, Button } from 'reactstrap';
import '../styles/thank-you.css';
import NewsLetter from '../shared/NewsLetter';

const ThankYou = () => {
    const location = useLocation();

    const { total, trekTitle, date, guests } = location.state || {};

    const bookingDate = date 
        ? new Date(date).toLocaleDateString('en-US', {
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric'
        })
        : 'the selected date';

    return (
        <section className="thank-you-section">
            <Container>
                <Row>
                    <Col lg="12" className="text-center">
                        <div className="thank__you">

                            <span>
                                <i className="ri-checkbox-circle-line"></i>
                            </span>

                            <h1 className="mb-3 fw-semibold">Thank You</h1>
                            <h3 className="mb-4 text-secondary">Your trip is booked.</h3>

                            <p className="fs-5 mt-4">
                                Your booking for <strong>{trekTitle || 'a trek'}</strong> is complete.
                            </p>

                            {guests && (
                                <p className="fs-6">
                                    <strong>Guests:</strong> {guests} person(s)
                                </p>
                            )}

                            {date && (
                                <p className="fs-6">
                                    <strong>Date:</strong> {bookingDate}
                                </p>
                            )}

                            {total && (
                                <h4 className="mt-4 text-primary">
                                    Total Amount Paid: <strong>₹{total}</strong>
                                </h4>
                            )}

                            <Button 
                                tag={Link} 
                                to="/home" 
                                className="btn primary__btn w-25 mt-5"
                            >
                                Explore More Treks
                            </Button>

                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ThankYou;
