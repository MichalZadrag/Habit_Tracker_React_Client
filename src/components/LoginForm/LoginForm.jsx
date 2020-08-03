import React, {useEffect, useState} from "react";
import styles from './LoginForm.module.css';
import {Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import validateLogin from "./validateLogin";
import {useHistory} from 'react-router';
import cx from 'classnames';
import {login} from "../../api";


const LoginForm = ({setIsAuthenticated}) => {

    const history = useHistory();


    const [values, setValues] = useState({
        usernameOrEmail: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setValues({
            ...values,
            [name]: value
        });
    }

    useEffect( () => {

        console.log("USE EFFECT - LOGIN FORM");
        const { usernameOrEmail, password } = values

        if (Object.keys(errors).length === 0 && isSubmitting) {
            login(usernameOrEmail, password, setErrors, history, setIsAuthenticated);
        }
    }, [errors])

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateLogin(values));
        setIsSubmitting(true);


    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.headerContainer}>
                <h2>Habit Tracker</h2>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.formHeader}>
                    <h5>Logowanie</h5>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId={values.usernameOrEmail}>
                        <Form.Label>Podaj Login lub Email</Form.Label>
                        <Form.Control
                            type="text"
                            className = {`${( errors.usernameOrEmail || errors.overall ) && styles.inputError}`}
                            name="usernameOrEmail"
                            placeholder="Login lub Email"
                            onChange={handleChange}
                        />
                        {errors.usernameOrEmail && <p className={styles.error}>{errors.usernameOrEmail}</p>}
                    </Form.Group>
                    <Form.Group controlId={values.password}>
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control
                            type="password"
                            className = {`${( errors.password || errors.overall ) && styles.inputError}`}
                            name="password"
                            placeholder="*********"
                            onChange={handleChange}
                        />
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </Form.Group>
                    <Button
                        variant={"success"}
                        type={"submit"}
                        className={styles.loginButton}>
                        <div className="mr-3 ml-1 float-left" >
                            <FontAwesomeIcon icon={faSignInAlt} />
                        </div>
                        Zaloguj
                    </Button>
                    {errors.overall && <p className={cx(styles.error, "text-center", "mt-1")}>{errors.overall}</p>}
                    <hr/>
                    <Link to="/register">
                        <Button variant={"primary"} className={styles.loginButton}>
                            <div className="mr-3 ml-1 float-left" >
                                <FontAwesomeIcon icon={faUserPlus} />
                            </div>
                            Zarejestruj
                        </Button>
                    </Link>
                </Form>
            </div>
        </div>
    )
}

export default LoginForm;