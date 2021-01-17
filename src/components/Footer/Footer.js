import React from "react";
import { faPassport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./footerStyle.module.css";

export default function Footer() {
    return (
        <footer className={styles.mainFooter}>
            <div>
                <FontAwesomeIcon icon={faPassport} />
                <span className="footerText">
                    {" "}
                    Powered by Lusine Aleksanyan and Masis Karapetyan
                </span>
            </div>
        </footer>
    );
}
