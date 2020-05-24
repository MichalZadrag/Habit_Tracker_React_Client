import {EMAIL_REGEXP, NAME_REGEXP, PASSWORD_REGEXP, USERNAME_REGEXP} from "../../constants";


export default function  validateRegister(values) {

    let errors = {};

    if (!values.firstName) {
        errors.firstName = "Imie jest wymagane";
    } else if (!NAME_REGEXP.test(values.firstName)) {
        errors.firstName = "Imie jest nieprawidłowe";
    }

    if (!values.lastName) {
        errors.lastName = "Nazwisko jest wymagane";
    } else if (!NAME_REGEXP.test(values.lastName)) {
        errors.lastName = "Nazwisko jest nieprawidłowe";
    }

    if (!values.username) {
        errors.username = "Login jest wymagany";
    } else if (!USERNAME_REGEXP.test(values.username)) {
        errors.username = "Login jest nieprawidłowy";
    }

    if (!values.email) {
        errors.email = "Email jest wymagany";
    } else if (!EMAIL_REGEXP.test(values.email)) {
        errors.email = "Email jest nieprawidłowy";
    }

    if (!values.password) {
        errors.password = "Hasło jest wymagane";
    } else if (!PASSWORD_REGEXP.test(values.password)) {
        errors.password = "Minimum 8 znaków, duża i mała litera, liczba, znak specjalny";
    }

    return errors;


}