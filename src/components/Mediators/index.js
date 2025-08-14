<<<<<<< HEAD
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { withGoogleSheets } from 'react-db-google-sheets'
=======
import React, { useState, useEffect } from 'react'
>>>>>>> origin/main
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Loader from 'react-loaders'
import './index.scss'
import MediatorCard from './MediatorCard'
import { useMap } from 'react-leaflet'

const Mediators = ({ db }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200)
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]) // Default center
  const [mapZoom, setMapZoom] = useState(13) // Default zoom level
  const [mediators, setMediators] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [specializations, setSpecializations] = useState([])
  const [activeSpec, setActiveSpec] = useState('All')

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1200)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (db && db.mediators) {
      setMediators(db.mediators)
      const specs = new Set(db.mediators.map(m => m.Specialization).filter(Boolean))
      setSpecializations(['All', ...Array.from(specs)])
    }
  }, [db])

  const updateMap = (lat, lng, zoom) => {
    setMapCenter([lat, lng])
    setMapZoom(zoom)
  }

  const handleLocateMe = useCallback(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords
      updateMap(latitude, longitude, 12)
    })
  }, [])

  const filteredMediators = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return mediators.filter((m) => {
      const specOk = activeSpec === 'All' || String(m.Specialization || '') === activeSpec
      if (!q) return specOk
      const name = String(m.Name || '').toLowerCase()
      const desc = String(m.Description || '').toLowerCase()
      const spec = String(m.Specialization || '').toLowerCase()
      return specOk && (name.includes(q) || desc.includes(q) || spec.includes(q))
    })
  }, [mediators, searchQuery, activeSpec])

  return (
    <>
      <div
        className={`container mediators-page ${
          isMobile ? 'mobile' : 'desktop'
        }`}
      >
        <MediatorText 
          mediators={filteredMediators} 
          updateMap={updateMap}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          specializations={specializations}
          activeSpec={activeSpec}
          setActiveSpec={setActiveSpec}
          handleLocateMe={handleLocateMe}
        />
        <MediatorMap center={mapCenter} zoom={mapZoom} mediators={filteredMediators} />
      </div>
      <Loader type="pacman" />
    </>
  )
}

const MediatorText = ({ mediators, updateMap, searchQuery, setSearchQuery, specializations, activeSpec, setActiveSpec, handleLocateMe }) => (
  <div className="text-zone">
    <h1>Mediators</h1>
    <p>
      Here you can find a list of conflict mediators who are available to assist
      housing cooperatives. Explore the list below to find a mediator who fits
      your needs, and feel free to reach out to them directly for assistance.
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
        href="https://forms.gle/VaZVYKLvHxwVYzHa8"
        target="_blank"
        rel="noopener noreferrer"
        className="resource-link"
      >
        Google Form
      </a>
      . Your input makes our community stronger. Thanks for chipping in!
    </p>

    <div className="mediators-controls">
      <input
        type="search"
        className="mediators-search-input"
        placeholder="Search mediators..."
        aria-label="Search mediators"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        className="mediators-spec-select"
        aria-label="Filter by specialization"
        value={activeSpec}
        onChange={(e) => setActiveSpec(e.target.value)}
      >
        {specializations.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <button className="mediators-locate-btn" onClick={handleLocateMe}>Locate me</button>
    </div>

    <div className="mediators-container">
      {mediators.map((mediator, index) => (
        <MediatorCard
          key={index}
          name={mediator.Name}
          description={mediator.Description}
          location={{
            lat: parseFloat(mediator.Latitude),
            lng: parseFloat(mediator.Longitude),
          }}
          specialization={mediator.Specialization}
          contact={{ email: mediator.Email, phone: mediator.Phone }}
          updateMap={updateMap}
        />
      ))}
    </div>
  </div>
)

const UpdateMapView = ({ center, zoom }) => {
  const map = useMap()
  map.setView(center, zoom)
  return null
}

const MediatorMap = ({ center, zoom, mediators }) => (
  <div className="map-wrap">
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
      <UpdateMapView center={center} zoom={zoom} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {mediators.map((mediator, index) => (
        <Marker
          key={index}
          position={[
            parseFloat(mediator.Latitude),
            parseFloat(mediator.Longitude),
          ]}
        >
          <Popup>{mediator.Name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>
)

export default Mediators
