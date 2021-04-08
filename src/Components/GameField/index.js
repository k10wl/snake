import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newPiece, preventSpawnOnLastPlace } from "../../redux-store/food";
import * as snake from "../../redux-store/snake";
import { addOneToScore, resetScore } from "../../redux-store/score";
import FinalScore from "../FinalScore";
import Pause from "../Pause";
import { addToScoreboard } from "../../redux-store/scoreboard";

const GameField = () => {
  const dispatch = useDispatch();
  const canvas = useRef(null);
  const gameSpeed = useSelector((store) => store.gameRules.gameSpeed);
  const snakeCoords = useSelector((store) => store.snake.bodyPosition);
  const reduxSnakeIsAlive = useSelector((store) => store.snake.alive);
  const lastStepSnakeDid = useSelector((store) => store.snake.lastStep);
  const { foodCoords, prevFoodCoords } = useSelector((store) => store.food);
  const score = useSelector((store) => store.score);
  const [snakeIsAlive, checkIfSnakeIsAlive] = useState(reduxSnakeIsAlive);
  const [headCoords, ...bodyCoords] = snakeCoords;
  const [headCoordsX, headCoordsY] = headCoords;
  const [foodCoordsX, foodCoordsY] = foodCoords;

  const [pause, usePause] = useState(false);
  const [prevFoodCoordsX, prevFoodCoordsY] = prevFoodCoords;

  // If food spawn on the same place as last time we spawn new food
  if (prevFoodCoordsX === foodCoordsY && prevFoodCoordsY === foodCoordsY) {
    dispatch(newPiece());
  }

  // If food coords and head coords match we consume food
  if (headCoordsX === foodCoordsX && headCoordsY === foodCoordsY) {
    dispatch(preventSpawnOnLastPlace());
    dispatch(snake.consumeFood());
    dispatch(addOneToScore());
  }

  // If food coords and snake coords match we spawn new food
  snakeCoords.forEach((snakePiece) => {
    const [x, y] = snakePiece;
    if (x === foodCoordsX && y === foodCoordsY) {
      dispatch(newPiece());
    }
  });

  useEffect(() => {
    checkIfSnakeIsAlive(reduxSnakeIsAlive);
    const move = setInterval(() => dispatch(snake.startMovement()), gameSpeed);

    const ctx = canvas.current.getContext("2d");

    ctx.fillStyle = "rgb(122, 162, 82)";
    ctx.fillRect(0, 0, 500, 500);
    ctx.strokeStyle = "rgb(34, 34, 34)";
    ctx.strokeRect(0, 0, 500, 500);
    ctx.fillStyle = "rgb(34, 34, 34)";

    const renderFood = (x, y) => {
      let pixelsX = x;
      let pixelsY = y;
      pixelsX *= 50;
      pixelsY *= 50;
      ctx.fillRect(pixelsX + 1 + 16, pixelsY + 1, 16, 16);
      ctx.fillRect(pixelsX + 1, pixelsY + 1 + 16, 16, 16);
      ctx.fillRect(pixelsX + 1 + 32, pixelsY + 16, 16, 16);
      ctx.fillRect(pixelsX + 1 + 16, pixelsY + 1 + 32, 16, 16);
    };
    renderFood(foodCoordsX, foodCoordsY);

    const renderSnakeBody = () => {
      bodyCoords.forEach((snakePiece) => {
        let [x, y] = snakePiece;
        x *= 50;
        y *= 50;
        ctx.fillRect(x + 2, y + 2, 22, 22);
        ctx.fillRect(x + 26, y + 2, 22, 22);
        ctx.fillRect(x + 2, y + 26, 22, 22);
        ctx.fillRect(x + 26, y + 26, 22, 22);
      });
    };
    renderSnakeBody();
    const renderSnakeHead = () => {
      let [x, y] = headCoords;
      x *= 50;
      y *= 50;
      ctx.fillRect(x + 2, y + 2, 22, 22);
      ctx.fillRect(x + 26, y + 2, 22, 22);
      ctx.fillRect(x + 2, y + 26, 22, 22);
      ctx.fillRect(x + 26, y + 26, 22, 22);
      ctx.fillStyle = "rgb(122, 162, 82)";

      if (lastStepSnakeDid === "RIGHT") {
        ctx.fillRect(x + 2 + 36, y + 2 + 10, 6, 6);
        ctx.fillRect(x + 2 + 36, y + 2 + 30, 6, 6);
      }
      if (lastStepSnakeDid === "UP") {
        ctx.fillRect(x + 2 + 10, y + 2 + 5, 6, 6);
        ctx.fillRect(x + 2 + 30, y + 2 + 5, 6, 6);
      }
      if (lastStepSnakeDid === "DOWN") {
        ctx.fillRect(x + 2 + 10, y + 2 + +36, 6, 6);
        ctx.fillRect(x + 2 + 30, y + 2 + 36, 6, 6);
      }
      if (lastStepSnakeDid === "LEFT") {
        ctx.fillRect(x + 2 + 5, y + 2 + 10, 6, 6);
        ctx.fillRect(x + 2 + 5, y + 2 + 30, 6, 6);
      }
    };
    renderSnakeHead();

    // Game ending conditions
    headCoords.forEach((head) => {
      if (head < 0 || head > 9) {
        clearInterval(move);
        dispatch(snake.killSnake());
        checkIfSnakeIsAlive(reduxSnakeIsAlive);
        dispatch(addToScoreboard(score));
      }
    });
    bodyCoords.forEach((piece) => {
      const [x, y] = piece;
      if (x === headCoordsX && y === headCoordsY) {
        clearInterval(move);
        dispatch(snake.killSnake());
        checkIfSnakeIsAlive(reduxSnakeIsAlive);
        dispatch(addToScoreboard(score));
      }
    });

    // Binds pause to escape
    function eventPause(e) {
      if (e.key === "Escape") usePause(!pause);
    }
    document.addEventListener("keydown", eventPause);

    if (pause) clearInterval(move);
    if (!snakeIsAlive) document.removeEventListener("keydown", eventPause);

    // Prevents stacking intervals
    return () => {
      clearInterval(move);
      document.removeEventListener("keydown", eventPause);
    };
  });

  return (
    <div>
      <div className="game-field">
        <canvas
          className="game-field--canvas"
          ref={canvas}
          width={500}
          height={500}
          style={{ margin: "30px" }}
        />
        {snakeIsAlive && (
          <div className="game-field--score">
            <p className="game-field--score--text"> Your score: {score} </p>
            <div className="game-field--score--box" />
          </div>
        )}
      </div>
      {!snakeIsAlive && (
        <FinalScore
          score={score}
          restart={() => {
            dispatch(snake.resetGame());
            dispatch(resetScore());
            dispatch(newPiece());
          }}
        />
      )}
      {pause && snakeIsAlive && <Pause unpause={() => usePause(false)} />}
    </div>
  );
};

export default GameField;
