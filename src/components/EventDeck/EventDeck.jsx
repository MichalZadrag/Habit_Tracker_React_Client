import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import EventCard from "../EventCard/EventCard";
import {changeDateBy, formatDate, setCurrentDaysDependOnDate} from "../../constants/utils";
import ChangeDataView from "../ChangeDataView/ChangeDataView";
import {TODAY_DATE} from "../../constants";


const EventDeck = ({currentUserId}) => {


    const [todayDate, setTodayDate] = useState(TODAY_DATE);
    const [laterDate, setLaterDate] = useState(changeDateBy(TODAY_DATE, 2, "+"));
    const [currentDays, setCurrentDays] = useState([{day: '', date: ''}]);

    useEffect(() => {
        setCurrentDays(setCurrentDaysDependOnDate(todayDate, 4));
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
                    <Col xl={4} key={i}>
                        <EventCard
                            key={i}
                            date={formatDate(currentDay.date)}
                            day={currentDay.day}
                            currentUserId={currentUserId}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default EventDeck;