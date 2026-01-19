import React, { useContext, useState } from 'react'
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button
} from 'reactstrap';
import UserContext from '../Context/UserContext';
import LogInButton from './LogInButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faSignOut } from '@fortawesome/free-solid-svg-icons';

const CustomNavBar = (args) => {


    const { user, setUser } = useContext(UserContext);


    let navigate = useNavigate();



    const logOut = () => {

        localStorage.removeItem("access_token");

        setUser({ data: null, login: false, loading: true });

        window.location.href = "http://localhost:8084/logout";
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const isAdmin = user.data?.roles?.some(role => role.name === "ROLE_ADMIN");

    return (
        <div >
            <Navbar {...args}
                style={{ backgroundColor: "#12b0cfff" }} fixed='top' container="fluid" full="true" expand="md" className='px-3 text-black'
            >
                <NavbarBrand to="/" tag={ReactLink} className='nav-link text-white' style={{ fontWeight: "bold" }}>Hotel Rating System</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar >
                        {!user.login && (<NavItem>
                            <ReactLink className="nav-link text-white" tag={ReactLink} to="/">
                                Home
                            </ReactLink>
                        </NavItem>)}

                        {user.login && isAdmin && (<NavItem>
                            <ReactLink className="nav-link text-white" to="/admin/dashboard">
                                DashBoard
                            </ReactLink>
                        </NavItem>)
                        }

                        {
                            user.login && !isAdmin && (<NavItem>
                                <ReactLink className="nav-link text-white" to="/user/dashboard">
                                    DashBoard
                                </ReactLink>
                            </NavItem>)
                        }
                        <NavItem>
                            <ReactLink className="nav-link text-white" tag={ReactLink} to="/about">About</ReactLink>
                        </NavItem>

                        <NavItem>
                            <ReactLink className="nav-link text-white" tag={ReactLink} to="/contact">Contact Us</ReactLink>
                        </NavItem>

                        
                    </Nav>

                    <Nav navbar>
                        {!user.login &&
                            (<NavItem>
                                <ReactLink className="nav-link text-white" to="/login">Login</ReactLink>
                            </NavItem>)
                        }

                        {user.login &&
                            (<UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav  className='text-white'>
                                    <FontAwesomeIcon icon={faCircleUser} size='2x' />
                                </DropdownToggle>
                                <DropdownMenu right color='dark' dark>
                                    <DropdownItem text>{user.data?.name}</DropdownItem>
                                    <DropdownItem  divider className='bg-white'/>
                                    <DropdownItem tag={ReactLink} to="/profile-info">Profile-Info</DropdownItem>
                                    <DropdownItem className={"text-danger"} style={{ cursor: 'pointer' }} onClick={logOut}> <FontAwesomeIcon icon={faSignOut} /> LogOut</DropdownItem>

                                </DropdownMenu>
                            </UncontrolledDropdown>)
                        }

                    </Nav>

                </Collapse>
            </Navbar>
        </div>
    );
}

export default CustomNavBar;