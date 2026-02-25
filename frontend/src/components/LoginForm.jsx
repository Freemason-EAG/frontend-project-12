import { Form, Field, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'

const LoginForm = ({ status }) => {

    const { t } = useTranslation()

    return (
        <Form>
            <h2 className='text-center mb-4' style={{ color: '#396591ff', fontWeight: 'bold', fontSize: '48px' }}>{t('loginForm.login')}</h2>
        <div className='form-floating mb-3'>
            <Field
                type='text'
                name='username'
                className='form-control'
                autoFocus
                aria-label={t('loginForm.nameAriaLabel')} 
                placeholder={t('loginForm.namePlaceholder')} 
                autoComplete="off"
            />
            <label htmlFor='username'>{t('loginForm.name')}</label>
            <ErrorMessage
                component='div'
                name='username'
                className='invalid-feedback d-block' 
            />
        </div>
        
        <div className='form-floating mb-3 position-relative'>
            <Field
                type='password'
                name='password'
                className={`form-control ${status ? 'is-invalid' : ''}`}
                aria-label={t('loginForm.passwordAriaLabel')} 
                placeholder={t('loginForm.passwordPlaceholder')} 
                autoComplete="off"
            />
            <label htmlFor='password'>{t('loginForm.password')}</label>
            <ErrorMessage
                component='div'
                name='password'
                className='invalid-feedback d-block'
            />
            {status && (
            <div className="invalid-tooltip">
                {status}
            </div>
        )}
        </div>

        <button className='w-100 mb-3 btn btn-outline-primary' type='submit'>{t('loginForm.loginButton')}</button>
        </Form>
    )
}

export default LoginForm

