import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import styles from './notFound.module.css'

export default function NotFound() {
    return (
        <>
            <div className={styles.notFound}>OOPS...</div>
            <div className={styles.notFound}>We couldn't find what you were searching! :(</div>
            <div className={styles.notFound}>It's okay. Try again later!</div>
            <OverlayTrigger
                placement="bottom"
                overlay={
                    <Tooltip>
                        <strong>404</strong>
                    </Tooltip>
                }>
                <div className={styles.notFoundIcon}>
                    <FontAwesomeIcon icon={faExclamationTriangle} className='not-foundIcon' />
                </div>
            </OverlayTrigger>
            <div className={styles.buttonBack}>
                <Button
                    href="/"
                    variant="outline-primary"
                    className='m-3'>
                    Back to home page
                </Button>
            </div>
        </>
    )
}