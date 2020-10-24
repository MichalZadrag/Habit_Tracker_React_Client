import {checkEmailAvailability, checkUsernameAvailability} from "../api";
import {EMAIL_REGEXP, HABIT_AND_TASK_REGEXP, NAME_REGEXP, PASSWORD_REGEXP, USERNAME_REGEXP} from "./index";

const isUsernameAvailable = async (values, setIsUsernameAvailable) => {

    const isGood = await checkUsernameAvailability(values.username);
    if (!isGood) {
        setIsUsernameAvailable("Login jest zajety");
    } else {
        setIsUsernameAvailable("");
    }

}

const isUsernameValid = (values, errors) => {

    if (!values.username) {
        errors.username = "Login jest wymagany";
    } else if (!USERNAME_REGEXP.test(values.username)) {
        errors.username = "Login jest nieprawidłowy";
    }

}

const isEmailAvailable = async (values, setIsEmailAvailable) => {



    const isGood = await checkEmailAvailability(values.email);
    if (!isGood) {
        setIsEmailAvailable("Email jest zajety");
    } else {
        setIsEmailAvailable("");
    }

}

const isEmailValid = (values, errors) => {

    if (!values.email) {
        errors.email = "Email jest wymagany";
    } else if (!EMAIL_REGEXP.test(values.email)) {
        errors.email = "Email jest nieprawidłowy";
    }

}

const isFirstNameValid = (values, errors) => {

    if (!values.firstName) {
        errors.firstName = "Imie jest wymagane";
    } else if (!NAME_REGEXP.test(values.firstName)) {
        errors.firstName = "Imie jest nieprawidłowe";
    }
}

const isLastNameValid = (values, errors) => {

    if (!values.lastName) {
        errors.lastName = "Nazwisko jest wymagane";
    } else if (!NAME_REGEXP.test(values.lastName)) {
        errors.lastName = "Nazwisko jest nieprawidłowe";
    }
}

const isPasswordValid = (values, errors) => {
    if (!values.password) {
        errors.password = "Hasło jest wymagane";
    } else if (!PASSWORD_REGEXP.test(values.password)) {
        errors.password = "Minimum 8 znaków, duża i mała litera, liczba, znak specjalny";
    } else if (values.password !== values.confirmPassword) {
        errors.password = "Hasła muszą być takie same!"
    }
}

export const validateRegister = (values, setIsUsernameAvailable, setIsEmailAvailable) => {

    let errors = {};

    isFirstNameValid(values, errors);
    isLastNameValid(values, errors)
    isUsernameValid(values, errors);
    isUsernameAvailable(values, setIsUsernameAvailable);
    isEmailValid(values, errors);
    isEmailAvailable(values, setIsEmailAvailable);
    isPasswordValid(values, errors);

    return errors;
}

export const validateNewData = (currentUser, values, setIsUsernameAvailable, setIsEmailAvailable) => {


    let errors = {};

    isFirstNameValid(values, errors);
    isLastNameValid(values, errors);

    if (currentUser.username !== values.username) {
        isUsernameAvailable(values, setIsUsernameAvailable);
    }

    isUsernameValid(values, errors);

    if (currentUser.email !== values.email) {
        isEmailAvailable(values, setIsEmailAvailable);
    }

    isEmailValid(values, errors);
    isPasswordValid(values, errors);


    return errors;

}

export const validateTask = (task) => {
    let errors ={}

    if (!task.taskText) {
        errors.taskText = "Zadanie jest wymagane";
    } else if (!HABIT_AND_TASK_REGEXP.test(task.taskText)) {
        errors.taskText = "Zadanie jest nieprawidłowe";
    }
    return errors;
}

export const validateLogin = (values) => {

    let errors ={};

    if (!values.usernameOrEmail) {
        errors.usernameOrEmail = "Podaj login lub email";
    }

    if (!values.password) {
        errors.password = "Podaj hasło";
    }

    return errors;
}

export const validateHabit = (habit) => {
    let errors ={}

    if (!habit.habitText) {
        errors.habitText = "Nawyk jest wymagany";
    } else if (!HABIT_AND_TASK_REGEXP.test(habit.habitText)) {
        errors.habitText = "Nawyk jest nieprawidłowy";
    }
    return errors;
}

export const validateEvent = (event) => {
    let errors ={}

    if (!event.eventText) {
        errors.eventText = "Wydarzenie jest wymagane";
    }
    if (!event.location) {
        errors.location = "Lokalizacja jest wymagana";
    }

    return errors;
}