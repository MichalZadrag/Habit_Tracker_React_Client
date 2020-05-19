import React from "react";
import styles from './LoginForm.module.css';
import {Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const LoginForm = () => {

    return(
        <div className={styles.wrapper}>
            <div className={styles.headerContainer}>
                <h2>Habit Tracker</h2>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.formHeader}>
                    <h5>Logowanie</h5>
                </div>
                <Form>
                    <Form.Group controlId="usernameOrLogin">
                        <Form.Label>Podaj Login lub Email</Form.Label>
                        <Form.Control type="text" placeholder="Login lub Email"/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control type="password" placeholder="*********"/>
                    </Form.Group>
                    <Button variant={"success"} className={styles.loginButton}>
                        <div className="mr-3 ml-1 float-left" >
                            <FontAwesomeIcon icon={faSignInAlt} />
                        </div>
                        Zaloguj
                    </Button>
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