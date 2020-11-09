import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import styles from "../HabitAddModal/HabitAddModal.module.css";
import {COLORS} from "../../constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faMapPin, faPalette, faPlus} from "@fortawesome/free-solid-svg-icons";
import {addNewEvent} from "../../api";
import {validateEvent} from "../../constants/validation";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import TimePicker from 'react-bootstrap-time-picker';
import {appendLeadingZeroes} from "../../constants/utils";

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
        date: '',
        location: '',
    });
    const [startTime, setStartTime] = useState("00:00:00");
    const [endTime, setEndTime] = useState("00:00:00");

    useEffect(() => {

        const { eventText, color, location } = event;
        if (Object.keys(errors).length === 0 && isSubmitting) {
            addNewEvent(eventText, color, currentUserId, date, location, startTime, endTime);
            setEvent({
                eventText: '',
                color: '',
                user_id: '',
                date: '',
                location: '',
            })
            setStartTime("00:00:00");
            setEndTime("00:00:00");
            onHide();
            refreshPage();
        }
    },[errors])

    const handleStartTimeChange = (time) => {
        setStartTime(secondsToHHmmss(time))
    }

    const handleEndTimeChange = (time) => {
        setEndTime(secondsToHHmmss(time));
    }


    const secondsToHHmmss = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor(seconds % 3600 / 60);
        const s = Math.floor(seconds % 3600 % 60);

        const hDisplay = appendLeadingZeroes(h);
        const mDisplay = appendLeadingZeroes(m);
        const sDisplay = appendLeadingZeroes(s);


        const time = hDisplay + ":" + mDisplay + ":" + sDisplay;

        return time;
    }

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
                        <Form.Label className="text-center" column sm="2">
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                className ={`${errors.eventText && styles.inputError}`}
                                type="text"
                                name="eventText"
                                onChange={ handleChange }
                            />
                            {errors.eventText && <p className={styles.error}>{errors.eventText}</p>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId={event.location}>
                        <Form.Label className="text-center" column  sm="2">
                            <FontAwesomeIcon icon={faMapPin} />
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                className ={`${errors.location && styles.inputError}`}
                                type="text"
                                name="location"
                                onChange={ handleChange }
                            />
                            {errors.location && <p className={styles.error}>{errors.location}</p>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId={event.color} className="display-flex">
                        <Form.Label column className="text-center" sm="2">
                            <FontAwesomeIcon icon={faPalette} />
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
                    <Form.Group as={Row} controlId={event.color} className="display-flex">
                        <Form.Label column className="text-center" sm="2">
                            <FontAwesomeIcon icon={faClock} />
                        </Form.Label>
                        <Col sm="3" className="ml-4">
                            <TimePicker
                                onChange={handleStartTimeChange}
                                format={24}
                                value={startTime}
                                step={15}
                            />
                        </Col>
                        <Col sm="0">
                            <Form.Text className="text-center">
                                <h5 className="mt-auto mb-auto">-</h5>
                            </Form.Text>
                        </Col>
                        <Col sm="3">
                            <TimePicker
                                onChange={handleEndTimeChange}
                                start={startTime}
                                format={24}
                                value={endTime}
                                step={15}
                            />
                        </Col>
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