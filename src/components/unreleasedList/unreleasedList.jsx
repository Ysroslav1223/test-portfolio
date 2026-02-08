import { useState, useRef, useEffect, useCallback } from "react";

export const UnreleasedList = ({ items }) => {
  const [playingId, setPlayingId] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef(null);

  const formatTime = useCallback((sec) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }, []);

  const toggle = useCallback(
    (id) => {
      const item = items.find((i) => i.id === id);
      if (!item) return;

      if (playingId === id) {
        audioRef.current?.pause();
        setPlayingId(null);
        return;
      }

      setError(null);
      setPlayingId(id);
      setIsLoading(true);
      setCurrentTime(0);
      setDuration(0);

      const audio = audioRef.current;
      if (!audio) return;

      audio.pause();
      audio.src = item.audio;
      audio.load();
      audio
        .play()
        .then(() => setIsLoading(false))
        .catch((err) => {
          setError("Не удалось воспроизвести");
          setIsLoading(false);
          setPlayingId(null);
        });
    },
    [playingId, items]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (!isDragging) setCurrentTime(audio.currentTime);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      setPlayingId(null);
      setCurrentTime(0);
      setDuration(0);
    };
    const onError = () => {
      setError("Ошибка загрузки");
      setPlayingId(null);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [isDragging]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current && (audioRef.current.src = "");
    };
  }, []);

  const handleSeek = useCallback(
    (value) => {
      const audio = audioRef.current;
      if (audio && playingId) {
        audio.currentTime = value;
        setCurrentTime(value);
      }
    },
    [playingId]
  );

  const handleSliderStart = () => setIsDragging(true);
  const handleSliderEnd = () => {
    setIsDragging(false);
    if (playingId) audioRef.current?.play();
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="mt-0 w-full max-w-md mx-auto">
      <audio ref={audioRef} preload="none" />

      <ul className="space-y-0.5">
        {items.map((t) => {
          const isPlaying = playingId === t.id;
          const itemProgress = isPlaying ? progress : 0;

          return (
            <li
              key={t.id}
              className={`
                group flex items-center gap-3 px-4 py-3 rounded-2xl
                transition-colors duration-200 cursor-pointer
                ${isPlaying ? "bg-white/10" : "hover:bg-white/5"}
              `}
              onClick={() => toggle(t.id)}
            >
              <button
                type="button"
                className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 
                  flex items-center justify-center 
                  hover:bg-white/20 active:scale-95 transition-all
                  focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label={isPlaying ? "Пауза" : "Воспроизведение"}
              >
                {isLoading && isPlaying ? (
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : isPlaying ? (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate text-[15px]">
                  {t.title}
                </div>
                <div className="text-[13px] text-white/60 truncate">
                  {t.author} · {t.status}
                </div>
                {isPlaying && (
                  <div
                    className="mt-2 relative h-2 -mx-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="absolute inset-x-0 top-1/2 -mt-0.5 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white/90 rounded-full transition-all duration-75"
                        style={{ width: `${itemProgress}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={duration || 0.1}
                      value={currentTime}
                      step={0.1}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) =>
                        handleSeek(parseFloat(e.target.value))
                      }
                      onMouseDown={handleSliderStart}
                      onMouseUp={handleSliderEnd}
                      onTouchStart={handleSliderStart}
                      onTouchEnd={handleSliderEnd}
                    />
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 text-[13px] text-white/50 tabular-nums">
                {isPlaying && duration > 0
                  ? `${formatTime(currentTime)} / ${formatTime(duration)}`
                  : "--:--"}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
