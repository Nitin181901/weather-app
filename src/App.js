import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    // Load data and search history from local storage on component mount
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
    setLoading(true); // Set loading to true when starting the fetch

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setError("");
        updateSearchHistory(searchLocation, response.data.main.temp);
        // Save the last searched location and updated search history to local storage
        localStorage.setItem("lastSearchedLocation", searchLocation);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("Location not found");
        } else {
          setError("An error occurred. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false when the fetch is complete
      });
  };

  const updateSearchHistory = (searchLocation, temperature) => {
    const updatedHistory = [
      { location: searchLocation, temperature },
      ...searchHistory,
    ];
    setSearchHistory(updatedHistory);
    // Save the updated search history to local storage
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
      ></SearchInput>
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <div className="history">
              <h2>Search History</h2>
              <ul>
                {searchHistory.map((item, index) => (
                  <li key={index}>
                    <span>{item.location}</span> -{" "}
                    <span>{item.temperature.toFixed()}°F</span>
                  </li>
                ))}
              </ul>
            </div>
            <WeatherDisplay data={data} />
            <WeatherDetails data={data} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
