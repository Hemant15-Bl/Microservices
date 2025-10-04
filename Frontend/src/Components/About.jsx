import React, { useEffect } from 'react'
import Base from './Base';
import myImage from '../Image/entrance.jpg';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';

const About = () => {

  useEffect(() => {
      document.title = "HRS || About";
    }, []);
  return (
   
        <Base>
        <div className='container-fluid mt-5'>
            <Card className='bg-body-secondary py-4'>
                
                <CardBody >
                  <div className="row align-items-center">
          {/* Image on the left */}
          <div className="col-md-6 text-center">
            <CardImg
              alt="Unavailable"
              src={myImage}
              className="img-fluid"
              style={{ maxHeight: '500px', maxWidth: '100%' }}
            />
          </div>

          {/* Text on the right */}
          <div className="col-md-6">
            <CardTitle tag="h1">"Welcome To Our Website"</CardTitle>
            <CardText>
             Room service or in-room dining is a hotel service enabling guests to choose items for food and drink for delivery to their hotel room for consumption. Room service is organised as a subdivision within the food and beverage department of high-end hotel and resort properties. It is uncommon for room service to be offered in hotels that are not high- end, or in motels. Room service may also be provided for guests on cruise ships. Room service may be provided on a 24-hour basis or limited to late night hours only. Due to the cost of customized orders and delivery of room service, prices charged to the patron are typically much higher than in the hotels restaurents or tuck shop, and a gratuity is expected.
<br />
Rooms service or in-room dining is a hotel service enabling guests to choose items for food and drink for delivery to their hotel room for consumption. Room service is organised as a subdivision within the food and beverage department of high-end hotel and resort properties. It is uncommon for room service to be offered in hotels.
            </CardText>
          </div>
        </div>


                 
                </CardBody>
              </Card>
        </div>
        </Base>

  )
}

export default About