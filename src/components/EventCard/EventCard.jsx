import React, {useEffect, useState} from "react";
import {Button, Card, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {currentDayToString} from "../../constants/utils";
import EventAddModal from "../EventAddModal/EventAddModal";
import {fetchEventData} from "../../api";
import Event from "../Event/Event";
import ListGroup from "react-bootstrap/ListGroup";


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

        let currentEvents = events.filter(event => event.date === date).sort();

        return currentEvents.sort((a,b) => {
            let startTimeA = a.startTime.toUpperCase();
            let startTimeB = b.startTime.toUpperCase();
            let endTimeA = a.endTime.toUpperCase();
            let endTimeB = b.endTime.toUpperCase();
            if (startTimeA < startTimeB) {
                return -1;
            }
            if (startTimeA > startTimeB) {
                return 1;
            }
            if (startTimeA === startTimeB) {
                if (endTimeA < endTimeB) {
                    return -1;
                }
                if (endTimeA > endTimeB) {
                    return 1;
                }
            }
        });

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
                    (<ListGroup>
                        {currentEvents(date).map(event => (
                            <Event
                                key = { event.id }
                                event = { event }
                                events = { currentEvents(date) }
                                setEvents = { setEvents }
                            />))}
                    </ListGroup>)}
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