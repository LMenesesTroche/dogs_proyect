export default function validation(inputs) {
    const errors = {};
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const regexpassword = /^(?=\w*\d)\S{6,10}$/;
    const regexnumber = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i

    //We check that the username is an email
    if (!regexEmail.test(inputs.username)) {
        errors.username = "Must be an email"
    }
    if (!inputs.username) {
        errors.username = "User can't be empty"
    }
    if (inputs.username.length > 35) {
        errors.username = "Must have less than 35 caracters"
    }

    //Password validations
    if (!regexnumber.test(inputs.password)) {
        errors.password = "The password must have numbers"
    }
    if (!regexpassword.test(inputs.password)) {
        errors.password = "Must have bettwen 6 and 10 caracters"
    }
    return errors;
}
