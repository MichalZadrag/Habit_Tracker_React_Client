import stylesCustom from "../components/HabitAddFormModal/HabitAddFormModal.module.css";
import {faBiking, faBook, faDumbbell, faMoneyBillAlt, faQuestion} from "@fortawesome/free-solid-svg-icons";
import {ONE_DAY_IN_MS} from "./index";



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

