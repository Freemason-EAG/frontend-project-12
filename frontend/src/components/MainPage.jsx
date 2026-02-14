import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const MainPage = () => {
    const token = useSelector(state => state.auth.token)
    if (!token) {
        return <Navigate to={'/login'} replace />
    }
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to='/login'>Login Page</Link>
                    </li>
                    <li>
                        <Link to='/404'>Not Found</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default MainPage