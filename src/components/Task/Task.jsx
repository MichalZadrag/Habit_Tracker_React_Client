import React from "react";
import styles from './Task.module.css'
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";

const Task = ({ task }) => {



    return(
        <div>
            <li className={cx(styles.listGroupItem, "p-2", "text-center")} >
                <div
                    role={"button"}
                    className={cx( "float-left" ,"pl-2", "pr-2", "text-success", styles.check)}
                    onClick={() => console.log("TEST")}>
                    <FontAwesomeIcon icon={faCheck} />
                </div>
                <small>{task.task_text}</small>
                <div
                    role={"button"}
                    className={cx( "float-right" ,"pl-2", "pr-2", "text-danger", styles.delete)}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </li>
        </div>
    )

}

export default Task