import {Link } from 'react-router-dom'

const MainPage = () => {
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