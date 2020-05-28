import React from "react";
import styles from './Card.module.css';
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

const Card = ({ card_text, icon }) => {

    return(
        <div className={cx(styles.card, "card")}>
            <Link to="#" >
                <div className="m-2" >
                    <FontAwesomeIcon icon={icon} size="4x" />
                </div>
                <div className="card-body">
                    <h6 className="card-title">{card_text}</h6>
                </div>
            </Link>
        </div>
    )

}

export default Card;