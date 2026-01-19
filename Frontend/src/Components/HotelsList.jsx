import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, Col, Row } from 'reactstrap'
import Swal from 'sweetalert2';
import { deleteHotel, getHotelImage } from '../services/Hotel-service';

const HotelsList = ({ hotel, user, isFallback, refreshHotel }) => {

    const themeColor = "#12b0cfff";
    const [imageUrl, setImageUrl] = useState(null);

    const handleDelete = (hotelId) => {
        Swal.fire({
            title: "Remove Hotel?",
            text: "This action can not be undone!",
            confirmButtonColor: themeColor,
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!",
            icon: 'warning',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteHotel(hotelId).then(() => {
                    Swal.fire("Deleted!", "Hotel has been deleted.", "success");
                    if (refreshHotel) {
                        refreshHotel(hotel.hotelId);
                    }
                })
                    .catch(err => Swal.fire("Error!", "Could not delete hotel due to server...", 'error'));
            }
        })
    }

    useEffect(() => {
        const isMounted = true;

        const fetchImage = () => {
            if (!hotel?.imageName) return;
            try {
                getHotelImage(hotel.imageName).then(url => {
                    setImageUrl(url);
                }).catch(err => console.error("Failed to load hotel image: ", err));
            } catch (error) {
                console.error("Failed from hotelList!!");

            }
        };
        fetchImage()

        return () => {
            let isMounted = false;
            // Properly revoke only this specific component's URL
            if (imageUrl && imageUrl.startsWith('blob:')) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [hotel.imageName]);
    return (
        <Card className="border-0 shadow-sm mb-3 hotel-list-card" style={{ borderRadius: '12px' }}>
            <CardBody className="p-3">
                <Row className="align-items-center">
                    {/* 1. Image Thumbnail */}
                    <Col md={1} className="text-center">
                        <div style={{ width: '60px', height: '60px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                            {imageUrl ? (
                                <img src={imageUrl} alt="hotel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div className="d-flex align-items-center justify-content-center h-100 text-muted small">N/A</div>
                            )}
                        </div>
                    </Col>

                    {/* 2. Hotel Info */}
                    <Col md={4}>
                        <h5 className="fw-bold mb-0 text-dark">{hotel.name}</h5>
                        <div className="text-muted small">
                            <i className="bi bi-geo-alt-fill text-danger me-1"></i>{hotel.location}
                        </div>
                    </Col>

                    {/* 3. Description Snippet */}
                    <Col md={3} className="d-none d-lg-block">
                        <p className="text-secondary small mb-0"
                            dangerouslySetInnerHTML={{ __html: hotel.about.substring(0, 60) + "..." }} />
                    </Col>

                    {/* 4. Actions */}
                    <Col md={4} className="text-end">
                        <Button
                            tag={Link}
                            to={`/viewhotel/${hotel.hotelId}/${user?.userId}`}
                            color="light"
                            className="btn-sm me-2 border"
                            style={{ borderRadius: '8px' }}
                        >
                            <i className="bi bi-eye-fill me-1"></i> Preview
                        </Button>

                        <Button
                            tag={Link}
                            to={`/admin/edit-hotel/${hotel.hotelId}`}
                            disabled={isFallback}
                            color="info"
                            className="btn-sm text-white border-0 me-2"
                            style={{ backgroundColor: themeColor, borderRadius: '8px' }}
                        >
                            <i className="bi bi-pencil-square me-1"></i> Edit
                        </Button>

                        <Button
                            color="danger"
                            className="btn-sm border-0"
                            style={{ borderRadius: '8px' }}
                            onClick={() => handleDelete(hotel.hotelId)} // You can add your delete logic here
                        >
                            <i className="bi bi-trash3-fill"></i>
                        </Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default HotelsList