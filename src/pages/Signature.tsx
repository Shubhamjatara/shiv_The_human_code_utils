import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";

const SignaturePad: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  const getMousePos = (canvas: HTMLCanvasElement, event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handleMouseDown = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pos = getMousePos(canvas, event);
    setLastPos(pos);
    setIsDrawing(true);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing) return;
    const context = canvas.getContext("2d");
    const pos = getMousePos(canvas, event);
    if (context && lastPos) {
      context.beginPath();
      context.moveTo(lastPos.x, lastPos.y);
      context.lineTo(pos.x, pos.y);
      context.stroke();
      setLastPos(pos);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setLastPos(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isDrawing, lastPos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const resizeCanvas = () => {
      if (canvas) {
        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Initial resize to set the canvas size

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  function ClearPad(): void {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }

  const saveAsPNG = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "signature.png";
      link.click();
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-full flex justify-center items-center p-5 flex-col gap-5 relative bg-gray-100">
        <div className="w-full text-center font-semibold">
          Shiv human code digital signature generator
        </div>
        <div className="w-full text-center font-semibold">
          Draw Sign in box
        </div>
        <div className="w-full md:max-w-[800px] h-96 lg:min-h-[500px]">
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid black",
              cursor:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath d='M2 21l-2-2 8-8 2 2-8 8z' fill='%23000'/%3E%3Cpath d='M20.41 4.59L12 13 9 10l8.41-8.41L20.41 4.59z' fill='%23000'/%3E%3C/svg%3E\") 0 24, auto",
            }}
          />
        </div>
        <div className="flex justify-center items-center font-semibold">
          <button
            onClick={saveAsPNG}
            type="button"
            className="min-w-24 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Download
          </button>
          <button
            onClick={ClearPad}
            type="button"
            className="min-w-24 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Reset
          </button>
        </div>
        <p className="w-full text-center">
          Note: The signature can be generated without a background, so it can
          be placed anywhere on any document
        </p>
      </div>
    </>
  );
};

export default SignaturePad;
