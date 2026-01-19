import React, { useEffect, useState } from 'react'
import Base from './Base'
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import { data, Form, useNavigate, useParams } from 'react-router-dom'
import { createHotel, editHotelDetails, getHotelById, getHotelImage, uploadImage } from '../services/Hotel-service'
import { toast } from 'react-toastify'

const AddHotel = () => {

    const { hotelId } = useParams();
    const isEditMode = !!hotelId; // boolean helper
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [addHotel, setAddHotel] = useState({ name: '', about: '', location: '' });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const themeColor = "#12b0cfff";

    //------if Edit fetch hotel data -------
    useEffect(() => {
        document.title = "HRS | "+isEditMode ? "Update Hotel" : "Create New Hotel"
        if (isEditMode) {
            getHotelById(hotelId).then(async data => {
                setAddHotel({ name: data.name, about: data.about, location: data.location });

                //fetch image
                if (data.imageName) {
                    try {
                        const url = await getHotelImage(data.imageName);
                    setImagePreview(url);
                    } catch (error) {
                        console.error("Could not load existing hotel image!");
                        
                    }
                }
            }).catch(err => console.error("Error while loading hotel:", err))
        }
    }, [hotelId, isEditMode]);

    const handleForm = (e, fieldName) => {
        setAddHotel({ ...addHotel, [fieldName]: e.target.value })
    };


    const handleFile = (e) => {
        const file = e.target.files[0];
        // console.log(e.target.files);
        setImage(file);
        if(file){
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    

    //---------------- submit form ----------------

    const submitHotel = async (event) => {
        event.preventDefault();

        //Basic validation
        if (!addHotel.name || !addHotel.about || !addHotel.location) {
            return toast.error("Please fill all field and select an image!");
        }

        setLoading(true);
        try {

            if (isEditMode) {
                //UPDATE LOGIC
                const resp = await editHotelDetails(addHotel, hotelId);
                if (image) {
                    await uploadImage(image, hotelId);
                }
                toast.success("Hotel updated successfully!");

            }
            else {
                //CREATE LOGIC
                const resp = await createHotel(addHotel);

                //add image in server by api
                await uploadImage(image, resp.hotelId)
                toast.success("Hotel and Image added successfully !!")
            }
            navigate("/admin/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Process failed! Please try again!!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Base>

            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col lg={8} md={10}>
                        {/* Professional Card Styling */}
                        <Card className="border-0 shadow-lg" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                            <div style={{ height: '8px', backgroundColor: themeColor }}></div>

                            <CardBody className="p-5">
                                <div className="text-center mb-5">
                                    <h2 className="fw-bold text-dark">{isEditMode?"Update Hotel": "Create New Hotel"}</h2>
                                    <p className="text-muted">Enter details to {isEditMode ? "edit" : "list a new"} property on the platform</p>
                                </div>

                                <Form onSubmit={submitHotel}>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup className="mb-4">
                                                <Label className="fw-semibold small text-uppercase text-muted">Hotel Name</Label>
                                                <Input
                                                    type="text"
                                                    value={addHotel.name}
                                                    placeholder="e.g. Grand Plaza Resort"
                                                    className="form-control-lg border-2 shadow-none"
                                                    onChange={(e) => handleForm(e, "name")}
                                                    style={{ borderRadius: '10px', fontSize: '1rem' }}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup className="mb-4">
                                                <Label className="fw-semibold small text-uppercase text-muted">Location</Label>
                                                <Input
                                                    type="text"
                                                    value={addHotel.location}
                                                    placeholder="City, Country"
                                                    className="form-control-lg border-2 shadow-none"
                                                    onChange={(e) => handleForm(e, "location")}
                                                    style={{ borderRadius: '10px', fontSize: '1rem' }}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup className="mb-4">
                                                <Label className="fw-semibold small text-uppercase text-muted">About Property</Label>
                                                <Input
                                                    type="textarea"
                                                    value={addHotel.about}
                                                    placeholder="Describe the facilities and ambiance..."
                                                    style={{ height: "120px", borderRadius: '10px', resize: 'none' }}
                                                    className="border-2 shadow-none"
                                                    onChange={(e) => handleForm(e, "about")}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup className="mb-5">
                                                <Label className="fw-semibold small text-uppercase text-muted">{isEditMode ? "Change Cover Image (Optional)" : "Upload Cover Image"}</Label>
                                                <div className="p-3 border-2 border-dashed rounded-3 text-center bg-light" style={{ borderStyle: 'dashed' }}>
                                                    <Input type="file" onChange={handleFile} className="form-control border-0 bg-transparent" />
                                                    {imagePreview && (
                                                <img src={imagePreview} alt="Preview" className="rounded shadow-sm ms-3" style={{ width: '80px', height: '50px', objectFit: 'cover' }} />
                                            )}
                                                    <small className="text-muted">Max file size: 5MB (JPG, PNG)</small>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <div className="d-flex justify-content-between">
                                        <Button color="light" onClick={() => navigate(-1)} className="px-4 py-2 fw-bold">Cancel</Button>
                                        <Button 
                                            type="submit" disabled={loading} className="px-5 py-2 fw-bold text-white shadow-sm border-0" 
                                            style={{ backgroundColor: themeColor, borderRadius: '10px' }}
                                        >
                                            {loading ? <Spinner size="sm" /> : (isEditMode ? "Save Changes" : "Publish Hotel")}
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>

    )
}

export default AddHotel;