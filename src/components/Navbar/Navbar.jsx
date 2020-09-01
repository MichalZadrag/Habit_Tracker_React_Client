import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Nav from "react-bootstrap/Nav";
import CollapseButton from "../CollapseButton/CollapseButton";
import HabitAddModal from "../HabitAddModal/HabitAddModal";

const Navbar = ({currentUserId, setIsSidebarActive, isSidebarActive}) => {


    const [modalShow, setModalShow] = React.useState(false);

    return(
            <Nav className="navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse">
                    <CollapseButton
                        setIsSidebarActive = { setIsSidebarActive }
                        isSidebarActive = { isSidebarActive }
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
                        <HabitAddModal
                            show = { modalShow }
                            onHide = { () => setModalShow(false) }
                            currentUserId = { currentUserId }
                        />
                    </div>
                </div>
            </Nav>
    )
}

export default Navbar;