import React, { useContext, useEffect, useState } from 'react'
import Base from './Base'
import { Form, useNavigate, useParams } from 'react-router-dom';
import { editUserDetails, getUserImage, loadUserById, uploadPost } from '../services/User-service';
import { Button, Card, CardBody, CardHeader, Col, Container, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import UserContext from '../Context/UserContext';
import { toast } from 'react-toastify';

const UpdateUser = () => {

    const { id } = useParams("id");
    let navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const { user: currentUser, setUser } = useContext(UserContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState(null);

    const [error, setError] = useState({
        error: {},
        isError: false
    })

    const isAdmin = currentUser.data?.roles?.some(r => r.name === "ROLE_ADMIN");

    //--------- Handling input field -----------------------
    const handleChange = (e, fieldName) => {
        setUserData({ ...userData, [fieldName]: e.target.value });
    }



    //------- Load user by Id--------------------------
    useEffect(() => {
        loadUserById(id).then(data => {
            setUserData(data);
            // console.log(data);
            // Fetch the image once we have the imageName
            if (data.imageName) {
                getUserImage(data.imageName)
                    .then(url => setExistingImageUrl(url))
                    .catch(err => console.error("Could not load user image", err));
            }
        }).catch(err => {
            console.error("Error loading user data: ", err);
        });

        // Cleanup Blob URLs to prevent memory leaks
        return () => {
            if (existingImageUrl) URL.revokeObjectURL(existingImageUrl);
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [id]);

    //------------- handle image selection ------------
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file)); // create a local preview
    }

    //---------- updating form from backend api --------------
    const editForm = async (event) => {
        event.preventDefault();

        try {
            let finalUserData = { ...userData };
            // 1. Upload image if selected
            if (selectedFile) {
                const imageNameResp = await uploadPost(selectedFile, userData.userId);
                finalUserData.imageName = (typeof imageNameResp === 'string') ? imageNameResp : imageNameResp.imageName;
            }

            // 2. upload text data
            const updateResp = await editUserDetails(id, finalUserData);

            setUserData(updateResp);
            if (currentUser.data?.userId === id) {
                setUser({
                    ...currentUser,
                    data: updateResp,
                    login: true,
                    loading: false
                });
            }
            toast.success("Profile updated Successfully");
            if (isAdmin) {
                navigate("/admin/dashboard");
            } else {
                navigate("/profile-info");
            }
        } catch (error) {
            toast.error("Update Failed!!");
        }

    }



    if (!userData) return <Base> <div className='text-center mt-5'>Loading...</div></Base>;

    return (

        <Base>
            {/* {user && updateHtml()} */}

            <Container className='py-5 mt-5'>
                <Row className='justify-content-center'>
                    <Col lg={10}>
                        <Card className="shadow-lg border-0">
                            <CardHeader className='text-white p-4' style={{ backgroundColor: (!isAdmin) ? "#0dcaf0" : "#0d6efd" }}>
                                <h4 className='mb-0'>Edit Account Setting</h4>
                                <small>Update your personal information and profile picture</small>
                            </CardHeader>

                            <CardBody className="p-4 p-md-5">
                                <Form onSubmit={editForm}>
                                    <Row>
                                        {/* --------------- Left side: photo upload ------------------------------*/}
                                        <Col md={4} className="text-center border-end mb-4 mb-md-0">
                                            <div className='mb-3'>
                                                <img
                                                    src={previewUrl || existingImageUrl || 'https://via.placeholder.com/180'}
                                                    alt="Profile Preview"
                                                    className="rounded-circle border border-4 border-light shadow-sm"
                                                    style={{ width: '180px', height: '180px', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <Label for='imageUpload' className="btn btn-outline-primary btn-sm mt-2">
                                                Change Photo
                                                <Input type='file' id='imageUpload' hidden onChange={handleFileChange} accept='image/*' />
                                            </Label>
                                            <p className='text-muted small mt-2'>Allowed JPG, PNG. MAX 2MB.</p>
                                        </Col>

                                        {/* Right side: Form field */}
                                        <Col md={8} className="ps-md-5">
                                            <Row>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label className="fw-bold small text-uppercase">Full Name</Label>
                                                        <Input type="text" value={userData.name} onChange={(e) => handleChange(e, 'name')} placeholder="Enter name"
                                                            invalid={error?.error?.response?.data?.name ? true : false} />
                                                        <FormFeedback>
                                                            {error.error?.response?.data?.name}
                                                        </FormFeedback>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label className="fw-bold small text-uppercase">Email Address</Label>
                                                        <Input type="email" value={userData.email} disabled />
                                                        <small className="text-muted">Email cannot be changed.</small>
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <FormGroup className="mt-3">
                                                <Label className="fw-bold small text-uppercase">Contact Number</Label>
                                                <Input type="text" value={userData.contactNo} onChange={(e) => handleChange(e, 'contactNo')}
                                                    invalid={error?.error?.response?.data?.contactNo ? true : false} />
                                                <FormFeedback>
                                                    {error.error?.response?.data?.contactNo}
                                                </FormFeedback>
                                            </FormGroup>

                                            <FormGroup className="mt-3">
                                                <Label className="fw-bold small text-uppercase">Residential Address</Label>
                                                <Input type="textarea" rows="3" value={userData.address} onChange={(e) => handleChange(e, 'address')}
                                                    invalid={error?.error?.response?.data?.address ? true : false} />
                                                <FormFeedback>
                                                    {error.error?.response?.data?.address}
                                                </FormFeedback>
                                            </FormGroup>

                                            <div className="mt-5 d-flex gap-2">
                                                <Button style={{ backgroundColor:(isAdmin)? "primary" : "#0dcaf0"}} className="px-5 shadow" type="submit">
                                                    Save Changes
                                                </Button>
                                                <Button color="light" onClick={() => navigate(-1)}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    )
}

export default UpdateUser;