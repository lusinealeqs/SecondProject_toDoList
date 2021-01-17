import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { login } from "../../../store/userActions";
import { Link } from "react-router-dom";
import styles from "./loginStyle.module.css";

function Login(props) {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: null,
        password: null,
    });

    const handleSubmit = () => {
        const { email, password } = values;
        let regexpEmail = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );

        let testEmail = !regexpEmail.test(email);

        setErrors({
            email: email ? null || testEmail : "Email is required",
            password: password ? null : "Password is required",
        });

        if (email && password) {
            console.log("Here is your login and password", values);
            props.login(values);
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
                                Log In to Your ToDo
                            </h3>
                            <Form.Group>
                                <Form.Control
                                    className={
                                        errors.email ? styles.invalid : ""
                                    }
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text className="text-danger">
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
                                    <Form.Text className="text-danger">
                                        {errors.password}
                                    </Form.Text>
                                }
                            </Form.Group>
                            <div className={styles.submitContainer}>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit}
                                >
                                    Log In
                                </Button>
                            </div>
                            <div className={styles.lastText}>
                                <span>Don't have an account? </span>
                                <Link exact to="/register">
                                    Register for free
                                </Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

// export default Login;
const mapDispatchToProps = {
    login,
};

export default connect(null, mapDispatchToProps)(Login);
