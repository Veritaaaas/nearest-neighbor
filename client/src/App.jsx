import React, { useState, useEffect } from 'react';
import Map from './Map';
import nearestNeighborTsp from './NearestNeighbor';

import logo from './assets/Routify.png';
import "./App.css";

const App = () => {
  const [locations, setLocations] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [path, setPath] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [baggageWeights, setBaggageWeights] = useState([1]);
  const [isCalculateButtonDisabled, setIsCalculateButtonDisabled] = useState(true);

  // Calculate route using nearest neighbor algorithm
  const calculateRoute = async () => {
    try {
      const response = await fetch(`http://localhost:5000/route?locations=${locations.map(location => `${location.lat},${location.lng}`).join('|')}`);    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const score_matrix = calculateScore(data, baggageWeights);
      const path = nearestNeighborTsp(score_matrix); 
      setPath(path);
    } 
    catch (error) {
      console.error('A problem occurred when calculating the route:', error);
    }
  };

  function calculateScore(matrix, weights) {

    let score_matrix = Array(matrix.length).fill().map(() => Array(matrix[0].length).fill(0));
  
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        score_matrix[i][j] = (0.5 * matrix[i][j]) + (0.5 * (1/weights[j] * 100));
      }
    }
  
    console.log('Score matrix:', score_matrix);
    return score_matrix;
  }

  function reset() {
    setLocations([]);
    setAddresses([]);
    setPath([]);
    setBaggageWeights([1]);
  }


  useEffect(() => {
    const allWeightsFilled = baggageWeights.length === locations.length && baggageWeights.every(weight => weight !== undefined && weight !== '' && weight >= 0);
    setIsCalculateButtonDisabled(!allWeightsFilled);
    console.log('Baggage weights:', baggageWeights);
  }, [baggageWeights, locations]);


  return (
    <div>
      <div className='flex '>
        <div className='min-w-[25%]'>
          <div className='flex items-center bg-[#1C2120]'>
            <img src={logo} className='m-0 p-0 h-[60px]' alt="Routify logo"></img>
            <h1 className='text-[30px] text-white'>Routify</h1>
          </div>
          <div className='py-2 px-4 flex flex-col'>
            <div className=''>
              <div className='text-[20px] font-bold'>Origin:</div>
              <div className='flex items-center gap-4'>
                <div className='bg-[#3FB760] rounded-full text-white text-[20px] font-bold aspect-square min-w-7 flex justify-center items-center text-center'>0</div>
                <div className={`p-2 border-2 rounded-xl border-[#1C2120] cursor-pointer ${isExpanded ? '' : 'overflow-x-hidden whitespace-nowrap'}`} 
                  onClick={() => setIsExpanded(!isExpanded)}>
                  {addresses[0]}
                </div>
              </div>
            </div>
            <div className='mt-4'>
              <div className='text-[20px] font-bold'>Destinations:</div>
              <div className='flex flex-col gap-4 overflow-y-auto max-h-[170px]'>
                {addresses.slice(1).map((address, index) => (
                  <div key={index} className='flex items-center gap-4'>
                    <div className='bg-[#3FB760] rounded-full text-white text-[20px] font-bold aspect-square min-w-7 flex justify-center items-center text-center'>{index + 1}</div>
                    <div className={`p-2 border-2 rounded-xl border-[#1C2120] cursor-pointer ${isExpanded ? '' : 'overflow-x-hidden whitespace-nowrap'}`} 
                      onClick={() => setIsExpanded(!isExpanded)}>
                      {address}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='mt-4'>
              <div className='text-[20px] font-bold'>Baggage Weight</div>
              <div className='flex flex-col overflow-y-auto max-h-[180px]'>
                {locations.slice(1).map((location, index) => (
                  <div key={index} className='flex items-center gap-4 mt-4'>
                    <div className='bg-[#3FB760] rounded-full text-white text-[20px] font-bold aspect-square min-w-7 max-w-7 flex justify-center items-center text-center'>{index + 1}</div>
                    <input type='number' 
                      className='border-2 rounded-xl border-[#1C2120] p-2' 
                      onChange={(e) => {
                        const newBaggageWeights = [...baggageWeights];
                        newBaggageWeights[index + 1] = e.target.value;
                        setBaggageWeights(newBaggageWeights);
                      }}></input>
                  </div>
                ))}
              </div>
            </div>
            <div className='mt-4'>
              <div className='text-[20px] font-bold'>Route:</div>
              <div className='flex gap-4'>
                {path.map((index, i) => (
                  <div key={i} className='flex gap-4'>
                    <div className='bg-[#3FB760] rounded-full text-white text-[20px] font-bold aspect-square min-w-7 flex justify-center items-center text-center'>{index}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className='mt-4 flex justify-center'>
              <button onClick={calculateRoute} className='bg-[#3FB760] text-white p-2 rounded-xl text-[20px] font-bold' disabled={isCalculateButtonDisabled}>
                Calculate Route
              </button>
              <button className='bg-[#3FB760] text-white p-2 rounded-xl text-[20px] font-bold ml-4' onClick={reset}>
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className='min-w-full min-h-[100vh]'>
          <Map
            locations={locations}
            setLocations={setLocations}
            path={path}
            addresses={addresses}
            setAddresses={setAddresses}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
