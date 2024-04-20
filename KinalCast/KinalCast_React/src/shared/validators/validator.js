/*-------------------- VALICACIÓN DE CORREO -----------------------*/
export const validateEmail = (email)=>{
    const regex = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    //test busca si el dato que le enviamos contiene todos los caracteres que buscamos.
    //devuelve un boolean
    return regex.test(email);
}

/*-------------------- VALIDACIÓN DE NOMBRE DE USUARIO -----------------------*/
export const validateUsername = (username)=>{
    const regex = /^\S{3,8}$/
    return regex.test(username)
}

/*-------------------- VALIDACIÓN DE PASSWORD DE USUARIO -----------------------*/
export const validatePassword = (password)=>{
    const regex = /^\S{6,12}$/
    return regex.test(password)
}

/*-------------------- VALIDACIÓN DE CONFIRMACIÓN DE PASSWORD DE USUARIO -----------------------*/
export const validatePasswordConfirm = (password, passConfirm)=>{
    return password === passConfirm
}

export const emailValidationMessage = 'Por favor ingresa un correo valido.'
export const passConfirmValidationMessage = 'La contraseña no coincide.'
export const passwordValidationMessage = 'La contraseña debe contener 6 y 12 caracteres, sin espacios.'
export const usernameValidationMessage = 'El nombre de usuario debe de ser entre 3 y 8 caracteres, sin espacios.'