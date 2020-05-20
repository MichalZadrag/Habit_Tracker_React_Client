import React, {useEffect, useState} from "react";
import styles from './HabitList.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
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
                        />
                    ))}
                </ul>
            </div>
    )
}

export default HabitList;