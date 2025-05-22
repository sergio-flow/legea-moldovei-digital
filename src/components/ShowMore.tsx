
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const ShowMore: React.FC<{ text: React.ReactNode; maxHeight?: number; className?: string }> = ({
  text,
  maxHeight = 340,
  className,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={className}>
      <div
        style={{
          maxHeight: expanded ? "none" : maxHeight,
          overflow: expanded ? "visible" : "hidden",
          transition: "max-height 0.3s"
        }}
        className={expanded ? "" : "after:absolute after:bottom-0 after:left-0 after:w-full after:h-16 after:bg-gradient-to-t after:from-white after:to-transparent relative"}
      >
        {text}
      </div>
      <button
        className="flex items-center gap-1 mt-1 px-2 py-1 rounded hover:bg-blue-100 text-blue-900 mx-auto"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? (
          <>
            <ChevronUp className="w-4 h-4" /> <span>Arată mai puțin</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" /> <span>Arată mai mult</span>
          </>
        )}
      </button>
    </div>
  );
};
