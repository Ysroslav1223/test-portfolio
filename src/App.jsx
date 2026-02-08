import { motion,AnimatePresence,  } from "framer-motion"
import { useRef,useState,useEffect } from "react"
import trackData from '../track.json'
import data from '../question-anwser.json'
import tracksNotRealized from '../unreleasedTrack.json'
import Carousel from "./components/carusel/carusel"
import { Social } from "./components/social/social"
import { UnreleasedList } from "./components/unreleasedList/unreleasedList"
import Iam from '../public/images/micha.jpg'
import secondImg from '../public/images/four.png'
import fon from '../public/images/fon3.png'
import fon2 from '../public/images/fon2.png'
import { Services } from "./components/services/services"
import 'react-phone-input-2/lib/style.css'


import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STACK_SELECTOR = "[data-stack-section]";

function App() {
  const mainRef = useRef(null);

  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    const setupStack = () => {
      const sections = Array.from(container.querySelectorAll(STACK_SELECTOR));

      sections.forEach((section) => {
        const inner = section.querySelector(".stack-section-inner");
        if (!inner) return;

        const getScrollEnd = () => {
          const base = inner.offsetHeight;
          if (window.innerWidth < 768) {
            return base + Math.max(300, base * 0.5);
          }
          return base + (base * 0.15);
        };
        const getContentDelta = () =>
          -(inner.offsetHeight - section.offsetHeight);

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollEnd()}`,
          pin: true,
          pinSpacing: false,
        });

        if (inner.offsetHeight > section.offsetHeight) {
          gsap.fromTo(
            inner,
            { y: 0 },
            {
              y: getContentDelta,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${getScrollEnd()}`,
                scrub: true,
              },
            }
          );
        }
      });
    };

    setupStack();

    const sections = Array.from(container.querySelectorAll(STACK_SELECTOR));
    const ro = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    sections.forEach((s) => {
      const inner = s.querySelector(".stack-section-inner");
      if (inner) ro.observe(inner);
    });

    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      ro.disconnect();
      clearTimeout(timer);
      window.removeEventListener("load", onLoad);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);



   

    console.log(data.questionAnswer);

    const[answer,setAnswer]=useState(null)

    const handleAnswer=(index)=>{
     setAnswer(answer===index?null:index)
    }



  return (
      <div className="relative" ref={mainRef}>
        <section
          className="stack-viewport relative"
          data-stack-section
        >
          <div className="stack-section-inner flex flex-col min-h-full md:flex-row md:min-h-screen">
 
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
          <h2 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl mb-2 md:mb-3 lg:mb-4 whitespace-nowrap" style={{fontFamily:'EightFonts,sans-serif'}}>
            Michael Houdini
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-4xl xl:text-6xl" style={{fontFamily:'SecondFonts,sans-serif'}}>
            producer
          </h3>
        </div>
      </div>
      <div className="md:hidden text-end flex flex-col justify-end items-center text-[#F8F8FF] z-10 relative">
        <h2 className="text-3xl mb-2" style={{fontFamily:'EightFonts,sans-serif'}}>
          Michael Houdini
        </h2>
        <h3 className="text-xl" style={{fontFamily:'SecondFonts,sans-serif'}}>
          producer
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
      
      <div className="text-center font-bold text-[#FDF4E3] max-w-md relative z-10
                     transition-all duration-700
                     md:opacity-90 md:scale-95
                     lg:opacity-100 lg:scale-100">
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
      </div>
    </div>
  </div>
        </section>
    <section
      className="stack-viewport min-h-screen text-[#F5F5F5] justify-center bg-[#131212] flex relative -mt-12 rounded-t-[40px]"
      data-stack-section
    >
      <div className="stack-section-inner w-full flex flex-col justify-start px-8 pt-15 pb-20">
        <div className="text-bold text-3xl sm:text-3xl text-center pb-10" style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'2px'}}>
             <h2>Обо мне</h2>
        </div>
          <div className="flex items-center justify-center pb-6">
          {/* <img src='https://images.unsplash.com/photo-1546707012-0c9f63ba29b9' className=""/> */}
        </div>
        <div className="space-y-4 text-[16px] sm:text-base lg:text-lg text-[#CDCABB] leading-relaxed" style={{fontFamily:'SixFonts,sans-serif',letterSpacing:'2px'}}>
    <p>
      Меня зовут Миша Гудков, я саунд-продюсер и сонграйтер. Родился и вырос в Москве, учился в музыкальной школе при Московской 
      консерватории по специальности «фортепиано». Музыкой занимаюсь более тринадцати лет из своих 19. Последние шесть лет работаю в продакшене; за последние два года сделал больше 150 песен и поработал над саундтреком к трём сериалам.</p>

<p>Играю на клавишных, гитаре и перкуссии, уверенно работаю с записью и имею опыт живых выступлений. 
Преимущественно работаю в жанрах поп, инди, альт-поп и хип-хоп, но также имею опыт в других направлениях. Работал как приглашённый саунд-продюсер с лейблами.</p>

  </div>
      </div>
    </section>
   <section
      className="stack-viewport min-h-screen items-center flex flex-col rounded-t-[40px] text-white pt-6 pb-6 md:pt-10 md:pb-10"
      style={{ backgroundImage: `url(${fon2})` }}
      data-stack-section
    >
  <div className="stack-section-inner w-full flex flex-col items-center">
    <div className="flex flex-col items-center">
    <AnimatePresence>
      <motion.div
        key="portfolio-title"
        className="text-[#FDF4E3] mb-2 md:mb-4"
      >
        <h3 className="text-sm md:text-base md: mt-2">[Портфолио]</h3>
      </motion.div>
    </AnimatePresence>
    <div className="mt-6 md: mt-6 text-2xl sm:text-2xl md:text-4xl text-center">
      <motion.h2 initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }} style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'1.5px'}}>Реализованные проекты</motion.h2>
    </div>
    <div className="mt-3 mb-3 md:mt-10 md:mb-6 text-sm md:text-base text-[#D3D3D3]">
      <p>Листайте вправо</p>
    </div>
  </div>
  <div className="w-[310px] max-w-6xl mx-auto px-1 pb-2 md:px-4 relative flex-shrink-0">
    <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-black/20 backdrop-blur-sm py-5 md:p-4">
      <Carousel tracks={trackData.tracks}/>
    </div>
  </div>
  <div className="mt-4 md:mt-6 flex-shrink-0">
    <div className="text-start text-base sm:text-lg md:text-2xl w-70 px-2">
      <h2 style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'2px'}}>Послушать работы <br/>вы можете здесь</h2>
    </div>
    <Social/>
  </div>
  </div>
</section>
       <section
        className="stack-viewport min-h-screen items-center flex flex-col text-white pt-10 pb-10 bg-cover bg-black rounded-t-[40px] "
        
        data-stack-section
      >
      <div className="stack-section-inner w-full flex flex-col items-center w-90 bg-[#000000] pb-30">
        <div className="mt-2 text-4xl text-center pt-6 mb-6">
          <motion.h2 initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8}} style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'2px'}}>Невыпущенные проекты</motion.h2> 
        </div>
        <div className="mt-2 w-full">
          <UnreleasedList items={tracksNotRealized.tracksNotRealized}/>
        </div>
        </div>
    </section>
    {/* FAQ — одна секция на desktop (две колонки) */}
    <section
      className="stack-viewport min-h-screen bg-[#a39a6f] items-center flex relative -mt-12 flex-col text-white pt-20 pb-20 rounded-t-[40px] hidden md:flex"
      data-stack-section
    >
      <div className="stack-section-inner w-full flex flex-col items-center">
        <div>
          <h3 className="font-bold mb-6 text-[#FDF4E3]">[FAQ]</h3>
        </div>
        <div className="mt-6 text-4xl text-center">
          <motion.h2 initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>Ответы на частые вопросы</motion.h2>
        </div>
        <div className="py-10 px-4 md:px-10 w-full max-w-6xl">
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            <div className="flex flex-col">
              {data.questionAnswer.slice(0, 2).map((d, i) => (
                <div key={d.id} className="border-b border-white border-t">
                  <div
                    onClick={() => handleAnswer(i)}
                    className="flex justify-between items-center py-4 cursor-pointer"
                  >
                    <div className="flex-1 pr-4">{d.question}</div>
                    <div className="w-8 h-8 flex items-center justify-center text-2xl shrink-0">
                      {answer === i ? "-" : "+"}
                    </div>
                  </div>
                  {answer === i && (
                    <div className="pb-4 pt-2 border-t border-white">{d.answer}</div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              {data.questionAnswer.slice(2, 4).map((d, i) => (
                <div key={d.id} className="border-b border-white border-t">
                  <div
                    onClick={() => handleAnswer(i + 2)}
                    className="flex justify-between items-center py-4 cursor-pointer"
                  >
                    <div className="flex-1 pr-4">{d.question}</div>
                    <div className="w-8 h-8 flex items-center justify-center text-2xl shrink-0">
                      {answer === i + 2 ? "-" : "+"}
                    </div>
                  </div>
                  {answer === i + 2 && (
                    <div className="pb-4 pt-2 border-t border-white">{d.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* FAQ часть 1 — только мобильная, отдельная stack-секция */}
    <section
      className="stack-viewport min-h-screen bg-[#a39a6f] items-center flex relative -mt-12 flex-col text-white pt-20 pb-20 rounded-t-[40px] flex md:hidden"
      data-stack-section
    >
      <div className="stack-section-inner w-full flex flex-col items-center">
        <div>
          <h3 className="font-bold mb-6 text-[#FDF4E3]">[FAQ]</h3>
        </div>
        <div className="mt-6 text-4xl text-center px-4">
          <motion.h2 initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>Ответы на частые вопросы</motion.h2>
        </div>
        <div className="py-10 px-4 w-full flex flex-col">
          {data.questionAnswer.slice(0, 4).map((d, i) => (
            <div key={d.id} className="border-b border-white border-t">
              <div
                onClick={() => handleAnswer(i)}
                className="flex justify-between items-center py-4 cursor-pointer"
              >
                <div className="flex-1 pr-4">{d.question}</div>
                <div className="w-8 h-8 flex items-center justify-center text-2xl shrink-0">
                  {answer === i ? "-" : "+"}
                </div>
              </div>
              {answer === i && (
                <div className="pb-4 pt-2 border-t border-white">{d.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    <section
      className="stack-viewport min-h-screen items-center flex relative -mt-12 px-4 flex-col text-black pt-20 pb-20 bg-[#F5F3EF]"
      data-stack-section
    >
      <div className="stack-section-inner w-full flex flex-col items-center">
       <div>
        <h3 className="font-bold mb-6 text-black ">[Услуги]</h3>
      </div>
      <Services title={'Продакшн'} descrip={'крутая услуга'} btn={['смета','бриф','связь']}/>
      </div>
    </section>
    </div>
      
  
  )
}

export default App
