import React from 'react';

const FiveDayForecast = (props) => {

    return (

        <div className='fiveDayHolder'>

            <div className='col'>

                <h3>{props.weather.date.day}</h3>
                <h3>{props.weather.date.month}</h3>
                <h3>Feels Like: {props.weather.feelsLike} °F</h3>   

                <img src={`http://openweathermap.org/img/w/${props.weather.icon}.png`}/>

                <h2 >{props.weather.description}</h2>

            </div>  

            <div className='colTwo'>

                <h2>High: {props.weather.tempMax} °F</h2>
                <h2>Low: {props.weather.tempMin} °F</h2>
                <h2 >Sunrise: {props.weather.sunrise}</h2>
                <h2>Sunset: {props.weather.sunset}</h2>

            </div>  

        </div>

    );

};

export default FiveDayForecast;