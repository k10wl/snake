import store from "../redux-store";

// keybinding
const bindKeys = (dispatch, left, up, right, down) =>
  document.addEventListener("keydown", (e) => {
    const currentDirection = store.getState().snake.lastStep;
    if (
      (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") &&
      currentDirection !== "RIGHT"
    ) {
      dispatch(left());
    }
    if (
      (e.key === "w" || e.key === "W" || e.key === "ArrowUp") &&
      currentDirection !== "DOWN"
    ) {
      dispatch(up());
    }
    if (
      (e.key === "d" || e.key === "D" || e.key === "ArrowRight") &&
      currentDirection !== "LEFT"
    ) {
      dispatch(right());
    }
    if (
      (e.key === "s" || e.key === "S" || e.key === "ArrowDown") &&
      currentDirection !== "UP"
    ) {
      dispatch(down());
    }
  });

export default bindKeys;
