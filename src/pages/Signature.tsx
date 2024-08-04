import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";

const SignaturePad: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  const getPos = (canvas: HTMLCanvasElement, event: MouseEvent | TouchEvent) => {
    const rect = canvas.getBoundingClientRect();
    if (event.type.startsWith("touch")) {
      const touch = (event as TouchEvent).touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      const mouseEvent = event as MouseEvent;
      return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top,
      };
    }
  };

  const handleStart = (event: MouseEvent | TouchEvent) => {
    event.preventDefault(); // Prevent scrolling on touch devices
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pos = getPos(canvas, event);
    setLastPos(pos);
    setIsDrawing(true);
  };

  const handleMove = (event: MouseEvent | TouchEvent) => {
    event.preventDefault(); // Prevent scrolling on touch devices
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing) return;
    const context = canvas.getContext("2d");
    const pos = getPos(canvas, event);
    if (context && lastPos) {
      context.lineJoin = "round"; // Smooth line joins
      context.lineCap = "round"; // Smooth line ends
      context.lineWidth = 1.5; // Adjust line width as needed
      context.beginPath();
      context.moveTo(lastPos.x, lastPos.y);
      context.lineTo(pos.x, pos.y);
      context.stroke();
      setLastPos(pos);
    }
  };

  const handleEnd = () => {
    setIsDrawing(false);
    setLastPos(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (event: MouseEvent) => handleStart(event);
    const handleMouseMove = (event: MouseEvent) => handleMove(event);
    const handleMouseUp = () => handleEnd();
    
    const handleTouchStart = (event: TouchEvent) => handleStart(event);
    const handleTouchMove = (event: TouchEvent) => handleMove(event);
    const handleTouchEnd = () => handleEnd();

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);

    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseUp);

      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [isDrawing, lastPos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const resizeCanvas = () => {
      if (canvas) {
        const { width, height } = canvas.getBoundingClientRect();
        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;
        const context = canvas.getContext("2d");
        if (context) {
          context.scale(devicePixelRatio, devicePixelRatio);
        }
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
