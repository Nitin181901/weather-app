import React from "react";

const SearchInput = ({
  location,
  setLocation,
  searchLocation,
  placeholder,
  error,
}) => (
  <div className="search">
    <input
      value={location}
      onChange={(event) => setLocation(event.target.value)}
      onKeyPress={searchLocation}
      placeholder={placeholder}
      type="text"
    />
    <button onClick={() => searchLocation({ key: "Enter" })} type="button">
      Submit
    </button>
  </div>
);

export default SearchInput;
