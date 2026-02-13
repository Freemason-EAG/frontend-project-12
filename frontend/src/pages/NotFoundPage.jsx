import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
                <div className="col-12 col-md-6 text-center">
                    <div className="card shadow-sm p-5">
            <h1 className="display-1 text-muted mb-4">404</h1>
            <p className="text-muted mb-4">Page not found</p>
            <Link to='/' className="btn btn-primary">Return to home</Link>
            </div>
            </div>
            </div>
        </div>
    )
}

export default NotFoundPage