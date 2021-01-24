import React from "react";
import styles from "./about.module.css";
import { Container, Row, Col } from "react-bootstrap";

export default function About() {
    return (
        <div className={styles.main}>
            <Container className={styles.mainInner}>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <div className={styles.inner}>
                            <h3 className={styles.heading}>About ToDo</h3>
                            <p>
                                If You want to learn Programming and learn by
                                doing projects, we made this ToDo app to make
                                your life and your learning process easier.
                            </p>
                            <p>
                                This app is simple to use and easy to
                                understand.
                            </p>
                            <h5>Try once, make it for life!</h5>
                            <h4>See Results. All In One Drive.</h4>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
