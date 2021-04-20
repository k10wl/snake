import { useCallback, useEffect } from "react";
import * as foodActions from "../../redux-store/food";
import * as snakeActions from "../../redux-store/snake";
import * as scoreAction from "../../redux-store/score";
import * as scoreboardAction from "../../redux-store/scoreboard";

const GameLogic = (params) => {
  const { dispatch, alive, bodyPosition, foodCoords, score } = params;

  const createNewFoodCoords = () => Math.floor(Math.random() * 10);

  useEffect(() => {
    if (alive) {
      dispatch(
        foodActions.newFood([createNewFoodCoords(), createNewFoodCoords()])
      );
    }
  }, [alive]);

  /* eslint-disable consistent-return */
  const removeFoodDuplicate = (
    foodCoordinates,
    oldFoodCoordinates = [null, null],
    action = null
  ) => {
    const [newFoodX, newFoodY] = foodCoordinates;
    const [oldFoodX, oldFoodY] = oldFoodCoordinates;
    const sharedCoords = Boolean(
      newFoodX === oldFoodX && newFoodY === oldFoodY
    );
    if (!sharedCoords) {
      return action;
    }
    const oldFood = oldFoodCoordinates;
    const newFood = [createNewFoodCoords(), createNewFoodCoords()];
    removeFoodDuplicate(
      newFood,
      oldFood,
      dispatch(foodActions.newFood(newFood))
    );
  };
  removeFoodDuplicate(foodCoords);

  const removeFoodFromBody = (
    foodCoordinates,
    bodyCoordinates,
    action = null
  ) => {
    const [foodX, foodY] = foodCoordinates;
    const sharedCoords = bodyCoordinates.find((slice) => {
      const [sliceX, sliceY] = slice;
      return sliceX === foodX && sliceY === foodY;
    });
    if (!sharedCoords) {
      return action;
    }
    const newFood = [createNewFoodCoords(), createNewFoodCoords()];
    removeFoodFromBody(
      newFood,
      bodyCoordinates,
      dispatch(foodActions.newFood(newFood))
    );
  };
  removeFoodFromBody(foodCoords, bodyPosition);
  /* eslint-enable consistent-return */

  const consumeFood = (food, snakeCoords) => {
    const [[headX, headY]] = snakeCoords;
    const [foodX, foodY] = food;
    if (headX === foodX && headY === foodY) {
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
