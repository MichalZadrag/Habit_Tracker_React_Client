import React, {useEffect, useState} from "react";
import {CardGroup} from "react-bootstrap";
import EventCard from "../EventCard/EventCard";
import {changeDateBy, formatDate, setCurrentDaysDependOnDate} from "../../constants/utils";
import ChangeDataView from "../ChangeDataView/ChangeDataView";




const EventDeck = ({currentUserId}) => {


    const [todayDate, setTodayDate] = useState(new Date());
    const [laterDate, setLaterDate] = useState(changeDateBy(new Date(), 2, "+"));
    const [currentDays, setCurrentDays] = useState([{day: '', date: ''}]);

    useEffect(() => {
        setCurrentDays(setCurrentDaysDependOnDate(todayDate, 4));
    }, [laterDate])


    return (
        <div>
            <ChangeDataView
                todayDate = { todayDate }
                setTodayDate = { setTodayDate }
                laterDate = { laterDate }
                setLaterDate = { setLaterDate }
            />
            <CardGroup className={"ml-2 mr-2"}>
                {currentDays.map((currentDay, i) => (
                    <EventCard
                        key = { i }
                        date = { formatDate(currentDay.date) }
                        day = { currentDay.day }
                        currentUserId = { currentUserId }
                    />

                ))}
            </CardGroup>
        </div>
    )
}

export default EventDeck;