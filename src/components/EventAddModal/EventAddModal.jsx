import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import styles from "../HabitAddModal/HabitAddModal.module.css";
import {COLORS} from "../../constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import validateEvent from "./validateEvent";
import {addNewEvent} from "../../api";

const EventAddModal = ({show, onHide, currentUserId, date}) => {

    const refreshPage = () => {
        window.location.reload(false);
    }

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [event, setEvent] = useState({
        eventText: '',
        color: '',
        user_id: '',
        date: ''
    });

    useEffect(() => {

        const { eventText, color } = event;
        if (Object.keys(errors).length === 0 && isSubmitting) {
            addNewEvent(eventText, color, currentUserId, date);
            setEvent({
                eventText: '',
                color: '',
                user_id: '',
                date: '',
            })
            onHide();
            refreshPage();
        }
    },[errors])

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setEvent({
            ...event,
            [name]: value
        });
    }


    const handleSubmit = (evt) => {
        evt.preventDefault();
        setErrors(validateEvent(event));
        setIsSubmitting(true);

    }

    return (
        <Modal
            show={ show }
            onHide={ onHide }
        >
            <Modal.Header closeButton className={styles.mHeader}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Dodaj wydarzenie
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.mBody}>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId={event.eventText}>
                        <Form.Label column sm="3">
                            Wydarzenie
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                className ={`${errors.eventText && styles.inputError}`}
                                type="text"
                                name="eventText"
                                onChange={ handleChange }
                            />
                            {errors.eventText && <p className={styles.error}>{errors.eventText}</p>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId={event.color} className="display-flex">
                        <Form.Label column sm="3">
                            Kolor
                        </Form.Label>
                        <div key={"event-color"} className="ml-5 mt-auto mb-auto ">
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
    )
}

export default EventAddModal;