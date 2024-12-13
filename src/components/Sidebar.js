import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import ToggleSwitch from "./ToggleSwitch";

function Sidebar({ onSearch, onTypeFilter, onThemeToggle, theme }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleThemeToggle = (e) => {
    onThemeToggle(e.target.checked ? "dark" : "light");
  };

  const handleTypeToggle = (type) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(updatedTypes);
    onTypeFilter(updatedTypes);
  };

  return (
    <div className="sidebar">
      <h1 className="sidebar-title">Explore Perlis Healthcare</h1>

      <h3>Theme</h3>
      <div className="toggle-wrapper">
        <ToggleSwitch onToggle={handleThemeToggle} />
      </div>

      <h3>Search Facility</h3>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>

      <h3>Filter by Type</h3>
      <div className="type-filters">
        {["Hospital", "Clinic", "Laboratory"].map((type) => (
          <button
            key={type}
            className={selectedTypes.includes(type) ? "selected" : ""}
            onClick={() => handleTypeToggle(type)}
          >
            {type} {selectedTypes.includes(type) && <FaTimes />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
