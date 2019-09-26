import React from "react";

const Input = ({ name, label, errors, value, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        className="form-control"
        id={name}
        value={value}
      />
      {errors && <div className="alert alert-danger mt-2">{errors}</div>}
    </div>
  );
};

export default Input;
