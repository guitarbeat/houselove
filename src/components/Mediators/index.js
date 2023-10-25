import React, { useState, useEffect } from 'react';
import { withGoogleSheets } from 'react-db-google-sheets';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Loader from 'react-loaders';
import './index.scss';
import MediatorCard from './MediatorCard';
import { useMap } from 'react-leaflet';


const Mediators = ({ db }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default center
  const [mapZoom, setMapZoom] = useState(13); // Default zoom level
  const [mediators, setMediators] = useState([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1200);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (db && db.mediators) {
      setMediators(db.mediators);
    }
  }, [db]);

  const updateMap = (lat, lng, zoom) => {
    setMapCenter([lat, lng]);
    setMapZoom(zoom);
  };
  

  return (
    <>
      <div className={`container mediators-page ${isMobile ? 'mobile' : 'desktop'}`}>
        <MediatorText mediators={mediators} updateMap={updateMap} />
        <MediatorMap center={mapCenter} zoom={mapZoom} mediators={mediators} />
      </div>
      <Loader type="pacman" />
    </>
  );
};

const MediatorText = ({ mediators, updateMap }) => (
  <div className="text-zone">
    <h1>Mediators</h1>
    <p>
      Here you can find a list of conflict mediators who are available to assist housing cooperatives.
      Explore the list below to find a mediator who fits your needs, and feel free to reach out to them directly for assistance.
    </p>
    <p>
  Help us grow our mediator list! If you know someone great, add them to our{' '}
  <a
    href="https://docs.google.com/spreadsheets/d/1zG32wvIIPsXn0J6i88GF6CisVvlePeZGah53FbTBpzw/edit?usp=sharing"
    target="_blank"
    rel="noopener noreferrer"
    className="resource-link"
  >
    Google Sheet
  </a>
  , or quickly recommend them through this{' '}
  <a
    href="https://forms.gle/nYYfwdMbC4rL3hMY6"
    target="_blank"
    rel="noopener noreferrer"
    className="resource-link"
  >
    Google Form
  </a>
  . Your input makes our community stronger. Thanks for chipping in!
</p>

    <div className="mediators-container">
      {mediators.map((mediator, index) => (
        <MediatorCard
          key={index}
          name={mediator.Name}
          description={mediator.Description}
          location={{ lat: parseFloat(mediator.Latitude), lng: parseFloat(mediator.Longitude) }}
          specialization={mediator.Specialization}
          contact={{ email: mediator.Email, phone: mediator.Phone }}
          updateMap={updateMap}
        />
      ))}
    </div>
  </div>
);

const UpdateMapView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const MediatorMap = ({ center, zoom, mediators }) => (
  <div className="map-wrap">
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
      <UpdateMapView center={center} zoom={zoom} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mediators.map((mediator, index) => (
        <Marker
          key={index}
          position={[parseFloat(mediator.Latitude), parseFloat(mediator.Longitude)]}
        >
          <Popup>{mediator.Name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>
);

export default withGoogleSheets('mediators')(Mediators);
