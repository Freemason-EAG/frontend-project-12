import axios from 'axios'
import routes from '../utils/routes.js'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import LoginForm from '../components/LoginForm.jsx'
import loginFormValidationSchema from '../utils/validationSchemas.js'
import { useDispatch } from 'react-redux'
import { addUser } from '../store/slices/authSlice.js'
import { useNavigate, Link } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'

const LoginPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
                    initialValues={{ username: '', password: '' }}
                    validationSchema={loginFormValidationSchema(t)}
                    onSubmit={async (values, { setSubmitting, setStatus }) => {
                      try {
                        setStatus(null)
                        setSubmitting(true)
                        const responce = await axios.post(routes.loginPath(), values)
                        const { username, token } = responce.data
                        localStorage.setItem('token', token)
                        localStorage.setItem('username', username)
                        dispatch(addUser({ username: username, token }))
                        navigate('/', { replace: false })
                      }
                      catch (error) {
                        setStatus(t('loginPage.error'))
                        console.log(error)
                      }
                      finally {
                        setSubmitting(false) // завершить отправку
                      }
                    }}
                  >
                    {props => <LoginForm {...props} />}
                  </Formik>
                </div>
              </div>

              <div className="card-footer p-4">
                <div className="text-center">
                  <span>
                    {t('loginPage.footerSpan')}
                    {' '}
                  </span>
                  <Link to="/signup">{t('loginPage.footerLink')}</Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
