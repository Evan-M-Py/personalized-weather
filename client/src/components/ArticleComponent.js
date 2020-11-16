import React from 'react';

const CurrentWeather = (props) => {

    return (

        <div className='articleHolder'>

            <div className='col'>

                <h3>{props.title}</h3>

                <img src={props.image} alt='No Image Available'/>


            </div>  

            <div className='colTwo'>



            </div>  

        </div>

    );

};

export default CurrentWeather;