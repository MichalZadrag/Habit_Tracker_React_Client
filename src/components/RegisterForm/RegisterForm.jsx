import React from "react";
import styles from './RegisterForm.module.css';
import {Button, Col, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const RegisterForm = () => {

    return(
        <div className={styles.wrapper}>
            <div className={styles.headerContainer}>
                <h2>Habit Tracker</h2>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.formHeader}>
                    <h5>Rejestracja</h5>
                </div>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="first_name">
                                <Form.Label>Imie</Form.Label>
                                <Form.Control type="text"  placeholder="Imie"/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="last_name">
                                <Form.Label>Nazwisko</Form.Label>
                                <Form.Control type="text"  placeholder="Nazwisko"/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="login">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="text" placeholder="Login"/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control type="password" placeholder="*********"/>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Email"/>
                    </Form.Group>
                    <Button variant={"success"} className={styles.loginButton}>
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