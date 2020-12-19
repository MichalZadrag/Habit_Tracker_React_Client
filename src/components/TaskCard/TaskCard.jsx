import React, {useEffect, useState} from "react";
import {Button, Card, Spinner} from "react-bootstrap";
import Task from "../Task/Task";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import TaskAddModal from "../TaskAddModal/TaskAddModal";
import {fetchTaskData} from "../../api";
import {currentDayToString} from "../../constants/utils";
import ListGroup from "react-bootstrap/ListGroup";

const TaskCard = ({ day, currentUserId, date }) => {

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            setIsError(false);
            setIsLoading(true);
            setTasks(await fetchTaskData(currentUserId, setIsError));
            setIsLoading(false);
        }
        fetchAPI();

    },[currentUserId])

    const currentTasks = (date) => {


        return tasks.filter(task => task.date === date);
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
                        }}
                    >
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
                        (<ListGroup>
                            {currentTasks(date).map(task => (
                                <Task
                                    key = { task.id }
                                    task = { task }
                                    tasks = { currentTasks(date) }
                                    setTasks = { setTasks }
                                />))}
                        </ListGroup>)}
                </Card.Body>
                <TaskAddModal
                    show = { modalShow }
                    onHide = { () => setModalShow(false) }
                    currentUserId = { currentUserId }
                    date = { date }
                />
            </Card>
    )
}

export default TaskCard;