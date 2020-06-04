import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Nav from "react-bootstrap/Nav";
import CollapseButton from "../CollapseButton/CollapseButton";
import HabitAddFormModal from "../HabitAddFormModal/HabitAddFormModal";

const Navbar = (props) => {


    const [modalShow, setModalShow] = React.useState(false);

    return(
            <Nav className="navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse">
                    <CollapseButton
                        setIsSidebarActive = { props.setIsSidebarActive }
                        isSidebarActive = { props.isSidebarActive }
                    />
                    <div className="navbar-nav mr-auto center">

                    </div>
                    <div className="float-right">
                        <Button variant={"secondary"}
                                className={"btn mt-3"}
                                onClick={ () => setModalShow(true) }>
                            <div className="mr-2 float-left" >
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                            </div>
                            Dodaj
                        </Button>
                        <HabitAddFormModal
                            show = { modalShow }
                            onHide = { () => setModalShow(false) }
                            handleChangeHabit = { props.handleChangeHabit }
                            currentUser= { props.currentUser }
                        />
                    </div>
                </div>
            </Nav>
    )
}

export default Navbar;