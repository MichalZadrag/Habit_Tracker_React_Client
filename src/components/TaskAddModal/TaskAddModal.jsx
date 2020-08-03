import React, {useEffect, useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import styles from "../HabitAddFormModal/HabitAddFormModal.module.css";
import validateTask from "./validateTask";
import {addNewTask} from "../../api";
import {COLORS} from "../../constants";


const TaskAddModal = ({show, onHide, currentUserId, day, date}) => {

    const refreshPage = () => {
        window.location.reload(false);
    }

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [task, setTask] = useState({
        taskText: '',
        color: '',
        user_id: '',
        date: ''
    });

    useEffect(() => {

        const { taskText, color } = task;
        if (Object.keys(errors).length === 0 && isSubmitting) {
            addNewTask(taskText, color, currentUserId, date);
            setTask({
                taskText: '',
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

        setTask({
            ...task,
            [name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setErrors(validateTask(task));
        setIsSubmitting(true);

    }

    return(
        <Modal
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton className={styles.mHeader}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Dodaj zadanie
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.mBody}>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId={task.taskText}>
                        <Form.Label column sm="2">
                            Zadanie
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                name="taskText"
                                onChange={ handleChange }
                                 />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId={task.color} className="display-flex">
                        <Form.Label column sm="2">
                            Kolor
                        </Form.Label>
                        <div key={"task-color"} className="ml-5 mt-auto mb-auto ">
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


export default TaskAddModal;