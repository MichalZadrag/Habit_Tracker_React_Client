import axios from 'axios';
import {ADD_HABIT_URL, GET_ALL_HABITS_URL, SIGN_UP_URL} from "../constants";



export const fetchHabitData = async () => {

    try {
        const { data } = await axios.get(GET_ALL_HABITS_URL);
        return data;
    } catch (e) {
        console.log("error");
    }
}

export const addNewUser = (firstName, lastName, username, email, password, setErrors, setAlerts) => {

    axios.post(SIGN_UP_URL, {
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
            if (e.response.data.message === "Podany nick jest zajęty") {
                setErrors({username: e.response.data.message});
            } else if (e.response.data.message === "Podany email jest zajęty") {
                setErrors({email: e.response.data.message});
            }
        })
}

export const addNewHabit = (habitText, icon) => {

    axios.post(ADD_HABIT_URL, {
        habit_text: habitText,
        icon: icon
    }).then(r => console.log(r.data.message))
}