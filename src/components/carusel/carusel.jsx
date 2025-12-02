import { motion } from "framer-motion";
import { useRef } from "react";

export default function Carousel({ tracks }) {
  const scrollContainerRef = useRef(null);

  const scrollToItem = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const itemWidth = 300 + 24; 
    const scrollPosition = index * itemWidth;
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const itemWidth = 300 + 24;
    const scrollLeft = container.scrollLeft;
    const currentIndex = Math.round(scrollLeft / itemWidth);

    clearTimeout(container.scrollTimeout);
    container.scrollTimeout = setTimeout(() => {
      const targetScroll = currentIndex * itemWidth;
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className="relative">

      <div className="border-2 border-white/30 rounded-xl p-4 bg-black/10">
  
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
          onScroll={handleScroll}
        >
          <div className="flex gap-6 py-2 px-2 min-w-min">
            {tracks.map((item, index) => (
              <motion.div
                key={index}
                className="w-68 flex-shrink-0 bg-[#d9d9d9]  overflow-hidden shadow-lg snap-start snap-always"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => scrollToItem(index)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4 text-black">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm opacity-70 mt-1">{item.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl pointer-events-none"></div>
    </div>
  );
}