import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeGameSpeed } from "../redux-store/gamerules";

const Settings = () => {
  const dispatch = useDispatch();
  const reduxSpeed = useSelector((state) => state.gameRules.gameSpeed);
  const [value, setValue] = useState(reduxSpeed);

  return (
    <div className="popout">
      <div className="popout--box">
        <p>Settings</p>
        <form>
          <p className="info">
            GameSpeed:
            <span>
              {value <= 1000 && value > 820 && "Super Slow"}
              {value <= 820 && value > 640 && "Slow"}
              {value <= 640 && value > 460 && "Normal"}
              {value <= 460 && value > 280 && "Fast"}
              {value <= 280 && "Really Fast"}
            </span>
          </p>
          <input
            className="speed-range-settings"
            min="100"
            step="20"
            max="1000"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onMouseUp={() => dispatch(changeGameSpeed(value))}
            type="range"
          />
        </form>
        <Link to="/">
          <button type="button">Main menu</button>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
