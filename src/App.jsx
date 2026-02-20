import { motion, useInView } from "framer-motion"
import { useState, useRef } from "react"
import { viewportDefault, viewportSectionVisible, staggerContainer, staggerItem, staggerContainerSlow, staggerItemSlow } from "./lib/motionVariants"
import { AnimatedText } from "./components/AnimatedText/AnimatedText"
import trackData from '../track.json'
import data from '../question-anwser.json'
import tracksNotRealized from '../unreleasedTrack.json'
import Carousel from "./components/carusel/carusel"
import { Social } from "./components/social/social"
import { UnreleasedList } from "./components/unreleasedList/unreleasedList"
import Iam from '../public/images/micha.jpg'
import secondImg from '../public/images/four.png'
import { Services } from "./components/services/services"
import 'react-phone-input-2/lib/style.css'


function App() {
    console.log(data.questionAnswer);
    const mainRef = useRef(null);
    const aboutSectionRef = useRef(null);
    const portfolioSectionRef = useRef(null);
    const unreleasedSectionRef = useRef(null);
    const isAboutInView = useInView(aboutSectionRef, { once: true, amount: 0.2 });
    const isPortfolioInView = useInView(portfolioSectionRef, { once: true, amount: 0.2 });
    const isUnreleasedInView = useInView(unreleasedSectionRef, { once: true, amount: 0.2 });
    const [answer, setAnswer] = useState(null)

    const handleAnswer=(index)=>{
     setAnswer(answer===index?null:index)
    }



  return (
      <div ref={mainRef} className="relative overflow-x-hidden bg-[#131212] mobile-snap-scroll">
        {/* Hero — анимация при загрузке */}
        <section className="relative flex flex-col min-h-full md:flex-row md:min-h-screen">
    <div 
      className="
        relative w-full h-[50vh] md:w-1/2 md:h-screen 
        bg-cover bg-center flex items-end justify-center p-4
      "
      style={{ 
        backgroundImage: `url(${Iam})`,
        backgroundPosition: 'center 33%' 
      }}
    >
      <div className="absolute inset-0 bg-black/40 md:bg-black/20"></div>
      <div className="hidden md:flex text-[#F8F8FF] z-10 absolute left-8 bottom-8 md:left-10 md:bottom-10 lg:left-12 lg:bottom-12 xl:left-20 xl:bottom-16">
        <div className="text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-2 md:mb-3 lg:mb-4 min-w-0 break-words" style={{fontFamily:'EightFonts,sans-serif'}}>
            <AnimatedText text="Michael Houdini" useAnimate />
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-4xl xl:text-6xl" style={{fontFamily:'SecondFonts,sans-serif'}}>
            <AnimatedText text="producer" useAnimate />
          </h3>
        </div>
      </div>
      <div className="md:hidden text-end flex flex-col justify-end items-center text-[#F8F8FF] z-10 relative">
        <h2 className="text-3xl mb-2" style={{fontFamily:'EightFonts,sans-serif'}}>
          <AnimatedText text="Michael Houdini" useAnimate />
        </h2>
        <h3 className="text-xl" style={{fontFamily:'SecondFonts,sans-serif'}}>
          <AnimatedText text="producer" useAnimate />
        </h3>
      </div>
    </div>
    
    <div 
      className="
        relative w-full h-[50vh] md:w-1/2 md:h-screen
        bg-cover bg-center flex items-start justify-center p-4
      "
      style={{ 
        backgroundImage: `url(${secondImg})`,
       
      }}
    >
      <div className="absolute inset-0 bg-black/40 md:bg-black/40"></div>
      
      <motion.div
        className="text-center font-bold text-[#FDF4E3] max-w-md relative z-10"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-row gap-10 mt-10">
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
    </div>
        </section>

    {/* Обо мне — линия + буквы + контент */}
    <section ref={aboutSectionRef} className="section-flow relative min-h-screen text-[#F5F5F5] justify-center bg-[#131212] flex flex-col">
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
        <div className="text-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center pb-4" style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'2px'}}>
          <h2><AnimatedText text="Обо мне" className="inline-block" /></h2>
        </div>
        <div className="flex items-center justify-center pb-6">
        </div>
        <motion.div className="space-y-4 text-[16px] sm:text-base lg:text-lg text-[#CDCABB] leading-relaxed max-w-3xl mx-auto text-center md:text-left" style={{fontFamily:'SixFonts,sans-serif',letterSpacing:'2px'}} variants={staggerItem}>
    <p>
      Меня зовут Миша Гудков, я саунд-продюсер и сонграйтер. Родился и вырос в Москве, учился в музыкальной школе при Московской 
      консерватории по специальности «фортепиано». Музыкой занимаюсь более тринадцати лет из своих 19. Последние шесть лет работаю в продакшене; за последние два года сделал больше 150 песен и поработал над саундтреком к трём сериалам.</p>

<p>Играю на клавишных, гитаре и перкуссии, уверенно работаю с записью и имею опыт живых выступлений. 
Преимущественно работаю в жанрах поп, инди, альт-поп и хип-хоп, но также имею опыт в других направлениях. Работал как приглашённый саунд-продюсер с лейблами.</p>

  </motion.div>
      </motion.div>
    </section>

   {/* Портфолио — Реализованные проекты */}
   <section ref={portfolioSectionRef} className="section-flow relative min-h-screen items-center flex flex-col text-white pt-6 pb-6 md:pt-10 md:pb-10 bg-transparent">
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
      <motion.div className="w-full flex flex-col items-center relative z-10" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportDefault}>
        <div className="font-bold text-[#FDF4E3] mb-2 md:mb-4">
          <h3 className="text-sm sm:text-base md:text-lg mt-2"><AnimatedText text="[Портфолио]" /></h3>
        </div>
        <motion.div className="mt-6 text-center px-1 min-w-0 overflow-hidden" variants={staggerItem}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl max-w-full" style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'1.5px'}}>
            <span className="block"><AnimatedText text="Реализованные" /></span>
            <span className="block"><AnimatedText text="проекты" /></span>
          </h2>
        </motion.div>
        <motion.div className="mt-3 mb-3 md:mt-10 md:mb-6 text-sm md:text-base text-[#D3D3D3]" variants={staggerItem}>
          <p>Листайте вправо</p>
        </motion.div>
        <motion.div className="w-[310px] max-w-6xl mx-auto px-1 pb-2 md:px-4 relative flex-shrink-0" variants={staggerItem}>
          <div className="relative overflow-hidden rounded-xl md:rounded-2xl backdrop-blur-sm border border-[#2C3E50]/30 py-5 md:p-4">
            <Carousel tracks={trackData.tracks}/>
          </div>
        </motion.div>
        <motion.div className="mt-4 md:mt-6 flex-shrink-0" variants={staggerItem}>
          <div className="text-start text-base sm:text-lg md:text-2xl w-70 px-2">
            <h2 style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'2px'}}>Послушать работы <br/>вы можете здесь</h2>
          </div>
          <Social/>
        </motion.div>
      </motion.div>
</section>

       {/* Невыпущенные — полусфера справа сверху влево вниз */}
       <section ref={unreleasedSectionRef} className="section-flow relative min-h-screen items-center flex flex-col text-white pt-10 pb-4 bg-transparent">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            className={`draw-line-path draw-line-path-wait-view ${isUnreleasedInView ? 'draw-line-path-animate' : ''}`}
            d="M 100 5
               C 45 2, 0 48, 0 95"
          />
        </svg>
      </div>
      <motion.div className="w-full flex flex-col items-center md:items-center w-90 bg-transparent pb-30 relative z-10" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportDefault}>
        <div className="mt-2 text-center pt-6 mb-4 px-2 min-w-0 overflow-hidden">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl max-w-full" style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'2px'}}>
            <span className="block"><AnimatedText text="Невыпущенные" /></span>
            <span className="block"><AnimatedText text="проекты" /></span>
          </h2>
        </div>
        <motion.div className="mt-2 w-full" variants={staggerItem}>
          <UnreleasedList items={tracksNotRealized.tracksNotRealized}/>
        </motion.div>
        </motion.div>
    </section>

    {/* FAQ — в стиле секции «Услуги» */}
    <section className="section-flow min-h-screen items-center  relative px-4 text-[#F5F5F5] pt-10 pb-20 bg-[#131212] ">
      <motion.div className="w-full flex flex-col items-center" variants={staggerContainerSlow.variants} initial="hidden" whileInView="visible" viewport={viewportSectionVisible}>
        <div className="font-bold mb-4 text-[#FDF4E3]">
          <h3 className="text-sm sm:text-base md:text-lg"><AnimatedText text="[FAQ]" /></h3>
        </div>
        <motion.div className="mt-6 text-center px-2 min-w-0 overflow-hidden" variants={staggerItemSlow}>
          <h2 className="text-3xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl max-w-full mb-10" style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'1px'}}>Ответы на частые вопросы </h2>
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
                  className="text-xl sm:text-2xl font-serif font-bold text-[#2C3E50] uppercase tracking-tight mb-2 flex justify-between items-start gap-4"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  <span className="flex-1">{d.question}</span>
                  <span className="w-8 h-8 flex items-center justify-center text-2xl shrink-0">
                    {answer === i ? "−" : "+"}
                  </span>
                </h4>
              </div>
              {answer === i && (
                <p className="text-[#5a5a5a] text-base sm:text-lg max-w-2xl leading-relaxed pt-2 border-t border-[#2C3E50]/20">
                  {d.answer}
                </p>
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>

    {/* Услуги */}
    <section className="section-flow min-h-screen items-center flex relative px-4 flex-col text-[#F5F5F5] pt-20 pb-20 bg-[#131212]">
      <motion.div className="w-full flex flex-col items-center" variants={staggerContainerSlow.variants} initial="hidden" whileInView="visible" viewport={viewportSectionVisible}>
        <div className="font-bold mb-10 text-[#FDF4E3]">
          <h3 className="text-sm sm:text-base md:text-lg"><AnimatedText text="[Услуги]" /></h3>
        </div>
        <motion.div variants={staggerItemSlow}>
          <Services
            services={[
              {
                id: 'prod',
                title: 'Продакшн',
                descrip: 'Полный цикл видеопродакшна: от идеи до монтажа. Музыкальные клипы, рекламные ролики, корпоративное видео и съёмка мероприятий. Подготовим смету, поможем оформить бриф или обсудим ваш проект.',
              },
              {
                id: 'sound',
                title: 'Саунд-дизайн и музыка',
                descrip: 'Звук для видео и рекламы: оригинальная музыка, сведение, саунд-дизайн и озвучка. Адаптируем стиль под бренд и формат проекта.',
              },
              {
                id: 'post',
                title: 'Монтаж и постпродакшн',
                descrip: 'Монтаж, цветокоррекция, графика и анимация. Работаем в любых форматах и сжатые сроки. Итог — готовый ролик под публикацию.',
              },
            ]}
            btn={['смета', 'бриф', 'связь']}
          />
        </motion.div>
      </motion.div>
    </section>
    </div>
      
  
  )
}

export default App
