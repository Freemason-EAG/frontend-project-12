import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeUser } from '../store/slices/authSlice'
import { useTranslation } from 'react-i18next'

const NavBar = () => {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOut = () => {
        localStorage.removeItem('token')
        dispatch(removeUser())
        navigate('/login', { replace: false })
    }

    return (
        <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
            <div className='container'>
                <Link to='/' className='navbar-brand'>Hexlet Chat</Link>
                <button type='button' className='btn btn-primary' onClick={handleOut}>{t('navBar.logout')}</button>
            </div>
        </nav>
    )
}

export default NavBar