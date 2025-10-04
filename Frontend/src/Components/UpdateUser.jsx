import React, { useContext, useEffect, useState } from 'react'
import Base from './Base'
import { Form, useNavigate, useParams } from 'react-router-dom';
import { editUserDetails, loadUserById, uploadPost } from '../services/User-service';
import { Button, Card, CardBody, CardHeader, Col, Container, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import UserContext from '../Context/UserContext';
import { doLoggedIn } from '../auth/Index';

const UpdateUser = () => {

    const { id } = useParams("id");

    let navigate = useNavigate();

    const [user, setUser] = useState(
        undefined
    );

    const  userContextData = useContext(UserContext);

    const [image, setImage] = useState({ imageName: '' });

    const [error, setError] = useState({
        error: {},
        isError: false
    })

    //------- Load user by Id--------------------------
    useEffect(() => {
        loadUserById(id).then(data => {
            setUser(data);
            console.log(data);

        }).catch(err => {
            console.log(err);

        })
    }, [id]);

    //--------- Handling input field -----------------------
    const handleForm = (e, fieldName) => {
        setUser({ ...user, [fieldName]: e.target.value });
    }

    const handleFile = (e) => { setImage(e.target.files[0]) }


    //---------- updating form from backend api --------------
    const editForm = (event) => {
        event.preventDefault();

        editUserDetails(id, user).then(resp => {
            console.log("data updated Successfully!!");
            console.log(resp);
            // setUser(data);

            // if (image.imageName) {


            //----- set Image --------
            uploadPost(image, id).then(data => {
                console.log(data);
                console.log("Image Updated Successfully");

                
                // localStorage.setItem("data", JSON.stringify(data));
                

                 navigate("/user/adminhome");
                // setUserData(updatedUser);
            }).catch(err => {
                setError({ error: err, isError: true });
            })

           


            // } else {
            //    doLoggedIn(resp, () => {
            //         console.log("data updated not image in local storage Successfully!!");
            //         userContextData.setUser({
            //             data:resp,
            //             login:true
            //         })
            //     })
                
            // }

        }).catch(err => {
            setError({ error: err, isError: true });
        });

        // navigate("/user/profile-info");
    }

    // ------------html for updating interface -------------------
    const updateHtml = () => {

        return (<div className="container wrapper mt-5 shadow-3" style={{ marginBottom: "5%", fontFamily: "serif" }}>
            <Row className="mt-4">

                <Col sm={{ size: 8, offset: 2 }}>

                    <Card color="#fff" style={{ border: "1px solid #0dcaf0" }}>

                        <CardHeader className="border-1 text-white" color='dark' style={{ backgroundColor: "#0dcaf0" }}>
                            <h3>Update your details here !!</h3>
                        </CardHeader>

                        {/* {JSON.stringify(user)} */}
                        <CardBody>
                            <Form onSubmit={editForm}>

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
                                {/* <FormGroup row>
                                    <Label for="examplePassword" sm={3}>Password*</Label>
                                    <Col sm={9}>
                                        <Input type="password" name="password" value={user.password} placeholder="Ex: A&kl15o" onChange={(e) => { handleForm(e, "password") }}
                                            invalid={error?.error?.response?.data?.password ? true : false} />

                                        <FormFeedback>
                                            {error.error?.response?.data?.password}
                                        </FormFeedback>
                                    </Col>
                                </FormGroup> */}
                                <FormGroup row>
                                    <Label for="examplecontactNo" sm={3}>Contact No.*</Label>
                                    <Col sm={9}>
                                        <Input type="tel" name="contactNo" value={user.contactNo} placeholder="Ex: 1156389" onChange={(e) => { handleForm(e, "contactNo") }}
                                            invalid={error?.error?.response?.data?.contactNo ? true : false} />

                                        <FormFeedback>
                                            {error.error?.response?.data?.contactNo}
                                        </FormFeedback>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="file" sm={3}>File*</Label>
                                    <Col sm={9}>
                                        <Input type="file" name="file" id='file' onChange={handleFile}
                                        />

                                    </Col>
                                </FormGroup>
                                <FormGroup row>
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
        </div>)


    }
    return (

        <Base>
            {user && updateHtml()}
        </Base>
    )
}

export default UpdateUser;