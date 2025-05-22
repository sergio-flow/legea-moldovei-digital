
import React from "react";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

interface FinderPanelProps {
  total: number;
  current: number;
  onPrev: () => void;
  onNext: () => void;
}

export const FinderPanel: React.FC<FinderPanelProps> = ({
  total,
  current,
  onPrev,
  onNext,
}) => (
  <div className="fixed right-4 top-5 z-40 bg-white/90 border border-blue-200 rounded-lg shadow-lg px-5 py-3 flex items-center gap-3 animate-fade-in">
    <span className="font-semibold text-blue-900">
      Am găsit {total} texte relevante: <span className="bg-yellow-200 px-2 py-1 rounded font-bold">{current}/{total}</span>
    </span>
    <button
      onClick={onPrev}
      className="mx-1 p-1 rounded hover:bg-blue-100 transition"
      aria-label="Anterioară"
    >
      <ArrowUpCircle className="w-6 h-6 text-blue-700" />
    </button>
    <button
      onClick={onNext}
      className="mx-1 p-1 rounded hover:bg-blue-100 transition"
      aria-label="Următoarea"
    >
      <ArrowDownCircle className="w-6 h-6 text-blue-700" />
    </button>
  </div>
);
