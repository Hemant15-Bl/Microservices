import React from 'react'
import Base from './Base'
import { Button, Card, CardImg, CardImgOverlay, CardText, CardTitle, Col, Container, Row } from 'reactstrap';
import myImage from "../Image/Luxury-hotel.jpg";
import Hotel from './Hotel';
import { Link } from 'react-router-dom';


const Home = () => {
  //  const backgroundStyle = {
  //   position: 'fixed',
  //   backgroundImage: `url(${myImage})`,
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   height: '100vh', // full height
  //   width: '100%',
  //   // top: 0,
  //   left: 0,
  //   // zIndex: -1
  //   fontFamily: 'sen-serif'
  // };
  return (
    <Base>
      {/* 1. HERO SECTION */}
      <div 
        className="d-flex align-items-center" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${myImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '90vh', // Takes most of the screen
          color: 'white'
        }}
      >
        <Container className="text-center">
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <h1 className="display-2 fw-bold mb-4 animate__animated animate__fadeInDown">
                Discover Luxury, <br /> Rate Excellence
              </h1>
              <p className="lead fs-4 mb-5 opacity-75">
                From self-making beds to breathtaking terrace views, find and rate 
                world-class hotels that redefine comfort and elegance.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button 
                  tag={Link} to="/login" 
                  color="info" size="lg" 
                  className="px-5 py-3 rounded-pill fw-bold shadow-lg border-0"
                >
                  Join Now
                </Button>
                <Button 
                  tag={Link} to="/user/dashboard" 
                  color="light" outline size="lg" 
                  className="px-5 py-3 rounded-pill fw-bold"
                >
                  Browse Hotels
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* 2. FEATURE SECTION (Why Us?) */}
      <Container className="py-5 my-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="fw-bold display-5">Why Choose HRS?</h2>
            <div className="bg-info mx-auto mt-2" style={{ height: '4px', width: '60px' }}></div>
          </Col>
        </Row>
        <Row className="g-4 text-center">
          <Col md={4}>
            <div className="p-4">
              <i className="bi bi-shield-check text-info display-4 mb-3"></i>
              <h4 className="fw-bold">Verified Ratings</h4>
              <p className="text-muted">Real feedback from real guests to ensure you make the right choice.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4">
              <i className="bi bi-gem text-info display-4 mb-3"></i>
              <h4 className="fw-bold">Luxury Collection</h4>
              <p className="text-muted">Explore hand-picked hotels with shiny bathrooms and premium services.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4">
              <i className="bi bi-lightning-charge text-info display-4 mb-3"></i>
              <h4 className="fw-bold">Instant Access</h4>
              <p className="text-muted">Sign up in seconds and start sharing your travel experiences immediately.</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* 3. "THE EXPERIENCE" SECTION (Using your text) */}
      <div className="bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <img src={myImage} className="img-fluid rounded-4 shadow" alt="Experience" />
            </Col>
            <Col lg={6} className="ps-lg-5 mt-4 mt-lg-0">
              <h2 className="fw-bold mb-4">The Perfect Stay Awaits</h2>
              <p className="text-muted lead mb-4">
                Hotel rooms have everything you need for a pleasant stay: large comfortable beds 
                covered with special bedspreads that get made by themselves, and bathrooms that are clean and shiny.
              </p>
              <ul className="list-unstyled">
                <li className="mb-3"><i className="bi bi-check-circle-fill text-info me-2"></i> Scenic terrace views</li>
                <li className="mb-3"><i className="bi bi-check-circle-fill text-info me-2"></i> 24/7 Room Service</li>
                <li className="mb-3"><i className="bi bi-check-circle-fill text-info me-2"></i> High-end amenities</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </Base>
  );
}

export default Home;