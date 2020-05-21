import axios from 'axios';
import {GET_ALL_HABITS_URL} from "../constants";



export const fetchHabitData = async () => {

    try {
        const { data } = await axios.get(GET_ALL_HABITS_URL);
        return data;
    } catch (e) {
        console.log("error");
    }
}
