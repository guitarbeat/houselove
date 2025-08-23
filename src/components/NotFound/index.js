import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container not-found-page">
      <div className="text-zone">
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="flat-button">Return Home</Link>
      </div>
    </div>
  )
}

export default NotFound
