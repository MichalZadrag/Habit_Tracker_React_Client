import React, {useState} from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import cx from 'classnames';
import styles from './CustomNavbar.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faTasks} from "@fortawesome/free-solid-svg-icons";
import CurrentUserInfoModal from "../CurrentUserInfoModal/CurrentUserInfoModal";
import {ACCESS_TOKEN} from "../../constants";
import {Link} from "react-router-dom";
import {faCalendarAlt, faCalendarCheck, faClock} from "@fortawesome/free-regular-svg-icons";


const CustomNavbar = ({setIsAuthenticated, currentUser}) => {

    const [modalShow, setModalShow] = useState(false);

    return (
        <Navbar className={cx("d-lg-none", "d-md-none", styles.navbarBackground)} expand="md">
            <Navbar.Brand className={styles.navbarBackground}>Habit Tracker</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown
                        title={<div className={cx("mr-1", "float-left", styles.fontColor)}>
                            <FontAwesomeIcon icon={faAddressBook}/>
                            <span className="ml-2">{currentUser.username}</span>
                        </div>}
                        id="basic-nav-dropdown"
                        className={styles.itemColor}
                    >
                        <NavDropdown.Item
                            onClick={() => {
                                setModalShow(true);
                            }}
                        >
                            Moje konto
                        </NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <Link to={
                            {
                                pathname: "/login",
                                state: {
                                    message: "Wylogowano"
                                }
                            }
                        }
                              role="button"
                              onClick={() => {
                                  localStorage.removeItem(ACCESS_TOKEN);
                                  setIsAuthenticated(false);
                              }}
                              className={"dropdown-item"}>
                            Wyloguj
                        </Link>
                    </NavDropdown>
                    <Nav.Link href="/tasks" className={styles.itemColor}>
                        <div className="mr-1 float-left">
                            <FontAwesomeIcon icon={faTasks}/>
                        </div>
                        <span className="ml-2">Zadania</span>
                    </Nav.Link>
                    <Nav.Link href="/events" className={styles.itemColor}>
                        <div className="mr-1 float-left">
                            <FontAwesomeIcon icon={faCalendarAlt}/>
                        </div>
                        <span className="ml-2">Wydarzenia</span>
                    </Nav.Link>
                    <Nav.Link href="/habits" className={styles.itemColor}>
                        <div className="mr-1 float-left">
                            <FontAwesomeIcon icon={faCalendarCheck}/>
                        </div>
                        <span className="ml-2">Nawyki</span>
                    </Nav.Link>
                    <Nav.Link href="/regularity" className={styles.itemColor}>
                        <div className="mr-1 float-left">
                            <FontAwesomeIcon icon={faClock}/>
                        </div>
                        <span className="ml-2">Systematyczność</span>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <CurrentUserInfoModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                currentUser={currentUser}
                setIsAuthenticated={setIsAuthenticated}
            />
        </Navbar>
    );
}
export default CustomNavbar;