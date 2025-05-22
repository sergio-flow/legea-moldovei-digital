
import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  status: "disponibil" | "curand";
  className?: string;
};

export const BookRibbon: React.FC<Props> = ({ status, className }) => {
  const isDisponibil = status === "disponibil";
  return (
    <div
      className={cn(
        "absolute left-1 bottom-2 flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow",
        isDisponibil ? "bg-green-600 text-white" : "bg-yellow-400 text-yellow-900",
        className
      )}
      style={{
        transform: isDisponibil ? "rotate(-3deg)" : "rotate(-7deg)",
        zIndex: 2,
        minWidth: isDisponibil ? 78 : 56
      }}
    >
      {isDisponibil ? "Disponibil" : "Curând"}
    </div>
  );
};
