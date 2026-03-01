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
          autoComplete="username"
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
          autoComplete="current-password"
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
