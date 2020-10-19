import React, {useEffect, useState} from "react";
import {Button, Card, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import styles from "../TaskCard/TaskCard.module.css";
import {currentDayToString} from "../../constants/utils";
import EventAddModal from "../EventAddModal/EventAddModal";
import Task from "../Task/Task";
import {fetchEventData} from "../../api";


const EventCard = ({ day, currentUserId, date }) => {


    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            setIsError(false);
            setIsLoading(true);
            setEvents(await fetchEventData(currentUserId, setIsError));
            setIsLoading(false);
        }
        fetchAPI();

    },[])


    const currentEvents = (date) => {

        let currentEvents = events.filter(event => event.date === date);

        return currentEvents;

    }

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
                {isError && <div>Something went wrong...</div>}
                {isLoading ? (<Spinner
                        animation="border"
                        variant={"primary"}
                        className ={"ml-auto mr-auto"}
                    />) :
                    (<ul className={cx(styles.listGroup, "list-unstyled")}>
                        {currentEvents(date).map(event => (
                            <Task
                                key = { event.id }
                                event = { event }
                                tasks = { currentEvents(date) }
                                setEvents = { setEvents }
                            />))}
                    </ul>)}
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