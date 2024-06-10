import React, { useState } from 'react';
import Map from './Map';
import nearestNeighborTsp from './NearestNeighbor';

import logo from './assets/Routify.png';
import "./App.css";


const App = () => {
  const [locations, setLocations] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [path, setPath] = useState([]);
  const [baggageWeights, setBaggageWeights] = useState([]);


  // Calculate route using nearest neighbor algorithm
  const calculateRoute = async () => {
    const response = await fetch(`http://localhost:5000/route?locations=${locations.map(location => `${location.lat},${location.lng}`).join('|')}`);
    const data = await response.json();
    const path = nearestNeighborTsp(data); 
    console.log(addresses);
    setPath(path);
  }

  return (
    <div>
      <div className='flex '>
        <div className='min-w-[25%]'>
          <div className='flex items-center bg-[#1C2120]'>
            <img src={logo} className='m-0 p-0 h-[60px]'></img>
            <h1 className='text-[30px] text-white'>Routify</h1>
          </div>
          <div className='py-2 px-4 flex flex-col'>
              <div className=''>
                <div className='text-[20px] font-boldd'>Origin:</div>
                <div className='flex items-center gap-4'>
                  <div className='bg-[#3FB760] rounded-full text-white text-[20px] font-bold aspect-square min-w-7  flex justify-center items-center text-center'>0</div>
                  <div className='p-2 border-2 rounded-xl border-[#1C2120]'>{addresses[0]}</div>
                </div>
              </div>
              <div className='mt-4'>
                <div className='text-[20px] font-bold'>Destinations: </div>
                <div className='flex flex-col gap-4 overflow-y-auto max-h-[200px]'>
                  {addresses.slice(1).map((address, index) => (
                    <div key={index} className='flex items-center gap-4'>
                      <div className='bg-[#3FB760] rounded-full text-white text-[20px] font-bold aspect-square min-w-7 flex justify-center items-center text-center'>{index + 1}</div>
                      <div className='p-2 border-2 rounded-xl border-[#1C2120]'>{address}</div>
                    </div>
                  ))}
                </div>
              <div className='mt-4'>
                <div className='text-[20px] font-bold'>Baggage Weight</div>
                  <div className='flex flex-col overflow-y-auto max-h-[100px]'>
                    {locations.slice(1).map((location, index) => (
                      <div key={index} className='flex items-center gap-4 mt-4'>
                        <div className='bg-[#3FB760] rounded-full text-white text-[20px] font-bold aspect-square min-w-7 max-w-7 flex justify-center items-center text-center'>{index + 1}</div>
                        <input type='number' 
                        className='border-2 rounded-xl border-[#1C2120] p-2' onChange={(e) => {
                          const newBaggageWeights = [...baggageWeights];
                          newBaggageWeights[index] = e.target.value;
                          setBaggageWeights(newBaggageWeights);
                        }}></input>
                      </div>
                    ))}
                  </div>
              </div>
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