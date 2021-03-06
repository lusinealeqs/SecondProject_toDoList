import React from 'react';
import styles from './spinnerStyles.module.css';

export default function Spinner() {
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}>
                <div />
                <div />
                <div />
                <div />
                <p className={styles.text}>
                    LOADING
                </p>
            </div>

        </div>
    )
} 