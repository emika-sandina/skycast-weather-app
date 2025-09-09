import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=05e0be985e346cde1873d59fcf592e80&units=metric`;

  function searchLocation() {
    fetch(url)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log(error));
  }

  //variables required for the final output
  let cityName, temp, description, feelsLike, humidity, windSpeed;

  if (data && data.main) {
    cityName = data.name;
    temp = `${Math.round(data.main.temp)}°C`;
    description = data.weather ? data.weather[0].description : "";
    feelsLike = `${Math.round(data.main.feels_like)}°C`;
    humidity = `${Math.round(data.main.humidity)}%`;
    windSpeed = data.wind ? `${Math.round(data.wind.speed)} KM/H` : "--KM/H";
  } else {
    cityName = "Enter City Name";
    temp = "--°C";
    feelsLike = "--°C";
    humidity = "--%";
    windSpeed = "--KM/H";
  }

  return (
    <>
      <div className="app">
        <div className="logo-bar">
          <h2 className="app-name"><i className="fas fa-cloud logo-icon"></i> SkyCast</h2>
        </div>
        <div className="search">
          <input
            value={location}
            placeholder="Enter a location"
            onChange={(event) => setLocation(event.target.value)}
          />
          <button
            className="searchBtn"
            onClick={() => searchLocation(location)}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{cityName}</p>
            </div>

            <div className="temp">
              <h1>{temp}</h1>
            </div>

            <div className="description">
              <p>{description}</p>
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              <p>{feelsLike}</p>
              <h2>Feels Like</h2>
            </div>

            <div className="humidity">
              <p>{humidity}</p>
              <h2>Humidity</h2>
            </div>

            <div className="wind">
              <p>{windSpeed}</p>
              <h2>Wind Speed</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
