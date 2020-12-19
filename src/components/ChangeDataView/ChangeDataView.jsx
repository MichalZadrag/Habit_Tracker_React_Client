import React, {useEffect} from "react";
import styles from './ChangeDataView.module.css';
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import cx from 'classnames';
import {appendLeadingZeroes, changeDateBy} from "../../constants/utils";


const ChangeDataView = ({todayDate, setTodayDate, laterDate, setLaterDate}) => {


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

    const changeDate = (action) => {
        setTodayDate(changeDateBy(todayDate, 3, action));
        setLaterDate(changeDateBy(laterDate, 3, action));
    }


    const onClickData = (id) => {

        if (id === "left") {
            changeDate("-");
        } else if (id === "right") {
            changeDate("+");
        }

    }

    return (
        <div className="mb-1">
            <Button
                variant={"primary"}
                className="btn mt-3 ml-2 pl-3 pr-3"
                onClick={() => onClickData("left")}
            >
                <FontAwesomeIcon size={"sm"} icon={faCaretLeft}/>
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
                <FontAwesomeIcon size={"sm"} icon={faCaretRight}/>
            </Button>
        </div>
    )

}

export default ChangeDataView;