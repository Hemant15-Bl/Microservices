import React, { useEffect } from 'react'
import Base from './Base';
import myImage from '../Image/entrance.jpg';
import { Badge, Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row } from 'reactstrap';

const About = () => {

  useEffect(() => {
      document.title = "HRS | About Our Vision";
    }, []);
  return (
   
        <Base>
        {/* 1. Hero Section: Direct & Impactful */}
      <div className="py-5 text-white" style={{ 
          background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(' + myImage + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center'
      }}>
        <Container className="text-center">
          <Badge color="info" className="mb-3 px-3 py-2 text-uppercase" pill>Our Story</Badge>
          <h1 className="display-3 fw-bold mb-4">Redefining Hospitality</h1>
          <p className="lead mx-auto" style={{ maxWidth: '700px' }}>
            We bridge the gap between world-class hotels and travelers seeking 
            unforgettable stays through technology and transparency.
          </p>
        </Container>
      </div>

      {/* 2. Mission & Content Section */}
      <Container className="py-5 mt-5">
        <Row className="align-items-center g-5">
          <Col md={6}>
            <div className="position-relative">
              <img 
                src={myImage} 
                alt="Hotel Entrance" 
                className="img-fluid rounded-4 shadow-lg"
                style={{ border: '8px solid white' }}
              />
              {/* Decorative element */}
              <div className="position-absolute bottom-0 end-0 bg-info p-4 rounded-4 shadow-lg d-none d-lg-block" 
                   style={{ transform: 'translate(20%, 20%)', color: 'white' }}>
                <h2 className="mb-0 fw-bold">10+</h2>
                <small>Years of Excellence</small>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <h6 className="text-info fw-bold text-uppercase mb-3">Who We Are</h6>
            <h2 className="display-5 fw-bold mb-4" style={{ color: '#2c3e50' }}>Seamless Stays, Just a Click Away</h2>
            <p className="text-muted mb-4 lead">
              Founded in 2024, HRS (Hotel Rating System) started with a simple goal: 
              To make finding a quality hotel as easy as checking the time.
            </p>
            <p className="text-muted mb-4">
              We understand that room service and in-room dining are more than just food delivery—they 
              are the heartbeat of a high-end experience. Our platform evaluates every subdivision 
              of hotel management, from the food and beverage departments to the late-night 
              hospitality standards.
            </p>
            <div className="d-flex gap-3">
              <div className="text-center p-3 bg-light rounded-3 flex-fill border border-info-subtle">
                <i className="bi bi-shield-check fs-2 text-info"></i>
                <h6 className="mt-2 fw-bold">Verified</h6>
              </div>
              <div className="text-center p-3 bg-light rounded-3 flex-fill border border-info-subtle">
                <i className="bi bi-star-fill fs-2 text-info"></i>
                <h6 className="mt-2 fw-bold">Top Rated</h6>
              </div>
              <div className="text-center p-3 bg-light rounded-3 flex-fill border border-info-subtle">
                <i className="bi bi-headset fs-2 text-info"></i>
                <h6 className="mt-2 fw-bold">24/7 Support</h6>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* 3. Stats / Features Bar */}
      <div className="bg-light py-5 mt-5 border-top border-bottom">
        <Container>
          <Row className="text-center g-4">
            <Col md={4}>
              <h1 className="fw-bold text-dark mb-0">500+</h1>
              <small className="text-muted text-uppercase fw-bold">Partner Hotels</small>
            </Col>
            <Col md={4}>
              <h1 className="fw-bold text-dark mb-0">12k+</h1>
              <small className="text-muted text-uppercase fw-bold">Happy Guests</small>
            </Col>
            <Col md={4}>
              <h1 className="fw-bold text-dark mb-0">4.9/5</h1>
              <small className="text-muted text-uppercase fw-bold">Average Rating</small>
            </Col>
          </Row>
        </Container>
      </div>

      {/* 4. CTA (Call to Action) Section */}
      <Container className="py-5 my-5 text-center bg-info rounded-5 shadow-lg text-white">
        <h2 className="fw-bold mb-3">Ready to find your perfect stay?</h2>
        <p className="mb-4">Join thousands of travelers who book with confidence every day.</p>
        <Button className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold shadow-sm" 
                style={{ color: '#12b0cf' }}>
          Browse Hotels Now
        </Button>
      </Container>
        </Base>

  )
}

export default About