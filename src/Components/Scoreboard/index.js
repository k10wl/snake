import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const UserScore = ({ number, score }) => (
  <p className="info">
    {number}. <span>{score} points</span>
  </p>
);

const Scoreboard = () => {
  const scoreboard = useSelector((state) => state.scoreboard);
  let scoreCount = 0;
  return (
    <div className="popout">
      <div className="popout--box">
        <p>Highest scores:</p>
        {scoreboard.length > 0 ? (
          scoreboard.map((score) => {
            scoreCount += 1;
            return (
              <UserScore key={scoreCount} score={score} number={scoreCount} />
            );
          })
        ) : (
          <p>No scores</p>
        )}
        <Link to="/">
          <button type="button">Main menu</button>
        </Link>
      </div>
    </div>
  );
};

export default Scoreboard;

UserScore.propTypes = {
  number: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
