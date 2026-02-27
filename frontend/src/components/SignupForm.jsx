import { Form, Field, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'

const SignupForm = ({ status }) => {
  const { t } = useTranslation()

  return (
    <Form>
      <h2 className="text-center mb-4" style={{ color: '#396591ff', fontWeight: 'bold', fontSize: '48px' }}>{t('signupForm.title')}</h2>
      <div className="form-floating mb-3">
        <Field
          type="text"
          id="username"
          name="username"
          className="form-control"
          autoFocus
          aria-label={t('signupForm.nameAriaLabel')}
          placeholder={t('signupForm.namePlaceholder')}
          autoComplete="off"
        />
        <label htmlFor="username">{t('signupForm.name')}</label>
        <ErrorMessage
          component="div"
          name="username"
          className="invalid-feedback d-block"
        />
      </div>

      <div className="form-floating mb-3">
        <Field
          type="password"
          id="password"
          name="password"
          className="form-control"
          aria-label={t('signupForm.passwordAriaLabel')}
          placeholder={t('signupForm.passwordPlaceholder')}
          autoComplete="off"
        />
        <label htmlFor="password">{t('signupForm.password')}</label>
        <ErrorMessage
          component="div"
          name="password"
          className="invalid-feedback d-block"
        />
      </div>

      <div className="form-floating mb-3">
        <Field
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="form-control"
          aria-label={t('signupForm.passwordConfirmAriaLabel')}
          placeholder={t('signupForm.passwordConfirmPlaceholder')}
          autoComplete="off"
        />
        <label htmlFor="confirmPassword">{t('signupForm.passwordConfirm')}</label>
        <ErrorMessage
          component="div"
          name="confirmPassword"
          className="invalid-feedback d-block"
        />
      </div>
      <button className="w-100 mb-3 btn btn-outline-primary" type="submit">{t('signupForm.signutButton')}</button>

      {status && (
        <div className="alert alert-danger">{status}</div>
      )}
    </Form>
  )
}

export default SignupForm
