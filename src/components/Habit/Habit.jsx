import React, {useState} from "react";
import styles from './Habit.module.css';
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBiking,
    faBook,
    faDumbbell,
    faMoneyBillAlt,
    faQuestion,
    faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import {Button} from "react-bootstrap";
import axios from 'axios';
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Moment from 'react-moment';


const Habit = ({ habit_text, icon, habit_id }) => {

    const [modalShow, setModalShow] = useState(false);


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
        const id = habit_id;
        const deleteUrl = `http://localhost:8080/api/habit/delete/${id}`
        axios.delete(deleteUrl)
            .then((r) => console.log(r.data.message))
        refreshPage();
    }

    const refreshPage = () => {
        window.location.reload(false);
    }

    const day1 = new Date();
    const day2 = new Date();
    const day3 = new Date();
    const day4 = new Date();
    day2.setDate(day1.getDate() + 1);
    day3.setDate(day1.getDate() + 2);
    day4.setDate(day1.getDate() + 3);

    return(
        <div>
            <Link to="#">
                <li className={cx(styles.listGroupItem, "p-3")} >
                    <div className="mr-2 float-left" >
                        <FontAwesomeIcon icon={changeToIcon(icon)}></FontAwesomeIcon>
                    </div>
                    { habit_text }
                    <Link to="#">
                        <div className={cx( "float-right" ,"ml-3" )}>
                            <Button variant={"secondary"} size={"sm"}
                                    className={cx("pl-2", "pr-2", styles.deleteIcon)}
                                    onClick={() => setModalShow(true)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                        </div>
                    </Link>
                    <div className="checkbox-group float-right">
                        {[<Moment date={day1} format="DD.MM"/>, <Moment date={(day2)}  format="DD.MM"/>,
                            <Moment date={day3} format="DD.MM"/>, <Moment date={day4} format="DD.MM"/>].map((date, i) =>(
                            <label className={styles.checkboxInline} key={i}>
                                <input className={styles.checkbox} type="checkbox" key={i}  value={date} />
                                {date}
                            </label>
                        ))}
                    </div>
                </li>
            </Link>
            <DeleteConfirmationModal
                show = { modalShow }
                onHide = { () => setModalShow(false) }
                handleDelete = { deleteHabit }
            >
            </DeleteConfirmationModal>
        </div>
    )
}

export default Habit;