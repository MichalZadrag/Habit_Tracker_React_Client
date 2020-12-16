import React, {useEffect, useState} from "react";
import {CardGroup} from "react-bootstrap";
import TaskCard from "../TaskCard/TaskCard";
import ChangeDataView from "../ChangeDataView/ChangeDataView";
import {changeDateBy, formatDate, setCurrentDaysDependOnDate} from "../../constants/utils";



const TaskDeck = ({currentUserId}) => {

    const [todayDate, setTodayDate] = useState(new Date());
    const [laterDate, setLaterDate] = useState(changeDateBy(new Date(), 2, "+"));
    const [currentDays, setCurrentDays] = useState([{day: '', date: ''}]);



    useEffect(() => {
        setCurrentDays(setCurrentDaysDependOnDate(todayDate,  4));
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
                    <TaskCard
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


export default TaskDeck;