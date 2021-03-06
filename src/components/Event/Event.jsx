import React, {useState} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import {faMapPin, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Badge from "react-bootstrap/Badge";
import cx from "classnames";
import {changeToCss} from "../../constants/utils";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import {deleteEventById} from "../../api";
import styles from "../Event/Event.module.css";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

const Event = ({event, events, setEvents}) => {

    const {event_name, color, location, startTime, endTime} = event;

    const [modalShow, setModalShow] = useState(false);

    const deleteEvent = () => {
        const id = event.id;
        deleteEventById(id);
        const newEvents = events.filter(event => event.id !== id)
        setEvents(newEvents);
    }

    return (
        <ListGroup.Item className={cx("d-flex", styles.backgroundColor)}>
            <ConfirmationModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                handleData={deleteEvent}
            >
            </ConfirmationModal>
            <div>
                <Badge variant="primary" className={cx("h-100", "p-1", "mr-2", changeToCss(color))}> </Badge>
                <div className="float-right">
                    <p className="p-0 m-0">{event_name}</p>
                    <p className="p-0 m-0">
                        <small>
                            <FontAwesomeIcon icon={faMapPin} className="mr-1"/>
                            {location}
                        </small>
                    </p>
                    <p className="p-0 m-0">
                        <small>
                            <FontAwesomeIcon icon={faClock} className="mr-1"/>
                            {startTime.slice(0, 5)} - {endTime.slice(0, 5)}
                        </small>
                    </p>
                </div>
            </div>
            <div className="ml-auto mb-auto mt-auto">
                <div
                    role={"button"}
                    className={cx("float-left", "pl-2", "text-danger", styles.cursorPointer)}
                    onClick={() => setModalShow(true)}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </div>
            </div>
        </ListGroup.Item>
    )
}

export default Event;