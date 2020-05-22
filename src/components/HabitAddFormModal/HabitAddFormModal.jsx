import React, {useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import styles from './HabitAddFormModal.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBiking, faBook, faDumbbell, faMoneyBillAlt, faPlus} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {ADD_HABIT_URL} from "../../constants";


const HabitAddFormModal = (props) => {

    const [habit, setHabit] = useState({
        habitText: '',
        icon: ''
    })

    const refreshPage = () => {
        window.location.reload(false);
    }


    const  handleChange = (evt) => {
        const value = evt.target.value;
        setHabit({
            ...habit,
            [evt.target.name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        axios.post(ADD_HABIT_URL, {
            habit_text: habit.habitText,
            icon: habit.icon
        }).then(r => console.log(r.data.message))

        refreshPage();
    }




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
                <Form onSubmit={handleSubmit} >
                    <Form.Group as={Row} controlId={habit.habitText}>
                        <Form.Label column sm="2">
                           Nawyk
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" name="habitText" onChange={handleChange} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId={habit.icon} className="display-flex">
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
                                    onChange={handleChange}
                                    name={"icon"}
                                    value={"faBiking"}
                                />
                                <Form.Check
                                    custom
                                    inline
                                    label=<FontAwesomeIcon icon={faBook} />
                                    type={"radio"}
                                    id={"custom-inline-checkbox-2"}
                                    name={"icon"}
                                    onChange={handleChange}
                                    value={"faBook"}
                                />
                                <Form.Check
                                    custom
                                    inline
                                    label=<FontAwesomeIcon icon={faDumbbell} />
                                    type={"radio"}
                                    id={"custom-inline-checkbox-3"}
                                    name={"icon"}
                                    onChange={handleChange}
                                    value={"faDumbbell"}
                                />
                                <Form.Check
                                    custom
                                    inline
                                    label=<FontAwesomeIcon icon={faMoneyBillAlt} />
                                    type={"radio"}
                                    id={"custom-inline-checkbox-4"}
                                    name={"icon"}
                                    onChange={handleChange}
                                    value={"faMoneyBillAlt"}
                                />
                            </div>
                    </Form.Group>
                    <Button variant={"primary"} type={"submit"}>
                        <div className="mr-2 float-left" >
                            <FontAwesomeIcon size="lg" icon={faPlus} />
                        </div>
                        Dodaj
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}


export default HabitAddFormModal;