// React imports
import { useEffect, useState, useRef } from 'react';

// Third-party libraries and styles
import Loader from 'react-loaders';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import emailjs from '@emailjs/browser';

// Local imports
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';

// Leaflet configuration
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Main Contact component
const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const form = useRef();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_k9dywif', 'template_nmia5ai', form.current, 'W1uc09q7N6dm3tDJH')
      .then(
        () => {
          alert('Message successfully sent!');
          window.location.reload(false);
        },
        () => {
          alert('Failed to send the message, please try again');
        }
      );
  };

  return (
    <>
      <div className="container contact-page">
        <ContactText letterClass={letterClass} form={form} sendEmail={sendEmail} />
        <ContactInfo />
        <ContactMap />
      </div>
      <Loader type="pacman" />
    </>
  );
};

// Sub-component for contact text and form
const ContactText = ({ letterClass, form, sendEmail }) => (
  <div className="text-zone">
    <h1>
      <AnimatedLetters
        letterClass={letterClass}
        strArray={['C', 'o', 'n', 't', 'a', 'c', 't']}
        idx={7}
      />
    </h1>
    <p>
      If you have any questions, suggestions, or want to contribute to "House Love", please get in touch. We value your feedback and collaboration to make this platform even better for our community.
    </p>
    <ContactForm form={form} sendEmail={sendEmail} />
  </div>
);

// Sub-component for contact form
const ContactForm = ({ form, sendEmail }) => (
  <div className="contact-form">
    <form ref={form} onSubmit={sendEmail}>
      <ul>
        <li className="half"><input placeholder="Name" type="text" name="name" required /></li>
        <li className="half"><input placeholder="Email" type="email" name="email" required /></li>
        <li><input placeholder="Subject" type="text" name="subject" required /></li>
        <li><textarea placeholder="Message" name="message" required /></li>
        <li><input type="submit" className="flat-button" value="SEND" /></li>
      </ul>
    </form>
  </div>
);

// Sub-component for contact information
const ContactInfo = () => (
  <div className="info-map">
    Aaron Woods,
    <br />
    Pink Palace Co-op,
    <br />
    702 W 32nd St, Austin TX 78705
    <br />
    <br />
    <span>aaronlorenzowoods@gmail.com</span>
  </div>
);

// Sub-component for contact map
const ContactMap = () => (
  <div className="map-wrap">
    <MapContainer center={[30.2963, -97.7442]} zoom={13}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[30.2963, -97.7442]}>
        <Popup>House Love - Collaborative Co-op Resource Sharing.</Popup>
      </Marker>
    </MapContainer>
  </div>
);

export default Contact;
