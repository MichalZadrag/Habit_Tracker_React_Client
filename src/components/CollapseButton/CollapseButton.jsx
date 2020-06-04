import React from "react";
import styles from './CollapseButton.module.css';
import {Button} from "react-bootstrap";
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAlignLeft} from "@fortawesome/free-solid-svg-icons";

const CollapseButton = (props) => {

    return(
        <Button
            variant={"secondary"}
            className={cx("btn", styles.btnTeal ,"mt-3", "ml-4")}
            id="sidebarCollapse"
            onClick = { () => props.setIsSidebarActive(!props.isSidebarActive)}
        >
            <FontAwesomeIcon icon={faAlignLeft}></FontAwesomeIcon>
        </Button>
    )

}

export default CollapseButton;