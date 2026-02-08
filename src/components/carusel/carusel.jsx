import { motion } from "framer-motion";
import { useRef } from "react";

export default function Carousel({ tracks }) {
  const scrollContainerRef = useRef(null);

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

  return (
    <div className="relative max-w-[260px] sm:max-w-[300px] md:max-w-none mx-auto">
      <div className="border border-white/30 rounded-lg md:rounded-xl p-0.5 md:p-2 bg-black/10">
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
          onScroll={handleScroll}
        >
          <div className="flex gap-2 md:gap-6 py-1 px-0.5 md:py-2 md:px-2 min-w-min">
            {tracks.map((item, index) => (
              <motion.div
                key={index}
                data-carousel-card
                className="w-[252px] min-w-[252px] sm:w-[284px] sm:min-w-[284px] md:w-56 md:min-w-0 flex-shrink-0 bg-[#d9d9d9] overflow-hidden shadow-lg snap-start snap-center flex flex-col"
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => scrollToItem(index)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className=" aspect-square object-cover"
                />
                <div className="p-2 md:p-3 text-black flex-shrink-0 border-t border-black/5">
                  <h3 className="text-xs md:text-base font-semibold leading-tight line-clamp-2">{item.title}</h3>
                  <p className="text-[10px] md:text-sm opacity-70 mt-0.5">{item.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg pointer-events-none"></div>
    </div>
  );
}