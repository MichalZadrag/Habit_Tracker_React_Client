import React from "react";
import styles from './Navbar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import Nav from "react-bootstrap/Nav";
import cx from 'classnames';
import CollapseButton from "../CollapseButton/CollapseButton";
import HabitAddForm from "../HabitAddForm/HabitAddForm";

const Navbar = ({ onAddHabit, onDeleteHabit }) => {

    const [modalShow, setModalShow] = React.useState(false);

    return(
            <Nav className="navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse">
                    <CollapseButton />
                    <div className="navbar-nav mr-auto center">

                    </div>
                    <div className="float-right">
                        <Button variant={"secondary"}
                                className={cx("btn", styles.btnTeal ,"mt-3")}
                                onClick={ () => setModalShow(true) }>
                            <div className="mr-2 float-left" >
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                            </div>
                            Dodaj
                        </Button>
                        <Button variant={"secondary"}
                                className={cx("btn", styles.btnTeal ,"mt-3")}
                                onClick={ onDeleteHabit }>
                            <div className="mr-2 float-left" >
                                <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                            </div>
                            Usuń
                        </Button>
                        <HabitAddForm
                            show = { modalShow }
                            onHide = { () => setModalShow(false) }
                        />
                    </div>
                </div>
            </Nav>
    )
}

export default Navbar;