import React, { useEffect, useState, useContext } from 'react';
import { WeatherContext, LocationContext } from '../LocationContext';
import axios from 'axios';

function WeatherWindow() {

    const [ cloudiness, setCloudiness ] = useState({});
    const [ wind, setWind ] = useState({});
    const [ sunRiseSet, setSunRiseSet ] = useState({
        sunrise: '',
        sunset: ''
    });
    const [ weatherDescript, setWeatherDescript ] = useState({}) 
    const [ weatherCurrent, setWeatherCurrent ] = useState({
        });

        const [ locationSearch, setLocationSearch ] = useState({
            city: '',
            state: ''
        })

    const [ weather, setWeather ] = useContext(WeatherContext);
    const [ location, setLocation ] = useContext(LocationContext);
    const [ weatherForecastJsx, setWeatherForecastJsx ] = useState([]);



    async function locationCall( city ) {

        const URL = await `http://api.openweathermap.org/data/2.5/weather?q=${location.city},${location.state}&units=imperial&appid=7a7853756f9d87676b784b679a2ff9a9`
        
        const theCall = await axios({

            method: 'get',
            url: URL

            }).then(function(response) {
                
                const weatherInfoArray = [ response.data.main , {cloudiness: response.data.clouds}, {wind: response.data.wind.speed}, response.data.weather[0], response.data.sys.sunrise, response.data.sys.sunrise]

            setWeatherCurrent( weatherInfoArray[0] );
            setCloudiness( weatherInfoArray[1] );
            setWind( weatherInfoArray[2] );
            setWeatherDescript( weatherInfoArray[3] )
            timeConverter('sunrise', weatherInfoArray[4])
            timeConverter('sunset', weatherInfoArray[5])


        })
        console.log(weatherCurrent)
        console.log(wind)
        console.log(weatherDescript)
        console.log(theCall)

    };

    async function timeConverter(which, U){
        let a = await new Date(U * 1000);
        let months = await ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = await a.getFullYear();
        let month = await months[a.getMonth()];
        let date = await a.getDate();
        let hour = await a.getHours();
        let min = await a.getMinutes();

        let standardTime;

        if (hour > 0 && hour <= 12) {
            standardTime= "" + hour;
          } else if (hour > 12) {
            standardTime= "" + (hour - 12);
          } else if (hour == 0) {
            standardTime= "12";
          }

        standardTime += await (min < 10) ? ":0" + min : ":" + min;
        standardTime += await (hour >= 12) ? " P.M." : " A.M.";

        var time = await hour + ':' + min ;

        setSunRiseSet(prev => ({...prev, [which]: standardTime}));
        console.log(sunRiseSet)
        console.log(time)

      }


    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        
    
        setLocation((prevState) => ({
          ...prevState, [name]: value
            })
        );
        console.log(locationSearch)

      };

      useEffect(() => {
            locationCall(location.city)
      },[location])

    return (

        <div className='WeatherWindow'>

            <div className='weatherTitle'>

                <h1>{location.city} {location.state}</h1>

                <div className='row'>
                    
                    <p className='nxtToImg'>{weatherDescript.description}</p>
                    <img src={`http://openweathermap.org/img/w/${weatherDescript.icon}.png`}/>
                    
                </div>

                <div className='row'>

                    <h2 >sunrise: {sunRiseSet.sunrise} - sunset: {sunRiseSet.sunset}</h2> 

                </div>



                <div className='row'>

                    <h3>Tempurature: {weatherCurrent.temp} F</h3>
                    
                </div>

                <div className='row'>

                    <h3>High: {weatherCurrent.temp_max} / Low: {weatherCurrent.temp_min}</h3>
                    
                </div>

                <div className='row'>

                    
                </div>

            </div>
            
        
        <button onClick={(e) => locationCall(e)}>Console Log Btn</button>



        </div>
    )
}

export default WeatherWindow;