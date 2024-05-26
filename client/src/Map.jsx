import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function Map({origin, destinations, setOrigin, setDestinations}) {
  const [center, setCenter] = useState({ lat: 14.599512, lng: 120.984222 });

  const handleMapClick = useCallback((event) => {
    const newLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    if (!origin) {
      setOrigin(newLocation);
      setCenter(newLocation);
    } else {
      setDestinations((current) => [
        ...current,
        newLocation,
      ]);
    }
  }, [origin]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDe_-D5V_ilS9ejhdFVuM6WQPdCmQexZzw">
      <div className='map-details'>
        <div className='details'>
            <h2>Click on the map to add destinations</h2>
            <p>Origin: {origin ? `${origin.lat}, ${origin.lng}` : 'None'}</p>
            <p>Destinations: {destinations.length}</p>
            <button>Calculate Route</button>
        </div>
          <GoogleMap
            id="direction-example"
            mapContainerStyle={{
              height: "100vh",
              width: "100%"
            }}
            zoom={10}
            center={center}
            onClick={handleMapClick}
          >
            {origin && <Marker position={origin} icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }} />}
            {destinations.map((destination, index) => (
              <Marker 
                key={index} 
                position={destination} 
                onClick={() => {
                  const newDestinations = destinations.filter((dest, idx) => idx !== index);
                  setDestinations(newDestinations);
                }}
              />
            ))}
          </GoogleMap>
      </div>
    </LoadScript>
  );
}

export default Map;