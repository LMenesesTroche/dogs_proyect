export default function validation(inputs){
    const errors = {};
    const regexpassword =  /^(?=\w*\d)\S{6,10}$/;
    const regexnumber =  /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i

    
    if (!inputs.name) {
        errors.name = 'El usuario no puede estar vacio'
    }
    //Diferenciar entre la altura maxima y minima
    if(inputs.height > 100){
        errors.height = 'Too high'
    }
    if(inputs.height < 10){
        errors.height = 'Too short'
    }
    // //validacion del password
    // if (!regexnumber.test(inputs.password)) {
    //     errors.password = "La contrasena debe tener un numero"
    // }
    // if (!regexpassword.test(inputs.password)) {
    //     errors.password = "Debe tener entre 6 y 10 caracteres"
    // }
    return errors;
}