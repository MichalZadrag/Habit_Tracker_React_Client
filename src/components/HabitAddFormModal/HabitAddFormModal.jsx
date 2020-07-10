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

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [icons, setIcons] = useState([
        { tag: <FontAwesomeIcon icon={faBiking}/>, string: "faBiking" },
        { tag: <FontAwesomeIcon icon={faBook} />, string: "faBook" },
        { tag: <FontAwesomeIcon icon={faDumbbell} />, string: "faDumbbell" },
        { tag: <FontAwesomeIcon icon={faMoneyBillAlt} />, string: "faMoneyBillAlt" },
        ]);
    const [habit, setHabit] = useState({
        habitText: '',
        icon: '',
        color: '',
    });
    const [colors, setColors] = useState([
        { tag: <FontAwesomeIcon className={styles.lightGreen} size="lg" icon={faCircle} />, string: "lightGreen" },
        { tag: <FontAwesomeIcon className={styles.salmon} size="lg" icon={faCircle} />, string: "salmon" },
        { tag: <FontAwesomeIcon className={styles.lightGrey} size="lg" icon={faCircle} />, string: "lightGrey" },
        { tag: <FontAwesomeIcon className={styles.lightBlue} size="lg" icon={faCircle} />, string: "lightBlue" },

    ]);

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
                                onChange={ handleChange } />
                            {errors.habitText && <p className={styles.error}>{errors.habitText}</p>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId={habit.icon} className="display-flex">
                        <Form.Label column sm="2">
                            Ikona
                        </Form.Label>
                            <div key={"habit-icon"} className="ml-5 mt-auto mb-auto ">
                                {icons.map((icon, i) => (
                                    <Form.Check
                                        type = {"radio"}
                                        custom
                                        inline
                                        label = { icon.tag }
                                        id = {`icon ${i}`}
                                        key = {`icon ${i}`}
                                        onChange = { handleChange }
                                        name = {"icon"}
                                        value = { icon.string }
                                    />
                                ))}
                            </div>
                    </Form.Group>
                    <Form.Group as={Row} controlId={habit.color} className="display-flex">
                        <Form.Label column sm="2">
                            Kolor
                        </Form.Label>
                        <div key={"habit-color"} className="ml-5 mt-auto mb-auto ">
                            {colors.map((color, i) => (
                                <Form.Check
                                    type = {"radio"}
                                    custom
                                    inline
                                    label = {color.tag}
                                    id = {`color ${i}`}
                                    key = {`color ${i}`}
                                    onChange = { handleChange }
                                    name = {"color"}
                                    value = {color.string}
                                />
                            ))}
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