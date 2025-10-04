import React from 'react'
import { isLogIn } from '../auth/Index'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {

  return isLogIn() ? <Outlet /> : <Navigate to={"/login"} replace />
}

export default PrivateRoute;