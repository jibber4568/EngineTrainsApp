import React from 'react';
import Moment from 'react-moment';



function TrainArrivalNode(props) {        
  
  return (        
    <React.Fragment>
      {props.arrivalInfo != null && props.arrivalInfo.hasOwnProperty("destinationName") === true
      ?
      <div className="row arrival-node">      
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-1">                        
              <Moment format="HH:mm">
                  {props.arrivalInfo.expectedArrival}
              </Moment>                                           
            </div>
            <div className="col-sm-4 col-md-5">                        
              <span className="destination">{props.arrivalInfo.destinationName}</span>
            </div>
            <div className="col-sm-4 col-md-6">                        
              <span className="destination">{props.arrivalInfo.platformName}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4 offset-sm-1 col-md-4 offset-md-1">                        
              <span>{props.arrivalInfo.lineName} Line</span>
            </div>
        </div>          
        </div>
      </div>
      : null}
  </React.Fragment>
  );
}

export default TrainArrivalNode;

