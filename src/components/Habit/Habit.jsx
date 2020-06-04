import React, {useState} from "react";
import styles from './Habit.module.css';
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBiking,
    faBook,
    faDumbbell, faInfo,
    faMoneyBillAlt,
    faQuestion,
    faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Moment from 'react-moment';
import stylesCustom from '../HabitAddFormModal/HabitAddFormModal.module.css'
import {deleteHabitById} from "../../api";


const Habit = ({ habit, habits, setHabits }) => {

    const {id, icon, color, habit_text} = habit
    const [modalShow, setModalShow] = useState(false);


    const changeToCss = (color) => {
        let cssClass = '';
        if (color === "salmon") {
            cssClass = stylesCustom.salmonBg;
        } else if(color === "lightGreen") {
            cssClass = stylesCustom.lightGreenBg;
        } else if (color === "lightGrey") {
            cssClass = stylesCustom.lightGreyBg;
        } else if (color === "lightBlue") {
            cssClass = stylesCustom.lightBlueBg;
        } else {
            cssClass = stylesCustom.lightGreyBg;
        }
        return cssClass;
    }


    const changeToIcon = (icon) => {
        let test = '';
        if (icon === "faBook") {
             test = faBook;
        } else if(icon === "faBiking") {
             test = faBiking;
        } else if (icon === "faDumbbell") {
            test = faDumbbell;
        } else if (icon === "faMoneyBillAlt") {
            test = faMoneyBillAlt;
        } else {
            test = faQuestion;
        }
        return test;
    }

    const deleteHabit = () => {
        const temp_id = id;
        deleteHabitById(id);
        const newHabits = habits.filter(habit => habit.id !== temp_id);
        setHabits(newHabits);
    }


    const day1 = new Date();
    const day2 = new Date();
    const day3 = new Date();
    const day4 = new Date();
    day2.setDate(day1.getDate() + 1);
    day3.setDate(day1.getDate() + 2);
    day4.setDate(day1.getDate() + 3);

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
                    {[<Moment date={day1} format="DD.MM"/>, <Moment date={(day2)}  format="DD.MM"/>,
                        <Moment date={day3} format="DD.MM"/>, <Moment date={day4} format="DD.MM"/>].map((date, i) =>(<label className={styles.checkboxInline} key={i}>
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