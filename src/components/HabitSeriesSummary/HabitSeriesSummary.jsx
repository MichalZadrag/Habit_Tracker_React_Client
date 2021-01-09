import React, {useEffect, useState} from "react";
import {Card, Col, ListGroup, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import {changeDateBy, changeToCss, changeToIcon} from "../../constants/utils";
import {fetchHabitData} from "../../api";
import cx from "classnames";
import moment from "moment";
import HabitChart from "../HabitChart/HabitChart";
import styles from "../HabitSeriesSummary/HabitSeriesSummary.module.css";


const HabitSeriesSummary = ({currentUserId}) => {

    const [habits, setHabits] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentHabit, setCurrentHabit] = useState(null);
    const [startDate] = useState(new Date());


    const handleChange = (evt) => {
        const {value} = evt.target;
        setCurrentHabit(filterHabitDependOnName(value));
    }

    const filterHabitDependOnName = (name) => {
        return habits.find(habit => habit.habit_text === name);
    }

    const displaySeriesDates = () => {

        let currentSeries = currentHabit.series;
        let lastDayOfSeries = moment(startDate).format("DD.MM");
        let firstDayOfSeries = moment(changeDateBy(startDate, currentSeries - 1, "-")).format("DD.MM");

        if (currentSeries === 0) {
            return "Brak serii";
        } else if (lastDayOfSeries === firstDayOfSeries) {
            return `${firstDayOfSeries}`;
        } else {
            return `${firstDayOfSeries} - ${lastDayOfSeries}`;
        }

    }

    useEffect(() => {
        const fetchAPI = async () => {
            setIsError(false);
            setIsLoading(true)
            setHabits(await fetchHabitData(currentUserId, setIsError));
            setIsLoading(false);
        }
        fetchAPI();
    }, [currentHabit])


    return (
        <Row className="justify-content-center ">
            {console.log(habits)}
            <Col xs={12} lg={10}>
                <Card className={"mt-3"}>
                    {isError && <div>Coś poszło nie tak ...</div>}
                    {isLoading ? (<Spinner
                            animation="border"
                            variant={"primary"}
                            className={"ml-auto mr-auto"}
                        />) :
                        (<Card.Footer className={styles.backgroundColor}>
                            <Row className={"justify-content-between align-items-center"}>
                                <Col xs={6}>
                                    <div>
                                        <FontAwesomeIcon icon={faClock} className={"mt-2 mr-2"}/>
                                        <span>Systematyczność</span>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <Row className={"align-items-center justify-content-end"}>
                                        <Col xs={5} className={"text-right"}>
                                            <span>Nawyk: </span>
                                        </Col>
                                        <Col lg={6} xs={7}>
                                            <select onChange={handleChange} defaultValue={"Wybierz"}
                                                    className="form-control"
                                                    id="example">
                                                <option value="Wybierz" disabled>Wybierz</option>
                                                {habits.map((habit, i) =>
                                                    <option
                                                        key={`option ${i}`}
                                                        value={habit.habit_text}
                                                    >
                                                        {habit.habit_text}
                                                    </option>
                                                )}
                                            </select>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Footer>)}
                    <Card.Body className="p-0">
                        <ListGroup>
                            {currentHabit &&
                            <ListGroup.Item className={cx("w-100", "ml-auto", "mr-auto", styles.backgroundColorElem)}>
                                <Row className="justify-content-center">
                                    <Col xs={4} className={"text-right"}>
                                        <FontAwesomeIcon
                                            icon={currentHabit &&
                                            changeToIcon(currentHabit.icon)}
                                        />
                                    </Col>
                                    <Col xs={5} className={"text-left"}>
                                        <h5>
                                            {currentHabit &&
                                            currentHabit.habit_text}
                                        </h5>
                                    </Col>
                                </Row>
                                <Row className={"text-center justify-content-center"}>
                                    <Col>
                                        <div
                                            className={cx("text-center", "w-100", changeToCss(currentHabit.color), "p-1", "rounded")}/>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col className="text-center">
                                        <h4>Seria</h4>
                                    </Col>
                                </Row>
                                <Row className={"mt-2 text-center justify-content-center"}>
                                    <Col xs={6}>
                                        <h6>Aktualna: {currentHabit.series}</h6>
                                    </Col>
                                    <Col xs={6}>
                                        <h6>Najlepsza: {currentHabit.max_series}</h6>
                                    </Col>
                                </Row>
                                <HabitChart
                                    currentSeries={currentHabit.series}
                                    currentHabit={currentHabit}
                                    maxSeries={currentHabit.max_series}
                                />
                                <Row className="mt-2">
                                    <Col className="text-center">
                                        <h6>Dni w których seria była wykonywana:</h6>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col className="text-center">
                                        <span>{displaySeriesDates()}</span>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            }
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}


export default HabitSeriesSummary;