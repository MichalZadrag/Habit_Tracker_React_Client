import React, {useState} from "react";
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {deleteHabitById, incrementSeriesInHabit} from "../../api";
import {changeToCss, changeToIcon} from "../../constants/utils";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import {Button, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import styles from "./Habit.module.css";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";


const Habit = ({habit, habits, setHabits}) => {

    const {id, icon, color, habit_text, done} = habit;
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [confirmModalShow, setConfirmModalShow] = useState(false);

    const refreshPage = () => {
        window.location.reload(false);
    }


    const renderButton = () => {

        if (done) {
            return (
                <Button
                    className="float-left"
                    variant="success"
                    size={"sm"}
                    disabled>
                    Zrobione!
                </Button>
            )
        } else {
            return (
                <Button
                    className="float-left"
                    variant="primary"
                    size={"sm"}
                    onClick={() => {setConfirmModalShow(true)}}>
                    Zrobione?
                </Button>
            )
        }

    }


    const deleteHabit = () => {
        const temp_id = id;
        deleteHabitById(id);
        const newHabits = habits.filter(habit => habit.id !== temp_id);
        setHabits(newHabits);
    }

    const incrementSeries = () => {
        incrementSeriesInHabit(id, refreshPage);
    }

    return (
        <ListGroup.Item className={cx("w-100", "ml-auto", "mr-auto", styles.backgroundColor)}>
            <Row className={"justify-content-between align-items-center"}>
                <Col xs={7}>
                    <Row>
                        <Col xs={1}>
                            <Badge variant="primary"
                                   className={cx("h-100", "p-1", "mr-2", changeToCss(color))}> </Badge>
                        </Col>
                        <Col xs={1}>
                            {changeToIcon(icon) && <FontAwesomeIcon icon={changeToIcon(icon)}/>}
                        </Col>
                        <Col lg={8} xs={9}>
                            <span className="p-1 m-1">{habit_text}</span>
                        </Col>
                    </Row>
                </Col>
                <Col xs={5}>
                    <Row className={"justify-content-end"}>
                        <Col xl={4} md={6} xs={6}>
                            {renderButton()}
                        </Col>
                        <Col xs={2}>
                            <div
                                role={"button"}
                                className={cx("mt-1", "text-danger", styles.cursorPointer)}
                                onClick={() => {setDeleteModalShow(true)}}>
                                <FontAwesomeIcon icon={faTrashAlt}/>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <ConfirmationModal
                    show={deleteModalShow}
                    onHide={() => setDeleteModalShow(false)}
                    handleData={deleteHabit}
                >
                </ConfirmationModal>
                <ConfirmationModal
                    show={confirmModalShow}
                    onHide={() => setConfirmModalShow(false)}
                    handleData={incrementSeries}
                >
                </ConfirmationModal>
            </Row>
        </ListGroup.Item>
    )
}

export default Habit;