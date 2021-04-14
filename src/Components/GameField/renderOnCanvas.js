const renderOnCanvas = (canvasRef, foodCoords, snakeCoords, snakeDirection) => {
  /* eslint-disable no-param-reassign */

  const gridsize = 50; // convert into canvas width / cell count in future updates
  const coordsToPx = (n) => n * gridsize;

  canvasRef.fillStyle = `rgb(122, 162, 82)`;
  canvasRef.fillRect(0, 0, 500, 500);

  const renderFood = (coords) => {
    const [x, y] = coords;
    canvasRef.fillStyle = `rgb(34, 34, 34)`;
    const verticalRectX = coordsToPx(x);
    const verticalRectY = coordsToPx(y) + gridsize * 0.33;
    canvasRef.fillRect(verticalRectX, verticalRectY, gridsize, gridsize * 0.33);
    const horizontalRectX = coordsToPx(x) + gridsize * 0.33;
    const horizontalRectY = coordsToPx(y);
    canvasRef.fillRect(
      horizontalRectX,
      horizontalRectY,
      gridsize * 0.33,
      gridsize
    );
    canvasRef.fillStyle = `rgb(122, 162, 82)`;
    const clearCenterX = coordsToPx(x) + gridsize * 0.33;
    const clearCenterY = coordsToPx(y) + gridsize * 0.33;
    canvasRef.fillRect(
      clearCenterX,
      clearCenterY,
      gridsize * 0.33,
      gridsize * 0.33
    );
  };
  renderFood(foodCoords);

  const renderSnake = (snake) => {
    const padding = gridsize * 0.1;
    let rectSize = gridsize * 0.45;
    let opacity = 1;
    snake.forEach((snakeSlice) => {
      opacity = (opacity - 0.2 / snakeCoords.length).toFixed(3);
      canvasRef.fillStyle = `rgba(34, 34, 34, ${opacity})`;
      const [x, y] = snakeSlice;
      rectSize -= 2 / snakeCoords.length;
      const centerX =
        coordsToPx(x) + gridsize / 2 - rectSize / 2 - padding * 0.75;
      const centerY =
        coordsToPx(y) + gridsize / 2 - rectSize / 2 - padding * 0.75;
      const topLeftX = centerX - (rectSize - padding) / 2;
      const topLeftY = centerY - (rectSize - padding) / 2;
      canvasRef.fillRect(topLeftX, topLeftY, rectSize, rectSize);
      const topRightX = centerX + rectSize / 2 + padding;
      const topRightY = centerY - (rectSize - padding) / 2;
      canvasRef.fillRect(topRightX, topRightY, rectSize, rectSize);
      const bottomLeftX = centerX - (rectSize - padding) / 2;
      const bottomLeftY = centerY + rectSize / 2 + padding;
      canvasRef.fillRect(bottomLeftX, bottomLeftY, rectSize, rectSize);
      const bottomRightX = centerX + rectSize / 2 + padding;
      const bottomRightY = centerY + rectSize / 2 + padding;
      canvasRef.fillRect(bottomRightX, bottomRightY, rectSize, rectSize);
    });
    opacity = 1;
    rectSize = gridsize * 0.45;
  };
  renderSnake(snakeCoords);

  const renderSnakeEyes = (coords) => {
    const [[x, y]] = coords;
    const distanceBetweenEyes = gridsize * 0.2;
    const distanceFromHeadCenter = gridsize * 0.25;
    const eyeSize = gridsize * 0.12;

    let leftEyeX = coordsToPx(x) + gridsize / 2 - eyeSize / 2;
    let leftEyeY = coordsToPx(y) + gridsize / 2 - eyeSize / 2;
    let rightEyeX = coordsToPx(x) + gridsize / 2 - eyeSize / 2;
    let rightEyeY = coordsToPx(y) + gridsize / 2 - eyeSize / 2;

    if (snakeDirection === "UP" || snakeDirection === "DOWN") {
      leftEyeX -= distanceBetweenEyes;
      rightEyeX += distanceBetweenEyes;
      if (snakeDirection === "UP") {
        leftEyeY -= distanceFromHeadCenter;
        rightEyeY -= distanceFromHeadCenter;
      } else {
        leftEyeY += distanceFromHeadCenter;
        rightEyeY += distanceFromHeadCenter;
      }
    }
    if (snakeDirection === "RIGHT" || snakeDirection === "LEFT") {
      leftEyeY -= distanceBetweenEyes;
      rightEyeY += distanceBetweenEyes;
      if (snakeDirection === "RIGHT") {
        leftEyeX += distanceFromHeadCenter;
        rightEyeX += distanceFromHeadCenter;
      } else {
        leftEyeX -= distanceFromHeadCenter;
        rightEyeX -= distanceFromHeadCenter;
      }
    }

    canvasRef.fillStyle = "rgb(122, 162, 82)";
    canvasRef.fillRect(leftEyeX, leftEyeY, eyeSize, eyeSize);
    canvasRef.fillRect(rightEyeX, rightEyeY, eyeSize, eyeSize);
  };
  renderSnakeEyes(snakeCoords);
};

export default renderOnCanvas;
