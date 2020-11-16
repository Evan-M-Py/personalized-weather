import React, { useEffect, useState, useContext } from 'react';
import { WeatherContext, LocationContext } from '../LocationContext';
import CurrentWeather from './CurrentWeather';
import FiveDayForecast from './FiveDayForecast';
import axios from 'axios';

function WeatherWindow() {

    const [ sunRiseSet, setSunRiseSet ] = useState({
        sunrise: '',
        sunset: ''
    });

    const [ weatherCurrent, setWeatherCurrent ] = useState({
        });

    const [ locationSearch, setLocationSearch ] = useState({
        city: '',
        state: ''
    })

    const [ weather, setWeather ] = useContext(WeatherContext);
    const [ location, setLocation ] = useContext(LocationContext);
    const [ weatherForecastJsx, setWeatherForecastJsx ] = useState([]);
    const [ fiveDayForecast, setFiveDayForecast ] = useState([])

    async function locationCall( city ) {

        const URL = await `http://api.openweathermap.org/data/2.5/weather?q=${location.city},${location.state}&units=imperial&appid=7a7853756f9d87676b784b679a2ff9a9`
        
        const theCurrentCall = await axios({

            method: 'get',
            url: URL

            }).then(function(response) {

                let sunset = timeConverter(response.data.sys.sunset)
                let sunrise = timeConverter(response.data.sys.sunrise)

                const weatherInfoArray = [ response.data.main , {cloudiness: response.data.clouds}, {wind: response.data.wind.speed}, response.data.weather[0], response.data.sys.sunrise, response.data.sys.sunrise]

                let currentWeatherObj = {

                    temp: response.data.main.temp,
                    feelsLike: response.data.main.feels_like,
                    tempMin: response.data.main.temp_min,
                    tempMax: response.data.main.temp_max,
                    humidity: response.data.main.humidity,
                    cloudiness: response.data.clouds.all,
                    wind: response.data.wind.speed,
                    description: response.data.weather[0].description,
                    icon: response.data.weather[0].icon,
                    sunset: sunset,
                    sunrise: sunrise

                }

            setWeatherCurrent( currentWeatherObj );
            console.log(weatherCurrent)

        });

        const theFiveDayCall = await axios({

            method: 'get',
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${location.city},${location.state}&units=imperial&appid=7a7853756f9d87676b784b679a2ff9a9`

            }).then(function(response) {
                
                for (let i = 0; i < response.data.list.length; i++) {

                    let res = response.data.list[i]

                    let date = dateConverter(res.dt);

                    if (res.dt_txt.slice(11,19) === '12:00:00') {

                        let data = {

                            date: date,
                            temp: res.main.temp,
                            feelsLike: res.main.feels_like,
                            tempMax: res.main.temp_max,
                            tempMin: res.main.temp_min,
                            description: res.weather[0].description,
                            clouds: res.clouds.all,
                            icon: res.weather[0].icon, 
                            humidity: res.main.humidity

                        }

                        setFiveDayForecast((prevState) => ([...prevState, {data}])) 

                    };

                }
        
        });

    };

    const timeConverter = (U) => {

        let a =  new Date(U * 1000);
        let months =  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year =  a.getFullYear();
        let month =  months[a.getMonth()];
        let date =  a.getDate();
        let hour =  a.getHours();
        let min =  a.getMinutes();

        let standardTime;

        if (hour > 0 && hour <= 12) {
            standardTime= "" + hour;
          } else if (hour > 12) {
            standardTime= "" + (hour - 12);
          } else if (hour == 0) {
            standardTime= "12";
          }

        standardTime +=  (min < 10) ? ":0" + min : ":" + min;
        standardTime +=  (hour >= 12) ? " P.M." : " A.M.";

        var time =  hour + ':' + min ;

        return standardTime

        };

        const dateConverter = (U) => {

            let a =  new Date(U * 1000);
            let months =  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            let year =  a.getFullYear();
            let month =  months[a.getMonth()];
            let date =  a.getDate();
            let hour =  a.getHours();
            let min =  a.getMinutes();
    
            let standardTime;
    
            if (hour > 0 && hour <= 12) {
                standardTime= "" + hour;
              } else if (hour > 12) {
                standardTime= "" + (hour - 12);
              } else if (hour == 0) {
                standardTime= "12";
              }
    
            standardTime +=  (min < 10) ? ":0" + min : ":" + min;
            standardTime +=  (hour >= 12) ? " P.M." : " A.M.";
    
            let stringDate =  a.toDateString();
            let stringMonth = stringDate.slice(4,7);
            let stringDay = stringDate.slice(0,4);
            stringDay += stringDate.slice(7,11) 

            let dayObj = {
                day: stringDay,
                month: stringMonth
            }
    
            return dayObj
    
            };

    const handleInputChange = (e) => {

        e.preventDefault();

        const { name, value } = e.target;
    
        setLocation((prevState) => ({
          ...prevState, [name]: value
            })
        );

    };


    useEffect(() => {

        locationCall(location.city)

      },[location]);

    return (

        <div className='WeatherWindow'>

            <div className='row'>

                <h2>{location.city}, {location.state}</h2>

            </div>
            

            <div className='row'>
                
                <CurrentWeather 
                location={location} 
                weather={weatherCurrent}
                />

                <iframe width="560" height="315" src="https://www.youtube.com/embed/U900Q4Ok5DY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
           
            </div>

            <div className='rowTwo'>

                {fiveDayForecast.map(fiveDay => {
                        return(
                            <FiveDayForecast 
                            weather={fiveDay.data}
                            />
                        )
                    })
                }

            </div>
        
        </div>
    )
};

export default WeatherWindow;