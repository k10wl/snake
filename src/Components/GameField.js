import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newPiece } from "../redux-store/food";

// Stores previous values
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const GameField = () => {
  const dispatch = useDispatch();
  const canvas = useRef(null);

  const foodCoords = useSelector((store) => store.food);
  const prevFoodCoords = usePrevious(foodCoords);
  let [foodCoordsX, foodCoordsY] = foodCoords;

  const snakeCoords = useSelector((store) => store.snake.bodyPosition);

  // Prevents spawning food on snake
  snakeCoords.forEach((snake) => {
    const [x, y] = snake;
    if (x === foodCoordsX && y === foodCoordsY) {
      dispatch(newPiece());
    }
  });

  // Prevents spawning food on food
  if (foodCoords === prevFoodCoords) {
    console.log(`MATCHING FOOD COORDS!`);
    console.log(`/////////////////////`);
    dispatch(newPiece());
  }

  // Converts coords into pixels
  const placeFoodOnCanvas = (x, y) => {
    foodCoordsX = x * 50;
    foodCoordsY = y * 50;
    return {
      foodCoordsX,
      foodCoordsY,
    };
  };
  placeFoodOnCanvas(foodCoordsX, foodCoordsY);

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    const drawX = () => {
      for (let x = 0; x < 500; x += 50) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 500);
      }
    };
    const drawY = () => {
      for (let y = 0; y < 500; y += 50) {
        ctx.moveTo(0, y);
        ctx.lineTo(500, y);
      }
    };

    ctx.clearRect(0, 0, 500, 500);
    ctx.strokeRect(0, 0, 500, 500);

    ctx.beginPath();
    drawX();
    drawY();
    ctx.stroke();

    ctx.fillRect(foodCoordsX, foodCoordsY, 50, 50);

    // Render snake
    snakeCoords.forEach((snake) => {
      const [x, y] = snake;
      return ctx.fillRect(x * 50, y * 50, 50, 50);
    });
  });

  return (
    <div>
      <button onClick={() => dispatch(newPiece())} type="button">
        test
      </button>
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
