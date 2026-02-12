import { Form, Field, ErrorMessage } from 'formik'

const LoginForm = () => {
    return (
        <Form>
        <div className='form-group'>
            <label htmlFor='username'>Name</label>
            <Field
                type='text'
                name='username'
                className='form-control'
                autoFocus
                aria-label="username" 
                placeholder="Name" 
                required 
                autoComplete="off"
            />
            <ErrorMessage
                component='div'
                name='username'
                className='invalid-feedback' 
            />
        </div>
        
        <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <Field
                type='password'
                name='password'
                className='form-control'
                autoFocus
                aria-label="password" 
                placeholder="Password" 
                required 
                autoComplete="off"
            />
            <ErrorMessage
                component='div'
                name='password'
                className='invalid-feedback' 
            />
        </div>

        <button type='submit'>Send</button>
        </Form>
    )
}

export default LoginForm









// import { Formik, Form, Field, useFormik } from 'formik'

// const Form = () => {
//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             password: '',
//         },
//         onSubmit: (values) => {
//             console.log(JSON.stringify(values, null, 2))
//         },
//     })

//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <label htmlFor='name'>Name</label>
//             <input
//             id='name'
//             name='name'
//             type='name'
//             onChange={formik.handleChange}
//             value={formik.values.name} />
//             <label htmlFor='password'>Passwoed</label>
//             <input
//             id='password'
//             name='password'
//             type='password'
//             onChange={formik.handleChange}
//             value={formik.values.password} />

//             <button type='submit'>Send</button>
//         </form>

        
//     )
// }

// export default Form

