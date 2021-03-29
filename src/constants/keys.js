// const KEY_ARROW_LEFT = 37;
// const KEY_ARROW_UP = 38;
// const KEY_ARROW_RIGHT = 39;
// const KEY_ARROW_DOWN = 40;
// const KEY_A = 65;
// const KEY_W = 87;
// const KEY_D = 68;
// const KEY_S = 83;
// const KEY_NP_ARROW_LEFT = 4;
// const KEY_NP_ARROW_UP = 8;
// const KEY_NP_ARROW_RIGHT = 6;
// const KEY_NP_ARROW_DOWN = 2;
// const KEY_ENTER = 13;

// keybinding
const bindKeys = (dispatch, left, up, right, down) =>
  document.addEventListener("keydown", (e) => {
    if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
      dispatch(left());
    }
    if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
      dispatch(up());
    }
    if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
      dispatch(right());
    }
    if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
      dispatch(down());
    }
  });
export default bindKeys;
