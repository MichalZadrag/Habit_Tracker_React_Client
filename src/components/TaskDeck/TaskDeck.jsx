import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import TaskCard from "../TaskCard/TaskCard";
import ChangeDataView from "../ChangeDataView/ChangeDataView";
import {changeDateBy, formatDate, setCurrentDaysDependOnDate} from "../../constants/utils";



const TaskDeck = ({currentUserId}) => {

    const [todayDate, setTodayDate] = useState(new Date());
    const [laterDate, setLaterDate] = useState(changeDateBy(new Date(), 2, "+"));
    const [currentDays, setCurrentDays] = useState([{day: '', date: ''}]);



    useEffect(() => {
        setCurrentDays(setCurrentDaysDependOnDate(todayDate,  4));
    }, [laterDate, todayDate])


    return (
        <Container>
            <Row>
                <Col>
                    <ChangeDataView
                        todayDate={todayDate}
                        setTodayDate={setTodayDate}
                        laterDate={laterDate}
                        setLaterDate={setLaterDate}
                    />
                </Col>
            </Row>
            <Row>
                {currentDays.map((currentDay, i) => (
                    <Col xl={4} key = { i }>
                    <TaskCard
                        key = { i }
                        date = { formatDate(currentDay.date) }
                        day = { currentDay.day }
                        currentUserId = { currentUserId }
                    />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}


export default TaskDeck;