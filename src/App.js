import React, { useState } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
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
      ></SearchInput>
      <div className="container">
      <WeatherDisplay data={data}></WeatherDisplay>
      <WeatherDetails data={data}></WeatherDetails>
      </div>
    </div>
  );
}
export default App;
