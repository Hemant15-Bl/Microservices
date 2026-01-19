import { privateAxios } from "./Helper"

export const getActivities = async () =>{
    try{
        const resp = await privateAxios.get('/api/v1/admin/activities');
        return resp.data;
    }catch(error){
        console.error("Error in getActivities: ");
        throw error;
    }
};