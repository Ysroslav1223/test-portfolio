import { useState,useEffect } from "react"

export const Header=()=>{

    const[mobile,setMobile]=useState(false)

    useEffect(()=>{
        const checkSize=()=>{
            setMobile(window.innerWidth<768)
        }
        checkSize()
        window.addEventListener('resize',checkSize)
         return () => window.removeEventListener('resize', checkSize)
    },[])

    

    return(
        <div className="w-full h-16 bg-white/30 backdrop-blur-md flex justify-around items-center fixed gap-10">
            <div className="text-white flex  gap-2 ml-10">
                <button>Ru</button>
                <p>|</p>
                <button>En</button>
            </div>
            <div className="text-white">
                <h2>The best producer </h2>
            </div>
            {!mobile&&(<div className="text-white pr-10">
                <h3>Logo</h3>
            </div>)}
            
        </div>
    )
}