import React, { useEffect } from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import styles from "./navMenuStyle.module.css";
import { logout } from "../../store/userActions";
import { connect } from "react-redux";
import { getUserInfo } from "../../store/userActions";

function NavMenu({ isAuthenticated, logout, getUserInfo, user }) {
    useEffect(() => {
        if (isAuthenticated) {
            getUserInfo();
        }
    }, [getUserInfo, isAuthenticated]);

    return (
        <Navbar bg="white" variant="white" className={styles.navbarMenu}>
            {isAuthenticated ? (
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
                            to="/"
                            activeClassName={styles.activeLink}
                            className={styles.homePageNav}
                            exact
                        >
                            Your ToDo Space
                        </NavLink>
                    </OverlayTrigger>
                </Navbar.Brand>
            ) : (
                <>
                    <NavLink
                        to="/register"
                        activeClassName={styles.activeLink}
                        className={styles.navLinks}
                        exact
                    >
                        Register
                    </NavLink>
                    <NavLink
                        to="/login"
                        activeClassName={styles.activeLink}
                        className={styles.navLinks}
                        exact
                    >
                        Log In
                    </NavLink>
                </>
            )}
            <Nav className="mr-auto">
                <NavLink
                    exact
                    activeClassName={styles.activeLink}
                    className={styles.navLinks}
                    to="/about"
                >
                    About
                </NavLink>
                <NavLink
                    exact
                    activeClassName={styles.activeLink}
                    className={styles.navLinks}
                    to="/contact"
                >
                    Contact
                </NavLink>
            </Nav>
            {user && (
                <div className={`${styles.usernameDiv} text-right`}>
                    {user.name} {user?.surname}
                </div>
            )}
            {isAuthenticated && (
                <div>
                    <Button
                        className={styles.logOutDiv}
                        variant="success"
                        onClick={logout}
                    >
                        Log Out
                    </Button>
                </div>
            )}
        </Navbar>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        user: state.authReducer.userInfo,
    };
};

const mapDispatchToProps = {
    logout,
    getUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
