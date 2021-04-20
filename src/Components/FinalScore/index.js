import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import * as snake from "../../redux-store/snake";
import { resetScore } from "../../redux-store/score";

const FinalScore = ({ score }) => {
  const dispatch = useDispatch();
  return (
    <div className="popout">
      <div className="popout--box">
        <p>
          You scored {score} point{score !== 1 && `s`}!
        </p>
        <button
          onClick={() => {
            dispatch(snake.resetGame());
            dispatch(resetScore());
          }}
          type="button"
        >
          Play again
        </button>
        <Link to="/">
          <button type="button">Main menu</button>
        </Link>
      </div>
    </div>
  );
};

export default FinalScore;

FinalScore.propTypes = {
  score: PropTypes.number.isRequired,
};
