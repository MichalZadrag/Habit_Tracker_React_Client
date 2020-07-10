import React, {useEffect, useState} from "react";
import {CardGroup} from "react-bootstrap";
import TaskCard from "../TaskCard/TaskCard";
import ChangeTaskView from "../ChangeTaskView/ChangeTaskView";



const TaskDeck = (props) => {

    const [todayDate, setTodayDate] = useState(new Date());
    const [oneDayInMs, setOneDayInMs] = useState(86400000);
    const [laterDate, setLaterDate] = useState(new Date((new Date()).getTime() + (2 * oneDayInMs)));
    const [days, setDays] = useState(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
    const [currentDays, setCurrentDays] = useState([]);



    const setCurrentDaysDependOnDate = () => {
        let tempDays = [];
        let currentDay = todayDate.getDay();
        let i = 0;
        while (i < 3) {
            tempDays.push(days[currentDay]);
            if (currentDay === 6) {
                currentDay = 0;
            } else {
                currentDay++;
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
                oneDayInMs = { oneDayInMs }
                laterDate = { laterDate }
                setLaterDate = { setLaterDate }
            />
            <CardGroup className={"ml-2 mr-2"}>
                {currentDays.map((day, i) => (
                    <TaskCard
                        key = { i }
                        day = { day }
                        currentUser = { props.currentUser }
                    />
                ))}
            </CardGroup>
        </div>
    )
}


export default TaskDeck;