import React, {useState} from "react";
import styles from './Habit.module.css';
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faInfo, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Moment from 'react-moment';
import {deleteHabitById} from "../../api";
import {changeToCss, changeToIcon} from "../../constants/utils";
import {DATES} from "../../constants";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";


const Habit = ({ habit, habits, setHabits }) => {

    const {id, icon, color, habit_text} = habit;
    const [modalShow, setModalShow] = useState(false);

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

    return(
            <ListGroup.Item className="d-flex w-100 ml-auto mr-auto">
                <div>
                    <Badge variant="primary" className={cx("h-100", "p-1", "mr-2", changeToCss(color))}> </Badge>
                    <div className="float-right mt-2">
                        <FontAwesomeIcon size={"lg"} icon={changeToIcon(icon)}/>
                        <span className="p-1 m-1">{habit_text}</span>
                    </div>
                </div>
                <div className="ml-auto mt-2">
                    <div className="checkbox-group float-left">
                        {datesToMoment().map((date, i) =>(<label className={styles.checkboxInline} key={i}>
                                <input className={styles.checkbox} type="checkbox" key={i}  value={date} />
                                {date}
                            </label>
                        ))}
                    </div>
                    <div
                        role={"button"}
                        className={"float-left mr-3 ml-3 text-success"}>
                        <FontAwesomeIcon size={"lg"} icon={faInfo} />
                    </div>
                    <div
                        role={"button"}
                        className={"float-left mr-1 text-danger"}
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