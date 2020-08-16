import React, { useRef, useEffect } from "react";
import draw from "../drawingFunction";

function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    // canvas size is set to 256 X 128;
    context.canvas.width = 256;
    context.canvas.height = 128;
    draw(context);
  }, []);

  return (
    <div className="canvasArea">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Canvas;
