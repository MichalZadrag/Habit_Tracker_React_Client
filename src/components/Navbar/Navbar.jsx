import React from "react";
import styles from './Navbar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAlignLeft, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import Nav from "react-bootstrap/Nav";
import cx from 'classnames';

const Navbar = ({ onAddHabit, onDeleteHabit }) => {

    return(
            <Nav className="navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse">
                    <Button variant={"secondary"} className={cx("btn", styles.btnTeal ,"mt-3")}>
                        <FontAwesomeIcon icon={faAlignLeft}></FontAwesomeIcon>
                    </Button>
                    <div className="navbar-nav mr-auto center">

                    </div>
                    <div className="float-right">
                        <Button variant={"secondary"}
                                className={cx("btn", styles.btnTeal ,"mt-3")}
                                onClick={ onAddHabit }>
                            <div className="mr-2 float-left" >
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                            </div>
                            Dodaj
                        </Button>
                        <Button variant={"secondary"}
                                className={cx("btn", styles.btnTeal ,"mt-3")}
                                onClick={ onDeleteHabit }
                        >
                            <div className="mr-2 float-left" >
                                <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                            </div>
                            Usuń
                        </Button>
                    </div>
                </div>
            </Nav>
    )
}

export default Navbar;