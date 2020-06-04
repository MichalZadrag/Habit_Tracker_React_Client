import React, {useState} from "react";
import {CardGroup} from "react-bootstrap";
import TaskCard from "../TaskCard/TaskCard";



const TaskDeck = () => {


    const [days, setDays] = useState(["Poniedziałek", "Wtorek", "Środa"])


    return (
        <div>
            <CardGroup className={"mt-3 ml-2 mr-2"}>
                {days.map(day => (
                    <TaskCard
                        day = { day }
                    />
                ))}
            </CardGroup>
        </div>
    )
}


export default TaskDeck;