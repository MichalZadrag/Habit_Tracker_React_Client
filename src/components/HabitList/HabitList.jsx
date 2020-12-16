import React, {useEffect, useState} from "react";
import Habit from "../Habit/Habit";
import {fetchHabitData} from "../../api";
import {Button, Card, Spinner} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTasks} from "@fortawesome/free-solid-svg-icons";
import HabitAddModal from "../HabitAddModal/HabitAddModal";
import {faCalendarCheck} from "@fortawesome/free-regular-svg-icons";


const HabitList = ({currentUserId}) => {

    const [habits, setHabits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            setIsError(false);
            setIsLoading(true)
            setHabits(await fetchHabitData(currentUserId, setIsError));
            setIsLoading(false);
        }
        fetchAPI();

    },[])



    return(

        <Card className="w-50 ml-auto mr-auto mt-5">
            <Card.Footer>
                <FontAwesomeIcon icon={faCalendarCheck} className={"mt-2 mr-2"} />
                <span>Nawyki</span>
                <Button
                    variant={"secondary"}
                    size={"sm"}
                    className={"pl-2 pr-2 float-right"}
                    onClick={ () => setModalShow(true) }>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </Card.Footer>

            <Card.Body className="p-0">
            {isError && <div>Coś poszło nie tak ...</div>}
                <ListGroup>
                    {isLoading ? (<Spinner
                        animation="border"
                        variant={"primary"}
                        className ={"ml-auto mr-auto"}
                    />) :
                        ( habits.map( (habit) => (
                        <Habit
                            key = { habit.id }
                            setHabits = { setHabits }
                            habits = { habits }
                            habit = { habit }
                        />
                    ))) }
                </ListGroup>
            </Card.Body>
            <HabitAddModal
                show = { modalShow }
                onHide = { () => setModalShow(false) }
                currentUserId = { currentUserId }
            />
        </Card>
    )
}

export default HabitList;