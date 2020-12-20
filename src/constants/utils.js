import stylesCustom from "../components/HabitAddModal/HabitAddModal.module.css";
import {faBiking, faBook, faDumbbell, faMoneyBillAlt} from "@fortawesome/free-solid-svg-icons";
import {DAYS, ONE_DAY_IN_MS} from "./index";
import moment from "moment";



export const changeToCss = (color) => {
    let cssClass = '';
    switch (color) {
        case "salmon":
            cssClass = stylesCustom.salmonBg;
            break
        case "lightGreen":
            cssClass = stylesCustom.lightGreenBg;
            break
        case "lightGrey":
            cssClass = stylesCustom.lightGreyBg;
            break
        case "lightBlue":
            cssClass = stylesCustom.lightBlueBg;
            break
        default:
            cssClass = stylesCustom.lightGreyBg;
            break
    }
    return cssClass;
}

export const changeToIcon = (icon) => {
    let iconToString = '';

    switch (icon) {
        case "faBook":
            iconToString = faBook;
            break
        case "faBiking":
            iconToString = faBiking;
            break
        case "faDumbbell":
            iconToString = faDumbbell;
            break
        case "faMoneyBillAlt":
            iconToString = faMoneyBillAlt;
            break
        default:
            iconToString = "";
            break
    }
    return iconToString;
}

export const appendLeadingZeroes = (n) => {
    if(n <= 9){
        return "0" + n;
    }
    return n
}

export const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export const changeDateBy = (date, times, action) => {
    let newDate;
    if (action === "+") {
         newDate = new Date(date.getTime() + (times * ONE_DAY_IN_MS));
    } else if (action === "-") {
        newDate = new Date(date.getTime() - (times * ONE_DAY_IN_MS));
    }
    return newDate;
}

export const setCurrentDaysDependOnDate = (todayDate, number_of_repeat) => {
    let tempDays = [];
    let currentDay = todayDate.getDay();
    let currentDate = todayDate;
    let i = 1;
    while (i < number_of_repeat) {
        tempDays.push({day: DAYS[currentDay], date: moment(currentDate), isSeriesGood: false});
        if (currentDay === 6) {
            currentDay = 0;
            currentDate = changeDateBy(currentDate, 1, "+");
        } else {
            currentDay++;
            currentDate = changeDateBy(currentDate, 1, "+");
        }
        i++;
    }
   return tempDays;
}

export const currentDayToString = (day) => {
    let dayToString = "";

    switch (day) {
        case "Monday":
            dayToString = "Poniedziałek";
            break
        case "Tuesday":
            dayToString = "Wtorek";
            break
        case "Wednesday":
            dayToString = "Środa";
            break
        case "Thursday":
            dayToString = "Czwartek";
            break
        case "Friday":
            dayToString = "Piątek";
            break
        case "Saturday":
            dayToString = "Sobota";
            break
        case "Sunday":
            dayToString = "Niedziela";
            break
        default:
            dayToString = "Error";
            break
    }

    return dayToString;
}

