import React from 'react'
import { Container } from 'reactstrap'

const Footer = () => {
  return (
    
     <footer className="bg-info text-white mt-4">
           <Container fluid className='text-center py-3'>
&copy; Copyright {new Date().getFullYear()} | Hotel Rating System & All Rights Reserved
</Container>
        </footer>
  )
}

export default Footer;