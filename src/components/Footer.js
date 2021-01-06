import React from 'react';
import { Navbar } from 'react-bootstrap';
import { faPassport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
    return (
        <Navbar sticky="bottom" bg="dark" variant="dark" className="mainFooter">
        <Navbar.Brand >
            <div>
        <FontAwesomeIcon icon={faPassport} />
            <span className="footerText">Powered by Lusine Aleksanyan and Masis Karapetyan</span>
            </div>
        </Navbar.Brand>
      </Navbar>
    );
} 