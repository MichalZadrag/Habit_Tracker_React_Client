import {Button, Col, FormControl, InputGroup, Modal, Row} from "react-bootstrap";
import styles from "./CurrentUserInfoModal.module.css";
import React from "react";
import {deleteUserById} from "../../api";
import DelayLink from 'react-delay-link';
import {Link} from "react-router-dom";
import {Sidebar} from "../index";
import {ACCESS_TOKEN} from "../../constants";

const CurrentUserInfoModal = ({show, onHide, currentUser, setIsAuthenticated}) => {

    const {id, first_name, last_name, username, email} = currentUser;

    return(
        <Modal
            show = { show }
            onHide = { onHide }
        >
            <Modal.Header className={styles.mHeader} closeButton>
                <Modal.Title>
                    Moje Konto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.mBody}>
                <InputGroup size="sm" className="mb-3 mt-1">
                    <InputGroup.Prepend>
                        <InputGroup.Text className={styles.lightBlue}>
                            Imie
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl type="text" value={first_name} readOnly className={"text-center"}/>
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text className={styles.lightBlue}>
                            Nazwisko
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl type="text" value={last_name} readOnly className={"text-center w-50"}/>
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text className={styles.lightBlue}>
                            Login
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl type="text" value={username} readOnly className={"text-center"}/>
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text className={styles.lightBlue}>
                        Email
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl type="text" value={email} readOnly className={"text-center"} />

            </InputGroup>
                <Row>
                    <Col className="text-center">
                        <Link to={"/userEditForm"}>
                            <Button variant={"primary"}
                                    onClick={ onHide }
                                    >
                                <small>Edytuj dane</small>
                            </Button>
                        </Link>
                    </Col>
                    <Col className="text-center">
                        <DelayLink delay={500} to="/login">
                            <Button variant={"danger"}
                                    onClick={() => {
                                        deleteUserById(id);
                                        localStorage.removeItem(ACCESS_TOKEN);
                                        setIsAuthenticated(false);
                                    }}
                            >
                                <small>Usuń konto</small>
                            </Button>
                        </DelayLink>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default CurrentUserInfoModal;