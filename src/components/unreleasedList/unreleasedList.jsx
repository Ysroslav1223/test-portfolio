import { useState,useRef } from "react";

export const UnreleasedList=({items})=>{

    const [playingId, setPlayingId] = useState(null);
    const [clickedId, setClickedId] = useState(null);
    const refs = useRef({});


    const toggle = (id) => {
    const audio = refs.current[id];
    if (!audio) return;
     setClickedId(id);
    setTimeout(() => setClickedId(null), 100);
    if (playingId === id) {
    audio.pause();
    setPlayingId(null);
    } else {
    Object.values(refs.current).forEach((a) => { try { a.pause(); } catch {} });
    audio.play();
    setPlayingId(id);
    }
    };
    return(
         <div className="mt-10">
      <div className=" ">
        {items.map((t) => (
          <div
            key={t.id}
            className={`px-1 pb-0.5 w-80 flex flex-col gap-2 
              border-b border-gray-300 
              transition-colors duration-200 
              cursor-pointer
              ${clickedId === t.id ? 'bg-gray-400' : 'hover:bg-gray-800'}`}
            
            onClick={() => toggle(t.id)}
          >
            <div>
              <div className="font-medium">
                {t.title}{" "}
                <span className="text-sm text-gray-500">• {t.status}</span>
              </div>
              <div className="text-sm text-gray-600">{t.author}</div>
            </div>

            <div className="flex items-center ">
             
              <audio
                ref={(el) => (refs.current[t.id] = el)}
                src={t.audio}
                preload="none"
                controlsList="nodownload"
                style={{ display: "none" }}
                onEnded={() => setPlayingId(null)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
    )
}