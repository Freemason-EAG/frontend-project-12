import { Form, Field, ErrorMessage } from 'formik'

const LoginForm = ({ status }) => {

    return (
        <Form>
            <h2 className='text-center mb-4' style={{ color: '#396591ff', fontWeight: 'bold', fontSize: '48px' }}>Login</h2>
        <div className='form-floating mb-3'>
            <Field
                type='text'
                name='username'
                className='form-control'
                autoFocus
                aria-label="username" 
                placeholder="Name" 
                autoComplete="off"
            />
            <label htmlFor='username'>Name</label>
            <ErrorMessage
                component='div'
                name='username'
                className='invalid-feedback d-block' 
            />
        </div>
        
        <div className='form-floating mb-3'>
            <Field
                type='password'
                name='password'
                className='form-control'
                aria-label="password" 
                placeholder="Password" 
                autoComplete="off"
            />
            <label htmlFor='password'>Password</label>
            <ErrorMessage
                component='div'
                name='password'
                className='invalid-feedback d-block'
            />
        </div>

        <button className='w-100 mb-3 btn btn-outline-primary' type='submit'>Send</button>

        {status && (
            <div className='alert alert-danger'>{status}</div>
        )}
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

