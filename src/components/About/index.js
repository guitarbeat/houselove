import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'
import {
  faHandshake,
  faHome,
  faUsers,
  faHeart,
  faLeaf,
  faBalanceScale,
} from '@fortawesome/free-solid-svg-icons'


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
            HouseLove is a collaborative hub that streamlines resource sharing in
            housing cooperatives. Resources are managed through a read‑only Google
            Sheet; to add new items, submit details through our contribution
            form and they will be reviewed before publishing.
          </p>
          <p>
            The platform also features a searchable directory of conflict
            mediators so members can quickly connect with trusted support and
            resolve disputes constructively.
          </p>
          <p>
            I'm Aaron Woods, a member of the Pink Palace co-op and creator of
            HouseLove. Together we can strengthen our communities through
            cooperation and shared resources.
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
