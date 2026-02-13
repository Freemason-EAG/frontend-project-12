import { Formik } from 'formik'
import LoginForm from '../components/LoginForm.jsx'
import loginFormValidationSchema from '../utils/validationSchemas.js'

const LoginPage = () => {
    return (
        <div className='container-fluid h-100'>
            <div className='row justify-content-center align-content-center h-100'>
                <div className='col-12 col-md-8 col-xxl-6'> 
                    <div className='card shadow-sm'>
                        <div className='card-body row p-5'>
                            <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                                <img src='/assets/Logo_1.png' className='rounded-circle' alt='Login' style={{ maxWidth: '300px'}} />
                            </div>
            <div className='col-12 col-md-6 mt-3 mt-md-0'>
            <Formik
            initialValues={{ username: '', password: ''}}
            validationSchema={loginFormValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values)
                setSubmitting(false) // завершить отправку 
            }}
            >
                <LoginForm />
            </Formik>
            </div>
            </div>  

            <div className='card-footer p-4'>
                <div className='text-center'>
                   <span>Don&apos;t have an account? </span> 
                   <a href='#'>Registration</a>
                </div>
            </div>
            
            </div> 
            </div>
            </div>
        </div>
    )
}

export default LoginPage