import { useCallback, useEffect } from "react";
import * as foodActions from "../../redux-store/food";
import * as snakeActions from "../../redux-store/snake";
import * as scoreAction from "../../redux-store/score";
import * as scoreboardAction from "../../redux-store/scoreboard";

const GameLogic = (
  dispatch,
  alive,
  bodyPosition,
  foodCoords,
  prevFoodCoords,
  score
) => {
  const foodRespawnConditions = (oldFoodCoords, newFoodCoords, bodyCoords) => {
    const [prevX, prevY] = oldFoodCoords;
    const [newX, newY] = newFoodCoords;
    if (prevX === newX && prevY === newY)
      dispatch(foodActions.createNewFoodCoords());
    bodyCoords.forEach((bodySlice) => {
      const [bodyX, bodyY] = bodySlice;
      if (bodyX === newX && bodyY === newY) {
        dispatch(foodActions.createNewFoodCoords());
      }
    });
  };
  foodRespawnConditions(prevFoodCoords, foodCoords, bodyPosition);

  const consumeFood = (food, snakeCoords) => {
    const [[headX, headY]] = snakeCoords;
    const [foodX, foodY] = food;
    if (headX === foodX && headY === foodY) {
      dispatch(foodActions.storePrevFoodCoords());
      dispatch(snakeActions.consumeFood());
      dispatch(scoreAction.addOneToScore());
    }
  };
  consumeFood(foodCoords, bodyPosition);

  const endGame = useCallback(() => {
    dispatch(snakeActions.killSnake());
    if (score > 0) dispatch(scoreboardAction.addToScoreboard(score));
  }, [dispatch, score]);

  const endGameConditions = useCallback(
    (snakeIsAlive, snakeCoords) => {
      const [[headX, headY], ...bodyCoords] = snakeCoords;
      if (!snakeIsAlive) return;
      if (headX < 0 || headY < 0 || headX > 9 || headY > 9) endGame();
      bodyCoords.forEach((bodySlice) => {
        const [bodyX, bodyY] = bodySlice;
        if (headX === bodyX && headY === bodyY) endGame();
      });
    },
    [endGame]
  );

  useEffect(() => {
    endGameConditions(alive, bodyPosition);
  }, [alive, bodyPosition, endGameConditions]);
};

export default GameLogic;
