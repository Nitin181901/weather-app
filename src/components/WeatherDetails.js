import React from "react";

const WeatherDetails = ({ data }) => (
  <div className="bottom">
    <div className="feels">
      {data.main ? (
        <>
          <p className="bold">{data.main.feels_like.toFixed()}°F</p>
          <p>Feels Like</p>
        </>
      ) : null}
    </div>
    <div className="humidity">
      {data.main ? (
        <>
          <p className="bold">{data.main.humidity}%</p>
          <p>Humidity</p>
        </>
      ) : null}
    </div>
  </div>
);

export default WeatherDetails;
