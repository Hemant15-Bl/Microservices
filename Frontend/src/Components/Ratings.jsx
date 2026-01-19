import React from 'react'
import { Button, Card, CardBody, Col } from 'reactstrap'

const Ratings = ({ rating, userName, hotelName }) => {
    return (
        <>

            <Col md={6} key={rating.ratingId} className="mb-3">
                <Card className="border-0 shadow-sm">
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <h6 className="fw-bold">{userName}</h6>
                            <span className="text-warning">{'★'.repeat(Math.round(rating.rating / 2))}</span>
                        </div>
                        <div className="text-muted mb-2" style={{ fontSize: '0.8rem' }}>
                            Reviewed: <span className="text-dark fw-bold">{hotelName}</span>
                        </div>
                        <p className="small text-secondary card-text">
                            <i className="fa fa-quote-left me-2 opacity-50"></i>
                            {rating.feedback}
                        </p>
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}

export default Ratings