import React, {useState} from "react";
import styles from './Sidebar.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faTasks} from "@fortawesome/free-solid-svg-icons";
import {faCalendarAlt, faCalendarCheck, faClock} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";
import {Collapse} from "react-bootstrap";
import {ACCESS_TOKEN} from "../../constants";
import CurrentUserInfoModal from "../CurrentUserInfoModal/CurrentUserInfoModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';


const Sidebar = ({setIsAuthenticated, currentUser}) => {


    const [open, setOpen] = useState(false);
    const [modalShow, setModalShow] = useState(false);



    return (
        <nav
            className={styles.sidebar}
        >
            <div className={styles.sidebarHeader}>
                <h3>Habit Tracker</h3>
            </div>
            <ul className="list-unstyled">
                <li className="active">
                    <Link to="#" role="button" onClick={() => setOpen(!open)} data-toggle="collapse"
                          aria-expanded={open} aria-controls="homeSubmenu" className="dropdown-toggle">
                        <div className="mr-3 ml-1 float-left">
                            <FontAwesomeIcon icon={faAddressBook}/>
                        </div>
                        {currentUser.username}
                    </Link>
                    <Collapse in={open}>
                        <ul className="list-unstyled" id="homeSubmenu">
                            <li>
                                <Link to="#" type="button"
                                      onClick={() => {
                                          setModalShow(true);
                                      }}
                                      className={styles.collapseItem}>
                                    Moje konto
                                </Link>
                            </li>
                            <li>
                                <Link to={
                                    {
                                        pathname: "/login",
                                        state: {
                                            message: "Wylogowano",
                                            showToast: true,
                                        }
                                    }
                                }
                                      role="button"
                                      onClick={() => {
                                          localStorage.removeItem(ACCESS_TOKEN);
                                          setIsAuthenticated(false);
                                      }}
                                      className={styles.collapseItem}>
                                    Wyloguj
                                </Link>
                            </li>
                        </ul>
                    </Collapse>
                </li>
                <li>
                    <Link to="/tasks" role="button">
                        <div className="mr-3 ml-1 float-left">
                            <FontAwesomeIcon icon={faTasks}/>
                        </div>
                        Zadania
                    </Link>
                </li>
                <li>
                    <Link to="/events" role="button">
                        <div className="mr-3 ml-1 float-left">
                            <FontAwesomeIcon icon={faCalendarAlt}/>
                        </div>
                        Wydarzenia
                    </Link>
                </li>
                <li>
                    <Link to="/habits">
                        <div className="mr-3 ml-1 float-left">
                            <FontAwesomeIcon icon={faCalendarCheck}/>
                        </div>
                        Nawyki
                    </Link>
                </li>
                <li>
                    <Link to="/regularity">
                        <div className="mr-3 ml-1 float-left">
                            <FontAwesomeIcon icon={faClock}/>
                        </div>
                        Systematyczność
                    </Link>
                </li>
            </ul>
            <footer>
                Habit Tracker ©
            </footer>
            <CurrentUserInfoModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                currentUser={currentUser}
                setIsAuthenticated={setIsAuthenticated}
            />

        </nav>
    )
}

export default Sidebar;