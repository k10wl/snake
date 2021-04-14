import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as snake from "../../redux-store/snake";
import FinalScore from "../FinalScore";
import Pause from "../Pause";
import GameLogic from "./GameLogic";
import CanvasComponent from "./CanvasComponent";
import bindKeys from "../../constants/keys";

const GameField = () => {
  const { alive, lastStep, bodyPosition } = useSelector((state) => state.snake);
  const { foodCoords, prevFoodCoords } = useSelector((state) => state.food);
  const { score } = useSelector((state) => state);
  const { gameSpeed } = useSelector((state) => state.gameRules);
  const [pause, changePause] = useState(false);
  const snakeMovementRef = useRef();
  const dispatch = useDispatch();

  GameLogic(dispatch, alive, bodyPosition, foodCoords, prevFoodCoords, score);

  useEffect(() => {
    snakeMovementRef.current = setInterval(
      () => dispatch(snake.startMovement()),
      gameSpeed
    );
    if (!alive) clearInterval(snakeMovementRef.current);
    return () => clearInterval(snakeMovementRef.current);
  }, [pause, alive, dispatch, gameSpeed]);

  useEffect(() => {
    const setPause = (e) => {
      if (e.key === "Escape" || e.key === " ") changePause(!pause);
    };
    document.addEventListener("keydown", setPause);
    if (alive && pause) clearInterval(snakeMovementRef.current);
    return () => document.removeEventListener("keydown", setPause);
  }, [alive, pause]);

  useEffect(() => {
    const userInput = (e) => {
      bindKeys(
        e,
        dispatch,
        snake.moveDirectionLeft,
        snake.moveDirectionUp,
        snake.moveDirectionRight,
        snake.moveDirectionDown,
        lastStep
      );
    };
    document.addEventListener("keydown", userInput);
    if (!alive || pause) document.removeEventListener("keydown", userInput);
    return () => document.removeEventListener("keydown", userInput);
  }, [alive, dispatch, lastStep, pause]);

  return (
    <div>
      <div className="game-field">
        <CanvasComponent
          lastStep={lastStep}
          foodCoords={foodCoords}
          bodyPosition={bodyPosition}
        />
        {alive && (
          <div className="game-field--score">
            <p className="game-field--score--text"> Your score: {score} </p>
            <div className="game-field--score--box" />
          </div>
        )}
      </div>
      {!alive && <FinalScore score={score} />}
      {pause && alive && <Pause unpause={() => changePause(false)} />}
    </div>
  );
};

export default GameField;
