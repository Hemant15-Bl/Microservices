import React, { useContext, useEffect, useState } from 'react'
import Base from './Base';
import { Badge, Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Container, Row, Table } from 'reactstrap';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import { deleteUser, getUserImage } from '../services/User-service';
import Swal from 'sweetalert2';

const ProfileInfo = () => {

  const { user, setUser } = useContext(UserContext);

  const [imageUrl, setImageUrl] = useState(null);

  const isAdmin = user.data?.roles?.some(r => r.name === "ROLE_ADMIN");

  useEffect(() => {
    let isMounted = true;
    let currentBlobUrl = null;



    const fetchImage = async () => {
      try {
        if (!user.login || !user.data?.imageName) return;

        const url = await getUserImage(user.data.imageName);
        if (isMounted) {
          // 2. Revoke the OLD URL before setting the new one to save memory
          if (imageUrl) URL.revokeObjectURL(imageUrl);
          setImageUrl(url);
          currentBlobUrl = url;

        }
      } catch (error) {
        console.error("Failed to load Image: ", error);
      }
    };

    fetchImage();

    return () => {
    isMounted = false;
    if (currentBlobUrl) {
      URL.revokeObjectURL(currentBlobUrl);
    }
  };

  }, [user.data?.imageName]);

  const handleDelete = async () => {

    // Step 1: Confirm Intent
    const confirmIntent = await Swal.fire({
      title: "Delete Account!",
      text: "This action can not be undone. All your data will be removed permanently.",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      icon: 'warning'
    });

    if (confirmIntent.isConfirmed) {
      // Step 2: Password Verification Modal
      const { value: password } = await Swal.fire({
        title: 'Confirm Identity',
        input: 'password',
        inputLabel: 'Please enter your password to confirm deletion',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
          autocapitalize: 'off',
          autocorrect: 'off'
        },
        showCancelButton: true,
        confirmButtonColor: "#12b0cfff",
      });

      if (password) {
        try {
          // setLoading(true);

          await deleteUser(user.data?.userId, password);

          // Step 4: Logout and Cleanup
          setUser({ data: null, login: false, loading: true });
          localStorage.clear();
          sessionStorage.clear();

          await Swal.fire({
            title: "Account Deleted!", text: "Your data has been removed from all services. We're sorry to see you go.", icon: "success", confirmButtonText: "Goodbye",
            confirmButtonColor: "#12b0cfff"
          });


          window.location.href = "http://localhost:8084/logout";
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Incorrect password or server error. Action cancelled.", "error");
        }
      }
    }
  };

  return (
    <Base>

      <Container className='py-5'>
        <Row className='justify-content-center mt-4'>
          <Col md={10} lg={8}>
            {user.login && (
              <Card className='shadow-lg border-0 overflow-hidden'>
                {/* --- Top Header / Cover Section --- */}
                <div style={{ height: '150px', background: (!isAdmin) ? 'linear-gradient(90deg, rgb(84, 197, 220) 0%, rgb(7, 145, 172) 100%)' : 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)' }}></div>

                <CardBody className="position-relative pt-0 px-4">

                  {/* --- Profile Image Overlay --- */}
                  <div className="text-center" style={{ marginTop: '-75px' }}>
                    <img
                      src={imageUrl || 'https://via.placeholder.com/150'}
                      alt="Profile"
                      className="rounded-circle border border-5 border-white shadow"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <h3 className="mt-3 fw-bold text-dark">{user.data?.name}</h3>
                    <Badge color="info" pill className="mb-3 px-3 py-2">
                      {user.data?.roles?.some(r => r.name) || 'NORMAL USER'}
                    </Badge>
                  </div>

                  <hr className="my-4 text-muted" />

                  {/* -------------- Information Section -----------------------*/}
                  <div className='px-md-4'>
                    <h5 className="text-uppercase text-muted mb-4 small fw-bold">Personal Information</h5>

                    <Table borderless className='align-middle'>
                      <tbody>
                        <tr>
                          <td className='text-muted' style={{ width: '30%' }}>Email Address</td>
                          <td className='fw-semibold'>{user.data?.email}</td>
                        </tr>
                        <tr>
                          <td className='text-muted'>Contact Number</td>
                          <td className='fw-semibold'>{user.data?.contactNo || "N/A"}</td>
                        </tr>
                        <tr>
                          <td className='text-muted'>Physical Address</td>
                          <td className='fw-semibold'>{user.data?.address || "N/A"}</td>
                        </tr>
                        <tr>
                          <td className='text-muted'>Account Status</td>
                          <td> <span className='text-success'>● Active</span> </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>


                  {/* ------ Action Button -------------------- */}
                  <div className="d-flex justify-content-center mt-5 mb-3">
                    <Button color={(isAdmin) ? 'primary' : 'info'} className='px-4 me-3 shadow-sm' tag={Link} to={`/profile-edit/${user.data?.userId}`}>Update Profile</Button>
                  </div>

                  {/* --- Danger Zone Section --- */}
                  <Card className="mt-5 border-danger shadow-sm" style={{ backgroundColor: '#fff5f5' }}>
                    <CardBody className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="text-danger fw-bold mb-1">Danger Zone</h5>
                        <p className="text-muted mb-0 small">Permanently delete your account and all of your content.</p>
                      </div>
                      <Button color='danger' className='px-4 fw-bold' onClick={handleDelete}>
                        Delete Account
                      </Button>
                    </CardBody>
                  </Card>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </Container>

    </Base>
  )
};

export default ProfileInfo;