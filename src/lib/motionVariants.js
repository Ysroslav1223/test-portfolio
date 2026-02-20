/**
 * Варианты анимации при скролле.
 * Срабатывают при появлении секции в зоне видимости.
 */

// Срабатывает рано (8% элемента видно), без жёсткого отступа — анимации точно видны
export const viewportDefault = {
  once: true,
  amount: 0.08,
  margin: "0px 0px 0px 0px",
};

// Срабатывает, когда секция заметно в зоне видимости (~20%) — анимация успевает быть замеченной
export const viewportSectionVisible = {
  once: true,
  amount: 0.2,
  margin: "0px 0px 0px 0px",
};

export const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportDefault,
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

export const fadeUpSlow = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportDefault,
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: viewportDefault,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

/** Контейнер: сначала появляется сама секция, затем по очереди дети */
export const staggerContainer = {
  initial: "hidden",
  whileInView: "visible",
  viewport: viewportDefault,
  variants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        opacity: { duration: 0.4 },
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  },
};

/** Элемент внутри stagger: выезд снизу + появление (всплытие блоков) */
export const staggerItem = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Более медленный stagger-контейнер для секции FAQ */
export const staggerContainerSlow = {
  initial: "hidden",
  whileInView: "visible",
  viewport: viewportSectionVisible,
  variants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        opacity: { duration: 0.5 },
        staggerChildren: 0.2,
        delayChildren: 0.25,
      },
    },
  },
};

/** Более медленный элемент stagger (для FAQ) */
export const staggerItemSlow = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Линия, тянущаяся по секции (как на Verholy) — рисуется при появлении в viewport */
export const lineReveal = {
  initial: { scaleX: 0 },
  whileInView: { scaleX: 1 },
  viewport: viewportDefault,
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
};

/** Контейнер для появления букв по одной (stagger по буквам) */
export const letterContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03, delayChildren: 0.08 },
  },
};

/** Одна буква: всплытие снизу + появление */
export const letterItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};
