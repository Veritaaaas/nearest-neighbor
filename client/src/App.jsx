import React, { useState, useEffect } from 'react';
import Map from './Map';
import nearestNeighborTsp from './NearestNeighbor';
import "./App.css";


const App = () => {
  const [locations, setLocations] = useState([]);
  const [distanceMatrix, setDistanceMatrix] = useState(null);
  const [path, setPath] = useState([]);

  useEffect(() => {
    if (locations.length > 1) {
      fetch(`http://localhost:5000/route?locations=${locations.map(location => `${location.lat},${location.lng}`).join('|')}`)
        .then(response => response.json())
        .then(data => setDistanceMatrix(data))
        .catch(error => console.error('Error:', error));
    }

  }, [locations]);

  useEffect(() => {
    if (distanceMatrix) {
      console.log('Distance Matrix:', distanceMatrix);
    }
  }, [distanceMatrix]);

  const calculateRoute = () => {
    const path = nearestNeighborTsp(distanceMatrix);
    setPath(path);
    console.log('Path:', path);
  }

  return (
    <div>
      <header>
        <h1>Traveling Salesman Problem with Nearest Neighbor Algorithm</h1>
      </header>
      <div>
        <div className='map-details'>
          <div className='details'>
              <h2>Click on the map to add destinations</h2>
              <p>Origin: {locations[0] ? `${locations[0].lat}, ${locations[0].lng}` : 'None'}</p>
              <p>Destinations: {locations.length > 1 ? locations.length - 1 : 0}</p>
              <p>Path: {path} </p>
              <button onClick={calculateRoute}>Calculate Route</button>
          </div>
        </div>
        <Map
          locations={locations}
          setLocations={setLocations}
          path={path}
        />
      </div>
    </div>
  );
};

export default App;