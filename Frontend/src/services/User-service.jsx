import { myAxios, privateAxios } from "./Helper";

export const userLogIn = (user) => {
    return myAxios.post("/auth/login", user).then(resp => resp.data);
};

export const register = (user) => {
    return myAxios.post('/auth/signup', user).then(resp => resp.data);
};

export const loadUserById = (id) => {
    return privateAxios.get(`/api/v1/user/${id}`).then(resp => resp.data);
};

export const editUserDetails = (userId, user) => {
    return privateAxios.put(`/api/v1/user/update/${userId}`, user).then(resp => resp.data);
};

export const uploadPost = (image, userId) => {
    const formData = new FormData();
    formData.append("image", image);
    return privateAxios.post(`/api/v1/user/add/image/${userId}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((resp) => {return resp.data});
};

export const loadAllUsers = () => {
    return privateAxios.get(`/api/v1/user/allusers`).then(resp => resp.data);
};