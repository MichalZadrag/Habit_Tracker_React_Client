import React, {useEffect, useState} from "react";
import styles from './ChangeTaskView.module.css';
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import cx from 'classnames';
import {appendLeadingZeroes} from "../../constants/utils";



const ChangeTaskView = ({todayDate, setTodayDate, oneDayInMs, laterDate,  setLaterDate}) => {


    useEffect(() => {
        setFormattedDate();
    }, [laterDate]);


    useEffect(() => {
        setFormattedDate();
    }, [laterDate]);

    const setFormattedDate = () => {
        let formatted_todayDate = appendLeadingZeroes(todayDate.getDate()) +
            "." + appendLeadingZeroes(todayDate.getMonth() + 1);

        let formatted_threeDaysLaterDate = appendLeadingZeroes(laterDate.getDate()) +
            "." + appendLeadingZeroes(laterDate.getMonth() + 1);

        return `${formatted_todayDate} - ${formatted_threeDaysLaterDate}`;

    }

    const changeData = (action) => {
        if (action === "+") {
            setTodayDate(new Date(todayDate.getTime() + (3 * oneDayInMs)));
            setLaterDate(new Date(laterDate.getTime() + (3 * oneDayInMs)));
        } else if (action === "-") {
            setTodayDate(new Date(todayDate.getTime() - (3 * oneDayInMs)));
            setLaterDate(new Date(laterDate.getTime() - (3 * oneDayInMs)));
        }

    }


    const onClickData = (id) => {

        if (id === "left") {
           changeData("-");
        } else if (id === "right") {
            changeData("+");
        }

    }

    return (
        <div className="mb-1">
            <Button
                variant={"primary"}
                className="btn mt-3 ml-2 pl-3 pr-3"
                onClick={() => onClickData("left")}
            >
                <FontAwesomeIcon size={"sm"} icon={faCaretLeft}></FontAwesomeIcon>
            </Button>
            <Button
                className={cx("btn", "mt-3", "ml-2", "pl-4", "pr-4", styles.dataButton)}
            >
                {setFormattedDate()}
            </Button>
            <Button
                variant={"primary"}
                className="btn mt-3 ml-2 pl-3 pr-3"
                onClick={() => onClickData("right")}
            >
                <FontAwesomeIcon size={"sm"} icon={faCaretRight}></FontAwesomeIcon>
            </Button>
        </div>
    )

}

export default ChangeTaskView;