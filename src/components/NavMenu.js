import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function NavMenu() {
    return (
        <Navbar bg="white" variant="white" className="navbar">
            <Navbar.Brand>
                <NavLink
                    to='/'
                    activeClassName='activeLink'
                    className='homePageNav'
                    exact>
                    Home
                </NavLink>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink
                    exact
                    activeClassName='activeLink'
                    className="navLinks"
                    to='/about'>
                    About
                </NavLink>
                <NavLink 
                    to='/contact'
                    activeClassName='activeLink'
                    className="navLinks"
                    exact>
                    Contact
              </NavLink>
            </Nav>
        </Navbar>
    );
} 