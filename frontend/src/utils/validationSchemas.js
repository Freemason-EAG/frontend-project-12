import * as yup from 'yup'

const loginFormValidationSchema = t =>
  yup.object().shape({
    username: yup.string()
      .min(2, t('validation.minLength', { count: 2 }))
      .max(50, t('validation.maxLength', { count: 50 }))
      .required(t('validation.required')),
    password: yup.string()
      .required(t('validation.required')),
  })

export const signupFormValidationSchema = t =>
  yup.object().shape({
    username: yup.string()
      .min(3, t('validation.channelLength', { count: 3 }))
      .max(20, t('validation.channelLength', { count: 20 }))
      .required(t('validation.required')),
    password: yup.string()
      .min(6, t('validation.minLength', { count: 6 }))
    // .matches(/[a-z]/, 'Lowercase')
    // .matches(/[A-Z]/, "Uppercase")
    // .matches(/\d/, "Number")
    // .matches(/[!@#$%^&*(),.?":{}|<>]/, "Special character")
      .required(t('validation.required')),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], t('validation.passwordsMustMatch'))
      .required(t('validation.required')),
  })

export const channelNameValidationSchema = t =>
  yup.object().shape({
    name: yup.string()
      .min(3, t('validation.channelLength', { count: 3 }))
      .max(20, t('validation.channelLength', { count: 20 }))
      .required(t('validation.required')),
  })

export default loginFormValidationSchema
