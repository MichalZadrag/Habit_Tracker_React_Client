import React, {useEffect, useState} from "react";
import styles from './HabitList.module.css';
import cx from 'classnames';
import Habit from "../Habit/Habit";
import {authAxios, fetchHabitData} from "../../api";
import {Spinner} from "react-bootstrap";


const HabitList = (props) => {

    const [habits, setHabits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            setIsError(false);
            setIsLoading(true)
            const id = props.currentUser.id;
            setHabits(await fetchHabitData(id, setIsError));
            setIsLoading(false);
        }
        fetchAPI();

    },[])



    return(

         <div className={styles.listGroup}>
             {isError && <div>Something went wrong...</div>}
                <ul className={cx(styles.listGroup, "list-unstyled")}>
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
                </ul>
            </div>
    )
}

export default HabitList;