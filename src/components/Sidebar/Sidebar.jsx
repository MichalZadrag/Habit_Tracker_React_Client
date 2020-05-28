import React, {useState} from "react";
import styles from './Sidebar.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faInfoCircle, faTasks} from "@fortawesome/free-solid-svg-icons";
import {faCalendarAlt, faCalendarCheck, faChartBar} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";
import {Collapse} from "react-bootstrap";


const Sidebar = ({ onLogout }) => {

    const [open, setOpen] = useState(false);

    return(
            <nav className={ styles.sidebar }>
                <div className={styles.sidebarHeader}>
                    <h3>Habit Tracker</h3>
                </div>
                <ul  className="list-unstyled">
                    <li className="active">
                         <Link to="#" role="button" onClick={() => setOpen(!open)} data-toggle="collapse"  aria-expanded={open} aria-controls="homeSubmenu" className="dropdown-toggle">
                            <div className="mr-3 ml-1 float-left" >
                                <FontAwesomeIcon icon={faAddressBook} />
                            </div>
                            Michał Zadrąg
                        </Link>
                        <Collapse in={open}>
                            <ul className="list-unstyled" id="homeSubmenu">
                                <li>
                                    <Link to="#" type="button" className={styles.collapseItem}>
                                        Moje konto
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" type="button" className={styles.collapseItem}>
                                        Edytuj dane
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" role="button" onClick={onLogout} className={styles.collapseItem}>
                                        Wyloguj
                                    </Link>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li>
                       <Link to="#">
                            <div className="mr-3 ml-1 float-left" >
                                <FontAwesomeIcon icon={faTasks} />
                            </div>
                            Zadania
                       </Link>
                    </li>
                    <li>
                        <Link to="#" role="button">
                            <div className="mr-3 ml-1 float-left" >
                                <FontAwesomeIcon   icon={faCalendarAlt} />
                            </div>
                            Wydarzenia
                        </Link>
                    </li>
                    <li>
                        <Link to="/habits">
                            <div className="mr-3 ml-1 float-left" >
                                <FontAwesomeIcon icon={faCalendarCheck} />
                            </div>
                            Nawyki
                        </Link>
                    </li>
                    <li>
                        <Link to="/statistics">
                            <div className="mr-3 ml-1 float-left" >
                                <FontAwesomeIcon  icon={faChartBar} />
                            </div>
                            Statystyki
                        </Link>
                    </li>
                    <li>
                        <Link to="#" role="button">
                            <div className="mr-3 ml-1 float-left" >
                                <FontAwesomeIcon icon={faInfoCircle} />
                            </div>
                            Kontakt
                        </Link>
                    </li>
                </ul>
                <footer>
                    Habit Tracker ©
                </footer>
            </nav>
    )
}

export default Sidebar;