import { useContext } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import PulseLoader from 'react-spinners/PulseLoader'
import IconMarker from '../images/icon-location.svg'
import IPTrackerContext from '../context/IPTrackerContext'

function getIcon(iconSize) {
  return L.icon({
    iconUrl: IconMarker,
    iconSize: [iconSize],
  })
}

// Updates map coords on state update
function ChangeMapView({ coords }) {
  const map = useMap()
  setTimeout(() => {
    map.flyTo(coords, 16, {
      animate: true,
      duration: 8.5,
    })
  }, 150)

  return null
}

function Map() {
  const { result, loading } = useContext(IPTrackerContext)

  if (loading) {
    return (
      <div className="map-container">
        <PulseLoader color="#5671D8" />
      </div>
    )
  } else {
    return (
      <div className="map-container">
        <MapContainer
          center={[result.latitude, result.longitude]}
          zoom={16}
          zoomControl={false}
          attributionControl={false}
          dragging={false}
          keyboard={false}
          scrollWheelZoom={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={[result.latitude, result.longitude]}
            icon={getIcon(40)}
            keyboard={false}
          ></Marker>
          <ChangeMapView coords={[result.latitude, result.longitude]} />
        </MapContainer>
      </div>
    )
  }
}

export default Map
