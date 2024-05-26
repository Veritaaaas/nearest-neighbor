import React, { useState } from 'react';
import Map from './Map';
import "./App.css";
import useDistanceMatrix from './useDistanceMatrix';
import nearestNeighborTsp from './NearestNeighbor';

const App = () => {
  const [destinations, setDestinations] = useState([]);
  const [origin, setOrigin] = useState(null);


  return (
    <div>
      <header>
        <h1>Traveling Salesman Problem with Google Maps</h1>
      </header>
      <Map
        origin={origin}
        destinations={destinations}
        setOrigin={setOrigin}
        setDestinations={setDestinations}
      />
    </div>
  );
};

export default App;
