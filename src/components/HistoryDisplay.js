import React from "react";

const HistoryDisplay = ({ searchHistory }) => {
  return (
    <div className="history">
      <h2>Search History</h2>
      <ul>
        {searchHistory.map((item, index) => (
          <li key={index}>
            <span>{item.location}</span> -{" "}
            <span>{item.temperature.toFixed()}°C</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryDisplay;
