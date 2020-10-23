import React, {useEffect, useState} from "react";
import styles from "./UserEditForm.module.css"
import {Button, Col, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import {changeDataUser} from "../../api";
import validateNewData from "./validateNewData";
import cx from "classnames";


const UserEditForm = ({currentUser}) => {

    const {id, first_name, last_name, username, email} = currentUser;

    const [values, setValues] = useState({
        firstName: first_name,
        lastName: last_name,
        username: username,
        email: email,
        password: '',
    })


    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alerts, setAlerts] = useState({})
    const [isUsernameAvailable, setIsUsernameAvailable] = useState('');
    const [isEmailAvailable, setIsEmailAvailable] = useState('');


    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setValues({
            ...values,
            [name]: value
        });
    }


    useEffect( () => {

        const {firstName, lastName, username, email, password} = values

        if (Object.keys(errors).length === 0 && isSubmitting) {
            changeDataUser(id, firstName, lastName, username, email, password, setErrors, setAlerts);
        }
    }, [errors]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateNewData(currentUser, values, setIsUsernameAvailable, setIsEmailAvailable));
        setIsSubmitting(true);
    }


    return (
        <div className={styles.wrapper}>
            {alerts.success && <p className={cx("text-center", styles.success)}>{alerts.success}</p>}
            <div className={styles.formContainer}>
                <div className={styles.formHeader}>
                    <h5>Edycja danych</h5>
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
                                    className ={`${errors.lastName && styles.inputError}`}
                                    type="text"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                />
                                {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId={values.username}>
                        <Form.Label>Login</Form.Label>
                        <Form.Control
                            className ={`${( errors.username || isUsernameAvailable )&& styles.inputError}`}
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p className={styles.error}>{errors.username}</p>}
                        {isUsernameAvailable && <p className={styles.error}>{isUsernameAvailable}</p>}
                    </Form.Group>
                    <Form.Group controlId={values.password}>
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control
                            className ={`${errors.password && styles.inputError}`}
                            type="password"
                            name="password"
                            placeholder="*********"
                            onChange={handleChange}
                        />
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </Form.Group>
                    <Form.Group controlId={values.email}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            className ={`${( errors.email || isEmailAvailable ) && styles.inputError}`}
                            type="text"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                        {isEmailAvailable && <p className={styles.error}>{isEmailAvailable}</p>}
                    </Form.Group>
                    <div className={styles.buttonContainer}>
                        <Button variant={"success"} type="submit" className={styles.editButton}>
                            <div className="mr-3 ml-1 float-left" >
                                <FontAwesomeIcon icon={faPen} />
                            </div>
                            Edytuj
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default UserEditForm;