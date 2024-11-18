import React, { useState } from "react";

const SearchBar = ({ setSearchKeyword }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchKeyword(search);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
