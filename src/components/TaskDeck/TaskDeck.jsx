import React, {useEffect, useState} from "react";
import {CardGroup} from "react-bootstrap";
import TaskCard from "../TaskCard/TaskCard";
import ChangeTaskView from "../ChangeTaskView/ChangeTaskView";
import {changeDateBy, formatDate} from "../../constants/utils";
import {DAYS} from "../../constants";



const TaskDeck = ({currentUserId}) => {

    const [todayDate, setTodayDate] = useState(new Date());
    const [laterDate, setLaterDate] = useState(changeDateBy(new Date(), 2, "+"));
    const [currentDays, setCurrentDays] = useState([{day: '', date: ''}]);



    const setCurrentDaysDependOnDate = () => {
        let tempDays = [];
        let currentDay = todayDate.getDay();
        let currentDate = todayDate;
        let i = 1;
        while (i < 4) {
            tempDays.push({day: DAYS[currentDay], date: currentDate});
            if (currentDay === 6) {
                currentDay = 0;
            } else {
                currentDay++;
                currentDate = changeDateBy(todayDate, i, "+");
            }
            i++;
        }
        setCurrentDays(tempDays);
    }

    useEffect(() => {
        setCurrentDaysDependOnDate();
    }, [laterDate])


    return (
        <div>
            <ChangeTaskView
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