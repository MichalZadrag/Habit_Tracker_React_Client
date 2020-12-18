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

    }, [errors])


    const handleChange = (evt) => {
        const {name, value} = evt.target;

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


    return (
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
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group controlId={habit.habitText}>
                        <Row className="justify-content-center">
                            <Col xs={2}>
                                <Form.Label className="text-left">
                                    <FontAwesomeIcon icon={faAngleRight}/>
                                </Form.Label>
                            </Col>
                            <Col xs={8}>
                                <Form.Control
                                    className={`${errors.habitText && styles.inputError}`}
                                    type="text"
                                    name="habitText"
                                    onChange={handleChange}/>
                                {errors.habitText && <p className={styles.error}>{errors.habitText}</p>}
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId={habit.icon}>
                        <Row className="justify-content-center">
                            <Col xs={1}>
                                <Form.Label className="text-center">
                                    <FontAwesomeIcon icon={faAngleDoubleRight}/>
                                </Form.Label>
                            </Col>
                            <Col xs={9}>
                                <div key={"habit-icon"} className="ml-5 mt-auto mb-auto ">
                                    {ICONS.map((icon, i) => (
                                        <Form.Check
                                            type={"radio"}
                                            custom
                                            inline
                                            label={icon.tag}
                                            id={`icon ${i}`}
                                            key={`icon ${i}`}
                                            onChange={handleChange}
                                            name={"icon"}
                                            value={icon.string}
                                        />
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId={habit.color}>
                        <Row className="justify-content-center">
                            <Col xs={1}>
                                <Form.Label className="text-center">
                                    <FontAwesomeIcon icon={faPalette}/>
                                </Form.Label>
                            </Col>
                            <Col xs={9}>
                                <div key={"habit-color"} className="ml-5 mt-auto mb-auto ">
                                    {COLORS.map((color, i) => (
                                        <Form.Check
                                            type={"radio"}
                                            custom
                                            inline
                                            label={color.tag}
                                            id={`color ${i}`}
                                            key={`color ${i}`}
                                            onChange={handleChange}
                                            name={"color"}
                                            value={color.string}
                                        />
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Button variant={"primary"} type={"submit"}>
                        <div className="mr-2 float-left">
                            <FontAwesomeIcon size="lg" icon={faPlus}/>
                        </div>
                        Dodaj
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}


export default HabitAddModal;