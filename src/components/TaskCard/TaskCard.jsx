import React, {useState} from "react";
import styles from './TaskCard.module.css';
import {Button, Card} from "react-bootstrap";
import cx from "classnames";
import Task from "../Task/Task";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const TaskCard = ({ day }) => {

    const [mondayTasks, setMondayTasks] = useState([
        {id: 0, task_text: 'Zrobić zakupy'},
        {id: 1, task_text: 'Praca domowa'},
        {id: 2, task_text: 'Sprzątanie'},
    ]);
    const [tuesdayTasks, setTuesdayTasks] = useState([
        {id: 0, task_text: 'Wizyta u lekarza'},
        {id: 1, task_text: 'Pranie'},
        {id: 2, task_text: 'Prezentacja do pracy'},
        {id: 3, task_text: 'Ugotować obiad'},
    ]);
    const [wednesdayTasks, setWednesdayTasks] = useState([
        {id: 0, task_text: 'Zmienić opony'},
        {id: 1, task_text: 'Kolokwium o 14 '},
    ]);

    const currentTasks = (day) => {

        let tasks = [];

        if (day === "Poniedziałek") {
            tasks = mondayTasks;
        } else if (day === "Wtorek") {
            tasks = tuesdayTasks;
        } else if (day === "Środa") {
            tasks = wednesdayTasks;
        }
        return tasks;
    }


    return(
        <Card>
            <Card.Footer>
                <h5 className="text-muted float-left">{day}</h5>
                <Button variant={"secondary"} size={"sm"}
                        className={"pl-2 pr-2 float-right"}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </Card.Footer>
            <Card.Body className="p-0">
                <ul className={cx(styles.listGroup, "list-unstyled")}>
                    {currentTasks(day).map(task => (
                        <Task
                            key = { task.id }
                            task = { task }
                        />
                    ))}
                </ul>
            </Card.Body>
        </Card>
    )
}

export default TaskCard;