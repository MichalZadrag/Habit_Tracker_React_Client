import axios from 'axios';
import {ACCESS_TOKEN, API_URL} from "../constants";

let access_token = ''

if (localStorage.getItem(ACCESS_TOKEN)) {
     access_token = localStorage.getItem(ACCESS_TOKEN);
}


const authAxios = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${access_token}`
    }
})



export const fetchHabitData = async () => {


    try {
        const { data } = await authAxios.get("/habit/all");
        return data;
    } catch (e) {
       console.log("error");
    }
}

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
            if (e.response.data.message === "Podany nick jest zajęty") {
                setErrors({username: e.response.data.message});
            } else if (e.response.data.message === "Podany email jest zajęty") {
                setErrors({email: e.response.data.message});
            }
        })
}

export const addNewHabit = (habitText, icon, color) => {

    authAxios.post("/habit/add", {
        habit_text: habitText,
        icon: icon,
        color: color
    }).then(r => (null))
        .catch(e => {
            console.log("error");
        })
}

export const deleteHabitById = (id) => {
    authAxios.delete(`/habit/delete/${id}`)
        .then((r) => console.log(r.data.message));
}

// export const checkUsernameAvailability = (username) => {
//     axios.get()
// }
