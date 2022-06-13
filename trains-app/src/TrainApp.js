import React, { useEffect } from 'react';
import './TrainApp.css';
import  TrainArrivals  from './TrainArrivals.js';
import { SearchStopPointsByName } from './Services/ApiClient.js';



function TrainApp() {
  
  const [stationName, setStationName] = React.useState("Great Portland Street");

  return (
    <div className="container train-app">        
      <TrainArrivals stationSearchTerm={stationName}/>
    </div>
  );
}

export default TrainApp;

