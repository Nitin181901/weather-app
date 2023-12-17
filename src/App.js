import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherDetails from "./components/WeatherDetails";
import HistoryDisplay from "./components/HistoryDisplay";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedLocation = localStorage.getItem("lastSearchedLocation");
    const savedSearchHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (savedLocation) {
      setLocation(savedLocation);
      setSearchHistory(savedSearchHistory);
      fetchData(savedLocation);
    }
  }, []);

const fetchData = (searchLocation) => {
  if (!searchLocation.trim()) {
    setError("No input given");
    return;
  }

  setLoading(true);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

  axios
    .get(url)
    .then((response) => {
      setData(response.data);
      setError("");
      updateSearchHistory(searchLocation, response.data.main.temp);
      localStorage.setItem("lastSearchedLocation", searchLocation);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      setLocation("");
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        setError("Location not found");
      } else {
        setError("An error occurred. Please try again.");
      }
    })
    .finally(() => {
      setLoading(false);
    });
};


  const updateSearchHistory = (searchLocation, temperature) => {
    const updatedHistory = [
      { location: searchLocation, temperature },
      ...searchHistory,
    ];
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      fetchData(location);
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
      />
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <HistoryDisplay searchHistory={searchHistory} />
            <WeatherDisplay data={data} />
            <WeatherDetails data={data} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
