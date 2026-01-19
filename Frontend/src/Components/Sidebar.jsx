import { faBars, faCircleInfo, faGauge, faHotel, faRankingStar, faSignOut, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Nav, NavItem } from 'reactstrap';
import UserContext from '../Context/UserContext';
import './sidebar.css';

const Sidebar = ({setView}) => {

    const {user, setUser} = useContext(UserContext);
    const [isCollapsed, setIsCollapsed] = useState(false);

    //----------------- handle collapsed for sidebar to automatically work -------------------
    useEffect(()=>{

        const handleResize = () =>{
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            }else{
                setIsCollapsed(false);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    },[]);

    //------------------ handling logout -----------------------
    const handleLogout = () =>{
        localStorage.removeItem("access_token");

        setUser({data: null, login: false, loading: true});

        window.location.href = "http://localhost:8084/logout";
    }

    return (
        <div className='bg-dark text-white shadow-lg' style={{
                // minWidth: '250px', 
                minHeight: '100vh', 
                position:"sticky", 
                top:0, 
                left:0, 
                zIndex:1050, 
                transition: 'all 0.3s ease',
                width : isCollapsed ? '80px' : '250px'
                }}>

            <div className="p-4 text-center border-bottom border-secondary">
                { !isCollapsed && <h4 className='m-0'>Admin panel,</h4>}
                <Button color='dark' onClick={()=> {setIsCollapsed(!isCollapsed)}} className='p-1'> <FontAwesomeIcon icon={faBars} /> </Button>
            </div>

            <Nav vertical className='p-3'>
                <NavItem className='mb-2'>
                    <NavLink to={'/admin/dashboard'} className={'nav-link text-white d-flex align-items-center'} >
                        <FontAwesomeIcon icon={faGauge} className={isCollapsed ? "mx-auto" : 'me-3'} /> { !isCollapsed && <span>Dashboard</span>}
                    </NavLink>
                </NavItem>

                <NavItem className='mb-2'>
                    <NavLink to={'/admin/manage-users'} className={'nav-link text-white d-flex align-items-center'}>
                        <FontAwesomeIcon icon={faUsers} className={isCollapsed ? "mx-auto" : 'me-3'} /> {!isCollapsed && <span>Manage Users</span>}
                    </NavLink>
                </NavItem>

                <NavItem className='mb-2'>
                    <NavLink to={'/admin/manage-hotels'} className={'nav-link text-white d-flex align-items-center'}>
                        <FontAwesomeIcon icon={faHotel} className={isCollapsed ? "mx-auto" : 'me-3'} /> {!isCollapsed && <span>Manage Hotels</span>}
                    </NavLink>
                </NavItem>

                <NavItem className='mb-2'>
                    <NavLink to={'/admin/manage-ratings'} className={'nav-link text-white d-flex align-items-center'}>
                        <FontAwesomeIcon icon={faRankingStar} className={isCollapsed ? "mx-auto" : 'me-3'} /> {!isCollapsed && <span>Rating Requests</span>}
                    </NavLink>
                </NavItem>

                <hr className='bd-secondary' />
                <NavItem className='mb-2'>
                    <NavLink to={'/profile-info'} className={'nav-link text-white d-flex align-item-center'}>
                        <FontAwesomeIcon icon={faCircleInfo} className={isCollapsed ? "mx-auto" : 'me-3'} /> {!isCollapsed && <span>My Profile</span> }
                    </NavLink>
                </NavItem>

                <NavItem className='mb-2'>
                    <NavLink className={'nav-link text-white d-flex align-item-center'}>
                        
                        <Button color='danger' outline onClick={handleLogout}><FontAwesomeIcon icon={faSignOut} className={isCollapsed ? '' : 'me-2'} /> { !isCollapsed && "Log Out"}</Button>
                    </NavLink>
                </NavItem>
            </Nav>
        </div>

    )
}

export default Sidebar;