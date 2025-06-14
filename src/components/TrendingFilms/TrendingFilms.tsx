import React, { useRef } from "react";
import NextImage from "next/image";
import NextLink from "next/link";

export const TrendingFilms = ({ items }: { items: any[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Number of visible items (adjust as needed or make responsive)
  const visibleCount = 5;

  // Scroll to next set of items, loop if at end
  const handleNext = () => {
    if (!containerRef.current) return;
    const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - 1) {
      // At end, go back to start
      containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      containerRef.current.scrollBy({ left: clientWidth, behavior: "smooth" });
    }
  };

  // Scroll to previous set of items, loop if at start
  const handlePrev = () => {
    if (!containerRef.current) return;
    const { scrollLeft, clientWidth } = containerRef.current;
    if (scrollLeft <= 0) {
      // At start, go to end
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: "smooth",
      });
    } else {
      containerRef.current.scrollBy({ left: -clientWidth, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow"
        onClick={handlePrev}
        aria-label="Previous"
        style={{ left: 0 }}
      >
        &#8592;
      </button>
      <div
        ref={containerRef}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-10"
        style={{ scrollBehavior: "smooth" }}
      >
        {items.map((film, index) => (
          <div
            key={film.id}
            className="snap-start flex-shrink-0"
            style={{ width: 160 }}
          >
            <NextLink href={`/films?id=${film.id}`}>
              <div className="flex gap-4">
                <NextImage
                  alt={film.title}
                  src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                  height={120}
                  width={80}
                  className="rounded"
                />
                <div>
                  <h4 className="font-semibold">{film.title}</h4>
                </div>
              </div>
            </NextLink>
          </div>
        ))}
      </div>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow"
        onClick={handleNext}
        aria-label="Next"
        style={{ right: 0 }}
      >
        &#8594;
      </button>
    </div>
  );
};
