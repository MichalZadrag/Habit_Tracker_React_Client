import React, {useEffect, useState} from "react";
import styles from './RegisterForm.module.css';
import {Button, Col, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import axios from 'axios';

const RegisterForm = () => {

    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    })


    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }


    const handleSubmit = (event) => {
        event.preventDefault();



        axios.post(`http://localhost:8080/api/auth/signup`, {
            first_name: state.firstName,
            last_name: state.lastName,
            username: state.username,
            email: state.email,
            password: state.password
        })
            .then(r => {
                console.log(r.data.message);
            })

     }

    return(
        <div className={styles.wrapper}>
            <div className={styles.headerContainer}>
                <h2>Habit Tracker</h2>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.formHeader}>
                    <h5>Rejestracja</h5>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group controlId={state.firstName}>
                                <Form.Label>Imie</Form.Label>
                                <Form.Control type="text" name="firstName" placeholder="Imie" onChange={handleChange}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={state.lastName}>
                                <Form.Label>Nazwisko</Form.Label>
                                <Form.Control type="text" name="lastName"  placeholder="Nazwisko" onChange={handleChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId={state.username}>
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="text" name="username" placeholder="Login" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId={state.password}>
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control type="password" name="password" placeholder="*********" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId={state.email}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email" placeholder="Email" onChange={handleChange}/>
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