import { useId } from "react"
import { motion } from "framer-motion"
import { lineReveal } from "../../lib/motionVariants"

/**
 * Изогнутая линия под заголовком секции (как на Verholy):
 * плавная дуга вниз и короткий вертикальный штрих в конце.
 */
export function CurvedLine({ className = "", color = "currentColor", strokeWidth = 1.5 }) {
  const gradientId = useId()

  return (
    <motion.div
      className={className}
      style={{ overflow: "visible" }}
      {...lineReveal}
    >
      <svg
        viewBox="0 0 120 16"
        preserveAspectRatio="none"
        className="w-full h-3 block"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {/* Дуга вниз + короткий вертикальный штрих в конце */}
        <path
          d="M 0 8 Q 55 18 108 8 L 118 4"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  )
}
