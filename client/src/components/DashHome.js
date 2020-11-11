import React from 'react';
import Nav from './Nav.js';
import WeatherWindow from './WeatherWindow.js';

function HomeDash(props) {

    return (
        <div className='DashHome'>

            <Nav/>

            <WeatherWindow/>

            

        </div>
    )
};

export default HomeDash;