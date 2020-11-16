import React, { useContext } from 'react';
import Nav from './Nav.js';
import WeatherWindow from './WeatherWindow.js';
import NewsWindow from './NewsWindow';
import { LocationContext } from '../LocationContext';

function HomeDash(props) {

    const [ location, useLocation ] = useContext(LocationContext)

    return (
        <div className='DashHome'>

            <WeatherWindow/>

            <NewsWindow/>

        </div>
    )
};

export default HomeDash;