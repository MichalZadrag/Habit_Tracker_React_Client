import React, {useState} from "react";
import styles from './Habit.module.css';
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faInfo, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Moment from 'react-moment';
import {deleteHabitById, incrementSeriesInHabit} from "../../api";
import {changeToCss, changeToIcon} from "../../constants/utils";
import {DATES} from "../../constants";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import {Button} from "react-bootstrap";


const Habit = ({ habit, habits, setHabits }) => {

    const {id, icon, color, habit_text} = habit;
    const [modalShow, setModalShow] = useState(false);
    const [questionButton, setQuestionButton] = useState(true);
    const [doneButton, setDoneButton] = useState(false);

    const datesToMoment = () => {

        let momentArray = DATES.map((date) => <Moment date={date} format="DD.MM"/>);

        return momentArray;
    }

    const deleteHabit = () => {
        const temp_id = id;
        deleteHabitById(id);
        const newHabits = habits.filter(habit => habit.id !== temp_id);
        setHabits(newHabits);
    }

    const incrementSeries = () => {
        setDoneButton(true);
        setQuestionButton(false);
        incrementSeriesInHabit(id);

    }

    return(
            <ListGroup.Item className="d-flex w-100 ml-auto mr-auto">
                <div>
                    <Badge variant="primary" className={cx("h-100", "p-1", "mr-2", changeToCss(color))}> </Badge>
                    <div className="float-right mt-2">
                        <FontAwesomeIcon icon={changeToIcon(icon)}/>
                        <span className="p-1 m-1">{habit_text}</span>
                    </div>
                </div>
                <div className="ml-auto mt-2">
                    {questionButton && (
                        <Button
                            className="float-left mr-4"
                            variant="primary"
                            onClick={ incrementSeries }>
                            Zrobione?
                        </Button>
                    )}
                    {doneButton && (
                        <Button className="float-left mr-4" variant="success" disabled>
                            Zrobione!
                        </Button>
                    )}
                    <div
                        role={"button"}
                        className={"float-left mr-1 mt-1 text-danger"}
                        onClick={() => setModalShow(true)}>
                        <FontAwesomeIcon size={"lg"} icon={faTrashAlt} />
                    </div>
                </div>
                <DeleteConfirmationModal
                    show = { modalShow }
                    onHide = { () => setModalShow(false) }
                    deleteData = { deleteHabit }
                >
                </DeleteConfirmationModal>
            </ListGroup.Item>
    )
}

export default Habit;