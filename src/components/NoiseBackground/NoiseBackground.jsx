import { useEffect, useRef } from "react";

export default function DynamicNoise() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
     let lastTime = 0;
    const interval = 150;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

  const drawNoise = (time) => {
      if (time - lastTime > interval) {
        const width = canvas.width;
        const height = canvas.height;
        const imageData = ctx.createImageData(width, height);
        const buffer = imageData.data;

        for (let i = 0; i < buffer.length; i += 4) {
          const shade = Math.floor(Math.random() * 256);
          buffer[i] = shade;       
          buffer[i + 1] = shade;   
          buffer[i + 2] = shade;   
          buffer[i + 3] = 10;      
        }

        ctx.putImageData(imageData, 0, 0);
        lastTime = time;
      }

      animationFrameId = requestAnimationFrame(drawNoise);
    };


    drawNoise();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
