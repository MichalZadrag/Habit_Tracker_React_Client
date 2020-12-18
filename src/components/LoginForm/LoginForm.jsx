import React, {useEffect, useState} from "react";
import styles from './LoginForm.module.css';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Link, useLocation} from "react-router-dom";
import {useHistory} from 'react-router';
import cx from 'classnames';
import {login} from "../../api";
import {validateLogin} from "../../constants/validation";


const LoginForm = ({setIsAuthenticated}) => {

    const history = useHistory();
    const location = useLocation();


    const [values, setValues] = useState({
        usernameOrEmail: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (evt) => {
        const {name, value} = evt.target;

        setValues({
            ...values,
            [name]: value
        });
    }

    useEffect(() => {

        const {usernameOrEmail, password} = values

        if (Object.keys(errors).length === 0 && isSubmitting) {
            login(usernameOrEmail, password, setErrors, history, setIsAuthenticated);
        }
    }, [errors])

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateLogin(values));
        setIsSubmitting(true);


    }

    return (
        <Container className="mb-0 mt-0 ml-auto mr-auto">
            <Row>
                <Col>
                    <h3 className="text-center p-1 mt-4 mb-2">
                        Habit Tracker
                    </h3>
                    {(location.state) ?
                        <p className={cx(styles.success, "text-center", "mt-1")}>{location.state.message}</p> : <p></p>}
                </Col>
            </Row>
            <Row className="justify-content-center">
                <div className={styles.formContainer}>
                    <Row className="pt-4 justify-content-center">
                        <h5 className="p-1">
                            Logowanie
                        </h5>
                    </Row>
                    <Row className="p-3 mr-4 ml-4 mt-0 mb-4 justify-content-center">
                        <Form onSubmit={handleSubmit}>
                            <Row className="justify-content-center text-center">
                                <Col>
                                    <Form.Group controlId={values.usernameOrEmail}>
                                        <Form.Label>Login lub Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className={`${(errors.usernameOrEmail || errors.overall) && styles.inputError}`}
                                            name="usernameOrEmail"
                                            placeholder="Login lub Email"
                                            onChange={handleChange}
                                        />
                                        {errors.usernameOrEmail &&
                                        <p className={styles.error}>{errors.usernameOrEmail}</p>}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-center text-center">
                                <Col>
                                    <Form.Group controlId={values.password}>
                                        <Form.Label>Hasło</Form.Label>
                                        <Form.Control
                                            type="password"
                                            className={`${(errors.password || errors.overall) && styles.inputError}`}
                                            name="password"
                                            placeholder="*********"
                                            onChange={handleChange}
                                        />
                                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-center text-center">
                                {errors.overall &&
                                <p className={cx(styles.error, "text-center", "mt-1")}>{errors.overall}</p>}
                            </Row>
                            <Row className="justify-content-center text-center">
                                <Col>
                                    <Button
                                        variant={"success"}
                                        type={"submit"}
                                        className="mt-1 mb-1 w-100">
                                        <div className="mr-3 ml-1 float-left">
                                            <FontAwesomeIcon icon={faSignInAlt}/>
                                        </div>
                                        Zaloguj
                                    </Button>
                                </Col>
                            </Row>

                            <hr/>
                            <Row className="justify-content-center text-center">
                                <Col>
                                    <Link to="/register">
                                        <Button variant={"primary"} className="mt-1 mb-1 w-100">
                                            <div className="mr-3 ml-1 float-left">
                                                <FontAwesomeIcon icon={faUserPlus}/>
                                            </div>
                                            Zarejestruj
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                </div>
            </Row>
        </Container>
    )
}

export default LoginForm;