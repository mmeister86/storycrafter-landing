import type React from "react";
import { cn } from "@/lib/utils";

export function RetroGrid({
  className,
  angle = 65,
}: {
  className?: string;
  angle?: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden opacity-80 [perspective:200px]",
        className
      )}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={cn(
            "animate-grid",
            "[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",
            // Increased opacity and thicker grid lines
            "[background-image:linear-gradient(to_right,rgba(255,215,0,0.4)_2px,transparent_0),linear-gradient(to_bottom,rgba(255,215,0,0.4)_2px,transparent_0)]"
          )}
        />
      </div>

      {/* Background Gradient - reduced opacity to show more of the grid */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1521] via-[#0f1521]/60 to-transparent to-80%" />
    </div>
  );
}
