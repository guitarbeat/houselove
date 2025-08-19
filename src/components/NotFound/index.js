import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container not-found-page">
      <div className="text-zone">
        <h1>Page not found</h1>
        <p>Sorry, we couldn't find that page.</p>
        <Link to="/" className="flat-button">Go home</Link>
      </div>
    </div>
  )
}

export default NotFound