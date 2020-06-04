import React, {useEffect, useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import styles from './HabitAddFormModal.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBiking, faBook, faCircle, faDumbbell, faMoneyBillAlt, faPlus} from "@fortawesome/free-solid-svg-icons";
import {addNewHabit} from "../../api";
import validateHabit from "./validateHabit";


const HabitAddFormModal = (props) => {

    const refreshPage = () => {
        window.location.reload(false);
    }

    const [habit, setHabit] = useState({
        habitText: '',
        icon: '',
        color: '',
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        console.log("USE EFFECT HABIT ADD FORM MODAL");

        const {habitText, icon, color} = habit;
        if (Object.keys(errors).length === 0 && isSubmitting) {
            addNewHabit(habitText, icon, color, props.currentUser.id);
            setHabit({
                habitText: '',
                icon: '',
                color: '',
                user_id: ''
            })
            props.onHide();
            refreshPage();
        }

    },[errors])




    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setHabit({
            ...habit,
            [name]: value
        });
    }

    const handleSubmit = (evt) => {

        evt.preventDefault();
        setErrors(validateHabit(habit))
        setIsSubmitting(true);

    }



    return(
        <Modal
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header closeButton className={styles.mHeader}>
                <Modal.Title id="contained-modal-title-vcenter  ">
                    Dodaj nawyk do śledzenia
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.mBody}>
                <Form onSubmit={ handleSubmit } noValidate>
                    <Form.Group as={Row} controlId={habit.habitText}>
                        <Form.Label column sm="2">
                           Nawyk
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                className ={`${errors.habitText && styles.inputError}`}
                                type="text"
                                name="habitText"
                                onChange={handleChange} />
                            {errors.habitText && <p className={styles.error}>{errors.habitText}</p>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId={habit.icon} className="display-flex">
                        <Form.Label column sm="2">
                            Ikona
                        </Form.Label>
                            <div key={"custom-inline-checkbox-i"} className="ml-5 mt-auto mb-auto ">
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
                    <Form.Group as={Row} controlId={habit.color} className="display-flex">
                        <Form.Label column sm="2">
                            Kolor
                        </Form.Label>
                        <div key={"custom-inline-checkbox-c"} className="ml-5 mt-auto mb-auto ">
                            <Form.Check
                                type={"radio"}
                                custom
                                inline
                                label=<FontAwesomeIcon className={styles.lightGreen} size="lg" icon={faCircle} />
                                id={"custom-inline-checkbox-c1"}
                                onChange={handleChange}
                                name={"color"}
                                value={"lightGreen"}
                            />
                            <Form.Check
                                custom
                                inline
                                label=<FontAwesomeIcon className={styles.salmon} size="lg" icon={faCircle} />
                                type={"radio"}
                                id={"custom-inline-checkbox-c2"}
                                name={"color"}
                                onChange={handleChange}
                                value={"salmon"}
                            />
                            <Form.Check
                                custom
                                inline
                                label=<FontAwesomeIcon className={styles.lightGrey}  size="lg" icon={faCircle} />
                                type={"radio"}
                                id={"custom-inline-checkbox-c3"}
                                name={"color"}
                                onChange={handleChange}
                                value={"lightGrey"}
                            />
                            <Form.Check
                                custom
                                inline
                                label=<FontAwesomeIcon className={styles.lightBlue} size="lg" icon={faCircle} />
                                type={"radio"}
                                id={"custom-inline-checkbox-c4"}
                                name={"color"}
                                onChange={handleChange}
                                value={"lightBlue"}
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