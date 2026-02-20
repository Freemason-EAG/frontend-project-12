import * as yup from 'yup'


const loginFormValidationSchema = yup.object().shape({
    username: yup.string()
        .min(2, 'Minimum 2 letters')
        .max(50, 'Maximum 50 letters')
        .required('Required field'),
    password: yup.string()
    .required('Required field')
    // .min(8, 'Minimum 8 letters')
    // .matches(/[a-z]/, 'Lowercase')
    // .matches(/[A-Z]/, "Uppercase")
    // .matches(/\d/, "Number")
    // .matches(/[!@#$%^&*(),.?":{}|<>]/, "Special character")

})

export const channelNameValidationSchema = yup.object().shape({
    name: yup.string()
    .min(3, 'Minimum 3 letters')
    .max(20, 'Maximum 20 letters')
    .required('Required field')
})

export default loginFormValidationSchema


