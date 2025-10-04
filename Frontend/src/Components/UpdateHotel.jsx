import React, { useEffect, useState } from 'react'
import { data, Form, useNavigate, useParams } from 'react-router-dom'
import { editHotelDetails, getHotelById, uploadImage } from '../services/Hotel-service';
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';
import Base from './Base';
import { toast } from 'react-toastify';

const UpdateHotel = () => {

    let {hotelId} = useParams("hoteId");

    const [hotel, setHotel] = useState(null);
    const [image, setImage] = useState({imageName:''});

    const navigate = useNavigate();
    
    const handleForm = (e, fieldName) =>{
        setHotel({...hotel, [fieldName]:e.target.value});
    };

    useEffect(()=>{

      getHotelById(hotelId).then(data =>{
        console.log(data);
        
        setHotel(data);
      }).catch(err =>{
        console.log(err);
        
      })
    },[hotelId]);

    const editHotel = (event) =>{
        event.preventDefault();

        editHotelDetails(hotel, hotelId).then(data =>{
           // console.log(data);
            
            console.log("Data updated !!");
            uploadImage(image, hotelId).then(dataImg =>{
                // console.log(dataImg);
                //             console.log("Data updated !!");
           navigate("/user/dashboard")

            }).catch(err =>{
                //console.log(err);
                
            })
        }).catch(err =>{
            //console.log(err);
            
        })
    }

    const updateHtml = () =>{

      
                 return(

                   <div className="wrapper" style={{ marginBottom: "5%", fontFamily: "serif" }}>
                      <Row className="mt-4">
      
                          <Col sm={{ size: 8, offset: 2 }}>
      
                              <Card color="#fff" style={{ border: "1px solid #0dcaf0" }}>
      
                                  <CardHeader className="border-1 text-white" color='dark' style={{ backgroundColor: "#0dcaf0" }}>
                                      <h3>Update Hotel here !!</h3>
                                  </CardHeader>
      
                                  {/* {JSON.stringify(addHotel)} */}
                                  <CardBody>
                                      <Form onSubmit={editHotel}>
      
                                          <FormGroup row>
                                              <Label for="exampleName" sm={3}>Name*</Label>
                                              <Col sm={9}>
                                                  <Input type="text" name="name" value={hotel.name} placeholder="Enter hotel name" onChange={(e) => { handleForm(e, "name") }}
                                                  />
      
                                              </Col>
                                          </FormGroup>
      
                                          <FormGroup row>
                                              <Label for="exampleAddress" sm={3}>Location*</Label>
                                              <Col sm={9}>
                                                  <Input type="text" name="location" value={hotel.location} placeholder="Ex: 101, las vigas" onChange={(e) => { handleForm(e, "location") }}
                                                  />
      
      
                                              </Col>
                                          </FormGroup>
      
                                          <FormGroup row>
                                              <Label for="examplecontactNo" sm={3}>About*</Label>
                                              <Col sm={9}>
                                                  <Input type="textarea" name="about" style={{ height: "150px" }} value={hotel.about} placeholder="Enter facility " onChange={(e) => { handleForm(e, "about") }}
                                                  />
      
      
                                              </Col>
                                          </FormGroup>
      
                                          <FormGroup row>
                                              <Label for="file" sm={3}>File*</Label>
                                              <Col sm={9}>
                                                  <Input type="file" name="file" id='file' onChange={(e) =>{setImage(e.target.files[0])}}
                                                  />
      
                                              </Col>
                                          </FormGroup>
      
                                          <Container>
                                              <Button type='submit' className='px-5 mb-2 text-white' color='info'>Submit</Button>
                                              <Button type='reset' className='mx-2 px-5 mb-2' color='danger'>Reset</Button>
      
                                          </Container>
                                      </Form>
                                  </CardBody>
      
                              </Card>
                          </Col>
                      </Row>
                  </div>
      
                 )
      
    }
  return (
   <Base>
    <Container className='container mt-5 shadow-3'>
      {hotel && updateHtml()}
       </Container>
   </Base>

  )
}

export default UpdateHotel