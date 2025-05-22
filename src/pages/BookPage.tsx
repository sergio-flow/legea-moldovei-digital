
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { constitutiaContent } from "@/data/books";
import { ShowMore } from "@/components/ShowMore";
import { FinderPanel } from "@/components/FinderPanel";
import { BookCard } from "@/components/BookCard";
import { SearchBar } from "@/components/SearchBar";

const relevantArticles = [
  { articleIdx: 0, paragraphIdx: 0 },
  { articleIdx: 1, paragraphIdx: 1 },
  { articleIdx: 2, paragraphIdx: 0 },
  { articleIdx: 3, paragraphIdx: 1 },
];

export default function BookPage() {
  const { book_name } = useParams<{ book_name: string }>();
  const [current, setCurrent] = useState(1);

  // Each relevant paragraph ref
  const paraRefs = useRef<HTMLElement[]>([]);

  // Only “constitutia” supported for now
  if (book_name !== "constitutia") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="font-bold text-2xl mb-3 text-blue-900">
          Cartea nu este încă disponibilă
        </div>
        <BookCard title="Această lege nu este încă publicată" status="curand" />
        <SearchBar />
      </div>
    );
  }

  // Flatten out article list for the scroll finder
  const articlesData =
    constitutiaContent.find((b) => Array.isArray(b.articles))?.articles ?? [];

  // Highlight the 2nd paragraph of 2nd article (hardcoded)
  const highlightArticleIdx = 1;
  const highlightParaIdx = 1;

  // Finder navigation handlers
  const total = relevantArticles.length;
  const handleNavigate = (direction: "up" | "down") => {
    setCurrent((prev) => {
      let next = direction === "up" ? prev - 1 : prev + 1;
      if (next < 1) next = total;
      if (next > total) next = 1;
      const { articleIdx, paragraphIdx } = relevantArticles[next - 1];
      setTimeout(() => {
        paraRefs.current?.[next - 1]?.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 80);
      return next;
    });
  };

  // Set the first scroll point on initial render
  React.useEffect(() => {
    if (paraRefs.current[0]) {
      paraRefs.current[0].scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50 to-blue-100 pb-44">
      <div className="mx-auto max-w-4xl pt-16 md:pt-28">
        <div className="flex flex-col items-start gap-3">
          {/* Book Display */}
          <BookCard
            title="Constituția Republicii Moldova (1994)"
            subtitle="legea supremă a țării"
            status="disponibil"
          />
          <div className="mt-2 max-w-lg">
            {constitutiaContent[0].info && (
              <ShowMore
                text={
                  <div className="whitespace-pre-line">{constitutiaContent[0].info}</div>
                }
                maxHeight={110}
                className="mb-2"
              />
            )}
            {/* Preamble */}
            <div className="rounded-xl border border-blue-100 bg-white shadow-sm p-4 my-5">
              <div className="font-bold text-blue-700 mb-2">Preambul</div>
              <div className="flex flex-col gap-2 leading-relaxed">
                {constitutiaContent[0].preamble.map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Render Articles */}
        <div className="mt-8 space-y-7">
          <div className="text-xl font-serif font-bold text-blue-900 mb-4">
            {constitutiaContent[1].title}
          </div>
          <div className="flex flex-col gap-7">
            {articlesData.map((art, arti) => (
              <article
                key={art.number}
                className="rounded-2xl border border-dashed border-blue-300/40 bg-white shadow p-6 relative transition animate-fade-in"
              >
                <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-3">
                  <span>Articolul {art.number}</span>
                  <span className="text-base font-normal text-blue-600">{art.name}</span>
                </h3>
                <ol className="pl-3 list-decimal flex flex-col gap-2">
                  {art.paragraphs.map((para, pari) => {
                    // Finder highlights
                    const relIdx = relevantArticles.findIndex(
                      (r) => r.articleIdx === arti && r.paragraphIdx === pari
                    );
                    const refIdx = relIdx !== -1 ? relIdx : undefined;
                    // Highlight 2nd para of 2nd article
                    const isYellowHighlight = arti === highlightArticleIdx && pari === highlightParaIdx;
                    return (
                      <li
                        key={pari}
                        ref={(el) => { if (refIdx !== undefined && el) paraRefs.current[refIdx] = el; }}
                        className={
                          "transition-colors py-2 px-2 rounded " +
                          (isYellowHighlight
                            ? "bg-yellow-100 border-l-4 border-yellow-300 font-semibold shadow-sm"
                            : "")
                        }
                      >
                        <span>{para}</span>
                      </li>
                    );
                  })}
                </ol>
                {/* Show notes for 2nd article */}
                {art.notes && (
                  <aside className="absolute top-1 right-2 w-[17em] sm:w-64 bg-yellow-50/80 rounded-lg p-3 shadow-xl border border-yellow-200">
                    <div className="font-serif text-[15px] font-semibold text-yellow-800 mb-1">
                      Notă explicativă
                    </div>
                    <small className="block text-yellow-900/90 text-xs whitespace-pre-line">
                      {art.notes[0]}
                    </small>
                  </aside>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
      {/* Finder floating panel */}
      <FinderPanel
        total={relevantArticles.length}
        current={current}
        onPrev={() => handleNavigate("up")}
        onNext={() => handleNavigate("down")}
      />
      <SearchBar />
    </div>
  );
}
