
import React from "react";
import { BookRibbon } from "./BookRibbon";

interface BookCardProps {
  title: string;
  subtitle?: string;
  status: "disponibil" | "curand";
  onClick?: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ title, subtitle, status, onClick }) => (
  <button
    className={
      "relative group flex flex-col w-48 min-h-64 mx-2 mb-3 bg-gradient-to-br from-blue-900 to-blue-600 text-white rounded-2xl shadow-lg transition-transform hover:scale-105 focus:outline-none"
    }
    onClick={onClick}
    disabled={status !== "disponibil"}
    tabIndex={status === "disponibil" ? 0 : -1}
    style={{
      opacity: status === "curand" ? 0.7 : 1,
      cursor: status === "curand" ? "not-allowed" : "pointer"
    }}
  >
    <div className="relative w-full flex flex-col flex-1 p-6">
      {subtitle && (
        <div className="text-xs uppercase text-blue-200 font-semibold mb-2 truncate text-left">
          {subtitle}
        </div>
      )}
      <div className="font-serif text-lg font-bold text-left" style={{ letterSpacing: "1px" }}>
        {title}
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-blue-700 to-transparent rounded-b-2xl" />
    <BookRibbon status={status} />
    {/* Decorative “ribbon” book spine */}
    <div className="absolute right-0 top-7 h-28 w-3 bg-blue-800 rounded-lg shadow -rotate-6 opacity-80">
    </div>
    {/* Book bottom gradient for “edge” look */}
    <div className="absolute bottom-0 left-5 w-32 h-2 rounded-full bg-gradient-to-r from-blue-900 to-blue-400 opacity-60 blur-sm" />
  </button>
);
