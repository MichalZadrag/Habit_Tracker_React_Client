import React from "react";
import styles from './Sidebar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faInfoCircle, faTasks} from "@fortawesome/free-solid-svg-icons";
import {faCalendarAlt, faCalendarCheck, faChartBar} from "@fortawesome/free-regular-svg-icons";


const Sidebar = () => {

    return(
            <nav className={ styles.sidebar }>
                <div className={styles.sidebarHeader}>
                    <h3>Habit Tracker</h3>
                </div>
                <ul  className="list-unstyled">
                    <li className="active">
                         <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                            <div className="mr-3 ml-1 float-left" >
                                <FontAwesomeIcon icon={faAddressBook} />
                            </div>
                            Michał Zadrąg
                        </a>
                        <ul className="collapse list-unstyled" id="homeSubmenu">
                            <li>
                                <a href="#">
                                    Moje konto
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    Edytuj dane
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    Wyloguj
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <div className="mr-3 ml-1 float-left" >
                                <FontAwesomeIcon icon={faTasks} />
                            </div>
                            Zadania
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="mr-3 ml-1 float-left" >
                                <FontAwesomeIcon   icon={faCalendarAlt} />
                            </div>
                            Wydarzenia
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="mr-3 ml-1 float-left" >
                                <FontAwesomeIcon icon={faCalendarCheck} />
                            </div>
                            Nawyki
                        </a>
                    </li>
                    <li>
                        <a href="statistics.html">
                            <div className="mr-3 ml-1 float-left" >
                                <FontAwesomeIcon  icon={faChartBar} />
                            </div>
                            Statystyki
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="mr-3 ml-1 float-left" >
                                <FontAwesomeIcon icon={faInfoCircle} />
                            </div>
                            Kontakt
                        </a>
                    </li>
                </ul>
                <footer>
                    Habit Tracker ©
                </footer>
            </nav>
    )
}

export default Sidebar;