import { useEffect, useState } from 'react';
import './index.scss';
import AnimatedLetters from '../AnimatedLetters';
import backgroundImage from '../../assets/images/background.png';

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const introductionArray = "Empowering Co-op Communities".split("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main className="container home-page">
      <section className="text-zone" aria-labelledby="main-heading" aria-describedby="main-description">
        <h1 id="main-heading">
          <AnimatedLetters letterClass={letterClass} strArray={introductionArray} idx={0} />
        </h1>
        <h2 id="main-description">Find conflict mediators, share resources, and build a sustainable community.</h2>
      </section>
      <div className="background-image-container" aria-hidden="true">
        <img src={backgroundImage} alt="" role="presentation" />
      </div>
    </main>
  );
}

export default Home;
