import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export default function NotFound() {
    return (
        <>
            <div className="not-found">OOPS...</div>
            <h6 className="not-found">We couldn't find what you were searching! :(</h6>
            <div className="not-found">Try again later!</div>
            <OverlayTrigger
                placement="bottom"
                overlay={
                    <Tooltip>
                        <strong>404</strong>
                    </Tooltip>
                }>
                <div className="not-foundIcon">
                    <FontAwesomeIcon icon={faExclamationTriangle} className='not-foundIcon' />
                </div>
            </OverlayTrigger>
            <div className='buttonBack'>
                <Button
                    href="/"
                    variant="outline-primary"
                    className='m-3 buttonText'>
                    Back to home page
                </Button>
            </div>
        </>
    )
}