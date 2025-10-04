import React, { useEffect, useState } from 'react'
import Base from './Base';
import { Button, Container, Table } from 'reactstrap';
import { getAllHotels } from '../services/Hotel-service';
import { getCurrentUserDetails, getToken } from '../auth/Index';
import { loadAllUsers } from '../services/User-service';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminHome = () => {

  //---------- Load hotels from backend -----------------
  const [hotels, setHotels] = useState([]);
  const [user, setUser] = useState(undefined);

  useEffect(()=>{
    setUser(getCurrentUserDetails());
  },[])

  useEffect(() => {
    getAllHotels().then(data => {
      //console.log(data);

      setHotels(data);
      toast.success("Hotels loaded successfully!");

    }).catch(err => {
      console.log(err);
      toast.error("Can't load hotels try again!!")
    })
  }, []);

  //---------- Load images from backend api ---------------------

  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {

    const token = getToken();

    if (!hotels || hotels.length == 0) {
      return;
    }

    const fetchImage = async () => {

      const newImages = {};

      //--------- get each image from each hotel ------------------------
      for (const hotel of hotels) {

        try {

          const response = await fetch("http://localhost:8084/hotel/image/" + hotel.imageName, {
            headers: {
              Authorization: `Bearer ${token}`,

            },
          });

          if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            newImages[hotel.hotelId] = url;
          } else {
            console.log("Failed to fetch image!!");

          }

        } catch (error) {
          console.error("Error loading image for hotel: ", hotel.hotelId, error);
        }

      }

      setImageUrls(newImages);
    };


    if (hotels.length > 0) {
      fetchImage();
    }

    //------ clean images --------------------
    return () => {
      Object.values(imageUrls).forEach(url => URL.revokeObjectURL(url));
    }
  }, [hotels]);

  //-------- load all users -------------------
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadAllUsers().then(resp => {
      setUsers(resp);
      console.log(resp);

      toast.success("Users loaded successfully!");
    }).catch(err => {
      // console.log(err);
      toast.error("Can't load users try again!!")

    })
  }, []);

  //---------- load each image of user from backend server -----------------
  const [imageUsers, setImageUsers] = useState({});

  useEffect(() => {
    const token = getToken();

    if (users == 0 || !users) {
      return;
    }

    const fetchImage = async () => {
      const newImages = {};

      for (const user of users) {

        try {
          const response = await fetch("http://localhost:8084/api/v1/user/image/" + user.imageName, { headers: { Authorization: `Bearer ${token}`, } });

          if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            newImages[user.userId] = url;
          } else {
            //  console.log("Failed to fetch user image!!");

          }
        } catch (error) {
          // console.error("Error while fetching users image ", user.userId, error);
        }
      }

      setImageUsers(newImages);
    };

    if (users.length > 0) {
      fetchImage();
    }

    //------ clean images --------------------
    return () => {
      Object.values(imageUsers).forEach(url => URL.revokeObjectURL(url));
    }
  }, [users]);


  useEffect(() => {
    document.title = "HRS || Dashboard";
  }, []);

  return (
    <Base>
      <div style={{ marginTop: "4%", marginBottom: '7%' }}>

        <h2>Welcome to the Admin Panel, </h2>

        {/* -------------------------- Hotels html -------------------------- */}

        <Container style={{ padding: '2% 10% 4% 10%' }}>

          <Button color='info' className='p-2 px-5 mb-2 float-start' tag={Link} to={"/user/create/hotel"}>Add Hotel</Button>

          <Table className='table table-striped' style={{ border: "1px solid #0dcaf0" }}>
            <thead >
              <tr >
                <th style={{ backgroundColor: "#0dcaf0" }}> Hotels Details ({hotels.length})</th>
              </tr>
              <tr >
                <th>Name</th>
                <th>About</th>
                <th>Image</th>
                <th>Location</th>
                <th>Updation</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map(hotel => {
                return (
                  <tr key={hotel.hotelId}>
                    <th>{hotel.name}</th>
                    <th dangerouslySetInnerHTML={{ __html: hotel.about.substring(0, 40) + "..." }}></th>
                    <th>{imageUrls[hotel.hotelId] ? (
                      <img src={imageUrls[hotel.hotelId]} alt="hotel" style={{ width: '50px', height: '50px' }} />
                    ) : (
                      "Loading..."
                    )} </th>
                    <th>{hotel.location}</th>
                    <td> <Button color='primary' tag={Link} to={`/user/edit/${hotel.hotelId}`}>Edit</Button> </td>
                    <td> <Button color='secondary' tag={Link} to={`/user/viewhotel/${hotel.hotelId}/${user?.userId}`}>ReadMore</Button> </td>

                  </tr>
                )
              })}


            </tbody>
          </Table>
        </Container>

        {/* -------------------------- Users html -------------------------- */}
        <Container style={{ padding: '2% 10% 4% 10%' }}>
          <Button color='info' className='p-2 px-5 mb-2 float-start' tag={Link} to={"/signup"}>Add User</Button>

          <Table className='table table-striped' style={{ border: "1px solid #0dcaf0" }}>
            <thead >
              <tr >
                <th style={{ backgroundColor: "#0dcaf0" }}>Users Details ({users.length})</th>
              </tr>
              <tr >
                <th>Name</th>
                <th>Email</th>
                <th>Image</th>
                <th>Contact No.</th>
                <th>Address</th>
                <th>Updation</th>


              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                return (
                  <tr key={user.userId}>
                    <th>{user.name}</th>
                    <th> {user.email} </th>
                    <th>{imageUsers[user.userId] ? (
                      <img src={imageUsers[user.userId]} alt="user" style={{ width: '50px', height: '50px' }} />
                    ) : (
                      "Loading..."
                    )} </th>
                    <th>{user.contactNo}</th>
                    <th>{user.address}</th>
                    <td> <Button color='primary' tag={Link} to={`/user/profile-edit/${user.userId}`}>Edit</Button> </td>

                  </tr>
                )
              })}


            </tbody>
          </Table>
        </Container>
      </div>
    </Base>
  )
}

export default AdminHome;