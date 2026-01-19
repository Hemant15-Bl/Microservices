import { myAxios, privateAxios } from "./Helper";


export const register = async (user) => {
    try {
        const resp = await myAxios.post('/api/v4/auth/signup', user);
        return resp.data;
    } catch (error) {
        console.log("Error while register :", error);
        throw error;
    }

};

export const registerByAdmin = async (user) => {
    try {
        const resp = await privateAxios.post('/api/v4/auth/admin/create-user', user);
        return resp.data;
    } catch (error) {
        console.log("Error while register by admin :", error);
        throw error;
    }

};

export const loadUserById = async (id) => {
    try {
        const resp = await privateAxios.get(`/api/v1/user/${id}`);
        return resp.data;
    } catch (error) {
        console.log("Error while loading user : ", error);
        throw error;
    }

};

export const editUserDetails = async (userId, user) => {
    try {
        const resp = await privateAxios.put(`/api/v4/update/${userId}`, user);
        return resp.data;
    } catch (error) {
        console.log("Error in EditUser : ", error);
        throw error;
    }
};

export const uploadPost = async (image, userId) => {
    try {
        const formData = new FormData();
        formData.append("image", image);
        const resp = await privateAxios.post(`/api/v1/user/add/image/${userId}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
        return resp.data;
    } catch (error) {
        console.log("Error while Uploading image : ", error);
        throw error;
    }
};

export const loadAllUsers = async () => {
    try{
    const resp = await privateAxios.get(`/api/v1/user/allusers`);
        return resp.data;
    }catch(error){
        if( error.response && error.response.status === 503 ){

            console.warn("Service is down (503). Returning client-side data.");
            const dummyUsersData = [
                {
                    userId:"FALLBACK-001",
                    name:"Dummy",
                    email:"Service Offline",
                    contactNo:"xxxx-xxxx-xx",
                    address:"User data is temprarory unavailable."
                }
            ]

            return dummyUsersData;
        }else if(error.response && error.response.status === 403){
            console.error("Access Denied ! Your are not admin");
            throw error;
        }else{
            throw error;
        }
    }
};

export const loadUserByAuth = async () => {
    try {
        const resp = await privateAxios.get("/api/v4/me");
        return resp.data;
    } catch (error) {
        // console.log("Error in LoadUserByAuth: ", error);
        throw error;
    }
};

export const getUserImage = async (imageName) => {
    try {
        const response = await privateAxios.get(`/api/v1/user/image/${imageName}`, { responseType: 'blob' });

        if (response.status === 200) {
            const blob = await response.data;
            const url = URL.createObjectURL(blob);
            return url;
        } else {
            console.log("Failed to fetch user image!!");

        }
    } catch (error) {
        console.error("Error while fecthing image from User-service : ");
        throw error
    }
};

//SCENARIO 1. Function for the User themselves (requires password)
export const deleteUser = async (userId, password) =>{
    try {
        const resp = await privateAxios.delete(`/api/v4/delete/${userId}`,{params:{password: password}});
        return resp.data;
    } catch (error) {
        throw error;
    }
};

//SCENARIO 2. Function for the Admin (Authorized by JWT only)
export const adminDeleteUser = async (userId) =>{
    try {
        const resp = await privateAxios.delete(`/api/v4/admin/delete/${userId}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

