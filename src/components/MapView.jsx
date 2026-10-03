import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  MapPin,
  Navigation,
  LocateFixed,
} from "lucide-react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const locations = {
  Jabalpur: [23.1815, 79.9864],
  Bhopal: [23.2599, 77.4126],
  Indore: [22.7196, 75.8577],
  Ujjain: [23.1765, 75.7885],
  Gwalior: [26.2183, 78.1828],
  Khajuraho: [24.8318, 79.9199],
  Pachmarhi: [22.4676, 78.4331],
  Orchha: [25.3519, 78.6407],
  Mandu: [22.3448, 75.3957],
  Panna: [24.718, 80.187],
};

function RecenterMap({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);

  return null;
}

function MapView({ destination = "Jabalpur" }) {
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState("");

  const destinationPosition =
    locations[destination] || locations.Jabalpur;

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(
        "Your browser does not support location."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);

        setLocationError("");
      },
      () => {
        setLocationError(
          "Location permission denied. Please allow location access."
        );
      }
    );
  };

  return (
    <div className="map-section">

      <div className="map-header">
        <div>
          <p className="small-title">
            REAL-TIME NAVIGATION
          </p>

          <h2>Explore on Map</h2>

          <p>
            Find your location and explore
            destinations across Madhya Pradesh.
          </p>
        </div>

        <button
          className="location-button"
          onClick={getCurrentLocation}
        >
          <LocateFixed size={18} />
          My Location
        </button>
      </div>

      {locationError && (
        <div className="location-error">
          <MapPin size={17} />
          {locationError}
        </div>
      )}

      <div className="map-wrapper">

        <MapContainer
          center={destinationPosition}
          zoom={10}
          scrollWheelZoom={true}
          className="leaflet-map"
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={destinationPosition}>
            <Popup>
              <strong>{destination}</strong>
              <br />
              Madhya Pradesh
            </Popup>
          </Marker>

          {userLocation && (
            <>
              <Marker position={userLocation}>
                <Popup>
                  <strong>You are here 📍</strong>
                </Popup>
              </Marker>

              <RecenterMap position={userLocation} />
            </>
          )}

        </MapContainer>
      </div>

      <div className="map-info">

        <div>
          <Navigation size={18} />

          <span>
            Destination:{" "}
            <strong>{destination}</strong>
          </span>
        </div>

        <button onClick={getCurrentLocation}>
          <LocateFixed size={16} />
          Find My Location
        </button>

      </div>

    </div>
  );
}

export default MapView;