import { motion } from "framer-motion"
import { viewportDefault, letterContainer, letterItem } from "../../lib/motionVariants"

/**
 * Текст, буквы которого поочерёдно всплывают (в стиле Verholy).
 * По умолчанию — при скролле (whileInView). Если useAnimate — при загрузке (animate).
 */
export function AnimatedText({ text, className = "", as: Tag = "span", useAnimate = false, ...rest }) {
  const letters = Array.from(text)

  return (
    <Tag className={className} {...rest}>
      <motion.span
        style={{ display: "inline-flex", flexWrap: "wrap" }}
        variants={letterContainer}
        initial="hidden"
        {...(useAnimate
          ? { animate: "visible" }
          : { whileInView: "visible", viewport: viewportDefault }
        )}
      >
        {letters.map((char, i) => (
          <motion.span key={i} variants={letterItem} style={{ display: "inline-block" }}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}
