import react from "react";
import "./SearchBar.css";

const SearchBar = ({ search, searchButton, randButton, enter  }) => {
  return (
    <div className="sec">
      <input
        className="searchField"
        type="search"
        onChange={search}
        onKeyDown={enter}
        placeholder="Search Pokemon..."
        autoComplete="on"
      />
      <div className="btn-group">
        <button className="srch-btn btn" onClick= {searchButton}>Search</button>
        <button className="generate btn" onClick={randButton}>Generate Random Pokemon</button>
      </div>
    </div>
  );
};

export default SearchBar;
