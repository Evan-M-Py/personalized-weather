import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import { WeatherAndLocationProvider } from './LocationContext';
import WebsiteTitle from './components/WebsiteTitle';
import DashHome from './components/DashHome';

function App(props) {

  return (
    <WeatherAndLocationProvider> 

          <div className="App">
            
            <Switch>

              <Route exact path='/'>

              <DashHome/>

              </Route>

              <Route path='/home'>

                <DashHome/>

              </Route>

            </Switch>

          </div>

    </WeatherAndLocationProvider>

    );

}

export default App;
