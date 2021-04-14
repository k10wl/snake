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

  return (
    <div className="popout">
      <div className="popout--box">
        <p>Highest scores:</p>
        {scoreboard.length > 0 ? (
          scoreboard.map((score) => {
            const number = scoreboard.indexOf(score) + 1;
            return <UserScore key={number} score={score} number={number} />;
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
