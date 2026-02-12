import { Formik } from 'formik'
import LoginForm from '../components/LoginForm.jsx'
import loginFormValidationSchema from '../utils/validationSchemas.js'

const LoginPage = () => {
    return (
        <div>
            <h2>Login to chat</h2>
            <Formik
            initialValues={{ username: '', password: ''}}
            validationSchema={loginFormValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values)
                setSubmitting(false) // завершить отправку 
            }}
            component={LoginForm}
            />
        </div>
    )
}

export default LoginPage