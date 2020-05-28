export default function validateLogin(values) {

    let errors ={};

    if (!values.usernameOrEmail) {
        errors.usernameOrEmail = "Podaj login lub email";
    }

    if (!values.password) {
        errors.password = "Podaj hasło";
    }

    return errors;
}