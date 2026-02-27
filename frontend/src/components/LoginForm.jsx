import { Form, Field, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'
import FormBootstrap from 'react-bootstrap/Form'

const LoginForm = ({ status }) => {
  const { t } = useTranslation()

  return (
    <Form>
      <h2 className="text-center mb-4">
        {t('loginForm.login')}
      </h2>

      <FormBootstrap.FloatingLabel
        controlId="username"
        label={t('loginForm.name')}
        className="mb-3"
      >
        <Field
          as={FormBootstrap.Control}
          type="text"
          name="username"
          placeholder={t('loginForm.namePlaceholder')}
          isInvalid={!!status}
        />
        <FormBootstrap.Control.Feedback type="invalid">
          <ErrorMessage name="username" />
        </FormBootstrap.Control.Feedback>
      </FormBootstrap.FloatingLabel>

      <FormBootstrap.FloatingLabel
        controlId="password"
        label={t('loginForm.password')}
        className="mb-3"
      >
        <Field
          as={FormBootstrap.Control}
          type="password"
          name="password"
          placeholder={t('loginForm.passwordPlaceholder')}
          isInvalid={!!status}
        />
        <FormBootstrap.Control.Feedback type="invalid">
          <ErrorMessage name="password" />
        </FormBootstrap.Control.Feedback>

        {status && (
          <FormBootstrap.Control.Feedback type="invalid" className="d-block">
            {status}
          </FormBootstrap.Control.Feedback>
        )}
      </FormBootstrap.FloatingLabel>

      <button className="w-100 btn btn-outline-primary" type="submit">
        {t('loginForm.loginButton')}
      </button>
    </Form>
  )
}

export default LoginForm

// import { Form, Field, ErrorMessage } from 'formik'
// import { useTranslation } from 'react-i18next'

// const LoginForm = ({ status }) => {

//     const { t } = useTranslation()

//     return (
//         <Form>
//             <h2 className='text-center mb-4' style={{ color: '#396591ff', fontWeight: 'bold', fontSize: '48px' }}>{t('loginForm.login')}</h2>
//         <div className='form-floating mb-3'>
//             <Field
//                 type='text'
//                 name='username'
//                 className={`form-control ${status ? 'is-invalid' : ''}`}
//                 autoFocus
//                 aria-label={t('loginForm.nameAriaLabel')}
//                 placeholder={t('loginForm.namePlaceholder')}
//                 autoComplete="off"
//             />
//             <label htmlFor='username'>{t('loginForm.name')}</label>
//             <ErrorMessage
//                 component='div'
//                 name='username'
//                 className='invalid-feedback d-block'
//             />
//         </div>

//         <div className='form-floating mb-3 position-relative'>
//             <Field
//                 type='password'
//                 name='password'
//                 className={`form-control ${status ? 'is-invalid' : ''}`}
//                 aria-label={t('loginForm.passwordAriaLabel')}
//                 placeholder={t('loginForm.passwordPlaceholder')}
//                 autoComplete="off"
//             />
//             <label htmlFor='password'>{t('loginForm.password')}</label>
//             <ErrorMessage
//                 component='div'
//                 name='password'
//                 className='invalid-feedback d-block'
//             />
//             {status && (
//             <div className="alert alert-danger mt-3" role="alert">
//                 {status}
//             </div>
//         )}
//         </div>

//         <button className='w-100 mb-3 btn btn-outline-primary' type='submit'>{t('loginForm.loginButton')}</button>
//         </Form>
//     )
// }

// export default LoginForm
