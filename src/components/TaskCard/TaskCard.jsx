import React, {useEffect, useState} from "react";
import styles from './TaskCard.module.css';
import {Button, Card, Spinner} from "react-bootstrap";
import cx from "classnames";
import Task from "../Task/Task";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import TaskAddModal from "../TaskAddModal/TaskAddModal";
import {fetchTaskData} from "../../api";

const TaskCard = ({ day, currentUser }) => {

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            setIsError(false);
            setIsLoading(true)
            const id = currentUser.id;
            setTasks(await fetchTaskData(id, setIsError));
            setIsLoading(false);
        }
        fetchAPI();

    },[])

    const [modalShow, setModalShow] = useState(false);

    const currentTasks = (day) => {

        let currentTasks = [];

        switch (day) {
            case "Monday":
                currentTasks = tasks.filter(task => task.day === "Monday");
                break
            case "Tuesday":
                currentTasks = tasks.filter(task => task.day === "Tuesday");
                break
            case "Wednesday":
                currentTasks = tasks.filter(task => task.day === "Wednesday");
                break
            case "Thursday":
                currentTasks = tasks.filter(task => task.day === "Thursday");
                break
            case "Friday":
                currentTasks = tasks.filter(task => task.day === "Friday");
                break
            case "Saturday":
                currentTasks = tasks.filter(task => task.day === "Saturday");
                break
            case "Sunday":
                currentTasks = tasks.filter(task => task.day === "Sunday");
                break
        }

        return currentTasks;
    }


    const currentDayToString = (day) => {
        let dayToString = "";

        switch (day) {
            case "Monday":
                dayToString = "Poniedziałek";
                break
            case "Tuesday":
                dayToString = "Wtorek";
                break
            case "Wednesday":
                dayToString = "Środa";
                break
            case "Thursday":
                dayToString = "Czwartek";
                break
            case "Friday":
                dayToString = "Piątek";
                break
            case "Saturday":
                dayToString = "Sobota";
                break
            case "Sunday":
                dayToString = "Niedziela";
                break
        }

        return dayToString;
    }

    return(
            <Card>
                <Card.Footer>
                    <h5 className="text-muted float-left">{currentDayToString(day)}</h5>
                    <Button
                        variant={"secondary"}
                        size={"sm"}
                        className={"pl-2 pr-2 float-right"}
                        onClick={ () => setModalShow(true) }>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </Card.Footer>
                <Card.Body className="p-0">
                    {isError && <div>Something went wrong...</div>}
                    {isLoading ? (<Spinner
                            animation="border"
                            variant={"primary"}
                            className ={"ml-auto mr-auto"}
                        />) :
                        (<ul className={cx(styles.listGroup, "list-unstyled")}>
                            {currentTasks(day).map(task => (
                                <Task
                                    key = { task.id }
                                    task = { task }
                                    tasks = { currentTasks(day) }
                                    setTasks = { setTasks }
                                />))}
                        </ul>)}
                </Card.Body>
                <TaskAddModal
                    show = { modalShow }
                    onHide = { () => setModalShow(false) }
                    currentUser = { currentUser }
                    day = { day }
                />
            </Card>
    )
}

export default TaskCard;