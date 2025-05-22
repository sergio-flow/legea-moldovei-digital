
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const SearchBar: React.FC = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    const bookKey = value.trim()
      ? value.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
      : "constitutia";
    navigate(`/book/${bookKey}`);
  };

  return (
    <form
      className={cn(
        "fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[94vw] max-w-xl z-40 flex bg-white/95 rounded-2xl shadow-2xl p-2 gap-2 border border-blue-100"
      )}
      onSubmit={handleClick}
      autoComplete="off"
    >
      <input
        className="flex-1 px-4 py-2 rounded-xl outline-none bg-blue-50 border-0 text-blue-900 font-semibold placeholder:text-blue-400"
        placeholder="Caută o lege sau document..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit" className="px-5 font-semibold shadow-blue-300 shadow-sm rounded-2xl bg-blue-800 hover:bg-blue-900 transition">
        Caută
      </Button>
    </form>
  );
};
