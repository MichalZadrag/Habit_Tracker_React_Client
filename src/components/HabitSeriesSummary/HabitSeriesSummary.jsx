import React, {useEffect, useState} from "react";
import {Card, Col, ListGroup, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import {changeDateBy, changeToCss, changeToIcon, setCurrentDaysDependOnDate} from "../../constants/utils";
import {fetchHabitData} from "../../api";
import WeekSeries from "../WeekSeries/WeekSeries";
import Badge from "react-bootstrap/Badge";
import cx from "classnames";
import styles from "../WeekSeries/WeekSeries.module.css";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";


const HabitSeriesSummary = ({currentUserId}) => {

    const [habits, setHabits] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentHabit, setCurrentHabit] = useState(null);
    const [maxSeries, setMaxSeries] = useState(0);
    const [startDate, setStartDate] = useState(changeDateBy(new Date(), 3, "-"));
    const [currentDays, setCurrentDays] = useState([]);


    const onClickData = (id) => {

        if (id === "left") {
            setStartDate(changeDateBy(startDate, 7, "-"));
        } else if (id === "right") {
            setStartDate(changeDateBy(startDate, 7, "+"));
        }

    }

    useEffect(() => {
        setCurrentDays(setCurrentDaysDependOnDate(startDate, 8));
    }, [startDate])


    const handleChange = (evt) => {
        const {value} = evt.target;
        setCurrentHabit(filterHabitDependOnName(value));
    }

    const filterHabitDependOnName = (name) => {
        return habits.find(habit => habit.habit_text === name);
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
            <Col lg={10}>
                <Card className="mt-5">
                    {isError && <div>Coś poszło nie tak ...</div>}
                    {isLoading ? (<Spinner
                            animation="border"
                            variant={"primary"}
                            className={"ml-auto mr-auto"}
                        />) :
                        (<Card.Footer>
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
                            <ListGroup.Item className="w-100 ml-auto mr-auto">
                                <Row className="justify-content-between text-center text-md-left">
                                    <Col md={5} xs={12}>
                                        <Row>
                                            <Col md={1}>
                                                <Badge variant="primary"
                                                       className={cx("h-100", "p-1", "mr-2", changeToCss(currentHabit.color))}> </Badge>
                                            </Col>
                                            <Col>
                                                <FontAwesomeIcon
                                                    icon={currentHabit &&
                                                    changeToIcon(currentHabit.icon)}
                                                />
                                                <span className="m-1">
                                                {currentHabit &&
                                                currentHabit.habit_text}
                                            </span>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={7} xs={12}>
                                        <Row className="justify-content-end">
                                            <Col xl={4} lg={5} md={6} xs={12}>
                                                <span>Najlepsza: {maxSeries}</span>
                                            </Col>
                                            <Col xl={4} lg={5} md={6} xs={12}>
                                                <span>Aktualna: {currentHabit.series}</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col className="text-center">
                                        <h4>Seria tygodniowa</h4>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center text-center">
                                    <Col xs={2}>
                                        <FontAwesomeIcon
                                            className={styles.pointer}
                                            onClick={() => onClickData("left")}
                                            icon={faAngleLeft}/>
                                    </Col>
                                    <Col xs={5}>
                                        {moment(startDate).format("DD.MM")}
                                        -
                                        {moment(currentDays[currentDays.length - 1].date).format("DD.MM")}
                                    </Col>
                                    <Col xs={2}>
                                        <FontAwesomeIcon
                                            className={styles.pointer}
                                            onClick={() => onClickData("right")}
                                            icon={faAngleRight}/>
                                    </Col>
                                </Row>
                                <WeekSeries
                                    habit={currentHabit}
                                    currentDays={currentDays}
                                />
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