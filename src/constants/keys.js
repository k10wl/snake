// keybinding
const bindKeys = (e, dispatch, left, up, right, down, lastStep) => {
  if (
    (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") &&
    lastStep !== "RIGHT"
  ) {
    dispatch(left());
  }
  if (
    (e.key === "w" || e.key === "W" || e.key === "ArrowUp") &&
    lastStep !== "DOWN"
  ) {
    dispatch(up());
  }
  if (
    (e.key === "d" || e.key === "D" || e.key === "ArrowRight") &&
    lastStep !== "LEFT"
  ) {
    dispatch(right());
  }
  if (
    (e.key === "s" || e.key === "S" || e.key === "ArrowDown") &&
    lastStep !== "UP"
  ) {
    dispatch(down());
  }
};

export default bindKeys;
