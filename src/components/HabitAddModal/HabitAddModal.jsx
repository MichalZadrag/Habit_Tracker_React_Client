import React, {useEffect, useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import styles from './HabitAddModal.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleRight, faAngleRight, faPalette, faPlus} from "@fortawesome/free-solid-svg-icons";
import {addNewHabit} from "../../api";
import {COLORS, ICONS} from "../../constants";
import {validateHabit} from "../../constants/validation";


const HabitAddModal = ({show, onHide, currentUserId}) => {

    const refreshPage = () => {
        window.location.reload(false);
    }

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [habit, setHabit] = useState({
        habitText: '',
        icon: '',
        color: '',
    });
    useEffect(() => {
        console.log("USE EFFECT HABIT ADD FORM MODAL");

        const {habitText, icon, color} = habit;
        if (Object.keys(errors).length === 0 && isSubmitting) {
            addNewHabit(habitText, icon, color, currentUserId);
            setHabit({
                habitText: '',
                icon: '',
                color: '',
                user_id: ''
            })
            onHide();
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
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton className={styles.mHeader}>
                <Modal.Title id="contained-modal-title-vcenter  ">
                    Dodaj nawyk do śledzenia
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.mBody}>
                <Form onSubmit={ handleSubmit } noValidate>
                    <Form.Group as={Row} controlId={habit.habitText}>
                        <Form.Label className="text-center" column sm="2">
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                className ={`${errors.habitText && styles.inputError}`}
                                type="text"
                                name="habitText"
                                onChange={ handleChange } />
                            {errors.habitText && <p className={styles.error}>{errors.habitText}</p>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId={habit.icon} className="display-flex">
                        <Form.Label column className="text-center" sm="2">
                            <FontAwesomeIcon icon={faAngleDoubleRight} />
                        </Form.Label>
                            <div key={"habit-icon"} className="ml-5 mt-auto mb-auto ">
                                {ICONS.map((icon, i) => (
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
                        <Form.Label column className="text-center" sm="2">
                            <FontAwesomeIcon icon={faPalette} />
                        </Form.Label>
                        <div key={"habit-color"} className="ml-5 mt-auto mb-auto ">
                            {COLORS.map((color, i) => (
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


export default HabitAddModal;