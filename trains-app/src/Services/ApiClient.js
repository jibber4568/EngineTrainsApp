import React, { useEffect } from 'react';
import axios from 'axios';


const BASE_URI = 'https://api.tfl.gov.uk';
const API_KEY = '2fd4845953074d5b95a463dd55e49ae1'



export const SearchStopPointsByName = async (searchTerm) => {  
   return axios.get(BASE_URI + `/StopPoint/Search/${searchTerm}`, {                        
     params: {app_key: API_KEY}    
   }).then(response => {                   
     return response;
  }).catch (error => {   
    console.log(error.response); 
    return error.response;
  })
};


export const GetTubeDeparturesByStopPoint = async (stopPoint) => {  
  return axios.get(BASE_URI + `/StopPoint/${stopPoint}/Arrivals?mode=tube`, {                        
    params: {app_key: API_KEY}    
  }).then(response => {                   
    return response;
  }).catch (error => {    
   console.log(error.response); 
   return error.response;
 })
};
