import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import Swal from 'sweetalert2';
import { adminDeleteUser, getUserImage } from '../services/User-service';

const Users = ({ user, isFallback, refreshUser }) => {
  const [imageUrl, setImageUrl] = useState(null);

  const themeColor = "#12b0cfff";

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Remove User?",
      text: "This action can not be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete it!"
    }).then(result => {
      if (result.isConfirmed) {
        adminDeleteUser(userId).then(() => {
          Swal.fire({title:"Deleted!", text:"User data has been removed from all services.", icon:"success", confirmButtonText: "Done",
            confirmButtonColor: "#3085d6"})
          if (refreshUser) refreshUser(userId);
        })
          .catch(err => Swal.fire("Error", "Could not delete user due to server issue...", "error"));
      }
    });
  }

  useEffect(() => {
    let isMounted = true;
    const fetchImage = () => {
      try {
        if (!user.imageName) return;

        getUserImage(user.imageName).then(url => setImageUrl(url))
          .catch(err => console.error("Failed to load user image: ", err));

      } catch (error) {
        console.error("Failed from users!!");
      }
    };

    fetchImage();

    return () => {
            isMounted = false;
            // Properly revoke only this specific component's URL
            if (imageUrl && imageUrl.startsWith('blob:')) {
                URL.revokeObjectURL(imageUrl);
            }
        };
  }, [user.imageName])
  return (
    <Col lg={6} xl={4} className="mb-4">
      <Card className="border-0 shadow-sm h-100 user-card" style={{ borderRadius: '15px' }}>
        <CardBody>
          <Row className="align-items-center">
            {/* Avatar Section */}
            <Col xs={3} className="text-center">
              <div style={{
                width: '65px',
                height: '65px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: `2px solid ${themeColor}`,
                padding: '2px'
              }}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="user"
                    className="rounded-circle"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="bg-light d-flex align-items-center justify-content-center h-100">
                    <i className="bi bi-person text-muted" style={{ fontSize: '1.5rem' }}></i>
                  </div>
                )}
              </div>
            </Col>

            {/* User Info Section */}
            <Col xs={9}>
              <h6 className="fw-bold mb-0" style={{ fontSize: '1.1rem' }}>{user.name}</h6>
              <p className="text-muted small mb-1">
                <i className="bi bi-envelope-at me-1"></i> {user.email}
              </p>
              <p className="text-muted small mb-0">
                <i className="bi bi-telephone me-1"></i> {user.contactNo}
              </p>
            </Col>
          </Row>

          <hr className="my-3 text-light" />

          <div className="d-flex justify-content-between align-items-center">
            <div className="small text-truncate me-2" style={{ maxWidth: '180px' }}>
              <i className="bi bi-geo-alt me-1"></i> {user.address}
            </div>
            
            
              
            <div className="d-flex">
              <Button
                tag={Link}
                to={`/profile-edit/${user.userId}`}
                disabled={isFallback}
                color="light"
                size="sm"
                className="me-2 shadow-sm border"
                style={{ borderRadius: '8px' }}
              >
                <i className="bi bi-pencil" title='Edit'></i>
              </Button>

              <Button
                color="danger"
                outline
                size="sm"
                className="shadow-sm"
                style={{ borderRadius: '8px' }}
                onClick={() => { handleDelete(user.userId) }}
              >
                <i className="bi bi-trash3" title='Remove User'></i>
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Users;