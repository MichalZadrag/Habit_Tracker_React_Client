import axios from 'axios';
import {
    ACCESS_TOKEN,
    API_URL,
    CHECK_EMAIL_AVAILABILITY_URL,
    CHECK_USERNAME_AVAILABILITY_URL,
    LOGIN_URL
} from "../constants";

let access_token = ''

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

    authAxios.post("/auth/signup", {
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
           console.log(e.response.data);
        })
}

export const addNewHabit = (habitText, icon, color, user_id) => {

    authAxios.post("/habit/add", {
        habit_text: habitText,
        icon: icon,
        color: color,
        user_id: user_id
    }).then(r => (null))
        .catch(e => {
            console.log("error");
        })
}

export const deleteHabitById = (id) => {
    authAxios.delete(`/habit/delete/${id}`)
        .then((r) => console.log(r.data.message));
}

export const checkUsernameAvailability = async (username) => {
    const { data } = await axios.get(`${CHECK_USERNAME_AVAILABILITY_URL}${username}`)
    return data.available;
}

export const checkEmailAvailability = async (email) => {
    const { data } = await axios.get(`${CHECK_EMAIL_AVAILABILITY_URL}${email}`)
    return data.available;

}

export const getCurrentUser = async () => {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    } else {
        const { data } = await authAxios.get("/user/me")
        return data;
    }

}

export const login = (usernameOrEmail, password, setErrors, history, setIsAuthenticated) => {

    axios.post(LOGIN_URL, {
        usernameOrEmail: usernameOrEmail,
        password: password
    }).then(r => {
        if (r.data.accessToken) {
            localStorage.setItem(ACCESS_TOKEN, r.data.accessToken);
            history.push("/habits");
            refreshPage();
            setIsAuthenticated(true);
        }
    }).catch(e => {
        if (e.response.data.status === 401) {
            setErrors({overall: "Błędny login lub hasło"});
        }
    });
    console.log("ZALOGOWANO");
}

export const fetchHabitData = async (id, setIsError) => {

    try {
        const { data } = await authAxios.get(`/habit/all/${id}`);
        return data;
    } catch (e) {
        setIsError(true);
    }

}

export const fetchTaskData = async (id, setIsError) => {
    try {
        const { data } = await authAxios.get(`/task/all/${id}`);
        return data;
    } catch (e) {
        setIsError(true);
    }
}

export const addNewTask = (taskText, color, user_id, day) => {
    authAxios.post("/task/add", {
        task_text: taskText,
        color: color,
        user_id: user_id,
        day: day
    }).then(r => null)
        .catch(e => console.log("error"));
}

export const deleteTaskById = (id) => {
    authAxios.delete(`/task/delete/${id}`)
        .then((r) => console.log(r.data.message));
}