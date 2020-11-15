
import React from "react";
import {Button} from "react-bootstrap";
import styles from "./NoMatch.module.css"
import cx from 'classnames';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {ACCESS_TOKEN} from "../../constants";

const NoMatch = ({ setIsAuthenticated }) => {

    return (
        <div className="mb-0 mt-0 ml-auto mr-auto text-center">
            <h2 className="p-5">Habit Tracker</h2>
            <div className={cx("bg-secondary", "p-4", "rounded", styles.container)}>

                <h5>Coś poszło nie tak :( </h5>
                <Link to="/login">
                    <Button className="mt-2"
                            onClick={() =>
                            {
                                localStorage.removeItem(ACCESS_TOKEN);
                                setIsAuthenticated(false);
                            }}>
                        <FontAwesomeIcon icon={faSignInAlt}  className="mr-2"/>
                        Powrót do logowania
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default NoMatch;