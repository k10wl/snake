import React from "react";
import { useDispatch } from "react-redux";
import GameField from "./GameField";
import bindKeys from "../constants/keys";
import * as snake from "../redux-store/snake";

const App = () => {
  const dispatch = useDispatch();

  // keybinding
  bindKeys(
    dispatch,
    snake.moveDirectionLeft,
    snake.moveDirectionUp,
    snake.moveDirectionRight,
    snake.moveDirectionDown
  );

  const startGame = () => {
    setInterval(() => dispatch(snake.startMovement()), 250);
  };

  return (
    <div>
      <button onClick={() => dispatch(snake.moveDirectionLeft())} type="button">
        LEFT
      </button>
      <button onClick={() => dispatch(snake.moveDirectionUp())} type="button">
        UP
      </button>
      <button
        onClick={() => dispatch(snake.moveDirectionRight())}
        type="button"
      >
        RIGHT
      </button>
      <button onClick={() => dispatch(snake.moveDirectionDown())} type="button">
        DOWN
      </button>
      <br />
      <button onClick={() => startGame()} type="button">
        click here to start
      </button>
      <GameField />
    </div>
  );
};

export default App;
