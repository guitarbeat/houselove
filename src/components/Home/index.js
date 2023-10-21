import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loaders';
import './index.scss';
import AnimatedLetters from '../AnimatedLetters';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate');

    const introductionArray = "House Love".split("");
    const descriptionArray = "Sharing resources for housing co-ops.".split("");

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
                <div className="text-zone">
                    <h1>
                        <AnimatedLetters 
                            letterClass={letterClass} 
                            strArray={introductionArray} 
                            idx={0} 
                        />
                        <br />
                        <AnimatedLetters 
                            letterClass={letterClass} 
                            strArray={descriptionArray} 
                            idx={introductionArray.length} 
                        />
                    </h1>
                    <h2>Find conflict mediators and share resources.</h2>
                    <Link to="/contact" className="flat-button">
                        CONTACT US
                    </Link>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    );
}

export default Home;
