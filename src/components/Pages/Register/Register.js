import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../../store/userActions";
import styles from "./registerStyle.module.css";

function Register(props) {
    const [values, setValues] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = () => {
        let { name, surname, email, password, confirmPassword } = values;

        const regexpEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
        const testEmail = regexpEmail.test(email);

        let valid = true;

        let nameError = null;
        let surnameError = null;
        let emailError = null;
        let passwordError = null;
        let confirmPasswordError = null;

        if (!name) {
            nameError = "Name is required!";
            valid = false;
        }
        if (!surname) {
            surnameError = "Surname is required!";
            valid = false;
        }
        if (!testEmail) {
            emailError = "Email is invalid!";
            valid = false;
        }
        if (!email) {
            emailError = "Email is required!";
            valid = false;
        }
        if (!password) {
            passwordError = "Password is required!";
            valid = false;
        }
        if (!confirmPassword) {
            confirmPasswordError = "Confirm your password!";
            valid = false;
        } else if (password !== confirmPassword) {
            passwordError = "Passwords didn't match";
            valid = false;
        }

        setErrors({
            email: emailError,
            confirmPassword: confirmPasswordError,
            password: passwordError,
            name: nameError,
            surname: surnameError,
        });

        if (valid) {
            props.register(values);
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
                        <Form className={styles.inner}>
                            <h3 className={styles.heading}>
                                Register to Your ToDo
                            </h3>
                            <Form.Group>
                                <Form.Control
                                    className={
                                        errors.name ? styles.invalid : ""
                                    }
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    required
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text
                                        className={` ${styles.formText} text-danger`}
                                    >
                                        {errors.name}
                                    </Form.Text>
                                }
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    className={
                                        errors.surname ? styles.invalid : ""
                                    }
                                    type="text"
                                    name="surname"
                                    placeholder="Enter your surname"
                                    required
                                    value={values.surname}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text
                                        className={` ${styles.formText} text-danger`}
                                    >
                                        {errors.surname}
                                    </Form.Text>
                                }
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    className={
                                        errors.email ? styles.invalid : ""
                                    }
                                    placeholder="Enter Email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text
                                        className={` ${styles.formText} text-danger`}
                                    >
                                        {errors.email}
                                    </Form.Text>
                                }
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    className={
                                        errors.password ? styles.invalid : ""
                                    }
                                    type="password"
                                    placeholder="Enter Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    name="password"
                                />
                                {
                                    <Form.Text
                                        className={` ${styles.formText} text-danger`}
                                    >
                                        {errors.password}
                                    </Form.Text>
                                }
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control
                                    className={
                                        errors.confirmPassword
                                            ? styles.invalid
                                            : ""
                                    }
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    name="confirmPassword"
                                />
                                <Form.Text
                                    className={` ${styles.formText} text-danger`}
                                >
                                    {errors.confirmPassword}
                                </Form.Text>
                            </Form.Group>
                            <div className={styles.submitContainer}>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit}
                                >
                                    Finish Signing up
                                </Button>
                            </div>
                            <div className={styles.lastText}>
                                <span>Already have an account? </span>
                                <Link to="/login">Log In</Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

const mapDispatchToProps = {
    register,
};

export default connect(null, mapDispatchToProps)(Register);
