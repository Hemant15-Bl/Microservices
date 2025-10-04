import React from 'react'
import CustomNavBar from './CustomNavBar';
import { CardFooter, Container } from 'reactstrap';
import Footer from './Footer';

const Base = ({children}) => {
  return (
    <div className='container-fluid m-0 p-0'>
        <CustomNavBar />
        {children}

       <Footer />
    </div>
  )
}

export default Base;