import React, { useContext } from 'react'
import CustomNavBar from './CustomNavBar';
import { CardFooter, Container } from 'reactstrap';
import Footer from './Footer';
import UserContext from '../Context/UserContext';
import Sidebar from './Sidebar';

const Base = ({ children }) => {

  const { user } = useContext(UserContext);

  const isAdmin = user.data?.roles?.some(r => r.name === "ROLE_ADMIN");
  return (
    <div className='layout-container'>
      {(!user.login || !isAdmin) && <CustomNavBar />}

      <div className="d-flex">
        {user.login && isAdmin && <Sidebar />}

        <div className="flex-grow-1" style={{
          // If User: need margin for the fixed Navbar. If Admin: no top margin.
          minHeight: '100vh',
          backgroundColor: '#f4f7f6'
        }}>



          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Base;