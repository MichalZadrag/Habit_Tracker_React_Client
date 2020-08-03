import React, {useState} from "react";
import styles from './Task.module.css'
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {deleteTaskById} from "../../api";
import {changeToCss} from "../../constants/utils";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

const Task = ({ task, tasks, setTasks }) => {

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
            <li className={cx(styles.listGroupItem, "p-2", "text-center", isDone && styles.isDone, changeToCss(task.color))} >
                <div
                    role={"button"}
                    className={cx( "float-left" ,"pl-2", "pr-2", "text-success", styles.check)}
                    onClick={() => setIsDone(!isDone)}>
                    <FontAwesomeIcon icon={faCheck} />
                </div>
                <small>{task.task_text}</small>
                <div
                    role={"button"}
                    className={cx( "float-right" ,"pl-2", "pr-2", "text-danger", styles.delete)}
                    onClick={() => setModalShow(true)}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </li>
            <DeleteConfirmationModal
                show = { modalShow }
                onHide = { () => setModalShow(false) }
                deleteData = { deleteTask }
            >
            </DeleteConfirmationModal>
        </div>
    )

}

export default Task