import { motion } from "framer-motion"
import { lineReveal } from "../../lib/motionVariants"

/**
 * Линия, которая «тянется» по секции при скролле (в стиле Verholy).
 * По умолчанию — горизонтальная линия, рисуется слева направо.
 */
export function AnimatedLine({ className = "", color = "currentColor", thickness = 1, vertical = false }) {
  const style = {
    backgroundColor: color,
    height: vertical ? "100%" : `${thickness}px`,
    width: vertical ? `${thickness}px` : "100%",
    transformOrigin: vertical ? "top" : "left",
  }

  return (
    <motion.div
      className={className}
      style={style}
      {...lineReveal}
    />
  )
}
