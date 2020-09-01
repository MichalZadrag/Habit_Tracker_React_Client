import stylesCustom from "../components/HabitAddModal/HabitAddModal.module.css";
import {faBiking, faBook, faDumbbell, faMoneyBillAlt, faQuestion} from "@fortawesome/free-solid-svg-icons";
import {DAYS, ONE_DAY_IN_MS} from "./index";



export function changeToCss(color) {
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

export function changeToIcon(icon) {
    let test = '';

    switch (icon) {
        case "faBook":
            test = faBook;
            break
        case "faBiking":
            test = faBiking;
            break
        case "faDumbbell":
            test = faDumbbell;
            break
        case "faMoneyBillAlt":
            test = faMoneyBillAlt;
            break
        default:
            test = faQuestion;
            break
    }
    return test;
}

export function appendLeadingZeroes(n) {
    if(n <= 9){
        return "0" + n;
    }
    return n
}

export function formatDate(date) {
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

export function changeDateBy(date, times, action) {
    let newDate;
    if (action === "+") {
         newDate = new Date(date.getTime() + (times * ONE_DAY_IN_MS));
    } else if (action === "-") {
        newDate = new Date(date.getTime() - (times * ONE_DAY_IN_MS));
    }
    return newDate;
}

export function setCurrentDaysDependOnDate(todayDate) {
    let tempDays = [];
    let currentDay = todayDate.getDay();
    let currentDate = todayDate;
    let i = 1;
    while (i < 4) {
        tempDays.push({day: DAYS[currentDay], date: currentDate});
        if (currentDay === 6) {
            currentDay = 0;
        } else {
            currentDay++;
            currentDate = changeDateBy(todayDate, i, "+");
        }
        i++;
    }
   return tempDays;
}

export function currentDayToString(day) {
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
    }

    return dayToString;
}

