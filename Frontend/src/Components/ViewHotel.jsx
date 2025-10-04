import React, { useEffect, useState } from 'react'
import Base from './Base';
import { data, Link, useParams } from 'react-router-dom';
import { getHotelById } from '../services/Hotel-service';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardFooter, CardImg, CardSubtitle, CardText, CardTitle, Col, Form, Input, Row } from 'reactstrap';
import Hotel from './Hotel';
import { getAllRatings, getRatingsByHotelId, saveRatings } from '../services/Rating-service';
import { getCurrentUserDetails, getToken } from '../auth/Index';
import { loadUserById } from '../services/User-service';

const ViewHotel = () => {

  //------binding hotelId in a variable which coming from DashBoard
  const { hotelId } = useParams("hotelId");
  const { userId } = useParams("userId");


  //------ initialize hotel initial state -------
  const [hotel, setHotel] = useState(undefined);

  //----- load hotel by hotelId---------
  useEffect(() => {
    getHotelById(hotelId).then(data => {
      setHotel(data);
      //console.log(data);
      toast.success("Hotel loaded successfully!")
    }).catch(err => {
      //console.log(err);
      toast.error("Something wen wrong try again !!");
    })
  }, [hotelId]);

  //------- get all ratings by hotelId---------
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    getRatingsByHotelId(hotelId).then(data => {
      setRatings(data);
      //console.log(data);
      toast.success("Rating loaded successfully!")
    }).catch(err => {
      //console.log(err);
      toast.error("*** Can not load the ratings ***");
    })
  }, []);

  // --------- Add rating-----------------

  const [addRating, setAddRating] = useState({
    hotelId: hotelId,
    userId: userId,
    feedback: '',
    rating: ''
  });

  //---- dynamically change inputs
  const handleForm = (e, fieldName) => {
    setAddRating({ ...addRating, [fieldName]: e.target.value });
  };

  //------ after submit rating reset inputs
  const resetForm = () => {
    setAddRating({
      hotelId: hotelId,
      userId: userId,
      feedback: '',
      rating: ''
    });
  };

  //---------- adding rating to rating api

  const submitRating = (event) => {
    event.preventDefault();

    saveRatings(addRating).then(data => {
      //console.log(data);
      
      toast.success("Rating added successfully!");
      setRatings(prevRating => [...prevRating, data]);
      resetForm();
    }).catch(err => {
      // console.log(err);
      toast.error("Rating not added!!");
    })
  }


  //----------get users by Id-----
  const [users, setUsers] = useState({});


  const getUsers = (uid) => {
    if (!uid || users[uid]) return;

    loadUserById(uid).then(data => {
      setUsers(prev => ({ ...prev, [uid]: data }));
      //console.log(data);

    }).catch(err => {
      //console.log(err);
    })
  };


  //-------------- get image --------------------------
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {

    if (!hotel || !hotel.imageName) {
      return;
    }

    const fetchImage = async () => {
      const token = getToken();

      const response = await fetch("http://localhost:8084/hotel/image/" + hotel.imageName, {
        headers: {
          Authorization: `Bearer ${token}`,

        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } else {
        console.log("Failed to fetch image!!");

      }
    };

    fetchImage();

    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    }
  }, [hotel]);

  useEffect(() => {
      document.title = "HRS || Hotel Detail";
    }, []);
  return (
    <Base>
      <div className='text-center p-0 container mt-4' style={{ fontFamily: "serif" }}>
        <h1>Hotel Details</h1>

        {/* -------------- show hotel details ------------------ */}
        <Row>

          {hotel && (

            <Col className='mb-3 boader-2 shadow-4' md={{ size: 12 }}>
              <Card className='bg-body-secondary py-4'>
                <CardImg
                  alt="Unavailable"
                  src={imageUrl}
                  top
                  className='mx-auto d-block'
                  style={{ maxHeight: '200', maxWidth: "50%" }} />
                <CardBody>
                  <CardTitle tag="h1">
                    {hotel.name}
                  </CardTitle>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h5"
                  >
                    {hotel.location}
                  </CardSubtitle>
                  <CardText dangerouslySetInnerHTML={{ __html: hotel.about }} />


                </CardBody>
              </Card>

            </Col>

          )}

        </Row>

        {/* -------------- show ratings details ------------------ */}

        <Row className='mt-4'>
          <Col md={{ size: 9, offset: 1 }} className='shadow-3'>
            <h2>Ratings ({ratings ? ratings.length : 0})</h2>
            {ratings.length > 0 ? ratings.map((rating, idx) => {

              // fetch user in rating
              getUsers(rating.userId)
              return (

                <Card className='mt-2 boader-1 p-0 bg-body-secondary' key={idx}>
                  <CardBody className='text-start'>
                    <CardText> Feedback : {rating.feedback}  </CardText>
                    <hr />
                    <CardText> Rate : {rating.rating}  </CardText>
                    <CardText className='text-end mt-0 mb-0' >-by {users[rating.userId]?.name || "Loading..."}</CardText>

                  </CardBody>
                </Card>

              )
            }
            ) : <h3>No ratings avaible</h3>}



            {/* --------------------- Adding Rating  --------------------------*/}
            <Card className='mt-4 boader-0 shadow-3'>
              {/* {JSON.stringify(addRating)} */}
              <CardBody>
                <Form onSubmit={submitRating}>
                  <Input type='hidden' value={hotelId} name='hotelId' onChange={(e) => handleForm(e, "hotelId")} />
                  <Input type='hidden' value={userId} name='userId' onChange={(e) => handleForm(e, "userId")} />
                  <Input type='textarea' className='mb-2' value={addRating.feedback} placeholder='Enter feedback here' name='feedback' onChange={(e) => handleForm(e, "feedback")} />
                  <Input type='number' value={addRating.rating} placeholder='Rate here ' name='rating' onChange={(e) => handleForm(e, "rating")} />
                  <Button type='submit' color='success' className='mt-2' outline>
                    Add Rating
                  </Button>
                </Form>
              </CardBody>
            </Card>

          </Col>
        </Row>


      </div>

    </Base>
  )
}

export default ViewHotel;