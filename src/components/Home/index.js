import { useEffect, useState } from 'react'
import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import backgroundImage from '../../assets/images/background.png'
import { Link } from 'react-router-dom'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  // Split the introduction text into two lines
  const line1Array = 'Empowering Co-op'.split('')
  const line2Array = 'Communities'.split('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <main className="container home-page">
      <section
        className="text-zone"
        aria-labelledby="main-heading"
        aria-describedby="main-description"
      >
        {/* Split the heading into two lines */}
        <h1 id="main-heading">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={line1Array}
            idx={0}
          />
          <br /> {/* Line break to move "Communities" to a new line */}
          <AnimatedLetters
            letterClass={letterClass}
            strArray={line2Array}
            idx={15}
          />
        </h1>
        <h2 id="main-description">
          Discover mediators, share resources, and grow a resilient
          cooperative.
        </h2>
        <div className="home-cta">
          <Link to="/resources" className="cta-button">Browse Resources</Link>
          <Link to="/mediators" className="cta-button secondary">Find a Mediator</Link>
        </div>
      </section>
      <div className="background-image-container" aria-hidden="true">
        <img src={backgroundImage} alt="" role="presentation" />
      </div>
    </main>
  )
}

export default Home
