import React from "react";
import styles from './HabitList.module.css';
import cx from 'classnames';
import Habit from "../Habit/Habit";


const HabitList = ({ habits } ) => {

    return(
            <div className={styles.listGroup}>
                <ul className={cx(styles.listGroup, "list-unstyled")}>
                    {habits.map( (habit) => (
                        <Habit
                            key = { habit.id }
                            habit_text = { habit.habit_text }
                            icon = { habit.icon }
                            habit_id = {habit.id}
                        />
                    ))}
                </ul>
            </div>
    )
}

export default HabitList;