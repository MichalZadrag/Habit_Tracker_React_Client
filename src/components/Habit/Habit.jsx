import React from "react";
import styles from './Habit.module.css';
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Habit = ({ habit_text, icon }) => {



    return(
        <div>
            <a href="#" >
                <li className={cx(styles.listGroupItem, "p-3")} >
                    <div className="mr-2 float-left" >
                        <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
                    </div>
                    { habit_text }
                    <div className="checkbox-group float-right">
                        <label className={styles.checkboxInline}>
                            <input className={styles.checkbox} type="checkbox" defaultValue="Pon" />
                            Pon
                        </label>
                        <label className={styles.checkboxInline}>
                            <input className={styles.checkbox} type="checkbox" defaultValue="Wt" />
                            Wt
                        </label>
                        <label className={styles.checkboxInline}>
                            <input className={styles.checkbox} type="checkbox" defaultValue="Śr" />
                            Śr
                        </label>
                        <label className={styles.checkboxInline}>
                            <input className={styles.checkbox} type="checkbox" defaultValue="Czw" />
                            Czw
                        </label>
                        <label className={styles.checkboxInline}>
                            <input className={styles.checkbox} type="checkbox" defaultValue="Pt" />
                            Pt
                        </label>
                        <label className={styles.checkboxInline}>
                            <input className={styles.checkbox} type="checkbox" defaultValue="Sb" />
                            Sb
                        </label>
                        <label className={styles.checkboxInline}>
                            <input type="checkbox" className={styles.checkbox} defaultValue="Nd" />
                            Nd
                        </label>
                    </div>
                </li>
            </a>
        </div>
    )
}

export default Habit;