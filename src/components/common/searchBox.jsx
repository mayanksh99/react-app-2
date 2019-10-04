import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <div className="form-group">
      <input
        type="text"
        name="query"
        value={value}
        className="form-control"
        placeholder="Search..."
        onChange={e => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default Search;
