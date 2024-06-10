import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import axios from 'axios';

async function convertToLatLng(location) {
  try {
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        key: 'bd4565988a374f7697894d73f5ed7150',
        q: `${location.lat}+${location.lng}`,
        pretty: 1
      }
    });

    const address = response.data.results[0].formatted;
    return address;
  }
  catch (err) {
    console.error(err);
  }
}

function Map({locations, setLocations, path, addresses, setAddresses}) {
  const [center, setCenter] = useState({ lat: 14.599512, lng: 120.984222 });

  // Set the center of the map to the first location
  useEffect(() => {
    if (locations.length > 0) {
      setCenter(locations[0]);
    }
  }, [locations]);

  // Add a new location to the list of locations
  const handleMapClick = useCallback(async (event) => {
    const newLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() };
  
    const address = await convertToLatLng(newLocation);
  
    setLocations((current) => [
      ...current,
      newLocation,
    ]);
    setAddresses((current) => [
      ...current,
      address,
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
          width: "100%"
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
            const newAddresses = addresses.filter((_, idx) => idx !== index);
            
            setLocations(newLocations);
            setAddresses(newAddresses);
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