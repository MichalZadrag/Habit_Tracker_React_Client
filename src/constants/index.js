import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAward, faBiking, faBook, faCircle, faDumbbell, faMoneyBillAlt} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styles from "../components/HabitAddModal/HabitAddModal.module.css";
import {faCalendar, faCalendarCheck} from "@fortawesome/free-regular-svg-icons";


export const API_URL = `https://habt-tracker.herokuapp.com/api`;

// export const API_URL = `http://localhost:8080/api`;

export const LOGIN_URL = `/auth/signin`;

export const ADD_NEW_USER_URL = `/auth/signup`;

export const CHANGE_DATA_USER_URL = `/user/update/`;

export const ADD_NEW_HABIT_URL = `/habit/add`;

export const ADD_NEW_TASK_URL = `/task/add`;

export const ADD_NEW_EVENT_URL = `/event/add`;

export const DELETE_HABIT_BY_ID_URL = `/habit/delete/`;

export const DELETE_USER_BY_ID_URL = `/user/delete/`;

export const DELETE_TASK_BY_ID_URL = `/task/delete/`;

export const DELETE_EVENT_BY_ID_URL = `/event/delete/`;

export const GET_CURRENT_USER_URL = `/user/me`;

export const ACCESS_TOKEN = "token";

export const FETCH_HABIT_DATA_URL = `/habit/all/`;

export const FETCH_TASK_DATA_URL = `/task/all/`;

export const FETCH_EVENT_DATA_URL = `/event/all/`;

export const INCREMENT_SERIES_URL = `/habit/increment/`;

export const TASK_DONE_URL = `/task/done/`;

export const NAME_REGEXP = /^[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]{3,10}$/;

export const USERNAME_REGEXP = /^[a-zA-Z0-9]{4,10}$/;

export const EMAIL_REGEXP = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$/.!%*?&])[A-Za-z\d@$!/.%*?&]{8,20}$/;

export const HABIT_AND_TASK_AND_EVENT_REGEXP = /^[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]{3,15}?( +[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]{2,9})?( +[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]{2,9})?$/;

export const LOCATION_REGEXP = /^[a-zA-Z0-9ąćęłńóśźżĄĘŁŃÓŚŹŻ]{3,10}$/;

export const CHECK_EMAIL_AVAILABILITY_URL = `http://localhost:8080/api/user/checkEmailAvailability?email=`

export const CHECK_USERNAME_AVAILABILITY_URL = `http://localhost:8080/api/user/checkUsernameAvailability?username=`

export const CHECK_HABIT_AVAILABILITY_URL = `http://localhost:8080/api/habit/checkHabitAvailability?habit=`

export const CHECK_HABIT_AVAILABILITY_URL_SECOND_PARAM = `&user_id=`

export const ONE_DAY_IN_MS = 86400000;

export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const ICONS = [
    {tag: <FontAwesomeIcon icon={faBiking}/>, string: "faBiking"},
    {tag: <FontAwesomeIcon icon={faBook}/>, string: "faBook"},
    {tag: <FontAwesomeIcon icon={faDumbbell}/>, string: "faDumbbell"},
    {tag: <FontAwesomeIcon icon={faMoneyBillAlt}/>, string: "faMoneyBillAlt"},
];

export const COLORS = [
    {tag: <FontAwesomeIcon className={styles.lightGreen} size="lg" icon={faCircle}/>, string: "lightGreen"},
    {tag: <FontAwesomeIcon className={styles.salmon} size="lg" icon={faCircle}/>, string: "salmon"},
    {tag: <FontAwesomeIcon className={styles.lightGrey} size="lg" icon={faCircle}/>, string: "lightGrey"},
    {tag: <FontAwesomeIcon className={styles.lightBlue} size="lg" icon={faCircle}/>, string: "lightBlue"},

];

export const CARDS = [
    {id: 0, card_text: "Zadania na dzisiaj", icon: faCalendarCheck},
    {id: 1, card_text: "Osiągnięcia", icon: faAward},
    {id: 2, card_text: "Dzisiejsze wydarzenia", icon: faCalendar}
];



