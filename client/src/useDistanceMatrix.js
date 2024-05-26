// src/useDistanceMatrix.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useDistanceMatrix = (locations) => {
  const [distanceMatrix, setDistanceMatrix] = useState([]);

  useEffect(() => {
    if (locations.length < 2) return;

    const fetchDistances = async () => {
      const originDest = locations[0].lat + ',' + locations[0].lng;
      const destinations = locations.slice(1).map(location => location.lat + ',' + location.lng).join('|');
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const url = `${proxyUrl}https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originDest}&destinations=${destinations}&key=AIzaSyDe_-D5V_ilS9ejhdFVuM6WQPdCmQexZzw`;

      try {
        const response = await axios.get(url);
        const matrix = response.data.rows.map(row => row.elements.map(element => element.distance.value));
        setDistanceMatrix(matrix);
      } catch (error) {
        console.error("Error fetching distance matrix: ", error);
      }
    };

    fetchDistances();
  }, [locations]);

  return distanceMatrix;
};

export default useDistanceMatrix;
