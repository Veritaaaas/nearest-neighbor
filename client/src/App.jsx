import React, { useState, useEffect } from 'react';
import Map from './Map';
import nearestNeighborTsp from './NearestNeighbor';
import "./App.css";


const App = () => {
  const [destinations, setDestinations] = useState([]);
  const [origin, setOrigin] = useState(null);
  const [distanceMatrix, setDistanceMatrix] = useState(null);

  useEffect(() => {
    if (origin && destinations.length > 0) {
      const locations = [origin, ...destinations];
      fetch(`http://localhost:5000/route?locations=${locations.map(location => `${location.lat},${location.lng}`).join('|')}`)
        .then(response => response.json())
        .then(data => setDistanceMatrix(data))
        .catch(error => console.error('Error:', error));
    }

  }, [origin, destinations]);

  useEffect(() => {
    console.log('Distance Matrix:', distanceMatrix);
  } , [distanceMatrix]);

  const calculateRoute = () => {
    const path = nearestNeighborTsp(distanceMatrix);
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
              <p>Origin: {origin ? `${origin.lat}, ${origin.lng}` : 'None'}</p>
              <p>Destinations: {destinations.length}</p>
              <button onClick={calculateRoute}>Calculate Route</button>
          </div>
        </div>
        <Map
          origin={origin}
          destinations={destinations}
          setOrigin={setOrigin}
          setDestinations={setDestinations}
        />
      </div>
    </div>
  );
};

export default App;