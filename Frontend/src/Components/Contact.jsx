import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Base from './Base';
import { Badge, Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const Contact = () => {
  useEffect(() => {
    document.title = "HRS | Contact Us";
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    toast.success("Message sent! We will get back to you soon.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Base>
      {/* 1. Minimalist Header */}
      <div className="py-5 bg-light border-bottom">
        <Container className="text-center pt-5">
          <Badge color="info" className="mb-3 px-3 py-2 text-uppercase" pill>Get In Touch</Badge>
          <h1 className="display-4 fw-bold text-dark">How Can We Help?</h1>
          <p className="text-muted lead">Have a question about a hotel or our rating system? Our team is here to help.</p>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="g-4">
          
          {/* 2. Contact Information Cards */}
          <Col lg={4}>
            <div className="mb-4">
              <h4 className="fw-bold mb-4">Contact Information</h4>
              
              <Card className="border-0 shadow-sm mb-3 rounded-4">
                <CardBody className="d-flex align-items-center">
                  <div className="bg-info-subtle p-3 rounded-circle me-3 text-info">
                    <i className="bi bi-geo-alt-fill fs-4"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">Our Office</h6>
                    <small className="text-muted">123 Hotel Street, Mumbai, India</small>
                  </div>
                </CardBody>
              </Card>

              <Card className="border-0 shadow-sm mb-3 rounded-4">
                <CardBody className="d-flex align-items-center">
                  <div className="bg-info-subtle p-3 rounded-circle me-3 text-info">
                    <i className="bi bi-envelope-at-fill fs-4"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">Email Us</h6>
                    <small className="text-muted">support@hrs-system.com</small>
                  </div>
                </CardBody>
              </Card>

              <Card className="border-0 shadow-sm mb-3 rounded-4">
                <CardBody className="d-flex align-items-center">
                  <div className="bg-info-subtle p-3 rounded-circle me-3 text-info">
                    <i className="bi bi-telephone-fill fs-4"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">Call Anytime</h6>
                    <small className="text-muted">+91 98765 43210</small>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Social Links */}
            <div className="p-4 bg-dark rounded-4 text-white text-center shadow-lg">
              <h6>Follow Our Updates</h6>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <i className="bi bi-facebook fs-4 pointer"></i>
                <i className="bi bi-twitter-x fs-4 pointer"></i>
                <i className="bi bi-instagram fs-4 pointer"></i>
                <i className="bi bi-linkedin fs-4 pointer"></i>
              </div>
            </div>
          </Col>

          {/* 3. Contact Form Section */}
          <Col lg={8}>
            <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
              <CardBody className="p-4 p-md-5">
                <h3 className="fw-bold mb-4">Send us a Message</h3>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="name" className="small fw-bold">Full Name</Label>
                        <Input 
                          type="text" id="name" placeholder="John Doe" 
                          className="p-3 border-0 bg-light" 
                          value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required 
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="email" className="small fw-bold">Email Address</Label>
                        <Input 
                          type="email" id="email" placeholder="john@example.com" 
                          className="p-3 border-0 bg-light" 
                          value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required 
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup>
                    <Label for="subject" className="small fw-bold">Subject</Label>
                    <Input 
                      type="text" id="subject" placeholder="How can we help you?" 
                      className="p-3 border-0 bg-light" 
                      value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required 
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="message" className="small fw-bold">Message</Label>
                    <Input 
                      type="textarea" id="message" rows="5" placeholder="Tell us more about your inquiry..." 
                      className="p-3 border-0 bg-light" 
                      value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required 
                    />
                  </FormGroup>

                  <Button color="info" className="w-100 py-3 fw-bold shadow-sm text-white rounded-3 mt-3">
                    <i className="bi bi-send-fill me-2"></i>Send Message
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      
      {/* 4. Google Map Placeholder */}
      <Container className="pb-5">
        <div className="rounded-4 overflow-hidden shadow-sm border" style={{ height: '300px', background: '#eee' }}>
           {/* You can replace this div with a real Google Maps Iframe */}
           <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
             <i className="bi bi-map me-2"></i> Interactive Map coming soon
           </div>
        </div>
      </Container>
    </Base>
  )
}

export default Contact