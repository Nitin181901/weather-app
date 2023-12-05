import React from "react";

const SearchInput = ({
  location,
  setLocation,
  searchLocation,
  placeholder,
}) => (
  <div className="search">
    <input
      value={location}
      onChange={(event) => setLocation(event.target.value)}
      onKeyPress={searchLocation}
      placeholder={placeholder}
      type="text"
    />
  </div>
);

export default SearchInput;
