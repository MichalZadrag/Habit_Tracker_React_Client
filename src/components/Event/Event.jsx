import React from "react";
import styles from "./Event.module.css"
import cx from "classnames";
import {changeToCss, changeToIcon} from "../../constants/utils";

const Event = ({ event, events, setEvents }) => {

    const {event_text, color, location} = event;

    return (
        <div>
            <li className={cx(styles.listGroupItem, "p-3", changeToCss(color))}>
                <small>{event_text}</small>
                <small>{location}</small>
            </li>
        </div>
    )
}

export default Event;