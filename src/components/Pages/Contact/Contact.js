import React, { useState } from "react";
import { connect } from "react-redux";
import { contactForm } from "../../../store/userActions";
import styles from "./contact.module.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Contact(props) {
    const [values, setValues] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({
        name: null,
        email: null,
        message: null,
    });

    const handleSubmit = () => {
        let { name, email, message } = values;

        name = name.trim();
        email = email.trim();
        message = message.trim();

        const regexpEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
        const testEmail = regexpEmail.test(email);

        let valid = true;

        let nameError = null;
        let emailError = null;
        let messageError = null;

        if (!email) {
            emailError = "Email is required!";
            valid = false;
        }

        if (!testEmail) {
            emailError = "Email is invalid!";
            valid = false;
        }

        if (!name) {
            nameError = "Name is required!";
            valid = false;
        }

        if (!message) {
            messageError = "Message is required!";
            valid = false;
        }

        setErrors({
            name: nameError,
            email: emailError,
            message: messageError,
        });

        if (valid) {
            props.contactForm(values);
            setValues({
                name: "",
                email: "",
                message: "",
            });
        }
    };

    const handleChange = ({ target: { name, value } }) => {
        setValues({
            ...values,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: null,
        });
    };

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
                            <Form.Group>
                                <Form.Control
                                    className={
                                        errors.name ? styles.invalid : ""
                                    }
                                    type="text"
                                    name="name"
                                    placeholder="Full name"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text
                                        className={`${styles.formText} text-danger`}
                                    >
                                        {errors.name}
                                    </Form.Text>
                                }
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    className={
                                        errors.email ? styles.invalid : ""
                                    }
                                    type="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    name="email"
                                />
                                {
                                    <Form.Text
                                        className={`${styles.formText} text-danger`}
                                    >
                                        {errors.email}
                                    </Form.Text>
                                }
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control
                                    className={
                                        errors.message ? styles.invalid : ""
                                    }
                                    as="textarea"
                                    name="message"
                                    value={values.message}
                                    onChange={handleChange}
                                    placeholder="Message"
                                    rows={3}
                                />
                                {
                                    <Form.Text
                                        className={`${styles.formText} text-danger`}
                                    >
                                        {errors.message}
                                    </Form.Text>
                                }
                            </Form.Group>
                            <div className={styles.submitContainer}>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit}
                                >
                                    Send message
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

const mapDispatchToProps = {
    contactForm,
};

export default connect(null, mapDispatchToProps)(Contact);
