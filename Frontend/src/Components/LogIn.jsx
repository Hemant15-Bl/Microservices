import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Base from './Base';
import { toast } from 'react-toastify';
import { userLogIn } from '../services/User-service';
import { doLoggedIn } from '../auth/Index';
import UserContext from '../Context/UserContext';

const LogIn = () => {

    //----- initial set of user context
    const userContextData = useContext(UserContext);

    //------setting initial state----------
    const [user, setUser] = useState({
        username:"",
        password:""
    });

     const [error, setError] = useState({error:{}, isError:false});
     const navigate = useNavigate();

    //-------binding field name dynamically
    const handleForm = (e, fieldName) =>{
            setUser({...user, [fieldName]:e.target.value});
    }

    //-------handle form from api-----
    const formSubmit = (event)=>{
        event.preventDefault();

        if (user.username==="" || user.password==="") {
            return;
        }

        userLogIn(user).then(data =>{
            console.log(data);

            doLoggedIn(data, ()=>{
            console.log("data store in localStorage");
                userContextData.setUser({
                    data: data,
                    login: true
                });
    
            });
  
              data.userDto.roles.map(role => {
                //console.log(role.id);
                
                if (role.id===501) {
                     navigate("/user/dashboard");
                }else{
                     navigate("/user/adminhome");
                }
              })  
         
           
            toast.success("LogIn successfully !");
        }).catch(err =>{
            setError({error:err, isError:true});
            console.log(error);
            
            toast.error("Invalid Username or Password !!");
        })
    }
    return (
        <Base>

           <div className="container shadow-3" style={{marginTop:"5%", marginBottom:"7%", fontFamily:"serif"}}>
                <Row className="mt-4">

                    <Col sm={{ size: 8, offset: 2 }}>

                        <Card color="#fff" style={{border:"1px solid #0dcaf0"}}>

                            <CardHeader className="border-1 text-white" style={{backgroundColor:"#0dcaf0"}}>
                                <h3>Login here !!</h3>
                            </CardHeader>

                    {/* {JSON.stringify(user)} */}
                    <CardBody>
                        <Form onSubmit={formSubmit}>

                            <FormGroup row>
                                <Label for="exampleEmail" sm={3}>Username*</Label>
                                <Col sm={9}>
                                    <Input type="email" name="username" value={user.username} placeholder="Ex: example@gmail.com" onChange={(e)=> {handleForm(e, "username")}} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="examplePassword" sm={3}>Password*</Label>
                                <Col sm={9}>
                                    <Input type="password" name="password" value={user.password} placeholder="Ex: A&kl15o" onChange={(e)=> {handleForm(e, "password")}} />


                                </Col>
                            </FormGroup>

                            {/* <Container> */}
                                <Button type='submit' className='px-5 mb-2 text-white' color='info '>LogIn</Button> or 
                                <Button tag={Link} to={'/signup'} className='mx-2 px-5 mb-2 text-white' color='info'>Sign Up</Button>

                            {/* </Container> */}
                        </Form>
                    </CardBody>

                </Card>
                </Col>
                </Row>
            </div>

        </Base>
    )
}

export default LogIn;