import React, {useEffect, useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faPalette, faPlus} from "@fortawesome/free-solid-svg-icons";
import styles from "../HabitAddModal/HabitAddModal.module.css";
import {addNewTask} from "../../api";
import {COLORS} from "../../constants";
import {validateTask} from "../../constants/validation";
import SuccessToast from "../SuccessToast/SuccessToast";


const TaskAddModal = ({show, onHide, currentUserId, date}) => {

    const [errors, setErrors] = useState({});
    const [alerts, setAlerts] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [task, setTask] = useState({
        taskText: '',
        color: '',
        user_id: '',
        date: ''
    });
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const {taskText, color} = task;
        if (Object.keys(errors).length === 0 && isSubmitting) {
            addNewTask(taskText, color, currentUserId, date, setAlerts, setShowToast);
            setTask({
                taskText: '',
                color: '',
                user_id: '',
                date: '',
            })
        }
    }, [errors])

    const handleChange = (evt) => {
        const {name, value} = evt.target;

        setTask({
            ...task,
            [name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setErrors(validateTask(task));
        setIsSubmitting(true);
        evt.target.reset();
        setShowToast(false);
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
        >
            <Modal.Header className={styles.mHeader}>
                {alerts.success &&
                <SuccessToast
                    message={alerts.success}
                    showToast={showToast}
                    setShowToast={setShowToast}
                />}
                <Modal.Title id="contained-modal-title-vcenter">
                    Dodaj zadanie
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.mBody}>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId={task.taskText}>
                        <Row className="justify-content-center text-center">
                            <Col xs={2}>
                                <Form.Label className="text-left">
                                    <FontAwesomeIcon icon={faAngleRight}/>
                                </Form.Label>
                            </Col>
                            <Col xs={9}>
                                <Form.Control
                                    className={`${errors.taskText && styles.inputError}`}
                                    type="text"
                                    name="taskText"
                                    onChange={handleChange}
                                />
                                {errors.taskText && <p className={styles.error}>{errors.taskText}</p>}
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId={task.color}>
                        <Row className="justify-content-center text-center">
                            <Col xs={1}>
                                <Form.Label className="text-center">
                                    <FontAwesomeIcon icon={faPalette}/>
                                </Form.Label>
                            </Col>
                            <Col xs={9}>
                                <div key={"task-color"} className="ml-5 mt-auto mb-auto ">
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


export default TaskAddModal;