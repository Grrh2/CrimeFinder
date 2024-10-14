import React, { useRef } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

export default function ResultsMap({theDetails, apiKey }) {
    const {theCenter, results} = theDetails;
    const mapRef = useRef(null); 

    const onLoad = (mapInstance) => {
        mapRef.current = mapInstance; 
    };


    return (
        <>
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '400px' }}
                    center={theCenter} 
                    zoom={10} 
                    onLoad={onLoad} 
                >
                    {
                        results.map((item) => (
                            <MarkerF 
                                key={item.id} 
                                position={{
                                    lat: Number(item.location.latitude), 
                                    lng: Number(item.location.longitude) 
                                }} 
                                title={item.category} 
                            />
                        ))
                    }
                </GoogleMap>
            </LoadScript>
        </>
    );
}