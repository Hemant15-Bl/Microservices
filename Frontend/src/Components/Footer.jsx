import React, { useContext } from 'react'
import { Container } from 'reactstrap'
import UserContext from '../Context/UserContext';

const Footer = () => {
  const { user } = useContext(UserContext);
  
    const isAdmin = user.data?.roles?.some(r => r.name === "ROLE_ADMIN");
  return (
    
     <footer className="text-white mt-2" style={{backgroundColor: (!isAdmin)? '#12b0cfff': 'black'}}>
           <Container fluid className='text-center py-3'>
&copy; Copyright {new Date().getFullYear()} | Hotel Rating System & All Rights Reserved
</Container>
        </footer>
  )
}

export default Footer;