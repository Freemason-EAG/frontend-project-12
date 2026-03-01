import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { signupFormValidationSchema } from '../utils/validationSchemas'
import { fetchCreateNewUser } from '../store/slices/authSlice'
import SignupForm from '../components/SignupForm.jsx'
import NavBar from '../components/NavBar.jsx'

const SignupPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (values, { setSubmitting, setStatus, setFieldError }) => {
    try {
      setSubmitting(true)
      await dispatch(fetchCreateNewUser({
        username: values.username,
        password: values.password,
      })).unwrap()
      navigate('/', { replace: false })
    }
    catch (error) {
      if (error.status === 409) {
        setFieldError('username', t('signupPage.existError'))
      }
      else {
        setStatus(t('signupPage.registrationError'))
      }
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <NavBar />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src="/assets/Logo_1.png" className="rounded-circle" alt="Login" style={{ maxWidth: '300px' }} />
                </div>
                <div className="col-12 col-md-6 mt-3 mt-md-0">
                  <Formik
                    initialValues={{ username: '', password: '', confirmPassword: '' }}
                    validationSchema={signupFormValidationSchema(t)}
                    onSubmit={handleSubmit}
                  >
                    {props => <SignupForm {...props} />}

                  </Formik>
                </div>
              </div>

              <div className="card-footer p-4">
                <div className="text-center">
                  <span>
                    {t('signupPage.footerSpan')}
                    {' '}
                  </span>
                  <Link to="/login">{t('signupPage.footerLink')}</Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignupPage
