import axios from 'axios';
import {GET_ALL_HABITS_URL, SIGN_UP_URL} from "../constants";



export const fetchHabitData = async () => {

    try {
        const { data } = await axios.get(GET_ALL_HABITS_URL);
        return data;
    } catch (e) {
        console.log("error");
    }
}

export const postNewUser = (firstName, lastName, username, email, password) => {
    axios.post(SIGN_UP_URL, {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password
    })
        .then(r => {
            console.log(r.data.message);
        })
}