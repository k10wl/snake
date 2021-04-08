import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Pause = ({ unpause }) => {
  return (
    <div className="popout">
      <div className="popout--box">
        <p>Game is paused</p>
        <button onClick={unpause} type="button">
          Resume
        </button>
        <Link to="/">
          <button type="button">Main menu</button>
        </Link>
      </div>
    </div>
  );
};

export default Pause;

Pause.propTypes = {
  unpause: PropTypes.func.isRequired,
};
