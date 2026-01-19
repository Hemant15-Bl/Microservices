import { privateAxios } from "./Helper";

export const getAllHotels = async () => {
    try{
    const resp = await privateAxios.get("/api/v2/hotel/allhotels");
    return resp.data;
    }catch(error){
        if (error.response && error.response.status === 503) {
            console.warn("Service is down. Returning client-side data");
            
            const dummyHotelsData =[ 
                {
                hotelId:"FALLBACK-001",
                name:"Dummy",
                about:"Hotel data temprarory unavailable.",
                location:"System Offile"
            }
        ]

            return dummyHotelsData;
        }else if(error.response && error.response.status === 403){
            console.error("Access Denied! You are not Admin");
            throw error;
        }else{
            throw error;
        }
    }
};

export const getHotelById = async (hotelId) => {
    try {
        const resp = await privateAxios.get(`/api/v2/hotel/${hotelId}`);
        return resp.data;
    } catch (error) {
        if (error.response && error.response.status === 503) {
            console.warn("Service is down. Returning client-side data");
            
            const dummyHotelData = {
                hotelId:"FALLBACK-001",
                name:"Dummy",
                about:"Hotel data temprarory unavailable.",
                location:"System Offile"
            };

            return dummyHotelData;
        }else if(error.response && error.response.status === 403){
            console.error("Access Denied! You are not Admin");
            throw error;
        }else{
            throw error;
        }
    }
};

export const createHotel = async (addHotel) => {
    try{
        const resp = await privateAxios.post('/api/v2/hotel/add', addHotel);
        return resp.data;
    }catch(error){
        console.error("Error while adding hotel from Hotel-service: ", error);
        throw error;
    }  
};

export const uploadImage = async (file, hotelId) => {
    try {
        let formData = new FormData();
    formData.append("image", file);
    const resp = await privateAxios.post(`/api/v2/hotel/image/upload/${hotelId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        return resp.data;
    } catch (error) {
        console.error("Error while uploading image from Hotel-service: ", error);
        throw error;
    }
    };

export const getHotelImage = async (imageName) => {
    try {

        const resp = await privateAxios.get('/api/v2/hotel/image/' + imageName, { responseType: 'blob' });
        if (resp.status === 200) {
            const blob = resp.data;
            const url = URL.createObjectURL(blob);
            return url;
        } else {
            console.log("Failed to fetch image!!");
        }
    } catch (error) {
         console.error("Error loading image from Hotel-service : ");
        throw error;
    }

};

export const editHotelDetails = async (hotel, hotelId) => {
    try{
    const resp = await privateAxios.put(`/api/v2/hotel/edit/${hotelId}`, hotel);
    return resp.data;
    }catch(error){
            throw error;
    }
};

export const deleteHotel = async (hotelId) =>{
    try {
        const resp = await privateAxios.delete(`/api/v2/hotel/delete/${hotelId}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};