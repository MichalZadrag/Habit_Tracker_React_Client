import React, {useState} from "react";
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {deleteTaskById} from "../../api";
import {changeToCss} from "../../constants/utils";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

const Task = ({ task, tasks, setTasks }) => {

    const {task_text, color} = task

    const [isDone, setIsDone] = useState(false);
    const [modalShow, setModalShow] = useState(false);


    const deleteTask = () => {
        const id = task.id;
        deleteTaskById(id);
        const newTasks = tasks.filter(task => task.id !== id)
        setTasks(newTasks);
    }

    return(
        <div>
            <DeleteConfirmationModal
                show = { modalShow }
                onHide = { () => setModalShow(false) }
                deleteData = { deleteTask }
            >
            </DeleteConfirmationModal>
            <ListGroup.Item className={cx("d-flex", isDone && "bg-success")}>
                <div>
                    <Badge variant="primary" className={cx("h-100", "p-1", "mr-2", changeToCss(color))}> </Badge>
                    <div className="float-right">
                        {task_text}
                    </div>
                </div>
                <div className="ml-auto mb-auto mt-auto">
                    <div
                        role={"button"}
                        className={cx("float-left", "pl-2", "pr-2", "text-success", isDone && "invisible")}
                        onClick={() => setIsDone(!isDone)}>
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                    <div
                        role={"button"}
                        className={"float-left pl-2 text-danger"}
                        onClick={() => setModalShow(true)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </div>
                </div>
            </ListGroup.Item>
        </div>
    )

}

export default Task;