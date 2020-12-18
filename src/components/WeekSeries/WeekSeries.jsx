import React, {useEffect, useRef, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./WeekSeries.module.css";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import moment from "moment";

import {Card, Spinner} from "react-bootstrap";


const WeekSeries = ({currentDays, habit}) => {

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
        <div>
            {isLoading ? (<Spinner
                    animation="border"
                    variant={"primary"}
                    className={"ml-auto mr-auto"}
                />) :
                (<Row className="justify-content-center mt-2 text-center">
                    <Col xl={10}>
                        <Row className={"align-items-center"}>
                            {currentDays.map((day, i) =>
                                <Col key={`col ${i}`} className={"mt-2"}>
                                        <span
                                            key={`span ${i}`}
                                            className={cx("border", "border-dark", decideBackgroundColor(day.isSeriesGood), "rounded-circle", "p-sm-1", "p-lg-2", styles.pointer)}
                                        >
                                            <small>{moment(day.date).format("DD.MM")}</small>
                                        </span>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>)}
        </div>
    )
}

export default WeekSeries;