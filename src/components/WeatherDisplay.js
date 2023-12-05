import React from "react";

const WeatherDisplay = ({ data }) => (
  <div className="top">
    <div className="location">
      <p>{data.name}</p>
    </div>
    <div className="temp">
      {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
    </div>
    <div className="description">
      {data.weather ? <p>{data.weather[0].main}</p> : null}
    </div>
  </div>
);

export default WeatherDisplay;
