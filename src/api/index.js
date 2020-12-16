import axios from 'axios';
import {
    ACCESS_TOKEN, ADD_NEW_EVENT_URL,
    ADD_NEW_HABIT_URL, ADD_NEW_TASK_URL,
    ADD_NEW_USER_URL,
    API_URL, CHANGE_DATA_USER_URL,
    CHECK_EMAIL_AVAILABILITY_URL,
    CHECK_USERNAME_AVAILABILITY_URL, DELETE_EVENT_BY_ID_URL,
    DELETE_HABIT_BY_ID_URL, DELETE_TASK_BY_ID_URL, DELETE_USER_BY_ID_URL, FETCH_EVENT_DATA_URL,
    FETCH_HABIT_DATA_URL,
    FETCH_TASK_DATA_URL,
    GET_CURRENT_USER_URL, INCREMENT_SERIES_URL,
    LOGIN_URL, TASK_DONE_URL
} from "../constants";

let access_token = '';

if (localStorage.getItem(ACCESS_TOKEN)) {
    access_token = localStorage.getItem(ACCESS_TOKEN);
}

const refreshPage = () => {
    window.location.reload(false);
}

export const authAxios = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${access_token}`
    }
})

export const addNewUser = (firstName, lastName, username, email, password, setErrors, setAlerts) => {

    authAxios.post(ADD_NEW_USER_URL, {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password
    })
        .then(r => {
            setAlerts({success: r.data.message});
        })
        .catch(e => {
            setErrors({overall: "Wystąpił błąd"});
        })
}

export const changeDataUser = (oldUserId, firstName, lastName, username, email, password, setErrors, setAlerts) => {

    authAxios.put(`${CHANGE_DATA_USER_URL}${oldUserId}`, {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password
    })
        .then(r => {
            setAlerts({success: r.data.message});
        })
        .catch(e => {
            setErrors({overall: "Wystąpił błąd"});
        })
}

export const addNewHabit = (habitText, icon, color, user_id) => {

    authAxios.post(ADD_NEW_HABIT_URL, {
        habit_text: habitText,
        icon: icon,
        color: color,
        user_id: user_id,
        done: false
    }).then(r => (null))
        .catch(e => {
            console.log("error");
        })
}

export const deleteHabitById = (id) => {
    authAxios.delete(`${DELETE_HABIT_BY_ID_URL}${id}`)
        .then((r) => console.log(r.data.message));
}

export const deleteUserById = (id) => {
    authAxios.delete(`${DELETE_USER_BY_ID_URL}${id}`)
        .then((r) => console.log(r.data.message));
}

export const checkUsernameAvailability = async (username) => {
    const {data} = await axios.get(`${CHECK_USERNAME_AVAILABILITY_URL}${username}`)
    return data.available;
}

export const checkEmailAvailability = async (email) => {
    const {data} = await axios.get(`${CHECK_EMAIL_AVAILABILITY_URL}${email}`)
    return data.available;

}

export const getCurrentUser = async () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    } else {
        const {data} = await authAxios.get(GET_CURRENT_USER_URL)
        return data;
    }

}

export const login = (usernameOrEmail, password, setErrors, history, setIsAuthenticated) => {

    authAxios.post(LOGIN_URL, {
        usernameOrEmail: usernameOrEmail,
        password: password
    }).then(r => {
        if (r.data.accessToken) {
            console.log(r.data);
            localStorage.setItem(ACCESS_TOKEN, r.data.accessToken);
            history.push("/habits");
            refreshPage();
            setIsAuthenticated(true);
        }
    }).catch(e => {
        if (!e.response) {
            setErrors({overall: "Brak połączenia z API"});
        } else if (e.response.data.status === 401) {
            setErrors({overall: "Błędny login lub hasło"});
        }
    });
}

export const fetchHabitData = async (id, setIsError) => {

    try {
        const {data} = await authAxios.get(`${FETCH_HABIT_DATA_URL}${id}`);
        return data;
    } catch (e) {
        setIsError(true);
    }

}

export const fetchTaskData = async (id, setIsError) => {
    try {
        const {data} = await authAxios.get(`${FETCH_TASK_DATA_URL}${id}`);
        return data;
    } catch (e) {
        setIsError(true);
    }
}

export const addNewTask = (taskText, color, user_id, date) => {
    authAxios.post(ADD_NEW_TASK_URL, {
        task_text: taskText,
        color: color,
        user_id: user_id,
        date: date,
        isDone: false
    }).then(r => null)
        .catch(e => console.log("error"));
}

export const deleteTaskById = (id) => {
    authAxios.delete(`${DELETE_TASK_BY_ID_URL}${id}`)
        .then((r) => console.log(r.data.message));
}

export const addNewEvent = (eventText, color, user_id, date, location, startTime, endTime) => {
    authAxios.post(ADD_NEW_EVENT_URL, {
        event_text: eventText,
        color: color,
        user_id: user_id,
        date: date,
        location: location,
        startTime: startTime,
        endTime: endTime
    }).then(r => console.log(r))
        .catch(e => console.log("error"));
}

export const fetchEventData = async (id, setIsError) => {
    try {
        const {data} = await authAxios.get(`${FETCH_EVENT_DATA_URL}${id}`);
        return data;
    } catch (e) {
        setIsError(true);
    }
}

export const deleteEventById = (id) => {
    authAxios.delete(`${DELETE_EVENT_BY_ID_URL}${id}`)
        .then((r) => console.log(r.data.message));
}

export const incrementSeriesInHabit = (id) => {
    authAxios.patch(`${INCREMENT_SERIES_URL}${id}`)
        .then((r) => console.log(r.data.message));
}

export const setTaskDoneApi = (id) => {
    authAxios.patch(`${TASK_DONE_URL}${id}`)
        .then(r => console.log(r.data.message));
}
