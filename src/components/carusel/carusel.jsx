import { useRef, useState } from "react";

export default function Carousel({ tracks }) {
  const scrollContainerRef = useRef(null);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const textSize = {
    small: "text-sm sm:text-base md:text-lg",
  };

  const getItemWidth = () => {
    const container = scrollContainerRef.current;
    const card = container?.querySelector('[data-carousel-card]');
    if (!card) return window.innerWidth <= 768 ? 320 : 324;
    const gap = window.innerWidth <= 768 ? 8 : 24;
    return card.offsetWidth + gap;
  };

  const scrollToItem = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollPosition = index * getItemWidth();
    container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const itemWidth = getItemWidth();
    const scrollLeft = container.scrollLeft;
    const currentIndex = Math.round(scrollLeft / itemWidth);
    clearTimeout(container.scrollTimeout);
    container.scrollTimeout = setTimeout(() => {
      container.scrollTo({ left: currentIndex * itemWidth, behavior: 'smooth' });
    }, 100);
  };

  const defaultLinks = [
    { label: "Spotify", href: "#" },
    { label: "Apple Music", href: "#" },
    { label: "Яндекс Музыка", href: "#" },
  ];

  return (
    <div className="relative max-w-[260px] sm:max-w-[300px] md:max-w-none mx-auto">
      <div className="border border-white/30 rounded-lg md:rounded-xl p-0.5 md:p-2 bg-transparent">
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
          onScroll={handleScroll}
        >
          <div className="flex gap-2 md:gap-6 py-1 px-0.5 md:py-2 md:px-2 min-w-min">
            {tracks.map((item, index) => (
              <div
                key={index}
                data-carousel-card
                className="w-[252px] min-w-[252px] sm:w-[284px] sm:min-w-[284px] md:w-56 md:min-w-0 flex-shrink-0 bg-[#d9d9d9] overflow-hidden shadow-lg snap-start snap-center flex flex-col"
                onClick={() => {
                  scrollToItem(index);
                  if (window.innerWidth < 768) {
                    setFlippedIndex(index);
                  }
                }}
                style={{ perspective: "1200px" }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-700 ease-in-out"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flippedIndex === index ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  <div
                    className="w-full h-full"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                  >
                    <img
                      src={item.image.startsWith('http') ? item.image : `${import.meta.env.BASE_URL}${item.image}`}
                      alt={item.title}
                      className="aspect-square object-cover"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                    />
                    <div className="p-2 md:p-3 text-black flex-shrink-0 border-t border-black/5">
                      <h3 className={`${textSize.small} font-semibold leading-tight line-clamp-2`}>{item.title}</h3>
                      <p className="text-sm opacity-70 mt-0.5">{item.year}</p>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 bg-[#d9d9d9] flex flex-col items-center justify-start px-5 pt-6 pb-4"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="w-full max-w-[220px] border-t border-black/20 mt-1">
                      {(item.links?.length ? item.links : defaultLinks).slice(0, 3).map((link, linkIndex) => (
                        <a
                          key={`${index}-${linkIndex}`}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className={`w-full flex items-center justify-between border-b border-black/20 py-2.5 px-1 ${textSize.small} text-black/80 hover:text-black transition-colors`}
                        >
                          <span>{link.label}</span>
                          <span aria-hidden="true" className="text-sm">→</span>
                        </a>
                      ))}
                    </div>

                    <button
                      type="button"
                      aria-label="Закрыть"
                      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-black text-6xl font-thin leading-none flex items-center justify-center hover:opacity-70 transition-opacity"
                      onClick={() => setFlippedIndex(null)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg pointer-events-none"></div>
    </div>
  );
}