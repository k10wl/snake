import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import renderOnCanvas from "./renderOnCanvas";

const CanvasComponent = ({ foodCoords, bodyPosition, lastStep }) => {
  const canvas = useRef();
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    renderOnCanvas(ctx, foodCoords, bodyPosition, lastStep);
  });
  return (
    <div>
      <canvas
        className="game-field--canvas"
        ref={canvas}
        width={500}
        height={500}
      />
    </div>
  );
};

export default CanvasComponent;

CanvasComponent.propTypes = {
  foodCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  bodyPosition: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
    .isRequired,
  lastStep: PropTypes.string.isRequired,
};
