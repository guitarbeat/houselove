import { useEffect, useState } from 'react';
import './index.scss';
import AnimatedLetters from '../AnimatedLetters';
import backgroundImage from '../../assets/images/background.png';
import Loader from 'react-loaders';
import { Link } from 'react-router-dom';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate');

    const introductionArray = "Empowering Co-ops with Shared Resources and Support".split("");

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 4000);

        // This will clear the timeout if the component is unmounted
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            <div className="container home-page">
                <div className="background-image-container">
                    <img src={backgroundImage} alt="Cozy community housing" />
                </div>
                <div className="text-zone">
                    <h1>
                        <AnimatedLetters 
                            letterClass={letterClass} 
                            strArray={introductionArray} 
                            idx={0} 
                        />
                    </h1>
                    <h2>Connect. Share. Thrive.</h2>
                    <p>Discover a hub of resources tailored for housing co-operatives. From conflict resolution to effective management, find everything you need to foster a vibrant and harmonious community.</p>
                    <Link to="/resources" className="cta-button">Explore Resources</Link>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    );
}

export default Home;
