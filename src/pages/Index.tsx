
import React from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "@/data/books";
import { BookCard } from "@/components/BookCard";
import { SearchBar } from "@/components/SearchBar";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen pb-44 bg-gradient-to-br from-blue-50 to-blue-100 animate-fade-in"
    >
      <header className="pt-16 md:pt-28 pb-10 text-center">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-blue-900 drop-shadow-sm mb-2">
          Biblioteca Legilor Fundamentale ale Republicii Moldova
        </h1>
        <p className="max-w-xl text-center mx-auto text-lg text-blue-700 tracking-wide">
          Explorează principalele acte legislative esențiale pentru statul și societatea Republicii Moldova.
        </p>
      </header>
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        {categories.map((cat, idx) => (
          <section key={cat.title}>
            <h2 className="font-serif font-semibold text-2xl text-blue-800 mb-3 ml-2">
              {cat.title}
            </h2>
            <div className="flex flex-wrap gap-x-7 gap-y-7">
              {cat.books.map((book) => (
                <BookCard
                  key={book.key}
                  title={book.title}
                  subtitle={book.subtitle}
                  status={book.status}
                  onClick={() =>
                    book.status === "disponibil"
                      ? navigate(`/book/${book.key}`)
                      : undefined
                  }
                />
              ))}
            </div>
          </section>
        ))}
      </div>
      <SearchBar />
    </div>
  );
};

export default Index;
