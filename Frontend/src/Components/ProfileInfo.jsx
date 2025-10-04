import React, { useEffect, useState } from 'react'
import Base from './Base';
import { getCurrentUserDetails, getToken } from '../auth/Index';
import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

const ProfileInfo = () => {

  const [user, setUser] = useState(null)
  
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("data"));
    console.log(data);
    
    setUser(data);
  },[])

  useEffect(()=>{
if(!user || !user.userDto.imageName) return;


    const fetchImage =  async () =>{

      const token = getToken();

      const response = await fetch("http://localhost:8084/api/v1/user/image/"+user.userDto.imageName, {
        headers:{
          Authorization : `Bearer ${token}`,

        },
      });

      if(response.ok){
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      }else{
        console.log("Failed to fetch image!!");
        
      }
    };

    fetchImage();

    return () =>{
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    }
  },[user]);

  return (
    <Base>

      <div className='mt-4 container'>
        <h2>Profile-Info</h2>

        <Row>

          {user && (

            <Col className='mb-3 boader-2 shadow-4' md={{ size: 12 }}>
              <Card className='bg-body-secondary py-4'>
                <CardImg
                  alt="Unavailable"
                  src={imageUrl}
                  top
                  className='mx-auto d-block'
                  height={'auto'} style={{ maxWidth:"30%" }} />
                <CardBody>

                  <CardText> Name : {user.userDto.name} </CardText>
                  <CardText> Email : {user.userDto.email} </CardText>
                  <CardText> Contact No. : {user.userDto.contactNo} </CardText>
                  <CardText> Address : {user.userDto.address} </CardText>

<Container>
  {/* <Button color='warning' outline tag={Link} to={"/user/profile-edit/"+user.userDto.userId}>update</Button> */}
  <Button color='danger' outline tag={Link} className='mx-2'>Delete</Button>
  
</Container>

                </CardBody>
              </Card>

            </Col>

          )}

        </Row>
      </div>

    </Base>
  )
};

export default ProfileInfo;