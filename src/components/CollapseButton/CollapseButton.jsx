import React from "react";
import styles from './CollapseButton.module.css';
import {Button} from "react-bootstrap";
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAlignLeft} from "@fortawesome/free-solid-svg-icons";

const CollapseButton = () => {

    return(
        <Button variant={"secondary"} className={cx("btn", styles.btnTeal ,"mt-3")} id="sidebarCollapse">
            <FontAwesomeIcon icon={faAlignLeft}></FontAwesomeIcon>
        </Button>
    )

}

export default CollapseButton;