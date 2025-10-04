import React, { useState } from 'react'
import { register } from '../services/User-service';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import Base from './Base';
import { data, } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        contactNo: '',
        address: ''
    });

    const [error, setError] = useState({
        error: {},
        isError: false
    });
    const resetForm = () => {
        setUser({
            name: '',
            email: '',
            password: '',
            contactNo: '',
            address: ''
        });
    };
    const handleForm = (e, fieldName) => {
        setUser({ ...user, [fieldName]: e.target.value });
    };

    const submitRegister = (event) => {
        event.preventDefault();

        register(user).then(data => {
            console.log(data);
            toast.success("User Register Successfully !");
            resetForm();
        }).catch(err => {
            setError({ error: err, isError: true })
            console.log(error);
            toast.error("Something went wrong !!");
        });
    };


    return (

        <Base>

            <div className="container mt-5 shadow-3" style={{ marginBottom: "5%", fontFamily: "serif" }}>
                <Row className="mt-4">

                    <Col sm={{ size: 8, offset: 2 }}>

                        <Card color="#fff" style={{ border: "1px solid #0dcaf0" }}>

                            <CardHeader className="border-1 text-white" color='dark' style={{ backgroundColor: "#0dcaf0" }}>
                                <h3>Sign up here !!</h3>
                            </CardHeader>

                            {/* {JSON.stringify(user)} */}
                            <CardBody>
                                <Form onSubmit={submitRegister}>

                                    <FormGroup row>
                                        <Label for="exampleName" sm={3}>Name*</Label>
                                        <Col sm={9}>
                                            <Input type="text" name="name" value={user.name} placeholder="Ex: albert john" onChange={(e) => { handleForm(e, "name") }}
                                                invalid={error?.error?.response?.data?.name ? true : false} />
                                            <FormFeedback>
                                                {error.error?.response?.data?.name}
                                            </FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={3}>Email*</Label>
                                        <Col sm={9}>
                                            <Input type="email" name="email" value={user.email} placeholder="Ex: example@gmail.com" onChange={(e) => { handleForm(e, "email") }}
                                                invalid={error?.error?.response?.data?.email ? true : false} />

                                            <FormFeedback>
                                                {error.error?.response?.data?.email}
                                            </FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="examplePassword" sm={3}>Password*</Label>
                                        <Col sm={9}>
                                            <Input type="password" name="password" value={user.password} placeholder="Ex: A&kl15o" onChange={(e) => { handleForm(e, "password") }}
                                                invalid={error?.error?.response?.data?.password ? true : false} />

                                            <FormFeedback>
                                                {error.error?.response?.data?.password}
                                            </FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="examplecontactNo" sm={3}>Contact No.*</Label>
                                        <Col sm={9}>
                                            <Input type="tel" name="contactNo" value={user.contactNo} placeholder="Ex: 1156389" onChange={(e) => { handleForm(e, "contactNo") }}
                                                invalid={error?.error?.response?.data?.contactNo ? true : false} />

                                            <FormFeedback>
                                                {error.error?.response?.data?.contactNo}
                                            </FormFeedback>
                                        </Col>
                                    </FormGroup><FormGroup row>
                                        <Label for="exampleAddress" sm={3}>Address*</Label>
                                        <Col sm={9}>
                                            <Input type="text" name="address" value={user.address} placeholder="Ex: 101, las vigas" onChange={(e) => { handleForm(e, "address") }}
                                                invalid={error?.error?.response?.data?.address ? true : false} />

                                            <FormFeedback>
                                                {error.error?.response?.data?.address}
                                            </FormFeedback>
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

export default Signup;