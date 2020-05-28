import React, {useEffect, useState} from "react";
import styles from './HabitList.module.css';
import cx from 'classnames';
import Habit from "../Habit/Habit";
import {fetchHabitData} from "../../api";


const HabitList = (props) => {

    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {

            const result = await fetchHabitData();
            setHabits(result);
        }
        console.log("USE EFFECT HABIT LIST ");
            fetchAPI();
        return () => {
            console.log("USE WILL EFFECT HABIT LIST");
            fetchAPI();
        };
    },[props.newHabit])


    if(!habits) {
        return "LOADING...";
    }


    return(
         <div className={styles.listGroup}>
                <ul className={cx(styles.listGroup, "list-unstyled")}>
                    {habits ? habits.map( (habit) => (
                        <Habit
                            key = { habit.id }
                            habit_text = { habit.habit_text }
                            icon = { habit.icon }
                            habit_id = {habit.id}
                            color= {habit.color}
                        />
                    )) : <div></div>}
                </ul>
            </div>
    )
}

export default HabitList;