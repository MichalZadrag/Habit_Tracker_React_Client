import React, {useState} from "react";
import styles from './Habit.module.css';
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faInfo, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Moment from 'react-moment';
import {deleteHabitById} from "../../api";
import {changeToCss, changeToIcon} from "../../constants/utils";


const Habit = ({ habit, habits, setHabits }) => {

    const [oneDayInMs, setOneDayInMs] = useState(86400000);
    const [dates, setDates] = useState([
        new Date(),
        new Date((new Date()).getTime() + (1 * oneDayInMs)),
        new Date((new Date()).getTime() + (2 * oneDayInMs)),
        new Date((new Date()).getTime() + (3 * oneDayInMs)),
    ]);
    const {id, icon, color, habit_text} = habit;
    const [modalShow, setModalShow] = useState(false);

    const datesToMoment = () => {

        let momentArray = dates.map((date) => <Moment date={date} format="DD.MM"/>);

        return momentArray;
    }

    const deleteHabit = () => {
        const temp_id = id;
        deleteHabitById(id);
        const newHabits = habits.filter(habit => habit.id !== temp_id);
        setHabits(newHabits);
    }

    return(
        <div className="ml-3">
            <li className={cx(styles.listGroupItem, "p-3", changeToCss(color))} >
                <div className="mr-2 float-left" >
                    <FontAwesomeIcon icon={changeToIcon(icon)}></FontAwesomeIcon>
                </div>
                { habit_text }
                <div className={cx( "float-right" ,"ml-3" )}>
                    <Button variant={"primary"} size={"sm"}
                            className={cx("pl-3", "pr-3", styles.infoIcon)}>
                        <FontAwesomeIcon icon={faInfo} />
                    </Button>
                </div>
                <div className={cx( "float-right" ,"ml-3" )}>
                    <Button variant={"secondary"} size={"sm"}
                            className={cx("pl-2", "pr-2", styles.deleteIcon)}
                            onClick={() => setModalShow(true)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                </div>
                <div className="checkbox-group float-right">
                    {datesToMoment().map((date, i) =>(<label className={styles.checkboxInline} key={i}>
                            <input className={styles.checkbox} type="checkbox" key={i}  value={date} />
                            {date}
                        </label>
                    ))}
                </div>
            </li>
            <DeleteConfirmationModal
                show = { modalShow }
                onHide = { () => setModalShow(false) }
                deleteHabit = { deleteHabit }
            >
            </DeleteConfirmationModal>
        </div>
    )
}

export default Habit;