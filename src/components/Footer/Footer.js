import React from "react";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import styles from "./footerStyle.module.css";

export default function Footer() {
    return (
        <footer className={styles.mainFooter}>
            <div>
                <span className="footerText">
                    Obey Your ToDo App. © Lusine Aleksanyan{" "}
                </span>
            </div>
            <div className={styles.iconsDiv}>
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip>
                            <strong>GitHub</strong>
                        </Tooltip>
                    }
                >
                    <a href="https://github.com/lusinealeqs">
                        <FontAwesomeIcon
                            icon={faGithub}
                            className={styles.icons}
                        />
                    </a>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip>
                            <strong>LinkedIn</strong>
                        </Tooltip>
                    }
                >
                    <a href="https://www.linkedin.com/in/lusinealeqs/">
                        <FontAwesomeIcon
                            icon={faLinkedinIn}
                            className={styles.icons}
                        />
                    </a>
                </OverlayTrigger>
            </div>
        </footer>
    );
}
