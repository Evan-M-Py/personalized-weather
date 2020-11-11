import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { LocationContext, WeatherContext } from '../LocationContext';
import axios from 'axios';

function WebsiteTitle(props) {

    const [ locationSearch, setLocationSearch ] = useState({
        city: '',
        state: ''
    })
    const [ weatherCurrent, setWeatherCurrent ] = useState({
        temp: '',
        descript: '',
        feelsLike: '',
        humidity: '',
        sunrise: '',
        sunset: ''
        });

    const states = [ 
        {name:'AL', code: '01'}, {name:'AK', code: '02'}, {name:'AS', code: '03'}, 
        {name:'AZ', code: '04'}, {name:'AR', code: '05'}, {name:'CA', code: '06'}, 
        {name:'CO', code: '08'}, {name:'CT', code: '09'}, {name:'DE', code: '10'}, 
        {name:'FL', code: '12'}, {name:'GA', code: '13'}, {name:'HI', code: '14'}, 
        {name:'ID', code: '15'}, {name:'IL', code: '17'}, {name:'IN', code: '18'}, 
        {name:'IA', code: '19'}, {name:'KS', code: '20'}, {name:'KY', code: '21'}, 
        {name:'LA', code: '22'}, {name:'ME', code: '23'}, {name:'MD', code: '24'}, 
        {name:'MA', code: '25'}, {name:'MI', code: '26'}, {name:'MN', code: '27'}, 
        {name:'MS', code: '28'}, {name:'MO', code: '29'}, {name:'MT', code: '30'}, 
        {name:'NE', code: '31'}, {name:'NV', code: '32'}, {name:'NH', code: '33'}, 
        {name:'NJ', code: '34'}, {name:'NM', code: '35'}, {name:'NY', code: '36'},
        {name:'NC', code: '37'}, {name:'ND', code: '38'}, {name:'OH', code: '39'}, 
        {name:'OK', code: '40'}, {name:'OR', code: '41'}, {name:'PA', code: '42'}, 
        {name:'RI', code: '44'}, {name:'SC', code: '45'}, {name:'SD', code: '46'},
        {name:'TN', code: '47'}, {name:'TX', code: '48'}, {name:'UT', code: '49'}, 
        {name:'VT', code: '50'}, {name:'VA', code: '51'}, {name:'WA', code: '53'}, 
        {name:'WV', code: '54'}, {name:'WI', code: '55'}, {name:'WY', code: '56'} 
    ];

    const [ location, setLocation ] = useContext(LocationContext)
    const [ weather, setWeather ] = useContext(WeatherContext)

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        
    
        setLocation((prevState) => ({
          ...prevState, [name]: value
            })
        );
        console.log(locationSearch)

      };

      async function locationCall(e) {

        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${location.city}&units=imperial&appid=7a7853756f9d87676b784b679a2ff9a9`

        e.preventDefault();

            let callOne = await axios({

            method: 'get',
            url: URL

            }).then(function(response) {
                console.log(response.data.main)
                console.log(response.data)
          
        //   setWeatherCurrentDescript(response.data.current.weather[0].description);




            // setWeatherAlerts( prevArray => [ prevArray, response.data ]);

        })

    };



    return (
        <div className='titleAndNav'>
            
            <div className='title'>Nice Day, Huh!?!</div>

            <div className='userInput'>

                <input onChange={(e) => handleInputChange(e)} type='text' name='city' placeholder='enter your city'></input>

                <select onChange={(e) => handleInputChange(e)} name='state'>

                    {states.map((e) => {

                        return(
                            <option key={e.name} value={e.code}>{e.name}</option>
                        )

                    })}

                </select>

            </div>

            <button onClick={(e) => locationCall(e)}><Link className='link' to='/home'>How's Detroit Today?</Link></button>

        </div>
    )
}

export default WebsiteTitle;