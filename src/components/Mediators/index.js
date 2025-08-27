import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Loader from 'react-loaders'
import './index.scss'
import MediatorCard from './MediatorCard'
import { useMap } from 'react-leaflet'
import googleSheetsApi from '../../utils/googleSheetsApi'

const Mediators = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200)
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]) // Default center
  const [mapZoom, setMapZoom] = useState(13) // Default zoom level
  const [mediators, setMediators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [specializations, setSpecializations] = useState([])
  const [activeSpec, setActiveSpec] = useState('All')
  const [cities, setCities] = useState([])
  const [activeCity, setActiveCity] = useState('All')

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1200)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchMediators = async () => {
      try {
        setLoading(true)
        const data = await googleSheetsApi.fetchMediators()
        setMediators(data)
        
        // Set map center to first mediator if available
        if (data.length > 0 && data[0].Latitude && data[0].Longitude) {
          setMapCenter([parseFloat(data[0].Latitude), parseFloat(data[0].Longitude)])
        }
        const specs = new Set(data.map(m => m.Specialization).filter(Boolean))
        setSpecializations(['All', ...Array.from(specs)])
        const citySet = new Set(data.map(m => m.City).filter(Boolean))
        setCities(['All', ...Array.from(citySet)])

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMediators()
  }, [])

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
      const cityOk = activeCity === 'All' || String(m.City || '') === activeCity
      if (!q) return specOk && cityOk
      const name = String(m.Name || '').toLowerCase()
      const desc = String(m.Description || '').toLowerCase()
      const spec = String(m.Specialization || '').toLowerCase()
      const city = String(m.City || '').toLowerCase()
      return specOk && cityOk && (name.includes(q) || desc.includes(q) || spec.includes(q) || city.includes(q))
    })
  }, [mediators, searchQuery, activeSpec, activeCity])

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
          cities={cities}
          activeCity={activeCity}
          setActiveCity={setActiveCity}
          handleLocateMe={handleLocateMe}
          loading={loading}
          error={error}
        />
        {!loading && !error && (
          <MediatorMap center={mapCenter} zoom={mapZoom} mediators={filteredMediators} />
        )}
      </div>
      <Loader type="pacman" />
    </>
  )
}

const MediatorText = ({ mediators, updateMap, searchQuery, setSearchQuery, specializations, activeSpec, setActiveSpec, cities, activeCity, setActiveCity, handleLocateMe, loading, error }) => (
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
        href="https://docs.google.com/spreadsheets/d/1zG32wvIIPsXn0J6i88GF6CisVvlePeZGah53FbTBpzw/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="resource-link"
      >
        view‑only Google Sheet
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
      . Submissions are reviewed before being added. Your input makes our community stronger. Thanks for chipping in!
    </p>

    {/* Loading State */}
    {loading && (
      <div className="loading-message">
        <p>Loading mediators...</p>
      </div>
    )}
    
    {/* Error State */}
    {error && (
      <div className="error-message">
        <p>Error loading mediators: {error}</p>
        <p>Please check your internet connection and try again.</p>
      </div>
    )}

    {!loading && !error && (
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
        <select
          className="mediators-city-select"
          aria-label="Filter by city"
          value={activeCity}
          onChange={(e) => setActiveCity(e.target.value)}
        >
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button className="mediators-locate-btn" onClick={handleLocateMe}>Locate me</button>
      </div>
    )}

    {!loading && !error && (
      <div className="mediators-container">
        {mediators.length > 0 ? (
          mediators.map((mediator, index) => (
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
          ))
        ) : (
          <p>No mediators found.</p>
        )}
      </div>
    )}
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

