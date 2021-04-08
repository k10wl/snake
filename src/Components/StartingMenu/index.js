import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetGame } from "../../redux-store/snake";
import { resetScore } from "../../redux-store/score";
import { newPiece } from "../../redux-store/food";

const StaringMenu = () => {
  const dispatch = useDispatch();
  return (
    <div className="starting-menu">
      <Link to="/game">
        <button
          onClick={() => {
            dispatch(resetGame());
            dispatch(resetScore());
            dispatch(newPiece());
          }}
          type="button"
        >
          Start
        </button>
      </Link>
      <Link to="/scoreboard">
        <button type="button">Scoreboard</button>
      </Link>
      <Link to="/settings">
        <button type="button">Settings</button>
      </Link>
    </div>
  );
};

export default StaringMenu;
