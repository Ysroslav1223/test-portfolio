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
import Lenis from "lenis";
import "lenis/dist/lenis.css";



gsap.registerPlugin(ScrollTrigger); 


function App() {

  const stackSections = useRef([]); 



  useEffect(() => {
    document.body.style.overflowX='hidden'
  const isMobile = window.innerWidth <= 768;

  const lenis = isMobile 
    ? null 
    : new Lenis({ duration: 0.6, smoothWheel: true, smoothTouch: false });

  if (!isMobile && lenis) {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
  }

  const sections = stackSections.current.filter(Boolean);

  sections.forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: isMobile ? "+=98%" : "+=70%", 
      pin: true,
      pinSpacing: false,
      scrub: isMobile ? 0.2 : 0.4, 
    });

    if (i > 0) {
      gsap.fromTo(section.querySelectorAll(".stack-content > *"),
        { y: 200, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 10%",
            scrub: isMobile ? 0.3 : 0.5, 
          },
        }
      );
    }
  });

  return () => {
    lenis?.destroy();
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}, []);



   

    console.log(data.questionAnswer);

    const[answer,setAnswer]=useState(null)

    const handleAnswer=(index)=>{
     setAnswer(answer===index?null:index)
    }



  return (
      <div className="relative">
        
  <section className="min-h-screen relative overflow-hidden" ref={(el) => (stackSections.current[0] = el)}>
  <div className="flex flex-col min-h-screen lg:flex-row">
 
    <div 
      className="
        relative flex-1 min-h-[50vh] lg:min-h-screen 
        bg-cover  flex items-end justify-center p-4
        
      "
      style={{ 
        backgroundImage: `url(${Iam})`,
        backgroundPosition: ' center 10% ' 
      }}
    >
      <div className="absolute inset-0 bg-black/40 lg:bg-black/20"></div>
      <div className="text-end flex flex-col justify-end items-center text-[#F8F8FF] z-10 relative lg:flex absolute ">
        <h2 className="text-3xl lg:xl:text-9xl lg:mb-4  items-center "style={{fontFamily:'EightFonts,sans-serif'}}>Michael Houdini</h2>
        <h3 className="text-xl lg:mb-10 lg:ml-160 lg:text-6xl" style={{fontFamily:'SecondFonts,sans-serif'}}>producer</h3>
      </div>
    </div>
    
    

    <div 
      className="
        relative  flex-1 min-h-[50vh] lg:min-h-screen 
        bg-cover bg-center flex items-start justify-center p-4
      "
      style={{ 
        backgroundImage: `url(${secondImg})`,
       
      }}
    >
      <div className="absolute inset-0 bg-black/40 lg:bg-black/40"></div>
      
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
    <section className="min-h-screen  text-[#F5F5F5] justify-center bg-[#131212] flex relative -mt-12 rounded-t-[40px]" >
      <div className="px-8 py-20 ">
        <div className="text-bold text-4xl text-center pb-10" style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'2px'}}>
             <h2>Обо мне</h2>
        </div>
          <div className="flex items-center justify-center pb-10">
          <img src='https://images.unsplash.com/photo-1546707012-0c9f63ba29b9' className=""/>
        </div> 
        <div className="space-y-6 text-lg lg:text-xl text-[#CDCABB] leading-relaxed"style={{fontFamily:'SixFonts,sans-serif',letterSpacing:'2px'}} >
    <p>
      Меня зовут Миша Гудков, я саунд-продюсер и сонграйтер. Родился и вырос в Москве, учился в музыкальной школе при Московской 
      консерватории по специальности «фортепиано». Музыкой занимаюсь более тринадцати лет из своих 19. Последние шесть лет работаю в продакшене; за последние два года сделал больше 150 песен и поработал над саундтреком к трём сериалам.</p>

<p>Играю на клавишных, гитаре и перкуссии, уверенно работаю с записью и имею опыт живых выступлений. 
Преимущественно работаю в жанрах поп, инди, альт-поп и хип-хоп, но также имею опыт в других направлениях. Работал как приглашённый саунд-продюсер с лейблами.</p>

  </div>
        
      </div>
    </section>
   <section   className="min-h-screen items-center flex flex-col text-white pt-10 " style={{backgroundImage:`url(${fon2})`}}>
  <div className="flex flex-col items-center">
    <AnimatePresence>
      <motion.div
        key="portfolio-title"
        className="text-[#FDF4E3] mb-4"
      >
        <h3 className="">[Портфолио]</h3>
      </motion.div>
    </AnimatePresence>
    <div className="mt-6 text-4xl text-center ">
      <motion.h2 initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }} style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'2px'}}>Реализованные проекты</motion.h2>
    </div>
    <div className="mt-10 mb-6 text-[#D3D3D3]">
      <p>Листайте влево</p>
    </div>
  </div>

  <div className="w-full max-w-6xl mx-auto px-4 relative">
    <div className="relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-sm p-6">
      <Carousel tracks={trackData.tracks}/>
    </div>
  </div>
  <div className="mt-10">
    <div className="text-start text-2xl w-70">
      <h2 style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'2px'}}>Послушать работы <br/>вы можете здесь</h2>
    </div>
    <Social/>
  </div>
</section>
       <section  className="min-h-screen  items-center flex  flex-col text-white pt-10 bg-cover" style={{backgroundImage:`url(${fon})`}}>
      <div className="flex flex-col items-center w-90 bg-[#000000] pb-30 rounded-[40px]">
        <div className="mt-6 text-4xl text-center pt-15">
          <motion.h2 initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8}} style={{fontFamily:'ThirdFonts,sans-serif',letterSpacing:'2px'}}>Невыпущенные проекты</motion.h2> 
        </div>
        <div className="">
          <UnreleasedList items={tracksNotRealized.tracksNotRealized}/>
        </div>
        </div>
    </section>
    <section  className="min-h-screen bg-[#a39a6f] items-center flex relative -mt-12   flex-col   text-white pt-20">
       <div>
        <h3 className="font-bold mb-6 text-[#FDF4E3] ">[FAQ]</h3>
      </div>
      <div className="mt-6 text-4xl text-center">
        <motion.h2 initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8}}>Ответы на частые вопросы</motion.h2>
      </div>
      <div className=" py-10 px-10">
  <div className="flex flex-col">
    {data.questionAnswer.map((d, index) => (
      <div key={d.id} className="border-b border-white border-t">
        <div className="flex justify-between items-center py-4">
          <div className="flex-1 pr-4">
            {d.question}
          </div>
          <div>
            <button 
              onClick={() => handleAnswer(index)}
              className="w-8 h-8 flex items-center justify-center text-2xl"
            >
              {answer === index ? "-" : "+"}
            </button>
          </div>
        </div>
        {answer === index && (
          <div className="pb-4 pt-2 border-t border-white">
            {d.answer}
          </div>
        )}
      </div>
    ))}
  </div>
</div>
    </section>
    <section  className="min-h-screen items-center flex relative -mt-12  px-4 flex-col   text-black pt-20">
       <div>
        <h3 className="font-bold mb-6 text-black ">[Услуги]</h3>
      </div>
      <Services title={'Продакшн'} descrip={'крутая услуга'} btn={['смета','бриф','связь']}/>
    </section>
    </div>
      
  
  )
}

export default App
