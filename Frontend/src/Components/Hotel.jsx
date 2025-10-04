import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getImage } from '../services/Hotel-service';

const Hotel = ({hotel, userId}) => {


    return (
       
<>

                    
                        <Col className='mb-3 boader-2 shadow-4 ' md={6}>
                            <Card className='bg-body-secondary '>
                                {/* <CardImg
                                    alt="Unavailable"
                                    src={}
                                    top
                                    width="60%"
                                    height={'auto'} style={{ maxHeight: '200' }} /> */}
                                <CardBody>
                                    <CardTitle tag="h1">
                                        {hotel.name}
                                    </CardTitle>
                                    <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h5"
                                    >
                                        {hotel.location}
                                    </CardSubtitle>
                                    <CardText dangerouslySetInnerHTML={{__html: hotel.about.substring(0,40)+"..."}} />
                                    <Button tag={Link} to={`/user/viewhotel/${hotel.hotelId}/${userId}`}>
                                        Read More
                                    </Button>
                                </CardBody>
                            </Card>

                        </Col>

                 

</>

    )
}

export default Hotel;