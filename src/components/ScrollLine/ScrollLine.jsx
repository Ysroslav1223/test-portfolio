import { useEffect, useState, useRef } from "react"

const LINE_OFFSET = 24
const STROKE_WIDTH = 1.5
const LINE_COLOR = "rgba(201, 184, 150, 0.55)"

/** Индекс секции «Невыпущенные проекты» (линия заканчивается в её середине слева). */
const END_SECTION_INDEX = 2

const DRAW_DURATION_MS = 2500
const DRAW_DELAY_MS = 400

/**
 * Узор линий задаётся здесь — в этом же файле (ScrollLine.jsx).
 * Ниже массив pathD: каждая строка = один путь (одна линия в узоре).
 * Координаты в формате SVG: правый край = width - LINE_OFFSET, левый = width * 0.25 и т.д.
 */
function buildPaths(width, lineHeight, bounds) {
  if (!bounds?.length) return []
  const rightX = width - LINE_OFFSET
  const leftX = width * 0.28
  const h = lineHeight
  const endSection = bounds[END_SECTION_INDEX]
  const endY = endSection
    ? endSection.top + (endSection.bottom - endSection.top) * 0.5
    : h * 0.85
  const endX = width * 0.25

  return [
    // Основная линия: справа вниз с изгибами, конец — середина слева секции
    [
      `M ${rightX} 0`,
      `C ${rightX - 70} ${h * 0.18} ${leftX + 40} ${h * 0.38} ${rightX - 30} ${h * 0.52}`,
      `C ${rightX - 100} ${h * 0.66} ${width * 0.35} ${h * 0.82} ${endX} ${endY}`,
    ].join(" "),
    // Дополнительные линии узора (лёгкие дуги рядом с основной)
    [
      `M ${rightX - 35} ${h * 0.06}`,
      `C ${rightX + 25} ${h * 0.26} ${rightX - 95} ${h * 0.54} ${rightX - 20} ${h * 0.82}`,
      `L ${rightX} ${h}`,
    ].join(" "),
    [
      `M ${rightX} ${h * 0.1}`,
      `C ${rightX - 125} ${h * 0.38} ${rightX + 15} ${h * 0.62} ${rightX - 65} ${h * 0.9}`,
      `L ${rightX - 12} ${h}`,
    ].join(" "),
    [
      `M ${rightX - 18} ${h * 0.32}`,
      `Q ${rightX - 115} ${h * 0.52} ${rightX - 38} ${h * 0.75}`,
      `T ${rightX} ${h}`,
    ].join(" "),
  ]
}

export function ScrollLine({ containerRef }) {
  const [layout, setLayout] = useState(null)
  const [pathLengths, setPathLengths] = useState([])
  const [drawProgress, setDrawProgress] = useState(0)
  const pathRefs = useRef([])
  const layoutStableRef = useRef(null)
  const hasStartedDrawRef = useRef(false)

  useEffect(() => {
    if (!containerRef?.current) return

    const measure = () => {
      const container = containerRef.current
      if (!container) return
      const sections = container.querySelectorAll(".section-flow")
      if (sections.length <= END_SECTION_INDEX) return

      const sectionEnd = sections[END_SECTION_INDEX]
      const lineStart = sections[0].offsetTop
      const lineEnd = sectionEnd.offsetTop + sectionEnd.offsetHeight
      const lineHeight = lineEnd - lineStart
      const width = container.offsetWidth

      const bounds = Array.from(sections)
        .slice(0, END_SECTION_INDEX + 1)
        .map((el) => ({
          top: el.offsetTop - lineStart,
          bottom: el.offsetTop + el.offsetHeight - lineStart,
        }))

      const next = {
        lineStart,
        lineEnd,
        lineHeight,
        width,
        bounds,
      }
      const prev = layoutStableRef.current
      const same =
        prev &&
        prev.lineStart === next.lineStart &&
        prev.lineEnd === next.lineEnd &&
        prev.lineHeight === next.lineHeight &&
        prev.width === next.width
      if (same) return
      layoutStableRef.current = next
      setLayout(next)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [containerRef])

  useEffect(() => {
    if (!layout || pathRefs.current.length === 0) return
    const lengths = pathRefs.current
      .filter(Boolean)
      .map((el) => (el?.getTotalLength ? el.getTotalLength() : 0))
    if (lengths.length > 0 && lengths.every((l) => l > 0)) {
      setPathLengths((prev) => (prev.length === lengths.length ? prev : lengths))
    }
  }, [layout])

  useEffect(() => {
    if (pathLengths.length === 0 || hasStartedDrawRef.current) return
    hasStartedDrawRef.current = true
    const t = setTimeout(() => setDrawProgress(1), DRAW_DELAY_MS)
    return () => clearTimeout(t)
  }, [pathLengths.length])

  if (!layout || layout.lineHeight <= 0 || !layout.bounds?.length) return null

  const { lineStart, lineHeight, width, bounds } = layout
  const paths = buildPaths(width, lineHeight, bounds)

  return (
    <div
      className="pointer-events-none absolute top-0 left-0"
      style={{
        top: lineStart,
        height: lineHeight,
        width,
        zIndex: 50,
      }}
      aria-hidden
    >
      <svg
        width={width}
        height={lineHeight}
        className="block"
        style={{ overflow: "visible", display: "block" }}
      >
        {paths.map((d, i) => (
          <path
            key={i}
            ref={(el) => {
              pathRefs.current[i] = el
            }}
            d={d}
            fill="none"
            stroke={LINE_COLOR}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={pathLengths[i] ?? 0}
            strokeDashoffset={
              pathLengths[i] != null
                ? pathLengths[i] * (1 - drawProgress)
                : 99999
            }
            style={{
              transition: `stroke-dashoffset ${DRAW_DURATION_MS}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
