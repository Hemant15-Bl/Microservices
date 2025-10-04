import { privateAxios } from "./Helper"

export const getAllRatings =()=>{
    return privateAxios.get("/rating/allratings").then(resp => resp.data);
};

export const getRatingsByHotelId =(hotelId)=>{
    return privateAxios.get(`/rating/hotels/${hotelId}`).then(resp => resp.data);
};

export const saveRatings =(addRating)=>{
    return privateAxios.post(`/rating/add`, addRating).then(resp => resp.data);
};

