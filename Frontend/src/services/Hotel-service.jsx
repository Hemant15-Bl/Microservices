import { privateAxios } from "./Helper";

export const getAllHotels = () => {
    return privateAxios.get("/hotel/allhotels").then(resp => resp.data);
};

export const getHotelById = (hotelId) =>{
    return privateAxios.get(`/hotel/${hotelId}`).then(resp => resp.data);
};

export const createHotel = (addHotel) =>{
    return privateAxios.post('/hotel/add', addHotel).then(resp => resp.data);
};

export const uploadImage = (image, hotelId) =>{
    let formData = new FormData();
    formData.append("image", image);
    return privateAxios.post(`/hotel/image/upload/${hotelId}`, formData,{ headers:{ 'Content-Type':'multipart/form-data'}}).then((resp) =>{return resp.data});
};

export const getImage = (imageName) =>{
    return privateAxios.get('/hotel/image/'+imageName).then(resp => resp.data);
};

export const editHotelDetails = (hotel, hotelId) =>{
    return privateAxios.put(`/hotel/edit/${hotelId}`, hotel).then(resp => resp.data);
};