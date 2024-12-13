import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ onToggle }) => {
  return (
    <label className="ui-switch">
      <input type="checkbox" onChange={onToggle} />
      <div className="slider">
        <div className="circle"></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
