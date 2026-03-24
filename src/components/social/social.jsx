import { motion } from "framer-motion"
import { IoArrowForwardSharp } from "react-icons/io5";

const links = [
  { label: "Яндекс Музыка", href: "#", delay: 0 },
  { label: "Spotify", href: "#", delay: 0.08 },
  { label: "Apple Music", href: "#", delay: 0.16 },
];

export const Social = () => {
  const textSize = {
    small: "text-base sm:text-lg md:text-lg",
  };

  return (
    <div className="mt-8 mb-10 flex justify-center md:justify-start md:max-w-[520px]">
      <table className="w-full max-w-[320px] md:max-w-none border-collapse">
        <tbody>
          {links.map((item, i) => (
            <tr
              key={item.label}
              className={`border-b border-gray-200/20 hover:bg-white/5 transition-colors ${i === 0 ? "border-t" : ""}`}
            >
              <td colSpan={2} className="p-0 align-middle">
                <a
                  href={item.href}
                  className={`flex items-center justify-between w-full py-3 px-4 md:py-3 md:px-4 group text-gray-300 ${textSize.small}`}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.3, delay: item.delay, ease: "easeOut" }}
                    className="transition-colors duration-200 group-hover:text-white"
                  >
                    {item.label}
                  </motion.span>
                  <IoArrowForwardSharp className="flex-shrink-0 ml-4 text-base sm:text-lg md:text-base transition-colors duration-200 group-hover:text-white" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};