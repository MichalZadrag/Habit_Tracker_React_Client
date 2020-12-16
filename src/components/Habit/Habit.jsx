import React, {useState} from "react";
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import {deleteHabitById, incrementSeriesInHabit} from "../../api";
import {changeToCss, changeToIcon} from "../../constants/utils";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import {Button} from "react-bootstrap";


const Habit = ({ habit, habits, setHabits }) => {

    const {id, icon, color, habit_text, done} = habit;
    const [modalShow, setModalShow] = useState(false);

    const refreshPage = () => {
        window.location.reload(false);
    }



    const renderButton = () => {

        if (done) {
            return (
                <Button className="float-left mr-4" variant="success" disabled>
                    Zrobione!
                </Button>
            )
        } else {
            return (
                <Button
                    className="float-left mr-4"
                    variant="primary"
                    onClick={ incrementSeries }>
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
        incrementSeriesInHabit(id);
        refreshPage();
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
                    {renderButton()}
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