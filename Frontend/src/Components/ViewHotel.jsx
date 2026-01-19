import React, { useContext, useEffect, useState } from 'react'
import Base from './Base';
import { data, Link, useParams } from 'react-router-dom';
import { getHotelById, getHotelImage } from '../services/Hotel-service';
import { toast } from 'react-toastify';
import { Badge, Button, Card, CardBody, CardFooter, CardImg, CardSubtitle, CardText, CardTitle, Col, Container, Form, Input, Row } from 'reactstrap';
import Hotel from './Hotel';
import { deleteRating, getAllRatings, getRatingsByHotelId, saveRatings } from '../services/Rating-service';
import { loadUserById } from '../services/User-service';
import UserContext from '../Context/UserContext';
import Swal from 'sweetalert2';

const ViewHotel = () => {

  const { hotelId, userId } = useParams("hotelId");
  const themeColor = "#12b0cfff";


  const [hotel, setHotel] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [users, setUsers] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [addRating, setAddRating] = useState({
    hotelId: hotelId,
    userId: userId,
    feedback: '',
    rating: ''
  });

  const {user} = useContext(UserContext);
  const isAdmin = user.data?.roles?.some(r => r.name === "ROLE_ADMIN");


  //----- load hotel and rating data---------
  useEffect(() => {
    getHotelById(hotelId).then(data => setHotel(data)).catch(err => toast.error("Error loading hotel"));
    getRatingsByHotelId(hotelId).then(data => setRatings(data)).catch(err => console.error("Failed to load rating:"));
    document.title = "HRS | Hotel Details";
  }, [hotelId]);



  //---- dynamically change inputs
  const handleForm = (e, fieldName) => {
    setAddRating({ ...addRating, [fieldName]: e.target.value });
  };

  //---------- adding rating to rating api
  const submitRating = (event) => {
    event.preventDefault();

    // Convert to number and validate
    const ratingValue = Number(addRating.rating);

    if (!addRating.feedback.trim()) {
      return toast.error("Please enter a feedback message");
    }

    if (ratingValue < 1 || ratingValue > 10 || isNaN(ratingValue)) {
      return toast.warning("Please provide a rating between 1 and 5 stars");
    }
    saveRatings(addRating).then(data => {
      toast.success("Thankyou For Your Feedback!");
      setRatings(prevRating => [...prevRating, data]);
      setAddRating({ hotelId: hotelId, userId: userId, feedback: '', rating: '' });
    }).catch(err => {
      // console.log(err);
      toast.error("Submission failed!!");
    });
  };



  const getUsers = (uid) => {
    if (!uid || users[uid]) return;
    loadUserById(uid).then(data => setUsers(prev => ({ ...prev, [uid]: data }))).catch(err => console.log("Failed to load users"));
  };


  //-------------- get image --------------------------
  useEffect(() => {
    if (hotel?.imageName) {
      getHotelImage(hotel.imageName).then(url => setImageUrl(url));
    }
    return () => imageUrl && URL.revokeObjectURL(imageUrl);
  }, [hotel]);

  //-----------delete Rating with alert -------
  const removeRating = (ratingId) =>{
      try {
        Swal.fire({
          title:"Remove Rating?",
          text:"This action cannot be undone!",
          icon:'warning',
          showCancelButton: true,
          confirmButtonColor:'#12b0cfff',
          cancelButtonColor:'#d33',
          confirmButtonText:"Yes, delete it!"
        }).then((result) =>{
          if (result.isConfirmed) {
            deleteRating(ratingId).then(() => {
              setRatings(ratings.filter(r => r.ratingId !== ratingId));
              Swal.fire("Deleted!", "Rating has been removed.","success");
            }).catch(err=> {
                Swal.fire("Error", "Could not delete rating from server.", "error");
            })
          }
        });
      } catch (error) {
        console.error("Error while deleting rating!");
      }
  }


  if (!hotel) return <Base><div className="text-center py-5 mt-5">Loading Hotel Details...</div></Base>;
  return (
    <Base>
      {/* HERO SECTION */}
      <div className="hotel-hero" style={{
        height: '450px',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${imageUrl || 'https://via.placeholder.com/1200x500'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: '40px',
        color: 'white',
        marginTop: (!isAdmin)? '40px':'0'
      }}>
        <Container>
          <Badge color="warning" className="mb-2">FEATURED PROPERTY</Badge>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>{hotel.name}</h1>
          <p style={{ fontSize: '1.2rem' }}><i className="bi bi-geo-alt-fill"></i> {hotel.location}</p>
        </Container>
      </div>

      <Container className="mt-n5" style={{ position: 'relative', zIndex: 2 }}>
        <Row>
          {/* LEFT SIDE: DETAILS */}
          <Col lg={8}>
            <Card className="shadow-lg border-0 mb-4" style={{ borderRadius: '15px' }}>
              <CardBody className="p-4 p-md-5">
                <h3 className="fw-bold mb-4">About the Property</h3>
                <div className="hotel-description text-secondary" style={{ lineHeight: '1.8' }}
                  dangerouslySetInnerHTML={{ __html: hotel.about }} />

                <hr className="my-5" />

                <h4 className="fw-bold mb-4">Guest Reviews ({ratings.length})</h4>
                {ratings.length > 0 ? ratings.map((r, i) => {
                  getUsers(r.userId);
                  return (
                    <div key={i} className="mb-4 p-3 border-bottom">
                      <div className="d-flex justify-content-between">
                        <h6 className="fw-bold text-dark">{users[r.userId]?.name || "Verified Guest"}</h6>
                        <span className="text-warning">
                          {/* Fill stars based on rating */}
                          {"★".repeat(Math.max(0, Math.min(10, r.rating)))}

                          {/* Fill remaining empty stars up to 10 */}
                          {"☆".repeat(Math.max(0, 10 - Math.min(10, r.rating)))}
                        </span>
                      </div>
                      <p className="text-muted small mb-0 mt-1">{r.feedback}</p>
                      
               {user.login && isAdmin && <Button className='text-danger p-0 ms-2' color='link' onClick={()=>{removeRating(r.ratingId)}} title="Delete Review"><i className="bi bi-trash3-fill" style={{ fontSize: '1.2rem' }}></i></Button>}
                    </div>
                  );
                }) : <p className="text-muted">No reviews yet. Be the first to rate!</p>}
              </CardBody>
            </Card>
          </Col>

          {/* RIGHT SIDE: ACTION/RATING CARD */}
          <Col lg={4}>
            <Card className="shadow-lg border-0 sticky-top" style={{ borderRadius: '15px', top: '100px' }}>
              <CardBody className="p-4">
                <h5 className="fw-bold mb-3">Rate your Stay</h5>
                <Form onSubmit={submitRating}>
                  <div className="mb-3 text-center">
                    <div className="rating-stars mb-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(star => (
                        <span
                          key={star}
                          onClick={() => setAddRating({ ...addRating, rating: star })}
                          style={{
                            cursor: 'pointer',
                            fontSize: '1.4rem',
                            color: star <= addRating.rating ? '#ffc107' : '#e4e5e9'
                          }}
                        >★</span>
                      ))}
                    </div>
                    <small className="text-muted">Click a star to rate</small>
                  </div>
                  <Input
                    type='textarea'
                    rows="4"
                    className='mb-3 border-0 bg-light'
                    value={addRating.feedback}
                    placeholder='How was your experience?'
                    onChange={(e) => setAddRating({ ...addRating, feedback: e.target.value })}
                  />
                  <Button
                    block
                    type='submit'
                    style={{ backgroundColor: themeColor, border: 'none', padding: '12px' }}
                  >
                    Submit Review
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

    </Base>
  )
}

export default ViewHotel;