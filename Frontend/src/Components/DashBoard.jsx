import React, { useEffect, useState } from 'react'
import Hotel from './Hotel';
import Base from './Base';
import { getAllHotels } from '../services/Hotel-service';
import { Row } from 'reactstrap';
import { getCurrentUserDetails } from '../auth/Index';

const DashBoard = () => {

  const [hotels, setHotels] = useState([]);

  const userDetail = getCurrentUserDetails();
  useEffect(() => {
    getAllHotels().then(data => {
      //console.log(data);
      
      setHotels(data);
    }).catch(err => {
      //console.log(err);

    })
  }, [])
  return (
    <Base>

      <div className='text-center p-0 container mt-4' style={{ fontFamily: "serif" }}>
        <h1>List Of Hotels</h1>
        <Row>

          {hotels && hotels.map(hotel =>

                    {return (<Hotel hotel={hotel} userId={userDetail.userId} key={hotel.hotelId} />   )}
                    )}

        </Row>
      </div>
    </Base>
  )
}

export default DashBoard;