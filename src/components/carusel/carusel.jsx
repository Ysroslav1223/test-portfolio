import { motion } from "framer-motion";

export default function Carousel({ tracks }) {
  return (
    <div className="w-full overflow-x-scroll no-scrollbar snap-x snap-mandatory pl-10 flex gap-4 py-6">
      {tracks.map((item, index) => (
        <motion.div
          key={index}
          className="min-w-[80%]  bg-[#d9d9d9]  overflow-hidden shadow-md"
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
  );
}
