import React, {useEffect, useRef, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./WeekSeries.module.css";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import moment from "moment";

import {Card, Spinner} from "react-bootstrap";


const WeekSeries = ({currentDays, onClickData, habit}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentHabit, setCurrentHabit] = useState(habit);





    useEffect(() => {
        setCurrentHabit(habit);
        setGreen();
        setIsLoading(false);
    })

    const setGreen = () => {
        let currentSeries = currentHabit.series;
        for (let i = 3; i >= 0; i--) {
            if (currentSeries !== 0) {
                currentDays[i].isSeriesGood = true;
                currentSeries--;
            } else {
                currentDays[i].isSeriesGood = false;
            }
        }
    }

    const decideBackgroundColor = (isSeriesGood) => {

        if (isSeriesGood) {
            return "bg-success";
        } else {
            return "bg-light";
        }
    }

    return (
        <div className="text-center mt-3 pt-2 pb-2">
            {isLoading ? (<Spinner
                    animation="border"
                    variant={"primary"}
                    className={"ml-auto mr-auto"}
                />) :
                (<Row>
                    <Col sm>
                        <FontAwesomeIcon
                            size="lg"
                            className={styles.pointer}
                            onClick={() => onClickData("left")}
                            icon={faAngleLeft}/>
                    </Col>
                    {currentDays.map((day, i) =>
                        <Col key={`col ${i}`} sm>
                        <span
                            key={`span ${i}`}
                            className={cx("border", "border-dark", decideBackgroundColor(day.isSeriesGood), "rounded-circle", "p-2", styles.pointer)}
                        >
                            {moment(day.date).format("DD.MM")}
                        </span>
                        </Col>
                    )}
                    <Col sm>
                        <FontAwesomeIcon
                            size="lg"
                            className={styles.pointer}
                            onClick={() => onClickData("right")}
                            icon={faAngleRight}/>
                    </Col>
                </Row>)}
        </div>
    )
}

export default WeekSeries;