import React from "react";

const Input = ({ name, label, onChange, value, errors }) => {
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
      {errors && <div className="alert alert-danger mt-2">{errors}</div>}
    </div>
  );
};

export default Input;
