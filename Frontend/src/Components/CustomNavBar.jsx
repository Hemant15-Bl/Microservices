import React, { useContext, useEffect, useState } from 'react'
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
import { doLoggedOut, getCurrentUserDetails, isLogIn } from '../auth/Index';

const CustomNavBar = (args) => {


    const userContextData = useContext(UserContext);

    const [user, setUser] = useState(undefined);
    const [logIn, setLogIn] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        setLogIn(isLogIn());
        setUser(getCurrentUserDetails());
        //console.log(user);
        
    }, [logIn]);

    const logOut = () => {

        doLoggedOut(() => {
            setLogIn(false);

            userContextData.setUser({
                data: null,
                login: false
            });

            console.log("You have been logout !!");

            navigate("/login");
        })
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);



    return (
        <div style={{ fontFamily: "sans-serif" }}>
            <Navbar {...args}
                color='info' fixed='top' container="fluid" full="true" expand="md" className='px-3 text-black'
            >
                <NavbarBrand href="/" className='text-white' style={{ fontWeight: "bold" }}>Hotel Rating System</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar >
                        { !logIn && (<NavItem>
                            <ReactLink className="nav-link text-white" tag={ReactLink} to="/">
                                Home
                            </ReactLink>
                        </NavItem>)}

                        { logIn && user.roles.map(role =>{
                            if (role.id===501) {
                               { return (<NavItem>
                            <ReactLink className="nav-link text-white" tag={ReactLink} to="/user/dashboard">
                                DashBoard
                            </ReactLink>
                        </NavItem>)}
                            }else{
                              { return  (<NavItem>
                            <ReactLink className="nav-link text-white" tag={ReactLink} to="/user/adminhome">
                                DashBoard
                            </ReactLink>
                        </NavItem>)}
                            }
                        }) }
                        <NavItem>
                            <ReactLink className="nav-link text-white" tag={ReactLink} to="/about">About</ReactLink>
                        </NavItem>
                        

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className='text-white'>
                                More
                            </DropdownToggle>
                            <DropdownMenu right color='dark' dark>
                                <DropdownItem tag={ReactLink} to="/contact">Contact Us</DropdownItem>
                                <DropdownItem tag={ReactLink} to="">FaceBook</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Youtube</DropdownItem>
                                <DropdownItem>Instagram</DropdownItem>
                                <DropdownItem>LinkedIn</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>

                    <Nav navbar>
                        {!logIn &&
                            (<NavItem>
                                <ReactLink className="nav-link text-white" tag={ReactLink} to="/login">
                                    Login
                                </ReactLink>
                            </NavItem>)
                        }

                        {/* <NavItem>
                            <ReactLink className="nav-link" tag={ReactLink} to="/signup">
                                Signup
                            </ReactLink>
                        </NavItem> */}

                        {logIn &&
                            (<UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className='text-white'>
                                    {user.name}
                                </DropdownToggle>
                                <DropdownMenu right color='dark' dark>
                                    <DropdownItem tag={ReactLink} to="/user/profile-info">Profile-Info</DropdownItem>
                                    <DropdownItem tag={ReactLink} onClick={logOut}>LogOut</DropdownItem>

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