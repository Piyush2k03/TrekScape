import React from 'react'
import '../shared/newsletter.css'

import { Container, Row, Col } from 'reactstrap'
import maleTourist from '../assets/images/male-tourist.png'

const NewsLetter = () => {
  return <section className='newsletter'>
        <Container>
        <Row>
            <Col lg='6'>
                <div className="newsletter__content">
                    <h2>Subscribe to our Newsletter</h2>
                    
                    <div className="newsletter__input">
                        <input type="email" placeholder='Enter your email' />
                        <button className="btn newsletter__btn">Subscribe</button>
                    </div>

                    <p>Subscribe to our newsletter to get the latest updates and offers.</p>
                </div>
            </Col>  
            <Col lg='6'>
                <div className="newsletter__img">
                    <img src={maleTourist} alt="" />
                </div>
            </Col>  
          </Row>
        </Container>
    </section>
 
}


export default NewsLetter
