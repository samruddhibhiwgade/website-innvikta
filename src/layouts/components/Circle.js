"use client";

import { useEffect, useState } from "react";

function Circle({ className, width, height, fill = true, fillValue, ...props }) {
  const size = width || height || 64;
  const [delay, setDelay] = useState("0");
  const color = fillValue || "#f97316";

  useEffect(() => {
    setDelay((Math.random() * 5).toFixed(2));
  }, []);

  return (
    <div
      className={`absolute animate-float ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        animationDelay: `${delay}s`,
      }}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", opacity: 0.08 }}
      >
        <path
          d="M12 2L4 5v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V5l-8-3z"
          fill={color}
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default Circle;
