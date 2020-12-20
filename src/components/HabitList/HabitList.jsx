import React, {useEffect, useState} from "react";
import Habit from "../Habit/Habit";
import {fetchHabitData} from "../../api";
import {Button, Card, Col, Row, Spinner} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import HabitAddModal from "../HabitAddModal/HabitAddModal";
import {faCalendarCheck} from "@fortawesome/free-regular-svg-icons";
import styles from "./HabitList.module.css"


const HabitList = ({currentUserId}) => {

    const refreshPage = () => {
        window.location.reload(false);
    }

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

    }, [])


    return (
        <Row className="justify-content-center">
            <Col lg={9}>
                <Card className="mt-5">
                    <Card.Footer className={styles.backgroundColor}>
                        <FontAwesomeIcon icon={faCalendarCheck} className={"mt-2 mr-2"}/>
                        <span>Nawyki</span>
                        <Button
                            size={"sm"}
                            className={"pl-2 pr-2 float-right"}
                            onClick={() => setModalShow(true)}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </Button>
                    </Card.Footer>

                    <Card.Body className="p-0">
                        {isError && <div>Coś poszło nie tak ...</div>}
                        <ListGroup>
                            {isLoading ? (<Spinner
                                    animation="border"
                                    variant={"primary"}
                                    className={"ml-auto mr-auto"}
                                />) :
                                (habits.map((habit) => (
                                    <Habit
                                        key={habit.id}
                                        setHabits={setHabits}
                                        habits={habits}
                                        habit={habit}
                                    />
                                )))}
                        </ListGroup>
                    </Card.Body>
                    <HabitAddModal
                        show={modalShow}
                        onHide={() => {
                            setModalShow(false);
                            refreshPage();
                        }}
                        currentUserId={currentUserId}
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default HabitList;