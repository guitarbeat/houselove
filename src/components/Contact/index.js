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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error(
        'Missing EmailJS configuration. Please set REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID, REACT_APP_EMAILJS_PUBLIC_KEY.'
      );
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }
    
    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        () => {
          setSubmitStatus('success');
          setIsSubmitting(false);
          form.current.reset();
          // Auto-hide success message after 5 seconds
          setTimeout(() => setSubmitStatus(null), 5000);
        },
        (error) => {
          console.error('EmailJS error:', error);
          setSubmitStatus('error');
          setIsSubmitting(false);
          // Auto-hide error message after 5 seconds
          setTimeout(() => setSubmitStatus(null), 5000);
        }
      );
  };

  return (
    <>
      <div className="container contact-page">
        <ContactText 
          letterClass={letterClass} 
          form={form} 
          sendEmail={sendEmail} 
          isSubmitting={isSubmitting}
          submitStatus={submitStatus}
        />
        <ContactInfo />
        <ContactMap />
      </div>
      <Loader type="pacman" />
    </>
  );
};

// Sub-component for contact text and form
const ContactText = ({ letterClass, form, sendEmail, isSubmitting, submitStatus }) => (
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
    <ContactForm form={form} sendEmail={sendEmail} isSubmitting={isSubmitting} submitStatus={submitStatus} />
  </div>
);

// Sub-component for contact form
const ContactForm = ({ form, sendEmail, isSubmitting, submitStatus }) => (
  <div className="contact-form">
    <form ref={form} onSubmit={sendEmail}>
      <ul>
        <li className="half"><div className="input input--md"><input placeholder="Name" type="text" name="name" required disabled={isSubmitting} /></div></li>
        <li className="half"><div className="input input--md"><input placeholder="Email" type="email" name="email" required disabled={isSubmitting} /></div></li>
        <li><div className="input input--md"><input placeholder="Subject" type="text" name="subject" required disabled={isSubmitting} /></div></li>
        <li><div className="input input--lg"><textarea placeholder="Message" name="message" required disabled={isSubmitting} rows={4} /></div></li>
        <li>
          <input 
            type="submit" 
            className="btn btn--primary btn--md" 
            value={isSubmitting ? "SENDING..." : "SEND"} 
            disabled={isSubmitting}
          />
        </li>
      </ul>
    </form>
    
    {/* Status Messages */}
    {submitStatus === 'success' && (
      <div className="status-message success">
        <p>✅ Message successfully sent! We'll get back to you soon.</p>
      </div>
    )}
    {submitStatus === 'error' && (
      <div className="status-message error">
        <p>❌ Failed to send the message. Please try again or contact us directly.</p>
      </div>
    )}
  </div>
);

// Sub-component for contact information
const ContactInfo = () => (
  <div className="info-map">
    Aaron Woods,
    <br />
    Pink Palace Co-op,
    <br />
    Austin TX 78705
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
