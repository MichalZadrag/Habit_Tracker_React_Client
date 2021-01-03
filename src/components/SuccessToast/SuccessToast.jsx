import React from "react";
import styles from "./SuccessToast.module.css"
import {Toast} from "react-bootstrap";
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";


const SuccessToast = ({showToast, setShowToast, message}) => {

    return(
        <Toast
            className={styles.successToast}
            show={showToast}
            onClose={() => setShowToast(false)}
            delay={4000}
            autohide
        >
            <Toast.Header className={cx(styles.toastHeader, "p-2")} closeButton={false}>
                <FontAwesomeIcon className={"mr-1"} icon={faCheckCircle} />
                <strong className="mr-auto">{message}</strong>
            </Toast.Header>
        </Toast>
    );
}
export default SuccessToast