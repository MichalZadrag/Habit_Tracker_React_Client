import React from "react";
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
import {Button, Form} from "react-bootstrap";
import {BrowserRouter as Router, Route} from 'react-router-dom';


const Habit = ({ habit_text, icon }) => {



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


    return(
        <div>
            <a href="#" >
                <li className={cx(styles.listGroupItem, "p-3")} >
                    <div className="mr-2 float-left" >
                        <FontAwesomeIcon icon={changeToIcon(icon)}></FontAwesomeIcon>
                    </div>
                    { habit_text }
                    <div className="float-right ml-3">
                        <Button variant={"primary"} size={"sm"}>
                            <FontAwesomeIcon size={"sm"} icon={faTrashAlt} />
                        </Button>
                    </div>
                    <div className="checkbox-group float-right">
                        {["Pon", "Wt", "Sr", "Czw", "Pt", "Sb", "Nd"].map((day) =>(
                            <label className={styles.checkboxInline} key={day}>
                                <input className={styles.checkbox} type="checkbox" key={day}  value={day} />
                                {day}
                            </label>
                        ))}
                    </div>
                </li>
            </a>
        </div>
    )
}

export default Habit;