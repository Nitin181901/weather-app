import React from "react";

const WeatherDisplay = ({ data }) => {
  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <div className="top">
      <div className="location">
        <p>{data.name}</p>
      </div>
      <div className="temp">
        {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
      </div>
      <div className="description">
        {data.weather ? <p>{data.weather[0].main}</p> : null}
        {data.weather ? (
          <img
            src={getWeatherIconUrl(data.weather[0].icon)}
            alt="Weather Icon"
          />
        ) : null}
      </div>
    </div>
  );
};

export default WeatherDisplay;
