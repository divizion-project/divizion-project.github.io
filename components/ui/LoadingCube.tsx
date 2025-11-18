"use client";

import clsx from "clsx";

type LoadingCubeProps = {
  accent?: "orange" | "cyan";
  size?: number;
};

export default function LoadingCube({
  accent = "orange",
  size = 60,
}: LoadingCubeProps) {
  const accentColor = accent === "cyan" ? "#00d4ff" : "#ff6b35";

  return (
    <div className="cube-loader" style={{ width: size, height: size }}>
      <div className="cube">
        {Array.from({ length: 6 }).map((_, index) => (
          <span
            key={index}
            className={clsx("cube-face")}
            style={{
              borderColor: accentColor,
              background: `${accentColor}26`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
