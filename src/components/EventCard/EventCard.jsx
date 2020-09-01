import React, {useState} from "react";
import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import styles from "../TaskCard/TaskCard.module.css";
import {currentDayToString} from "../../constants/utils";
import EventAddModal from "../EventAddModal/EventAddModal";


const EventCard = ({ day, currentUserId, date }) => {

    const [modalShow, setModalShow] = useState(false);

    return (
        <Card>
            <Card.Footer>
                <h5 className="text-muted float-left">{currentDayToString(day)}</h5>
                <Button
                    variant={"secondary"}
                    size={"sm"}
                    className={"pl-2 pr-2 float-right"}
                    onClick={ () => {
                        setModalShow(true);
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </Card.Footer>
            <Card.Body className="p-0">
                <ul className={cx(styles.listGroup, "list-unstyled")}>
                    <li>dupa</li>
                </ul>
            </Card.Body>
            <EventAddModal
                show = { modalShow }
                onHide = { () => setModalShow(false) }
                currentUserId = { currentUserId }
                date = { date }
            />
        </Card>
    )
}

export default EventCard;