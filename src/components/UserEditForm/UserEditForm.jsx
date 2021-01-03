import React, {useEffect, useState} from "react";
import styles from "./UserEditForm.module.css"
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import {changeDataUser} from "../../api";
import {validateNewData} from "../../constants/validation";
import SuccessToast from "../SuccessToast/SuccessToast";


const UserEditForm = ({currentUser}) => {


    const {id, first_name, last_name, username, email} = currentUser;

    const [values, setValues] = useState({
        firstName: first_name,
        lastName: last_name,
        username: username,
        email: email,
        password: '',
        confirmPassword: '',
    })


    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alerts, setAlerts] = useState({})
    const [isUsernameAvailable, setIsUsernameAvailable] = useState('');
    const [isEmailAvailable, setIsEmailAvailable] = useState('');
    const [showToast, setShowToast] = useState(false);


    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setValues({
            ...values,
            [name]: value
        });
    }


    useEffect(() => {

        const {firstName, lastName, username, email, password} = values

        if (Object.keys(errors).length === 0 && isSubmitting) {
            changeDataUser(id, firstName, lastName, username, email, password, setErrors, setAlerts, setShowToast);
        }
    }, [errors]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateNewData(currentUser, values, setIsUsernameAvailable, setIsEmailAvailable));
        setIsSubmitting(true);
    }


    return (
        <Container className="ml-auto mr-auto">
            <Row className="p-3 mt-0 mb-4 justify-content-center">
                <div className={styles.formContainer}>
                    <Row md={8} className="pt-md-3 justify-content-center">
                        <h5 className="p-1">
                            Edycja Danych
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
                                        value={values.firstName}
                                        onChange={handleChange}
                                    />
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
                                        value={values.lastName}
                                        onChange={handleChange}
                                    />
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
                                        value={values.username}
                                        onChange={handleChange}
                                    />
                                    {errors.username && <p className={styles.error}>{errors.username}</p>}
                                    {isUsernameAvailable && <p className={styles.error}>{isUsernameAvailable}</p>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="text-center justify-content-center">
                            <Col>
                                <Form.Group controlId={values.password}>
                                    <Form.Label>Nowe hasło</Form.Label>
                                    <Form.Control
                                        className={`${errors.password && styles.inputError}`}
                                        type="password"
                                        name="password"
                                        placeholder="*********"
                                        onChange={handleChange}
                                    />
                                    {errors.password && <p className={styles.error}>{errors.password}</p>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="text-center justify-content-center">
                            <Col>
                                <Form.Group controlId={values.confirmPassword}>
                                    <Form.Label>Powtórz hasło</Form.Label>
                                    <Form.Control
                                        className={`${errors.password && styles.inputError}`}
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="*********"
                                        onChange={handleChange}
                                    />
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
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <p className={styles.error}>{errors.email}</p>}
                                    {isEmailAvailable && <p className={styles.error}>{isEmailAvailable}</p>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="text-center justify-content-center">
                            <Col md={10}>
                                <Button variant={"success"} type="submit" className="mb-1 mt-1 text-center w-50">
                                    <div className="float-left">
                                        <FontAwesomeIcon icon={faPen}/>
                                    </div>
                                    Edytuj
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Row>
            {alerts.success &&
            <SuccessToast
                message={alerts.success}
                showToast={showToast}
                setShowToast={setShowToast}
            />}
        </Container>
    )
}

export default UserEditForm;