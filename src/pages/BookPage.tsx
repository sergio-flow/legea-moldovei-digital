import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShowMore } from "@/components/ShowMore";
import { FinderPanel } from "@/components/FinderPanel";
import { BookCard } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BookPage() {
  const { book_name } = useParams<{ book_name: string }>();
  const [current, setCurrent] = useState(1);
  const [constitutiaData, setConstitutiaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [relevantArticles, setRelevantArticles] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);

  // Each relevant paragraph ref
  const paraRefs = useRef<HTMLElement[]>([]);

  // Fetch data from API
  useEffect(() => {
    const fetchConstitutiaData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://corsproxy.io/?url=https://rag-api-648851266077.us-central1.run.app/data/constitutia.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setConstitutiaData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (book_name === "constitutia") {
      fetchConstitutiaData();
    }
  }, [book_name]);

  // Set the first scroll point on initial render
  useEffect(() => {
    if (constitutiaData && paraRefs.current[0]) {
      paraRefs.current[0].scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // eslint-disable-next-line
  }, [constitutiaData]);

  // Search functionality
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    try {
      setSearching(true);
      const encodedQuery = encodeURIComponent(searchValue.trim());
      const response = await fetch(`https://rag-api-648851266077.us-central1.run.app/query/moldova_constitution?q=${encodedQuery}&n_results=10`);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }
      
      const searchData = await response.json();
      setSearchResults(searchData);

      // Extract relevant articles based on metadata
      const newRelevantArticles = [];
      searchData.metadatas.forEach((metadata, index) => {
        const articleNumber = metadata.article_number;
        // Find the matching article in constitutiaData
        const articleIdx = constitutiaData.findIndex(item => item.article_number === articleNumber);
        if (articleIdx !== -1) {
          newRelevantArticles.push({ 
            articleIdx, 
            aiAnalysis: searchData.ai_analyses[index]?.explanation || ""
          });
        }
      });

      setRelevantArticles(newRelevantArticles);
      setCurrent(1);

      // Scroll to first result
      setTimeout(() => {
        if (paraRefs.current[0]) {
          paraRefs.current[0].scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);

    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setSearching(false);
    }
  };

  // SearchBar component
  const SearchBar = () => (
    <form
      className={cn(
        "fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[94vw] max-w-xl z-40 flex bg-white/95 rounded-2xl shadow-2xl p-2 gap-2 border border-blue-100"
      )}
      onSubmit={handleSearch}
      autoComplete="off"
    >
      <input
        className="flex-1 px-4 py-2 rounded-xl outline-none bg-blue-50 border-0 text-blue-900 font-semibold placeholder:text-blue-400"
        placeholder="Caută o lege sau document..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        disabled={searching}
      />
      <Button 
        type="submit" 
        className="px-5 font-semibold shadow-blue-300 shadow-sm rounded-2xl bg-blue-800 hover:bg-blue-900 transition"
        disabled={searching}
      >
        {searching ? "Caută..." : "Caută"}
      </Button>
    </form>
  );
  

  // Only "constitutia" supported for now
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="font-bold text-2xl mb-3 text-blue-900">
          Se încarcă...
        </div>
        <SearchBar />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="font-bold text-2xl mb-3 text-red-900">
          Eroare la încărcarea datelor
        </div>
        <div className="text-red-700 mb-3">{error}</div>
        <SearchBar />
      </div>
    );
  }

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
      const { articleIdx } = relevantArticles[next - 1];
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
  // useEffect(() => {
  //   if (paraRefs.current[0]) {
  //     paraRefs.current[0].scrollIntoView({ behavior: "smooth", block: "center" });
  //   }
  // }, [constitutiaData]);

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
          {/* <div className="mt-2 max-w-lg">
            <div className="rounded-xl border border-blue-100 bg-white shadow-sm p-4 my-5">
              <div className="font-bold text-blue-700 mb-2">Constituția Republicii Moldova</div>
              <div className="flex flex-col gap-2 leading-relaxed">
                <span>Legea supremă a țării, adoptată în 1994</span>
              </div>
            </div>
          </div> */}
        </div>
        
        {/* Render Articles */}
        <div className="mt-8 space-y-7">
          {/* <div className="text-xl font-serif font-bold text-blue-900 mb-4">
            Articole
          </div> */}
          <div className="flex flex-col gap-7">
            {constitutiaData.map((item, itemIdx) => (
              <article
                key={itemIdx}
                className="rounded-2xl border border-dashed border-blue-300/40 bg-white shadow p-6 relative transition animate-fade-in"
              >
                <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-3">
                  <span>{item.article_number}</span>
                  {item.article_description && (
                    <span className="text-base font-normal text-blue-600">{item.article_description}</span>
                  )}
                </h3>
                <ol className="pl-0 flex flex-col gap-2">
                  {item.laws.map((law, lawIdx) => {
                    // Finder highlights
                    const relIdx = relevantArticles.findIndex(
                      (r) => r.articleIdx === itemIdx
                    );
                    const refIdx = relIdx !== -1 ? relIdx : undefined;
                    // Highlight based on search results
                    const isHighlighted = relIdx !== -1;
                    return (
                      <li
                        key={lawIdx}
                        ref={(el) => { if (refIdx !== undefined && el) paraRefs.current[refIdx] = el; }}
                        className={
                          "transition-colors py-2 rounded " +
                          (isHighlighted
                            ? "bg-yellow-100 border-l-4 border-yellow-300 font-semibold shadow-sm"
                            : "")
                        }
                      >
                        <span>{law}</span>
                      </li>
                    );
                  })}
                </ol>
                {/* Show AI analysis as notes for relevant articles */}
                {relevantArticles.find(rel => rel.articleIdx === itemIdx) && (
                  <aside className="absolute top-1 right-2 w-[17em] sm:w-64 bg-yellow-50/80 rounded-lg p-3 shadow-xl border border-yellow-200">
                    <div className="font-serif text-[15px] font-semibold text-yellow-800 mb-1">
                      Notă explicativă
                    </div>
                    <small className="block text-yellow-900/90 text-xs whitespace-pre-line">
                      {relevantArticles.find(rel => rel.articleIdx === itemIdx)?.aiAnalysis}
                    </small>
                  </aside>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
      {/* Finder floating panel - only show if there are search results */}
      {relevantArticles.length > 0 && (
        <FinderPanel
          total={relevantArticles.length}
          current={current}
          onPrev={() => handleNavigate("up")}
          onNext={() => handleNavigate("down")}
        />
      )}
      {/* Integrated SearchBar */}
      <form
        className={cn(
          "fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[94vw] max-w-xl z-40 flex bg-white/95 rounded-2xl shadow-2xl p-2 gap-2 border border-blue-100"
        )}
        onSubmit={handleSearch}
        autoComplete="off"
      >
        <input
          className="flex-1 px-4 py-2 rounded-xl outline-none bg-blue-50 border-0 text-blue-900 font-semibold placeholder:text-blue-400"
          placeholder="Caută o lege sau document..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          disabled={searching}
        />
        <Button 
          type="submit" 
          className="px-5 font-semibold shadow-blue-300 shadow-sm rounded-2xl bg-blue-800 hover:bg-blue-900 transition"
          disabled={searching}
        >
          {searching ? "Caută..." : "Caută"}
        </Button>
      </form>
    </div>
  );
}