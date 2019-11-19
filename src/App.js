import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'

function App() {
  const [setLocation, location] = useState(false);
  const [setWeather, weather] = useState(false);

  let getWeather = async (lat, long) => {
    let response = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat, 
        lon: long, 
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt', 
        units: 'metric'
      }
    });
    setWeather(response.data);
    console.log(response.data)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  if(location == false){
    return (
      <div className = 'Location'>
        Habilitar Localizacao
      </div>
    )
  } else if (weather == false) {
    return (
      <div className = 'Loading'>
        Carregando...
      </div>
    )
  } else {
    return (
      <div className = 'Card'>
        <text className = 'Title'>Clima da Regiao({weather['weather'][0]['description']})</text>
          <ul>
            <li>Temperatura atual: {weather['main']['temp']}°</li>
            <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
            <li>Temperatura minima: {weather['main']['temp_min']}°</li>
            <li>Pressão: {weather['main']['pressure']} hpa</li>
            <li>Humidade: {weather['main']['humidity']}%</li>
          </ul>
        </div>
      );
  }

}

export default App;
