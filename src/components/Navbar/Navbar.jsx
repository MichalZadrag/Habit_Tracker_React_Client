import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from "react-bootstrap/Nav";
import cx from "classnames";
import styles from "./Navbar.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAlignLeft} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";

const Navbar = ({setIsSidebarActive, isSidebarActive}) => {


    return(
            <Nav className="navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse">
                    <Button
                        variant={"secondary"}
                        className={cx("btn", styles.btnTeal ,"mt-3", "ml-4")}
                        id="sidebarCollapse"
                        onClick = { () => setIsSidebarActive(!isSidebarActive)}
                    >
                        <FontAwesomeIcon icon={faAlignLeft} />
                    </Button>
                </div>
            </Nav>
    )
}

export default Navbar;