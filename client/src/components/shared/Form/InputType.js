import React from 'react';

const InputType = ({ inputType, value, onChange, name, labelText, labelFor }) => {
  return (
    <div className="mb-1">
      <label htmlFor={labelFor} className="form-label">
        {labelText}
      </label>
      <input
        type={inputType}
        id={labelFor} // ID added here
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
        autoComplete={name} // Enables browser autofill
        required
      />
    </div>
  );
};

export default InputType;
