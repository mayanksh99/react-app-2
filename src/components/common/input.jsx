import React from "react";

const Input = ({ name, label, onChange, value }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        value={value}
        onChange={onChange}
        name={name}
        className="form-control"
        id={name}
      />
    </div>
  );
};

export default Input;
