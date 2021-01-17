import React from "react";
import styles from "./contact.module.css";
import { Container, Row, Col } from "react-bootstrap";

export default function Contact() {
    return (
        <div className={styles.main}>
            <Container className={styles.mainInner}>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <div className={styles.inner}>
                            <h3 className={styles.heading}>Contact Us</h3>
                            <p>
                                Feel free to get in touch with us whenever you
                                need some help.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
