import { useState, useRef, useEffect } from "react";

export const UnreleasedList = ({ items }) => {
  const [playingId, setPlayingId] = useState(null);
  const [clickedId, setClickedId] = useState(null);
  const [progress, setProgress] = useState({}); 
  const [durations, setDurations] = useState({}); 
  const [isDragging, setIsDragging] = useState(null); 
  const refs = useRef({});

  useEffect(() => {
    items.forEach((item) => {
      const audio = new Audio();
      audio.preload = "metadata";
      audio.src = item.audio;
      
      audio.addEventListener("loadedmetadata", () => {
        setDurations((prev) => ({
          ...prev,
          [item.id]: audio.duration
        }));
      });
      audio.load();
      refs.current[item.id] = audio;
    });
    return () => {
      Object.values(refs.current).forEach((audio) => {
        if (audio && audio.src) {
          audio.src = "";
        }
      });
    };
  }, [items]);
  const handleTimeUpdate = (id) => {
    if (!isDragging || isDragging !== id) {
      const audio = refs.current[id];
      if (audio) {
        setProgress((prev) => ({
          ...prev,
          [id]: audio.currentTime
        }));
      }
    }
  };
  const handleSeek = (id, value) => {
    const audio = refs.current[id];
    if (audio) {
      audio.currentTime = value;
      setProgress((prev) => ({
        ...prev,
        [id]: value
      }));
    }
  };
  const handleSliderMouseDown = (id) => {
    setIsDragging(id);
  };
  const handleSliderMouseUp = (id) => {
    setIsDragging(null);
    if (playingId === id) {
      const audio = refs.current[id];
      if (audio) {
        audio.play();
      }
    }
  };
  useEffect(() => {
    if (playingId && !isDragging) {
      const interval = setInterval(() => {
        handleTimeUpdate(playingId);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [playingId, isDragging]);

  const toggle = (id) => {
    const audio = refs.current[id];
    if (!audio) return;
    
    setClickedId(id);
    setTimeout(() => setClickedId(null), 100);
    
    if (playingId === id) {
      audio.pause();
      setPlayingId(null);
    } else {
      Object.values(refs.current).forEach((a) => {
        try {
          a.pause();
        } catch {
          alert('Ошибка загрузки')
        }
      });
      audio.play();
      setPlayingId(id);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="mt-10">
      <div className="">
        {items.map((t) => {
          const currentTime = progress[t.id] || 0;
          const duration = durations[t.id] || 0; // Теперь изначально будет 0, но быстро загрузится
          const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

          return (
            <div
              key={t.id}
              className={`px-1 pb-0.5 w-80 flex flex-col gap-1 
                border-b border-gray-300 
                transition-colors duration-200 
                cursor-pointer
                ${clickedId === t.id ? 'bg-gray-400' : 'hover:bg-gray-800'}`}
              onClick={(e) => {
                if (!e.target.closest('.slider-container')) {
                  toggle(t.id);
                }
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium">
                    {t.title}{" "}
                    <span className="text-sm text-gray-500">• {t.status}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="text-sm text-gray-600 mr-3">{t.author}</div>
                    
                    <div className="flex items-center gap-2 slider-container">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-400">
                          {formatTime(currentTime)}
                        </span>
                        
                        <div className="w-56 relative group">
                          <div className="h-1.5 w-55 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                          <input
                            type="range"
                            min="0"
                            max={duration || 0.1} // Используем 0.1 чтобы избежать NaN
                            value={currentTime}
                            step="0.1"
                            className="absolute top-0 left-0 w-full h-4 opacity-0 cursor-pointer"
                            onChange={(e) => handleSeek(t.id, parseFloat(e.target.value))}
                            onMouseDown={() => handleSliderMouseDown(t.id)}
                            onMouseUp={() => handleSliderMouseUp(t.id)}
                            onTouchStart={() => handleSliderMouseDown(t.id)}
                            onTouchEnd={() => handleSliderMouseUp(t.id)}
                            disabled={duration === 0} // Отключаем пока не загрузилась длительность
                          />
                        </div>
                        
                        <span className="text-xs text-gray-400 min-w-[35px]">
                          {duration === 0 ? "--:--" : formatTime(duration)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Аудио элементы уже созданы в useEffect */}
            </div>
          );
        })}
      </div>
    </div>
  );
};