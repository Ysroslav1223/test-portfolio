import DynamicNoise from "./components/NoiseBackground/NoiseBackground"
import { Header } from "./components/header/header"
import { motion,AnimatePresence, animate } from "framer-motion"
import { useRef,useState } from "react"
import trackData from '../track.json'
import data from '../question-anwser.json'
import Carousel from "./components/carusel/carusel"
import { Social } from "./components/social/social"




function App() {

  const continueCurrent= useRef()


    const scrollToData=()=>{
      if(continueCurrent.current){
      const top = continueCurrent.current.offsetTop
      animate(window.scrollY,top,{
        onUpdate(value){
          window.scrollTo(0,value)
        }
      })
    }
    }

    console.log(data.questionAnswer);

    const[answer,setAnswer]=useState(null)

    const handleAnswer=(index)=>{
     setAnswer(answer===index?null:index)
    }



  return (
      <div className="relative">
        <DynamicNoise/>
        <Header/>
    <section className="min-h-screen bg-[#a39a6f] items-center flex flex-col pr-4 pl-4 border border-white text-[#606060] pt-20">
        <div className="mb-2 font-bold text-3xl text-[#FDF4E3]">
          <h2>Михаил Свага</h2>
        </div>
        <div className="flex flex-row gap-10 mt-10">
          <a href="https://t.me/hvdini">TG</a>
          <a href="https://www.instagram.com/michael.houdini?igsh=dnV1enN6MXkyY3p0&utm_source=qr">INST</a>
        </div>
        <div className="w-full h-50 mb-15 mt-15">
          <img src="/"/>
        </div>
        <div className="text-center font-bold text-[#FDF4E3]">
          <p>Краткое описание — художник и продюсер. Создаю музыку для кино, рекламы и игр. Занимаюсь продакшном и саунд-дизайном. </p>
        </div>
         <AnimatePresence>
        { (
          <motion.div
          onClick={scrollToData}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 1.2,
              ease: "easeOut",
              delay: 0.3
            }}
            className="mt-20"
          >
            <motion.div
              animate={{ 
                y: [0, -12, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg 
                className="w-10 h-10 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-white mt-3 text-lg italic font-light text-center"
            >
              коснись, чтобы продолжить...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
     <section ref={continueCurrent}className="min-h-screen bg-[#606060] items-center flex  flex-col  border border-white text-white pt-20">
      <div className="flex flex-col items-center">
        <div className=" text-[#FDF4E3] ">
            <h3>[Портфолио]</h3>
        </div>
        <div className="mt-6 text-4xl text-center ">
          <h2>Реализованные проекты</h2>
        </div>
        <div className="mt-10 text-[#D3D3D3]">
          <p>Листайте влево</p>
        </div>
        </div>
       <Carousel tracks={trackData.tracks}/>
       <div>
        <div className="text-start text-2xl w-70">
          <h2>Послушать работы <br/>вы можете здесь</h2>
        </div>
        <Social/>
       </div>
    </section>
       <section className="min-h-screen bg-[#606060] items-center flex  flex-col text-white pt-20">
      <div className="flex flex-col items-center ">
        <div className="mt-6 text-4xl text-center">
          <h2>Невыпущенные проекты</h2> 
        </div>
        </div>
    </section>
    <section className="min-h-screen bg-[#a39a6f] items-center flex  flex-col  border border-white text-white pt-20">
       <div>
        <h3 className="font-bold mb-6 text-[#FDF4E3] ">[FAQ]</h3>
      </div>
      <div className="mt-6 text-4xl text-center">
        <h2>Ответы на частые вопросы</h2>
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
    </div>
      
  
  )
}

export default App
