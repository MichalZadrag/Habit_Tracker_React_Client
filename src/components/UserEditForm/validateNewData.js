import {EMAIL_REGEXP, NAME_REGEXP, PASSWORD_REGEXP, USERNAME_REGEXP} from "../../constants";
import {checkEmailAvailability, checkUsernameAvailability} from "../../api";





export const isUsernameGood = async (values, setIsUsernameAvailable) => {

    const isGood = await checkUsernameAvailability(values.username);
    if (!isGood) {
        setIsUsernameAvailable("Login jest zajety");
    } else {
        setIsUsernameAvailable("");
    }
}

export const isEmailGood = async (values, setIsEmailAvailable) => {

    const isGood = await checkEmailAvailability(values.email);
    if (!isGood) {
        setIsEmailAvailable("Email jest zajety");
    } else {
        setIsEmailAvailable("");
    }
}





export default  function validateNewData(currentUser, values, setIsUsernameAvailable, setIsEmailAvailable) {


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


    if (currentUser.username !== values.username) {
        isUsernameGood(values, setIsUsernameAvailable);
    }


    if (!values.username) {
        errors.username = "Login jest wymagany";
    } else if (!USERNAME_REGEXP.test(values.username)) {
        errors.username = "Login jest nieprawidłowy";
    }

    if (currentUser.email !== values.email) {
        isEmailGood(values, setIsEmailAvailable);
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