import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'
import { faHandshake, faHome, faUsers, faHeart, faLeaf, faBalanceScale } from '@fortawesome/free-solid-svg-icons'


const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000);

    // Clear the timeout if the component is unmounted
    return () => clearTimeout(timeoutId);
  }, [])

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'b', 'o', 'u', 't']}
              idx={15}
            />
          </h1>
          <p>
            Welcome to House Love, a collaborative hub designed for cooperative resource sharing. This platform is built with the vision of streamlining the sharing of essential resources within housing cooperatives. With a simple Google Sheet update, resources can be added and displayed here in an easily digestible manner. 
          </p>
          <p>
            Another key feature of House Love is the conflict mediator database. Mediators can register their details, making it easy for co-op members to find and connect with them. This ensures that any disputes or disagreements can be resolved amicably and professionally.
          </p>
          <p>
            I'm Aaron Woods, a resident of the co-op Pink Palace and the creator of this platform. My goal is to foster a sense of community and cooperation among co-op members. Let's work together to make our co-ops better for everyone!
          </p>
        </div>


        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1">
              <FontAwesomeIcon icon={faHandshake}  />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faHome}  />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faUsers}  />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faHeart}  />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faLeaf}  />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faBalanceScale}  />
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About
