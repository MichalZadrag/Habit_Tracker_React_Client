import React, {useEffect, useState} from "react";
import {Card, ListGroup, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import {changeDateBy, changeToIcon, setCurrentDaysDependOnDate} from "../../constants/utils";
import {fetchHabitData} from "../../api";
import WeekSeries from "../WeekSeries/WeekSeries";


const HabitSeriesSummary = ({currentUserId}) => {

    const [habits, setHabits] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentHabit, setCurrentHabit] = useState(null);
    const [maxSeries, setMaxSeries] = useState(0);
    const [startDate, setStartDate] = useState(changeDateBy(new Date(), 3, "-"));
    const [currentDays, setCurrentDays] = useState([]);






    const onClickData = (id) => {

        if (id === "left") {
            setStartDate(changeDateBy(startDate, 7, "-"));
        } else if (id === "right") {
            setStartDate(changeDateBy(startDate, 7, "+"));
        }

    }

    useEffect(() => {
        setCurrentDays(setCurrentDaysDependOnDate(startDate, 8));
    },[startDate])


    const handleChange = (evt) => {
        const {value} = evt.target;
        setCurrentHabit(filterHabitDependOnName(value));
    }

    const filterHabitDependOnName = (name) => {
        return habits.find(habit => habit.habit_text === name);
    }

    useEffect(() => {
        const fetchAPI = async () => {
            setIsError(false);
            setIsLoading(true)
            setHabits(await fetchHabitData(currentUserId, setIsError));
            setIsLoading(false);
        }
        fetchAPI();
    }, [currentHabit])



    return (

        <Card className="w-75 ml-auto mr-auto mt-5">
            {isError && <div>Coś poszło nie tak ...</div>}
            {isLoading ? (<Spinner
                    animation="border"
                    variant={"primary"}
                    className={"ml-auto mr-auto"}
                />) :
                (<Card.Footer className="d-flex">
                    <div>
                        <FontAwesomeIcon icon={faClock} className={"mt-2 mr-2"}/>
                        <span>Systematyczność</span>
                    </div>
                    <div className="ml-auto d-flex">

                        <div className={"mt-2 mr-2"}>
                            <span>Nawyk: </span>
                        </div>
                        <select onChange={handleChange} defaultValue={"Wybierz"} className="form-control" id="example">
                            <option value="Wybierz" disabled>Wybierz</option>
                            {habits.map((habit, i) =>
                                <option
                                    key={`option ${i}`}
                                    value={habit.habit_text}
                                >
                                    {habit.habit_text}
                                </option>
                            )}
                        </select>
                    </div>
                </Card.Footer>)}
            <Card.Body className="p-0">
                <ListGroup>
                    {currentHabit &&
                    <ListGroup.Item className="w-100 ml-auto mr-auto">
                        <div className="d-flex">
                            <div className="float-right mt-2">
                                <div>
                                    <FontAwesomeIcon
                                        size={"lg"}
                                        icon={currentHabit &&
                                        changeToIcon(currentHabit.icon)}
                                    />
                                    <span className="p-1 m-1">
                                        {currentHabit &&
                                        currentHabit.habit_text}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-auto mt-2">
                                <span className=" m-1">Najlepsza seria: {maxSeries}</span>
                                <span className=" m-1">Aktualna seria: {currentHabit.series}</span>
                            </div>
                        </div>
                        <div className="text-center mt-2">
                            <h4>Seria tygodniowa</h4>
                        </div>
                       <WeekSeries
                           habit={currentHabit}
                           currentDays={currentDays}
                           onClickData={onClickData}
                       />
                    </ListGroup.Item>
                    }
                </ListGroup>
            </Card.Body>
        </Card>
    )
}


export default HabitSeriesSummary;