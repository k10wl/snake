// keybinding
const bindKeys = (e, dispatch, left, up, right, down, lastStep) => {
  if (
    (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") &&
    lastStep !== "RIGHT" &&
    lastStep !== "LEFT"
  ) {
    dispatch(left());
  }
  if (
    (e.key === "w" || e.key === "W" || e.key === "ArrowUp") &&
    lastStep !== "DOWN" &&
    lastStep !== "UP"
  ) {
    dispatch(up());
  }
  if (
    (e.key === "d" || e.key === "D" || e.key === "ArrowRight") &&
    lastStep !== "LEFT" &&
    lastStep !== "RIGHT"
  ) {
    dispatch(right());
  }
  if (
    (e.key === "s" || e.key === "S" || e.key === "ArrowDown") &&
    lastStep !== "UP" &&
    lastStep !== "DOWN"
  ) {
    dispatch(down());
  }
};

export default bindKeys;
