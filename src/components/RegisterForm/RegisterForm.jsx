import React, {useEffect, useState} from "react";
import styles from './RegisterForm.module.css';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {addNewUser} from "../../api";
import cx from 'classnames';
import {validateRegister} from "../../constants/validation";

const RegisterForm = () => {

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alerts, setAlerts] = useState({})
    const [isUsernameAvailable, setIsUsernameAvailable] = useState('');
    const [isEmailAvailable, setIsEmailAvailable] = useState('');

    useEffect(() => {

        const {firstName, lastName, username, email, password} = values

        if (Object.keys(errors).length === 0 && isSubmitting) {
            addNewUser(firstName, lastName, username, email, password, setErrors, setAlerts);
        }
    }, [errors])


    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setValues({
            ...values,
            [name]: value
        });
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateRegister(values, setIsUsernameAvailable, setIsEmailAvailable));
        setIsSubmitting(true);
    }

    return (
        <Container className="mb-0 mt-0 ml-auto mr-auto">
            <Row>
                <Col>
                    <h3 className="text-center p-1 mt-4">
                        Habit Tracker
                    </h3>
                {alerts.success && <p className={cx("text-center", styles.success)}>{alerts.success}</p>}
                </Col>
            </Row>
            <Row className="p-3 mt-0 mb-4 justify-content-center">
                <div className={styles.formContainer}>
                    <Row md={5} className="pt-md-3 justify-content-center">
                        <h5 className="p-1">
                            Rejestracja
                        </h5>
                    </Row>
                    <Form onSubmit={handleSubmit} noValidate>
                        <Row className="text-center justify-content-center">
                            <Col>
                                <Form.Group controlId={values.firstName}>
                                    <Form.Label>Imie</Form.Label>
                                    <Form.Control
                                        className={`${errors.firstName && styles.inputError}`}
                                        type="text"
                                        name="firstName"
                                        placeholder="Imie"
                                        onChange={handleChange}/>
                                    {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={values.lastName}>
                                    <Form.Label>Nazwisko</Form.Label>
                                    <Form.Control
                                        className={`${errors.lastName && styles.inputError}`}
                                        type="text"
                                        name="lastName"
                                        placeholder="Nazwisko"
                                        onChange={handleChange}/>
                                    {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="text-center justify-content-center">
                            <Col>
                                <Form.Group controlId={values.username}>
                                    <Form.Label>Login</Form.Label>
                                    <Form.Control
                                        className={`${(errors.username || isUsernameAvailable) && styles.inputError}`}
                                        type="text"
                                        name="username"
                                        placeholder="Login"
                                        onChange={handleChange}/>
                                    {errors.username && <p className={styles.error}>{errors.username}</p>}
                                    {isUsernameAvailable && <p className={styles.error}>{isUsernameAvailable}</p>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="text-center justify-content-center">
                            <Col>
                                <Form.Group controlId={values.password}>
                                    <Form.Label>Hasło</Form.Label>
                                    <Form.Control
                                        className={`${errors.password && styles.inputError}`}
                                        type="password"
                                        name="password"
                                        placeholder="*********"
                                        onChange={handleChange}/>
                                    {errors.password && <p className={styles.error}>{errors.password}</p>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="text-center justify-content-center">
                            <Col>
                                <Form.Group controlId={values.confirmPassword}>
                                    <Form.Label>Potwierdź hasło</Form.Label>
                                    <Form.Control
                                        className={`${errors.password && styles.inputError}`}
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="*********"
                                        onChange={handleChange}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="text-center justify-content-center">
                            <Col>
                                <Form.Group controlId={values.email}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        className={`${(errors.email || isEmailAvailable) && styles.inputError}`}
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        onChange={handleChange}/>
                                    {errors.email && <p className={styles.error}>{errors.email}</p>}
                                    {isEmailAvailable && <p className={styles.error}>{isEmailAvailable}</p>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="text-center justify-content-center">
                            <Col md={10}>
                                <Button variant={"success"} type="submit" className="mt-1 mb-1 w-100">
                                    <div className="mr-3 ml-1 float-left">
                                        <FontAwesomeIcon icon={faUserPlus}/>
                                    </div>
                                    Zarejestruj
                                </Button>
                            </Col>
                        </Row>
                        <Row className="text-center justify-content-center">
                            <Col md={10}>
                                <hr/>
                            </Col>
                        </Row>
                        <Row className="text-center justify-content-center">
                            <Col md={10}>
                                <Link to="/login">
                                    <Button variant={"primary"} className="mt-1 mb-1 w-100">
                                        <div className="mr-3 ml-1 float-left">
                                            <FontAwesomeIcon icon={faSignInAlt}/>
                                        </div>
                                        Zaloguj
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Row>
        </Container>
    )
}

export default RegisterForm;