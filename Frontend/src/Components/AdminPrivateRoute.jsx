import React, { useContext } from 'react'
import UserContext from '../Context/UserContext'
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'reactstrap';

const AdminPrivateRoute = () => {
 
    const {user} = useContext(UserContext);

    if (user.loading) {
        return ( <div className='d-flex justify-content-center py-5'><h4>Checking Permission...</h4> <Spinner>...</Spinner> </div> )
    }

    const isAdmin = user.data?.roles.some(role => role.name === "ROLE_ADMIN");

    if (isAdmin) {
        return <Outlet />
    }else{
        toast.error("Unauthorized! You do not have Admin privileges.");
        return <Navigate to={"/user/dashboard"} />
    }

}

export default AdminPrivateRoute;