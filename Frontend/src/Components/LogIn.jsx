import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import Base from './Base';
import LogInButton from './LogInButton';
import { faFacebookF, faGithub, faGooglePlusG, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './login.css';
import { register } from '../services/User-service';
import { toast } from 'react-toastify';

const LogIn = () => {

    useEffect(() => {
          document.title = "HRS | Sign In";
        }, []);

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

    const [isActive, setIsActive] = useState(false);
    return (
        <Base>

            <div className={'auth-page-wrapper'}>
                <div className={`auth-container ${isActive ? "active" : ""}`}>

    {/* -------------------------------Sign up ------------------------------------------------------------- */}
                    <div className="form-container sign-up">
                        <Form onSubmit={submitRegister}>
                            <h1>Create Account Here!!</h1>

                            <div className='social-icons'>
                                <Link to={'#'} className='icon'>  <FontAwesomeIcon icon={faGooglePlusG} />  </Link>
                                <Link to={'#'} className='icon'>  <FontAwesomeIcon icon={faFacebookF} />  </Link>
                                <Link to={'#'} className='icon'>  <FontAwesomeIcon icon={faGithub} />  </Link>
                                <Link to={'#'} className='icon'>  <FontAwesomeIcon icon={faLinkedin} />  </Link>

                            </div>

                            <FormGroup>
                                {/* <Label for="exampleName" sm={3}>Name*</Label> */}
                                <Input type="text" name="name" value={user.name} placeholder="Name" onChange={(e) => { handleForm(e, "name") }}
                                    invalid={error?.error?.response?.data?.name ? true : false} />
                                <FormFeedback>
                                    {error.error?.response?.data?.name}
                                </FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                {/* <Label for="exampleEmail" sm={3}>Email*</Label> */}
                                <Input type="email" name="email" value={user.email} placeholder="Email" onChange={(e) => { handleForm(e, "email") }}
                                    invalid={error?.error?.response?.data?.email ? true : false} />

                                <FormFeedback>
                                    {error.error?.response?.data?.email}
                                </FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                {/* <Label for="examplePassword" sm={3}>Password*</Label> */}
                                <Input type="password" name="password" value={user.password} placeholder="Password" onChange={(e) => { handleForm(e, "password") }}
                                    invalid={error?.error?.response?.data?.password ? true : false} />

                                <FormFeedback>
                                    {error.error?.response?.data?.password}
                                </FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                {/* <Label for="examplecontactNo" sm={3}>Contact No.*</Label> */}
                                <Input type="tel" name="contactNo" value={user.contactNo} placeholder="Mobile Number" onChange={(e) => { handleForm(e, "contactNo") }}
                                    invalid={error?.error?.response?.data?.contactNo ? true : false} />

                                <FormFeedback>
                                    {error.error?.response?.data?.contactNo}
                                </FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                {/* <Label for="exampleAddress" sm={3}>Address*</Label> */}
                                <Input type="text" name="address" value={user.address} placeholder="Address" onChange={(e) => { handleForm(e, "address") }}
                                    invalid={error?.error?.response?.data?.address ? true : false} />

                                <FormFeedback>
                                    {error.error?.response?.data?.address}
                                </FormFeedback>
                            </FormGroup>
                            <Container>
                                <Button type='submit' className='px-5 mb-2 text-white' color='info'>Sign Up</Button>
                                {/* <Button type='reset' className='mx-2 px-5 mb-2' color='danger'>Reset</Button> */}
                            </Container>
                        </Form>
                    </div>
    {/* ---------------------------------------------------------------------------------------------------- */}

    {/* -------------------------- Login ----------------------------------------------------------------- */}

                    <div className="form-container sign-in">
                        <div className="signin-content">
                            <h1>Sign In</h1>

                            <div className='social-icons'>
                                <Link to={'#'} className='icon'>  <FontAwesomeIcon icon={faGooglePlusG} />  </Link>
                                <Link to={'#'} className='icon'>  <FontAwesomeIcon icon={faFacebookF} />  </Link>
                                <Link to={'#'} className='icon'>  <FontAwesomeIcon icon={faGithub} />  </Link>
                                <Link to={'#'} className='icon'>  <FontAwesomeIcon icon={faLinkedin} />  </Link>
                            </div>

                            <h4>Click here the Login button with OAuth2.O flow</h4>

                            <LogInButton />
                        </div>
                    </div>
     {/* ---------------------------------------------------------------------------------------------------- */}

            {/* ------------------ The Toggle Section -----------------------------------------------*/}
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left">
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to give each hotel feedback</p>

                                <Button className='hidden px-5' id='login' onClick={() => setIsActive(false)}>Sign In</Button>
                            </div>

                            <div className="toggle-panel toggle-right">
                                <h1>Hello, Friend!</h1>
                                <p>Register with personal details to use all of site features</p>
                                <Button className='hidden px-5' id='register' onClick={() => setIsActive(true)}>Sign Up</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Base>
    )
}

export default LogIn;