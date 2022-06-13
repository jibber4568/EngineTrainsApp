import React, { useEffect } from 'react';
import  TrainArrivalNode  from './TrainArrivalNode.js';
import { SearchStopPointsByName, GetTubeDeparturesByStopPoint } from './Services/ApiClient.js';



function TrainArrivals(props) {
  

  const TIME_TO_REFRESH = 10000;
  const SUCCESS_CODE = 200

  const [stopPoint, setStopPoint] = React.useState(null);
  const [arrivals, setArrivals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasErrored, setHasErrored] = React.useState(false);



  //Attempt to retreive Arrivals on stopPoint change
  useEffect(() => {

    async function getArrivals() {            
      let arrivals = await GetTubeDeparturesByStopPoint(stopPoint.id);            
      if (checkResponseHasSucceeded(arrivals)) {
        setHasErrored(true);
        return;
      }

      //If I had more time I would get the unique platforms found in the array here and split them into seperate arrays to be rendered per platform.
      sortArrayByEarliestArrival(arrivals.data, function (res) {        
          setArrivals(res);        
          setIsLoading(false);                
        });
      } 
      
      if(stopPoint !== null){        
        getArrivals();
        setInterval(function () {
          setIsLoading(true);        
          getArrivals()      
        }, TIME_TO_REFRESH)      
      }
      
  }, [stopPoint])


  //Attempt to retreive StopPoint on StopPoint search term change
  useEffect(() => {      
    async function getStopPoint() {
      let response = await SearchStopPointsByName(props.stationSearchTerm);      
      if (checkResponseHasSucceeded(response)) {
        setHasErrored(true);
        return;
      }

      if(response.data.matches && response.data.matches.length > 0){          
        setStopPoint(response.data.matches[0])              
      }     
    }
                
    getStopPoint();

  }, [props.stationSearchTerm])  



  const checkResponseHasSucceeded = (response) => {
    if(response === null || response.status !== SUCCESS_CODE){
      return true;
    }
    return false;
  };

  const sortArrayByEarliestArrival = (arayToSort, callback) => {
    let newArray = arayToSort.sort(function(a,b){            
      return new Date(a.expectedArrival) - new Date(b.expectedArrival);
    });
    callback(newArray);
  };



  return (        

      <div className="row">       
        {hasErrored === true ?
          <div className="col-sm-12 col-sm-12 h-100 d-flex align-items-center justify-content-center error-message">
            An error has occurred. Please refresh
          </div>
        :    
        <React.Fragment>
            <div className="loading col-sm-12 h-100 d-flex align-items-center justify-content-center">
              <span style={{color: 'white'}}>{isLoading}</span>
              {isLoading === true ? <i className="fa-solid fa-spinner fa-spin fa-2x"></i>: null}
            </div>              
        
            <div className="col-sm-10"><h1>{stopPoint != null ? stopPoint.name : null} Arrivals</h1></div>      

            <div className="col-sm-12">            
              {arrivals.length > 0 ? arrivals.map(function(arrival, i){      
                return <TrainArrivalNode key={i} arrivalInfo={arrival}></TrainArrivalNode>
              })
              : null}
            </div>      
        </React.Fragment>              
        }
    </div>          
  );
}

export default TrainArrivals;

