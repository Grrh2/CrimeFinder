import {useEffect, useState, useRef} from 'react';
import {fetchCrimes, fetchLatLon, modifyDistance, createPoly, getGeoLocation} from '../Helpers.js';
import ResultsMap from './ResultsMap.jsx';
import ResultsDetails from './ResultsDetails.jsx';

export default function ResultsContainer({theData}) {


    const theDataRef = useRef(theData);
    const [dataPacket, setDataPacket] = useState({
        theCenter: {
            lat:51.5074,
            lng:0.00001
        },
        results: []
    });
    const [api, setApi] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
useEffect(() => {
    setErrorMessage(null);
},[theData])

    useEffect(() =>{

        theDataRef.current = theData;
        
        const {
            newPostcode, 
            newUsingPostcode, 
            newSliderValue, 
            newCustomDate,
            submitting,
            api
        } = theDataRef.current;
        setApi(api);
        if(!submitting){
            return;
        }
        async function fetchCrimesData(date,coords){
            try {
                return await fetchCrimes(date, coords);
            } catch (error) {
                setErrorMessage(error.message || "An error occured while fetching the data.");
                return [];
            }  
        }
        async function fetchLatLonAndCrimes(){
            
            try {
                const latLon = await fetchLatLon(newPostcode);
                const center = {
                    lat: latLon.result.latitude,
                    lng: latLon.result.longitude
                };
                const crimes = await fetchCrimesData(
                    newCustomDate,
                    createPoly(
                        center,
                        newSliderValue
                    )
                );
                setDataPacket({
                    theCenter: center,
                    results: crimes
                });
            } catch (error) {
                setErrorMessage(error.message || "An error occured while fetching the data.");
            }
        }
        async function fetchGeoAndCrimes() {
            try{
                const center = await getGeoLocation();
                const crimes = await fetchCrimesData(
                    newCustomDate,
                    createPoly(center, newSliderValue)
                );
                setDataPacket({
                    theCenter: center,
                    results:crimes
                });
            } catch (error) {
                setErrorMessage(error.message || "An error occured while fetching the data.");
            }
        }
        if (newUsingPostcode) {
            fetchLatLonAndCrimes();
        } else {
            fetchGeoAndCrimes();
       }
    },[theData]);

    return (
        <div className='results-container'>
            {errorMessage && (<div className='error-message'>{errorMessage}</div>)}
            <div className='results-group'>
                <div className='results-map'>
                    {api && api.length === 39 && 
                    (<ResultsMap
                    theDetails={dataPacket}
                    apiKey={api}
                    />)}
                </div>
                {api && api.length === 39 && (
                    <ResultsDetails
                    theDetails={dataPacket}
                    />)}
                    
            </div>
        </div>
    );
}