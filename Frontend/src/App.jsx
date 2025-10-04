import { useEffect, useState } from 'react'
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Contact from './Components/Contact';
import About from './Components/About';
import LogIn from './Components/LogIn';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Hotel from './Components/Hotel';
import PrivateRoute from './Components/PrivateRoute';
import DashBoard from './Components/DashBoard';
import ViewHotel from './Components/ViewHotel';
import ProfileInfo from './Components/ProfileInfo';
import UpdateHotel from './Components/UpdateHotel';
import AddHotel from './Components/AddHotel';
import UpdateUser from './Components/UpdateUser';
import AdminHome from './Components/AdminHome';


function App() {

  useEffect(() => {
    document.title = "HRS || Hotel-Rating-System";
  }, []);

  const router = createBrowserRouter([
    { path: "/contact", element: <Contact /> },
    { path: "/login", element: <LogIn /> },
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/signup", element: <Signup /> },
    { path: "/hotels", element: <Hotel /> },

    {
      path: "/user", element: <PrivateRoute />, children: [
        { path: "dashboard", element: <DashBoard /> },
        { path: "viewhotel/:hotelId/:userId", element: <ViewHotel /> },
        { path: "profile-info", element: <ProfileInfo /> },
        { path: "edit/:hotelId", element: <UpdateHotel /> },
        { path: "create/hotel", element: <AddHotel /> },
        { path: "profile-edit/:id", element: <UpdateUser /> },
            { path: "adminhome", element: <AdminHome /> },

      ]
    }
  ]);

  return (


    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>

  )
}

export default App;
