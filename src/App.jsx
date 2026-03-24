import { motion, useInView } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { viewportDefault, viewportSectionVisible, staggerContainer, staggerItem, staggerContainerSlow, staggerItemSlow } from "./lib/motionVariants"
import { AnimatedText } from "./components/AnimatedText/AnimatedText"
import trackData from '../track.json'
import data from '../question-anwser.json'
import tracksNotRealized from '../unreleasedTrack.json'
import Carousel from "./components/carusel/carusel"
import { Social } from "./components/social/social"
import { UnreleasedList } from "./components/unreleasedList/unreleasedList"
import Iam from '../public/images/micha.jpg'
import { Services } from "./components/services/services"
import 'react-phone-input-2/lib/style.css'


function App() {
    console.log(data.questionAnswer);
    const SNAP_DEBOUNCE_MS = 260;
    const AUTO_SNAP_LOCK_MS = 900;
    const MIN_SNAP_DISTANCE = 18;
    const mainRef = useRef(null);
    const snapTimeoutRef = useRef(null);
    const isAutoSnappingRef = useRef(false);
    const aboutSectionRef = useRef(null);
    const portfolioSectionRef = useRef(null);
    const unreleasedSectionRef = useRef(null);
    const isAboutInView = useInView(aboutSectionRef, { once: true, amount: 0.2 });
    const isPortfolioInView = useInView(portfolioSectionRef, { once: true, amount: 0.2 });
    const isUnreleasedInView = useInView(unreleasedSectionRef, { once: true, amount: 0.2 });
    const [answer, setAnswer] = useState(null)
    const [desktopFlippedIndex, setDesktopFlippedIndex] = useState(null)
    const textSize = {
      large: "text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl",
      medium: "text-base sm:text-lg md:text-xl",
      small: "text-sm sm:text-base md:text-lg"
    }
    const defaultLinks = [
      { label: "Spotify", href: "#" },
      { label: "Apple Music", href: "#" },
      { label: "YouTube", href: "#" },
    ];

    const handleAnswer=(index)=>{
     setAnswer(answer===index?null:index)
    }

    const unreleasedTracksList = tracksNotRealized.tracksNotRealized
    /** На desktop (xl+) первый трек остаётся в мобильной/планшетной секции; в портфолио — следующие 4 */
    const unreleasedTracksDesktopAside = unreleasedTracksList.slice(1, 5)

  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

    const snapToNearestSection = () => {
      if (!isMobile()) return;
      if (isAutoSnappingRef.current) return;

      const sections = Array.from(container.querySelectorAll(":scope > section"));
      if (!sections.length) return;

      const currentScroll = container.scrollTop;
      let nearestSection = sections[0];
      let minDistance = Math.abs(nearestSection.offsetTop - currentScroll);

      for (let i = 1; i < sections.length; i += 1) {
        const distance = Math.abs(sections[i].offsetTop - currentScroll);
        if (distance < minDistance) {
          minDistance = distance;
          nearestSection = sections[i];
        }
      }

      // Игнорируем совсем мелкие расхождения, чтобы избежать микроподергиваний.
      if (minDistance < MIN_SNAP_DISTANCE) return;

      isAutoSnappingRef.current = true;
      container.scrollTo({ top: nearestSection.offsetTop, behavior: "smooth" });
      window.setTimeout(() => {
        isAutoSnappingRef.current = false;
      }, AUTO_SNAP_LOCK_MS);
    };

    const onScroll = () => {
      if (!isMobile()) return;
      if (snapTimeoutRef.current) window.clearTimeout(snapTimeoutRef.current);
      snapTimeoutRef.current = window.setTimeout(snapToNearestSection, SNAP_DEBOUNCE_MS);
    };

    container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", onScroll);
      if (snapTimeoutRef.current) window.clearTimeout(snapTimeoutRef.current);
    };
  }, []);



  return (
      <div ref={mainRef} className="relative overflow-x-hidden bg-[#0c0f2b] mobile-snap-scroll">
        {/* Hero — анимация при загрузке */}
        <section className="relative flex flex-col min-h-full md:flex-row md:min-h-screen">
    <div 
      className="
        relative w-full h-[50vh] md:w-1/2 md:h-screen 
        bg-cover bg-center
      "
      style={{ 
        backgroundImage: `url(${Iam})`,
        backgroundPosition: 'center 33%' 
      }}
    >
      <div className="absolute inset-0 bg-black/40 md:bg-black/20"></div>
    </div>
    
    <div 
      className="
        relative w-full h-[50vh] md:w-1/2 md:h-screen
        bg-[#0c0f2b] flex flex-col p-4 md:p-8 lg:p-10 xl:pr-20 xl:pb-16
      "
    >
      <motion.div
        className="font-bold text-[#CDCABB] w-full flex justify-end relative z-10 shrink-0"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-row gap-10 pt-2 md:pt-10">
          <a href="https://t.me/hvdini">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21.99 2.76a1.49 1.49 0 00-1.58-.12L2.27 9.06a1.5 1.5 0 00-.05 2.75l4.96 1.67 1.85 5.63c.3.94 1.57 1.18 2.11.33l2.32-3.18 4.77 3.51c.84.61 1.9-.2 1.64-1.13L22.02 4.3a1.5 1.5 0 00-.03-1.54zM9.66 14.5l-.95-2.88L18.2 6.33 9.66 14.5z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/michael.houdini?igsh=dnV1enN6MXkyY3p0&utm_source=qr">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5c0 3.3-2.45 5.75-5.75 5.75h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 1.5C5.68 3.5 4 5.18 4 7.25v9.5C4 18.32 5.68 20 7.75 20h8.5c2.07 0 3.75-1.68 3.75-3.75v-9.5C20 5.68 18.32 3.5 16.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.88a1.12 1.12 0 110 2.24 1.12 1.12 0 010-2.24z" />
            </svg>
          </a>
        </div>
      </motion.div>
      <div className="flex flex-1 flex-col justify-end items-end text-right text-[#CDCABB] z-10 min-h-0 pb-4 md:pb-0">
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-2 md:mb-3 lg:mb-4 min-w-0 break-words" style={{fontFamily:'EightFonts,sans-serif'}}>
            <AnimatedText text="Michael Houdini" useAnimate />
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-4xl xl:text-6xl" style={{fontFamily:'SecondFonts,sans-serif'}}>
            <AnimatedText text="producer" useAnimate />
          </h3>
        </div>
      </div>
    </div>
        </section>

    {/* Обо мне — линия + буквы + контент */}
    <section ref={aboutSectionRef} className="section-flow relative min-h-screen text-[#CDCABB] justify-center bg-[#0c0f2b] flex flex-col">
      {/* Фоновая SVG-линия: рисуется при появлении секции в зоне видимости */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            className={`draw-line-path draw-line-path-wait-view ${isAboutInView ? 'draw-line-path-animate' : ''}`}
            d="M 0 5
               C 55 2, 100 48, 100 95"
          />
        </svg>
      </div>
      <motion.div
        className="w-full flex flex-col justify-start px-8 pt-8 pb-20 flex-1 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportDefault}
      >
        <div className={`text-bold ${textSize.large} text-center pb-30`} style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'2px'}}>
          <h2><AnimatedText text="Обо мне" className="inline-block" /></h2>
        </div>
        <div className="flex items-center justify-center pb-6">
        </div>
        <div className="w-full mx-auto max-w-6xl md:max-w-7xl md:flex md:items-start md:gap-10 lg:gap-12 md:mt-[90px]">
          <div className="hidden md:block md:w-[44%] lg:w-[42%] md:-ml-10 lg:-ml-12 md:mt-0">
            <div className="w-full aspect-video overflow-hidden rounded-2xl border border-[#2C3E50]/30 bg-white/5 backdrop-blur-sm">
              <img
                src={Iam}
                alt="About preview"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <motion.div className={`space-y-4 ${textSize.medium} text-[#CDCABB] leading-relaxed max-w-3xl mx-auto text-center md:text-justify md:mx-0 md:ml-auto md:mr-0 md:mt-0 md:max-w-none md:w-[56%] md:translate-x-4`} style={{fontFamily:'SecondFonts',letterSpacing:'2px'}} variants={staggerItem}>
    <p>
    Меня зовут Миша Гудков, я саунд-продюсер и сонграйтер. Родился и вырос в Москве, учился в музыкальной школе при Московской 
    консерватории по специальности «фортепиано». Музыкой занимаюсь более 14 лет из своих 20. Последние 8 лет работаю в музыкальном продакшне; за последние 2 года сделал больше 150 песен и поработал над саундтреком к трём сериалам.</p>

<p>Играю на клавишных, гитаре и перкуссии, уверенно работаю с записью и имею опыт живых выступлений. 
Преимущественно работаю в жанрах поп, инди, альт-поп и хип-хоп, но также имею опыт во многих других направлениях. Работал как приглашённый саунд-продюсер с лейблами.</p>

  </motion.div>
        </div>
      </motion.div>
    </section>

    <section className="section-flow min-h-screen items-center flex relative px-4 flex-col text-[#CDCABB] pt-20 pb-20 bg-[#0c0f2b]">
      <motion.div className="w-full flex flex-col items-center" variants={staggerContainerSlow.variants} initial="hidden" whileInView="visible" viewport={viewportSectionVisible}>
        <div className="font-bold mb-10 text-[#CDCABB]">
          <h3 className={textSize.small}><AnimatedText text="[Услуги]" /></h3>
        </div>
        <motion.div variants={staggerItemSlow}>
          <Services
            services={[
              {
                id: 'prod',
                title: 'Музыкальный продакшн',
                descrip: 'Создание трека под ключ с контролем на каждом этапе. На входе идея, на выходе готовый релиз с актуальным звучанием. Включает аранжировку, сведение и мастеринг, запись по запросу.',
              },
              {
                id: 'sound',
                title: 'Аранжировка',
                descrip: 'Развитие идеи или демо в полноценный трек. Проработка звучания, структуры и деталей до финального результата.',
              },
              {
                id: 'post',
                title: 'Продакшн полного цикла',
                descrip: 'Проект ведётся от идеи до релиза. Полное сопровождение на всех этапах: создание трека, доработка, подготовка к выпуску и визуал. На выходе готовый релиз на площадках и видео для его поддержки.',
              },
            ]}
            btn={['смета', 'бриф', 'связь']}
          />
        </motion.div>
      </motion.div>
    </section>

    

   {/* Портфолио — Реализованные проекты */}
   <section ref={portfolioSectionRef} className="section-flow relative min-h-screen items-center flex flex-col text-[#CDCABB] pt-6 pb-14 md:pt-10 md:pb-20 xl:pb-24 bg-[#0c0f2b]">
      {/* Фоновая SVG-линия: рисуется при появлении секции в зоне видимости */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            className={`draw-line-path draw-line-path-wait-view ${isPortfolioInView ? 'draw-line-path-animate' : ''}`}
            d="M 100 6
               C 92 8, 88 18, 82 28
               C 75 42, 70 50, 72 58
               C 76 68, 90 62, 85 72
               C 78 85, 55 88, 38 90
               C 22 92, 12 94, 0 96"
          />
        </svg>
      </div>
      <div className="w-full flex flex-col items-center relative z-10">
        {/* Заголовки оставляем анимированными */}
        <motion.div
          className="w-full flex flex-col items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportDefault}
        >
          <div className="font-bold text-[#CDCABB] mb-2 md:mb-4">
            <h3 className={`${textSize.small} mt-2`}><AnimatedText text="[Портфолио]" /></h3>
          </div>
          <motion.div className="mt-6 text-center px-1 min-w-0 overflow-hidden md:mb-8" variants={staggerItem}>
            <h2 className={`${textSize.large} max-w-full`} style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'1.5px'}}>
              <span className="block md:inline"><AnimatedText text="Реализованные" /></span>
              <span className="block md:inline md:ml-3"><AnimatedText text="проекты" /></span>
            </h2>
          </motion.div>
          <motion.div className={`mt-3 mb-3 md:hidden ${textSize.small} text-[#CDCABB]`} variants={staggerItem}>
            <p>Листайте вправо</p>
          </motion.div>
        </motion.div>

        {/* Обложки без анимации появления (чтобы не лагали при рисовании линии) */}
        <div className="w-[310px] max-w-6xl mx-auto px-1 pb-2 md:hidden relative flex-shrink-0">
          <div className="relative overflow-hidden rounded-xl backdrop-blur-sm border border-[#2C3E50]/30 py-5">
            <Carousel tracks={trackData.tracks}/>
          </div>
        </div>

        <div className="hidden md:block w-full max-w-7xl mx-auto px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-2xl backdrop-blur-sm border border-[#2C3E50]/30 p-5 lg:p-6">
            <motion.div
              className="grid grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportDefault}
            >
              {trackData.tracks.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-[#d9d9d9] overflow-hidden shadow-lg cursor-pointer"
                  style={{ contentVisibility: 'auto', containIntrinsicSize: '320px' }}
                  variants={staggerItem}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  onClick={() =>
                    setDesktopFlippedIndex(desktopFlippedIndex === index ? null : index)
                  }
                >
                  <div style={{ perspective: "1200px" }}>
                    <div
                      className="relative w-full h-full transition-transform duration-700 ease-in-out"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: desktopFlippedIndex === index ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                    >
                      <div
                        className="w-full h-full"
                        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                      >
                        <img
                          src={item.image.startsWith('http') ? item.image : `${import.meta.env.BASE_URL}${item.image}`}
                          alt={item.title}
                          className="w-full aspect-square object-cover"
                          loading="lazy"
                          decoding="async"
                          fetchpriority="low"
                        />
                        <div className="p-3 text-[#000] border-t border-black/5">
                          <h3 className={`${textSize.small} font-semibold leading-tight line-clamp-2`}>{item.title}</h3>
                          <p className="text-sm text-[#000]/70 mt-0.5">{item.year}</p>
                        </div>
                      </div>

                      <div
                        className="absolute inset-0 bg-[#d9d9d9] flex flex-col items-center justify-start px-5 pt-6 pb-4"
                        style={{
                          transform: "rotateY(180deg)",
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                        }}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <div className="w-full max-w-[220px] border-t border-black/20 mt-1">
                          {(item.links?.length ? item.links : defaultLinks).slice(0, 3).map((link, linkIndex) => (
                            <a
                              key={`${index}-${linkIndex}`}
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              className={`w-full flex items-center justify-between border-b border-black/20 py-2.5 px-1 ${textSize.small} text-black/80 hover:text-black transition-colors`}
                            >
                              <span>{link.label}</span>
                              <span aria-hidden="true" className="text-sm">→</span>
                            </a>
                          ))}
                        </div>

                        <button
                          type="button"
                          aria-label="Закрыть"
                          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-black text-6xl font-thin leading-none flex items-center justify-center hover:opacity-70 transition-opacity"
                          onClick={() => setDesktopFlippedIndex(null)}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-4 md:mt-15 w-full flex-shrink-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportDefault}
        >
          <motion.div className="md:max-w-7xl md:mx-auto md:px-6 lg:px-10 w-full" variants={staggerItem}>
            <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between xl:gap-10 2xl:gap-14">
              <div className="min-w-0 xl:max-w-[min(100%,720px)] xl:flex-1">
                <div className="text-center md:text-start text-xl sm:text-2xl md:text-xl text-[#CDCABB] w-70 px-2 mx-auto md:mx-0">
                  <h2 className="md:whitespace-nowrap" style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'2px'}}>
                    Послушать работы <br className="md:hidden" />вы можете здесь
                  </h2>
                </div>
                <Social/>
              </div>
              <div className="hidden xl:block flex-1 min-w-0 max-w-xl xl:pt-1">
                <UnreleasedList items={unreleasedTracksDesktopAside} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
</section>

       {/* Невыпущенные — на xl+ блок перенесён в портфолио; мобильные и планшеты — полная секция */}
       <section ref={unreleasedSectionRef} className="section-flow relative min-h-screen items-center flex flex-col text-[#CDCABB] pt-10 pb-16 md:pb-20 bg-[#0c0f2b] xl:hidden">
     
      <motion.div className="w-full flex flex-col items-center md:items-center w-90 bg-transparent pb-30 relative z-10" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportDefault}>
        <div className="mt-2 text-center pt-6 mb-4 md:mb-8 px-2 min-w-0 overflow-hidden">
          <h2 className={`${textSize.large} max-w-full`} style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'2px'}}>
            <span className="block md:inline"><AnimatedText text="Невыпущенные" /></span>
            <span className="block md:inline md:ml-3"><AnimatedText text="проекты" /></span>
          </h2>
        </div>
        <motion.div className="mt-2 w-full" variants={staggerItem}>
          <UnreleasedList items={unreleasedTracksList}/>
        </motion.div>
        </motion.div>
    </section>

    {/* FAQ — в стиле секции «Услуги» */}
    
    <section className="section-flow min-h-screen items-center relative px-4 text-[#CDCABB] pt-16 md:pt-20 pb-20 bg-[#0c0f2b]">
      <motion.div className="w-full flex flex-col items-center" variants={staggerContainerSlow.variants} initial="hidden" whileInView="visible" viewport={viewportSectionVisible}>
        <div className="font-bold mb-4 text-[#CDCABB]">
          <h3 className={textSize.small}><AnimatedText text="[FAQ]" /></h3>
        </div>
        <motion.div className="mt-6 text-center px-2 min-w-0 overflow-hidden" variants={staggerItemSlow}>
          <h2 className={`${textSize.large} max-w-full mb-10`} style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'1px'}}>Ответы на частые вопросы </h2>
        </motion.div>
        <motion.div className="w-full max-w-4xl mx-auto mt-2 border-t border-[#2C3E50]/30 flex flex-col gap-3" variants={staggerItemSlow}>
          {data.questionAnswer.slice(0, 4).map((d, i) => (
            <div
              key={d.id}
              className="bg-[#F2E5D4] px-6 py-6 sm:px-10 sm:py-8 border-b border-[#2C3E50]/30 last:border-b-0"
            >
              <div
                onClick={() => handleAnswer(i)}
                className="cursor-pointer"
              >
                <h4
                  className={`${textSize.medium} font-serif font-bold text-[#2C3E50] uppercase tracking-tight mb-2 flex justify-between items-start gap-4`}
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  <span className="flex-1">{d.question}</span>
                  <span className="w-8 h-8 flex items-center justify-center text-xl shrink-0">
                    {answer === i ? "−" : "+"}
                  </span>
                </h4>
              </div>
              {answer === i && (
                <p className={`text-[#5a5a5a] ${textSize.medium} max-w-2xl leading-relaxed pt-2 border-t border-[#2C3E50]/20`}>
                  {d.answer}
                </p>
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
    {/* Услуги */}
    
    </div>
      
  
  )
}

export default App
