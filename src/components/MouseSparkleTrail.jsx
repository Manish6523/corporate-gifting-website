import React, { useEffect, useState } from "react";

const Sparkle = ({ x, y, id }) => {
  return (
    <div
      key={id}
      className="pointer-events-none fixed w-3 h-3 z-50"
      style={{
        top: y,
        left: x,
        transform: "translate(-50%, -50%)",
        animation: "fadeOut 1s forwards",
      }}
    >
      <svg
        className="w-3 h-3 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-3.09 1.64.59-3.43L5 9.91l3.45-.5L10 6l1.55 3.41 3.45.5-2.5 2.3.59 3.43z" />
      </svg>
    </div>
  );
};

export const MouseSparkleTrail = () => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const handleMove = (e) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newSparkle = {
        x: e.clientX,
        y: e.clientY,
        id,
      };
      setSparkles((prev) => [...prev, newSparkle]);

      // Remove after 1 second
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
      }, 1000);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return <>{sparkles.map((s) => <Sparkle key={s.id} {...s} />)}</>;
};
