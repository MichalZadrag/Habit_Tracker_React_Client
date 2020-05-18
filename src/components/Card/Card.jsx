import React from "react";
import styles from './Card.module.css';
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarCheck} from "@fortawesome/free-regular-svg-icons";

const Card = ({ card_text, icon }) => {

    return(
        <div className={cx(styles.card, "card")}>
            <a href="#">
                <div className="m-2" >
                    <FontAwesomeIcon icon={icon} size="4x" />
                </div>
                <div className="card-body">
                    <h6 className="card-title">{card_text}</h6>
                </div>
            </a>
        </div>
    )

}

export default Card;