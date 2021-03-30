import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newPiece } from "../redux-store/food";
import { consumeFood } from "../redux-store/snake";

const GameField = () => {
  const dispatch = useDispatch();
  const canvas = useRef(null);

  const foodCoords = useSelector((store) => store.food);
  const [foodCoordsX, foodCoordsY] = foodCoords;

  const snakeCoords = useSelector((store) => store.snake.bodyPosition);

  // Prevents spawning food on snake
  snakeCoords.forEach((snake) => {
    const [x, y] = snake;
    if (x === foodCoordsX && y === foodCoordsY) {
      dispatch(consumeFood());
      dispatch(newPiece());
    }
  });

  useEffect(() => {
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

    const renderSnake = () => {
      snakeCoords.forEach((snake) => {
        let [x, y] = snake;
        x *= 50;
        y *= 50;
        ctx.fillRect(x + 2, y + 2, 22, 22);
        ctx.fillRect(x + 26, y + 2, 22, 22);
        ctx.fillRect(x + 2, y + 26, 22, 22);
        ctx.fillRect(x + 26, y + 26, 22, 22);
      });
    };
    renderSnake();
  });

  return (
    <div>
      <canvas
        ref={canvas}
        width={500}
        height={500}
        style={{ margin: "30px" }}
      />
    </div>
  );
};

export default GameField;
