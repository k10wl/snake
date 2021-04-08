import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const FinalScore = ({ restart, score }) => (
  <div className="popout">
    <div className="popout--box">
      <p>
        You scored {score} point{score !== 1 && `s`}!
      </p>
      <button onClick={restart} type="button">
        Play again
      </button>
      <Link to="/">
        <button type="button">Main menu</button>
      </Link>
    </div>
  </div>
);

export default FinalScore;

FinalScore.propTypes = {
  restart: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};
