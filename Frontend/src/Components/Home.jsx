import React from 'react'
import Base from './Base'
import { Card, CardImg, CardImgOverlay, CardText, CardTitle } from 'reactstrap';
import myImage from "../Image/Luxury-hotel.jpg";
import Hotel from './Hotel';


const Home = () => {
   const backgroundStyle = {
    position: 'fixed',
    backgroundImage: `url(${myImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // full height
    width: '100%',
    // top: 0,
    left: 0,
    // zIndex: -1
    fontFamily: 'sen-serif'
  };
  return (
    <Base>
      <div className='container-fluid text-white' style={backgroundStyle}>
      
      <br />
       <h1 style={{marginTop:"10%"}}>Welcome To Hotel Rating System</h1> <br />
           
               <h5 >
              Hotel rooms have everything you need for a pleasant stay : Large comfortable beds covered with special <br />
                          bedspreads that get made by themselves, and bathrooms that are clean and shiny. <br />
                          
            Hotel rooms are known for having terraces with view that are perfect for enjoyment views that are perfect for <br />
                                                             enjoyment.</h5>
            
           
        
      </div>
    </Base>
  )
}

export default Home;