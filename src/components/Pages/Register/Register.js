import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../../store/userActions';
import styles from './registerStyle.module.css';

function Register(props) {
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        email: null,
        password: null,
        confirmPassword: null,
        name: '',
        surname: '',
    });

    const handleSubmit = () => {
        const { name, surname, email, password, confirmPassword } = values;
        let valid = true;

        let passwordMessage = null;
        if (!confirmPassword) {
            passwordMessage = 'Password is required';
            valid = false;
        }
        else if (password !== confirmPassword) {
            passwordMessage = "Passwords didn't match";
            valid = false;
        }

        setErrors({
            email: email ? null : 'Email is required',
            confirmPassword: passwordMessage,
            password: password ? null : 'Password is required',
            name: name ? null : 'Please, type your name',
            surname: surname ? null : 'Please, type your surname',
        });

        if (valid) {
            console.log(values);
            props.register(values);
        }

    };

    const handleChange = ({ target: { name, value } }) => {
        setValues({
            ...values,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: null
        });
    };

    const { registerSuccess, history } = props;
    useEffect(() => {
        if (registerSuccess) {
            history.push('/login');
        }
    }, [history, registerSuccess]);

    return (
        <div className={styles.main}>
            <Container className={styles.mainInner}>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <Form className={styles.inner}>
                            <h3 className={styles.heading}>Register to Your ToDo</h3>
                            <Form.Group>
                                <Form.Control
                                    className={errors.name? styles.invalid: ''}
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    required
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text className="text-danger">
                                        {errors.name}
                                    </Form.Text>
                                }
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    className={errors.surname? styles.invalid: ''}
                                    type="text"
                                    name="surname"
                                    placeholder="Enter your surname"
                                    required
                                    value={values.surname}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text className="text-danger">
                                        {errors.surname}
                                    </Form.Text>
                                }
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    className={errors.password ? styles.invalid : ''}
                                    placeholder="Enter Email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text className="text-danger" >
                                        {errors.email}
                                    </Form.Text>
                                }

                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    className={errors.password ? styles.invalid : ''}
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
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control
                                    className={errors.confirmPassword ? styles.invalid : ''}
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    name="confirmPassword"
                                />
                                <Form.Text className="text-danger">
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
                                <NavLink
                                    exact
                                    to='/login'>
                                    Log In
                                </NavLink>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        registerSuccess: state.authReducer.registerSuccess
    };
};

const mapDispatchToProps = {
    register
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);