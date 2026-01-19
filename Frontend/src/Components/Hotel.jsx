import { Badge, Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getHotelImage } from '../services/Hotel-service';
import { useEffect, useState } from 'react';
import "./hotel.css"

const Hotel = ({hotel, userId}) => {

    const themeColor = "#12b0cfff";

    const [imageUrl, setImageUrl] = useState(null);
    
      useEffect(() => {
    
        if (!hotel || !hotel.imageName) {
          return;
        }
    
        const fetchImage = async () => {
    
          getHotelImage(hotel.imageName).then(url => setImageUrl(url))
                                        .catch(err => console.error(err));
          
        };
    
        fetchImage();
    
        return () => {
          if (imageUrl) URL.revokeObjectURL(imageUrl);
        }
      }, [hotel]);
    

    return (
       
<>
                        <Col className='mb-4' lg={4} md={6} sm={12}>
                            <Card className='border-0 shadow-sm h-100 hotel-card' style={{borderRadius:'15px', overflow:'hidden', transition:'transform 0.3s ease'}}>
                                {/* ---------- Image Section --------------- */}
                                <div style={{position:'relative', height:'200px', overflow:'hidden'}}>
                                <img alt={hotel?.name} src={imageUrl} style={{ height: '100%', width:'100%', objectFit:'cover' }} />
                                    <Badge color='light' 
                                            className='position-absolute text-dark'
                                            style={{top:'10px', right:'10px', opacity:'0.9'}} >
                                                ⭐ 4.5
                                    </Badge>
                                    </div>

                                <CardBody className='d-flex flex-column'>
                                    <CardTitle tag="h5" className='fw-bold mb-1' style={{color: '#2c3e50'}}>
                                        {hotel.name}
                                    </CardTitle>

                                    <CardSubtitle className="mb-3 text-muted small" tag="h5">
                                        <i className='bi bi-geo-alt-fill'></i> {hotel.location}
                                    </CardSubtitle>

                                    <CardText className="text-secondary small flex-grow-1" dangerouslySetInnerHTML={{__html: hotel.about.substring(0,40)+"..."}} />
                                    
                                    <div className="mt-3 d-flex justify-content-between align-items-center">

                                    </div>
                                    <Button tag={Link} to={`/viewhotel/${hotel.hotelId}/${userId}`} className='btn-sm border-0 px-3' style={{backgroundColor:themeColor, borderRadius:"8px"}}>
                                        View Details
                                    </Button>
                                </CardBody>
                            </Card>

                        </Col>

                 

</>

    )
}

export default Hotel;