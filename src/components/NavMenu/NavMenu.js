import React from 'react';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import styles from './navMenuStyle.module.css'

export default function NavMenu() {
    return (
        <Navbar bg="white" variant="white" className={styles.navbarMenu}>
            <Navbar.Brand>
                <OverlayTrigger
                    placement="right"
                    overlay={
                        <Tooltip>
                            <strong>Home Page</strong>
                        </Tooltip>
                    }
                >
                    <NavLink
                        to='/'
                        activeClassName='activeLink'
                        className={styles.homePageNav}
                        exact>
                        Your ToDo Space
                </NavLink>
                </OverlayTrigger>
            </Navbar.Brand>
            {/* <Nav className="mr-auto">
                <NavLink
                    exact
                    activeClassName='activeLink'
                    className="navLinks"
                    to='/about'>
                    About
                </NavLink>
                {/* </Nav> */}
        </Navbar>
    );
} 