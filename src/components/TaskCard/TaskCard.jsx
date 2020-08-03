import React, {useEffect, useState} from "react";
import styles from './TaskCard.module.css';
import {Button, Card, Spinner} from "react-bootstrap";
import cx from "classnames";
import Task from "../Task/Task";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import TaskAddModal from "../TaskAddModal/TaskAddModal";
import {fetchTaskData} from "../../api";

const TaskCard = ({ day, currentUserId, date }) => {

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            setIsError(false);
            setIsLoading(true);
            setTasks(await fetchTaskData(currentUserId, setIsError));
            setIsLoading(false);
        }
        fetchAPI();

    },[])

    const [modalShow, setModalShow] = useState(false);

    const currentTasks = (date) => {

        let currentTasks = tasks.filter(task => task.date === date);

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
                        onClick={ () => {
                            setModalShow(true);
                        }}>
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
                            {currentTasks(date).map(task => (
                                <Task
                                    key = { task.id }
                                    task = { task }
                                    tasks = { currentTasks(date) }
                                    setTasks = { setTasks }
                                />))}
                        </ul>)}
                </Card.Body>
                <TaskAddModal
                    show = { modalShow }
                    onHide = { () => setModalShow(false) }
                    currentUserId = { currentUserId }
                    day = { day }
                    date = { date }
                />
            </Card>
    )
}

export default TaskCard;