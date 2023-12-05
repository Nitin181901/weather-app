import React, { useState } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setError("");
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setError("Location not found");
          } else {
            setError("An error occurred. Please try again.");
          }
        });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <SearchInput
        location={location}
        setLocation={setLocation}
        searchLocation={searchLocation}
        placeholder="Enter Location"
        error={error}
      ></SearchInput>
      <div className="container">
        {error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <WeatherDisplay data={data} />
            <WeatherDetails data={data} />
          </>
        )}
      </div>
    </div>
  );
}
export default App;
