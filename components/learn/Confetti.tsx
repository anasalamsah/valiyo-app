import React, { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number; // percentage
  delay: number; // seconds
  duration: number; // seconds
  size: number; // pixels
  color: string;
  shape: "circle" | "square" | "triangle";
}

export function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = [
      "#FFADAD", // pastel red
      "#FFD6A5", // pastel orange
      "#FDFFB6", // pastel yellow
      "#CAFFBF", // pastel green
      "#9BF6FF", // pastel blue
      "#A0C4FF", // pastel indigo
      "#BDB2FF", // pastel purple
      "#FFC6FF", // pastel pink
    ];

    const shapes: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"];

    const generated = Array.from({ length: 120 }).map((_, index) => {
      const size = Math.floor(Math.random() * 12) + 8; // 8px to 20px
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      return {
        id: index,
        x: Math.random() * 100, // random horizontal position
        delay: Math.random() * 4, // spread out over 4 seconds
        duration: Math.random() * 3 + 3, // fall duration between 3 to 6s
        size,
        color,
        shape,
      };
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: one-time confetti piece generation on mount, same accepted pattern used elsewhere in this codebase.
    setPieces(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => {
        const style: React.CSSProperties = {
          left: `${p.x}%`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          backgroundColor: p.shape !== "triangle" ? p.color : "transparent",
          borderLeft: p.shape === "triangle" ? `${p.size / 2}px solid transparent` : undefined,
          borderRight: p.shape === "triangle" ? `${p.size / 2}px solid transparent` : undefined,
          borderBottom: p.shape === "triangle" ? `${p.size}px solid ${p.color}` : undefined,
          borderRadius: p.shape === "circle" ? "50%" : "0%",
        };

        return (
          <div
            key={p.id}
            className="absolute top-0 animate-fall"
            style={style}
          />
        );
      })}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0.3;
          }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
