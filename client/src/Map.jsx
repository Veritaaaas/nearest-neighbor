import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

function Map({locations, setLocations, path}) {
  const [center, setCenter] = useState({ lat: 14.599512, lng: 120.984222 });

  // Set the center of the map to the first location
  useEffect(() => {
    if (locations.length > 0) {
      setCenter(locations[0]);
    }
  }, [locations]);

  // Add a new location to the list of locations
  const handleMapClick = useCallback((event) => {
    const newLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setLocations((current) => [
      ...current,
      newLocation,
    ]);
  }, []);

  // Convert the path indices to coordinates
  const pathCoordinates = path.map(index => locations[index]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDe_-D5V_ilS9ejhdFVuM6WQPdCmQexZzw">
      <GoogleMap
        id="direction-example"
        mapContainerStyle={{
          height: "100vh",
          width: "20%"
        }}
        zoom={10}
        center={center}
        onClick={handleMapClick}
      >
        {locations.map((location, index) => (
           <Marker 
           key={index} 
           position={location} 
           icon={index === 0 ? { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' } : undefined}
           onClick={() => {
             const newLocations = locations.filter((_, idx) => idx !== index);
             setLocations(newLocations);
           }}
         />
        ))}
        {path.length > 1 && (
          <Polyline
            path={pathCoordinates}
            options={{
              strokeColor: '#000',
              strokeOpacity: 0.75,
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;