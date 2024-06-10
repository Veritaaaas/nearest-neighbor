import React, { useState } from 'react';
import Map from './Map';
import nearestNeighborTsp from './NearestNeighbor';
import "./App.css";


const App = () => {
  const [locations, setLocations] = useState([]);
  const [path, setPath] = useState([]);


  // Calculate route using nearest neighbor algorithm
  const calculateRoute = async () => {
    const response = await fetch(`http://localhost:5000/route?locations=${locations.map(location => `${location.lat},${location.lng}`).join('|')}`);
    const data = await response.json();
    const path = nearestNeighborTsp(data); 
    setPath(path);
  }

  return (
    <div>
      <header>
        <h1>Traveling Salesman Problem with Nearest Neighbor Algorithm</h1>
      </header>
      <div className='flex b'>
        <div className=''>
          <div className=''>
              <h2>Click on the map to add destinations</h2>
              <p>Origin: {locations[0] ? `${locations[0].lat}, ${locations[0].lng}` : 'None'}</p>
              <p>Destinations: {locations.length > 1 ? locations.length - 1 : 0}</p>
              <p>Path: {path} </p>
              <button onClick={calculateRoute}>Calculate Route</button>
          </div>
        </div>
        <div>
          <Map
            locations={locations}
            setLocations={setLocations}
            path={path}
          />
        </div>
      </div>
    </div>
  );
};

export default App;