import React, { useState } from 'react'
import { registerByAdmin } from '../services/User-service';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import Base from './Base';
import { data, } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faMapMarkerAlt, faPhone, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        contactNo: '',
        address: '',
        roles: [{name:'ROLE_NORMAL'}]
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
            address: '',
            roles:[{name:'ROLE_NORMAL'}]
        });
    };
    const handleForm = (e, fieldName) => {
        if (fieldName === 'roles') {
            setUser({...user, roles:[{name: e.target.value}]});
        }else{
        setUser({ ...user, [fieldName]: e.target.value });
        }
    };

    const submitRegister = (event) => {
        event.preventDefault();

        registerByAdmin(user).then(data => {
            // console.log(data);
            toast.success("User Register Successfully !");
            resetForm();
        }).catch(err => {
            setError({ error: err, isError: true })
            console.error(error);
            toast.error("Something went wrong !!");
        });
    };


    return (

        <Base>

            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        {/* Custom breadcrumb for Admin context */}
                        <div className="mb-4">
                            <h2 className="fw-bold text-dark">
                                <FontAwesomeIcon icon={faUserPlus} className="me-2 text-info" />
                                Create New Account
                            </h2>
                            <p className="text-muted">Register a new user to the system manually.</p>
                        </div>

                        <Card className="border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <CardBody className="p-4 p-md-5">
                                <Form onSubmit={submitRegister}>
                                    <Row>
                                        {/* Full Name */}
                                        <Col md={6}>
                                            <FormGroup className="mb-4">
                                                <Label className="small fw-bold text-uppercase text-muted">
                                                    <FontAwesomeIcon icon={faUser} className="me-2" />Full Name
                                                </Label>
                                                <Input
                                                    type="text"
                                                    className="form-control-lg border-2 shadow-sm"
                                                    placeholder="e.g. John Doe"
                                                    value={user.name}
                                                    onChange={(e) => handleForm(e, "name")}
                                                    invalid={!!error?.error?.response?.data?.name}
                                                />
                                                <FormFeedback>{error.error?.response?.data?.name}</FormFeedback>
                                            </FormGroup>
                                        </Col>

                                        {/* Email Address */}
                                        <Col md={6}>
                                            <FormGroup className="mb-4">
                                                <Label className="small fw-bold text-uppercase text-muted">
                                                    <FontAwesomeIcon icon={faEnvelope} className="me-2" />Email Address
                                                </Label>
                                                <Input
                                                    type="email"
                                                    className="form-control-lg border-2 shadow-sm"
                                                    placeholder="john@example.com"
                                                    value={user.email}
                                                    onChange={(e) => handleForm(e, "email")}
                                                    invalid={!!error?.error?.response?.data?.email}
                                                />
                                                <FormFeedback>{error.error?.response?.data?.email}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        {/* Password */}
                                        <Col md={6}>
                                            <FormGroup className="mb-4">
                                                <Label className="small fw-bold text-uppercase text-muted">
                                                    <FontAwesomeIcon icon={faLock} className="me-2" />Secure Password
                                                </Label>
                                                <Input
                                                    type="password"
                                                    className="form-control-lg border-2 shadow-sm"
                                                    placeholder="••••••••"
                                                    value={user.password}
                                                    onChange={(e) => handleForm(e, "password")}
                                                    invalid={!!error?.error?.response?.data?.password}
                                                />
                                                <FormFeedback>{error.error?.response?.data?.password}</FormFeedback>
                                            </FormGroup>
                                        </Col>

                                        {/* Contact Number */}
                                        <Col md={6}>
                                            <FormGroup className="mb-4">
                                                <Label className="small fw-bold text-uppercase text-muted">
                                                    <FontAwesomeIcon icon={faPhone} className="me-2" />Contact Number
                                                </Label>
                                                <Input
                                                    type="tel"
                                                    className="form-control-lg border-2 shadow-sm"
                                                    placeholder="+1 234 567 890"
                                                    value={user.contactNo}
                                                    onChange={(e) => handleForm(e, "contactNo")}
                                                    invalid={!!error?.error?.response?.data?.contactNo}
                                                />
                                                <FormFeedback>{error.error?.response?.data?.contactNo}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    {/* Physical Address */}
                                    <FormGroup className="mb-5">
                                        <Label className="small fw-bold text-uppercase text-muted">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />Physical Address
                                        </Label>
                                        <Input
                                            type="textarea"
                                            rows="3"
                                            className="form-control-lg border-2 shadow-sm"
                                            placeholder="Enter street, city, and zip code"
                                            value={user.address}
                                            onChange={(e) => handleForm(e, "address")}
                                            invalid={!!error?.error?.response?.data?.address}
                                        />
                                        <FormFeedback>{error.error?.response?.data?.address}</FormFeedback>
                                    </FormGroup>

                                    {/* Role */}
                                    <FormGroup className="mb-4">
                                        <Label className="small fw-bold text-uppercase text-muted">Assign System Role</Label>
                                        <Input
                                            type="select"
                                            className="form-control-lg border-2"
                                            value={user.roles[0].name}
                                            onChange={(e) => handleForm(e, "roles")}
                                        >
                                            <option value="ROLE_NORMAL">Normal User (View & Rate)</option>
                                            <option value="ROLE_ADMIN">Administrator (Full Access)</option>
                                        </Input>
                                    </FormGroup>

                                    <div className="d-flex gap-3 justify-content-end border-top pt-4">
                                        <Button
                                            type="button"
                                            onClick={resetForm}
                                            color="light"
                                            className="px-5 py-2 fw-bold text-muted border"
                                        >
                                            Clear Form
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="px-5 py-2 fw-bold shadow-sm"
                                            style={{ backgroundColor: '#12b0cfff', border: 'none' }}
                                        >
                                            Register User
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>

    )
}

export default Signup;