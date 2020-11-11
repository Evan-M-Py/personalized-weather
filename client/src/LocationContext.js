import React, { useState, createContext } from 'react';

export const WeatherContext = createContext();
export const LocationContext = createContext();

export const WeatherAndLocationProvider = props => {

    const [ weather, setWeather ] = useState({
        temp: '',
        descript: '',
        feelslike: '',
        humidity: '',

    });

    const [ location, setLocation ] = useState({
        city: 'Detroit',
        state: 'MI26'
    });

    return (
        <WeatherContext.Provider value={[ weather, setWeather ]}>
            <LocationContext.Provider value={[ location, setLocation ]}>
                {props.children}
            </LocationContext.Provider>
        </WeatherContext.Provider>
    );

};