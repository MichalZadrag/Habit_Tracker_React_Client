import React, {useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import styles from './HabitAddForm.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBiking, faBook, faDumbbell, faPlus, faSignInAlt, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


const HabitAddForm = (props) => {

    const [radio, setState] =useState('');

     const onClick = nr => () => {
        setState(nr);
    };


    return(
        <Modal
            {...props}
        >
            <Modal.Header closeButton className={styles.mHeader}>
                <Modal.Title id="contained-modal-title-vcenter  ">
                    Dodaj nawyk do śledzenia
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.mBody}>
                <Form>
                    <Form.Group as={Row} controlId="habit">
                        <Form.Label column sm="2">
                           Nawyk
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="habit" classname="display-flex">
                        <Form.Label column sm="2">
                            Ikona
                        </Form.Label>
                            <div key={"custom-inline-checkbox"} className="ml-5 mt-auto mb-auto ">
                                <Form.Check
                                    type={"radio"}
                                    custom
                                    inline
                                    label=<FontAwesomeIcon icon={faBiking} />
                                    id={"custom-inline-checkbox-1"}
                                    onClick={onClick(1)}
                                    checked={radio === 1}
                                />
                                <Form.Check
                                    custom
                                    inline
                                    label=<FontAwesomeIcon icon={faBook} />
                                    type={"radio"}
                                    id={"custom-inline-checkbox-2"}
                                    value={"test"}
                                    onClick={onClick(2)}
                                    checked={radio === 2}
                                />
                                <Form.Check
                                    custom
                                    inline
                                    label=<FontAwesomeIcon icon={faDumbbell} />
                                    type={"radio"}
                                    id={"custom-inline-checkbox-3"}
                                    value={"test"}
                                    onClick={onClick(3)}
                                    checked={radio === 3}
                                />
                            </div>
                    </Form.Group>

                    <Button variant={"primary"}>
                        <div className="mr-2 float-left" >
                            <FontAwesomeIcon size="lg" icon={faPlus} />
                        </div>
                        Dodaj
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default HabitAddForm;