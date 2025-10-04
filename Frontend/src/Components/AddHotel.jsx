import React, { useState } from 'react'
import Base from './Base'
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap'
import { data, Form, useNavigate } from 'react-router-dom'
import { createHotel, uploadImage } from '../services/Hotel-service'
import { toast } from 'react-toastify'

const AddHotel = () => {

    const navigate = useNavigate();

    const [addHotel, setAddHotel] = useState({
        name: '',
        about: '',
        location: ''
    });

    const handleForm = (e, fieldName) => {
        setAddHotel({ ...addHotel, [fieldName]: e.target.value })
    }

    const [image, setImage] = useState({ imageName: '' });

    const handleFile = (e) => {
        // console.log(e.target.files);

        setImage(e.target.files[0]);
    }


    //---------------- submit form ----------------

    const submitHotel = (event) => {
        event.preventDefault();

        // calling server from api
        createHotel(addHotel).then(data => {
            //console.log(data);

            toast.success("Hotel added successfully !!")

            //add image in server by api
            uploadImage(image, data.hotelId).then(dataIma => {
                // console.log(dataIma);
                
                // console.log("Image saved !");
                // toast.success("Image uploaded successfully !!")

                navigate("/user/adminhome");
                toast.success("Hotel added successfully!");
            }).catch(error =>{
                //console.log(error);
                toast.error("Somthing went wrong! try again!!");
            });
        }).catch(err => {
           // console.log(err);
            toast.error("*** Hotel not added! try again!! ***");
        });
    }

    return (
        <Base>

            <div className="container mt-5 shadow-3" style={{ marginBottom: "5%", fontFamily: "serif" }}>
                <Row className="mt-4">

                    <Col sm={{ size: 8, offset: 2 }}>

                        <Card color="#fff" style={{ border: "1px solid #0dcaf0" }}>

                            <CardHeader className="border-1 text-white" color='dark' style={{ backgroundColor: "#0dcaf0" }}>
                                <h3>Create Hotel here !!</h3>
                            </CardHeader>

                            {/* {JSON.stringify(addHotel)} */}
                            <CardBody>
                                <Form onSubmit={submitHotel}>

                                    <FormGroup row>
                                        <Label for="exampleName" sm={3}>Name*</Label>
                                        <Col sm={9}>
                                            <Input type="text" name="name" value={addHotel.name} placeholder="Enter hotel name" onChange={(e) => { handleForm(e, "name") }}
                                            />

                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="exampleAddress" sm={3}>Location*</Label>
                                        <Col sm={9}>
                                            <Input type="text" name="location" value={addHotel.location} placeholder="Ex: 101, las vigas" onChange={(e) => { handleForm(e, "location") }}
                                            />


                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="examplecontactNo" sm={3}>About*</Label>
                                        <Col sm={9}>
                                            <Input type="textarea" name="about" style={{ height: "150px" }} value={addHotel.about} placeholder="Enter facility " onChange={(e) => { handleForm(e, "about") }}
                                            />


                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="file" sm={3}>File*</Label>
                                        <Col sm={9}>
                                            <Input type="file" name="file" id='file' onChange={handleFile}
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

        </Base>

    )
}

export default AddHotel;