import React, {useEffect, useState} from "react";
import styles from './RegisterForm.module.css';
import {Button, Col, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import { addNewUser } from "../../api";
import validateRegister from "./validateRegister";
import cx from 'classnames';

const RegisterForm = () => {

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alerts, setAlerts] = useState({})

    useEffect( () => {

        const {firstName, lastName, username, email, password} = values

        if (Object.keys(errors).length === 0 && isSubmitting) {
            addNewUser(firstName, lastName, username, email, password, setErrors, setAlerts);
        }
        }, [errors])




    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setValues({
            ...values,
            [name]: value
        });
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateRegister(values));
        setIsSubmitting(true);
     }

    return(
        <div className={styles.wrapper}>
            <div className={styles.headerContainer}>
                <h2>Habit Tracker</h2>
            </div>
            {alerts.success && <p className={cx("text-center", styles.success)}>{alerts.success}</p>}
            <div className={styles.formContainer}>
                <div className={styles.formHeader}>
                    <h5>Rejestracja</h5>
                </div>
                <Form onSubmit={handleSubmit} noValidate>
                    <Row>
                        <Col>
                            <Form.Group controlId={values.firstName}>
                                <Form.Label>Imie</Form.Label>
                                <Form.Control
                                    className ={`${errors.firstName && styles.inputError}`}
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
                                    className ={`${errors.lastName && styles.inputError}`}
                                    type="text"
                                    name="lastName"
                                    placeholder="Nazwisko"
                                    onChange={handleChange}/>
                                {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId={values.username}>
                        <Form.Label>Login</Form.Label>
                        <Form.Control
                            className ={`${errors.username && styles.inputError}`}
                            type="text"
                            name="username"
                            placeholder="Login"
                            onChange={handleChange}/>
                        {errors.username && <p className={styles.error}>{errors.username}</p>}
                    </Form.Group>
                    <Form.Group controlId={values.password}>
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control
                            className ={`${errors.password && styles.inputError}`}
                            type="password"
                            name="password"
                            placeholder="*********"
                            onChange={handleChange}/>
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </Form.Group>
                    <Form.Group controlId={values.email}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            className ={`${errors.email && styles.inputError}`}
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}/>
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </Form.Group>
                    <Button variant={"success"} type="submit" className={styles.loginButton}>
                        <div className="mr-3 ml-1 float-left" >
                            <FontAwesomeIcon icon={faUserPlus} />
                        </div>
                        Zarejestruj
                    </Button>
                    <hr/>
                    <Link to="/login">
                        <Button variant={"primary"} className={styles.loginButton}>
                            <div className="mr-3 ml-1 float-left" >
                                <FontAwesomeIcon icon={faSignInAlt} />
                            </div>
                            Zaloguj
                        </Button>
                    </Link>
                </Form>
            </div>
        </div>
    )
}

export default RegisterForm;