import { motion } from "framer-motion"
import { IoArrowForwardSharp } from "react-icons/io5";

const links = [
  { label: "Яндекс Музыка", href: "#", delay: 0.5 },
  { label: "Spotify", href: "#", delay: 0.8 },
  { label: "Apple Music", href: "#", delay: 1.1 },
];

export const Social = () => {
  return (
    <div className="overflow-x-auto mt-8 mb-10 md:overflow-visible md:max-w-[520px]">
      <table className="min-w-full md:min-w-0 md:w-full border-collapse">
        <tbody>
          {links.map((item, i) => (
            <tr
              key={item.label}
              className={`border-b border-gray-200/20 hover:bg-white/5 transition-colors ${i === 0 ? "border-t" : ""}`}
            >
              <td colSpan={2} className="p-0 align-middle">
                <a
                  href={item.href}
                  className="flex items-center justify-between w-full py-3 px-4 group text-gray-300"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: item.delay }}
                    className="transition-colors duration-200 group-hover:text-white"
                  >
                    {item.label}
                  </motion.span>
                  <IoArrowForwardSharp className="flex-shrink-0 ml-4 transition-colors duration-200 group-hover:text-white" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};