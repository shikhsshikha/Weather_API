import { useEffect, useRef, useState } from "react";

import cloudyDay from "../assets/videos/cloudy-day.mp4";
import cloudyNight from "../assets/videos/cloudy-night.mp4";
import sunnyDay from "../assets/videos/sunny-day.mp4";
import rainyDay from "../assets/videos/rainy-day.mp4";
import rainyNight from "../assets/videos/rainy-night.mp4";
import snowfallDay from "../assets/videos/snowfall-day.mp4";
import snowfallNight from "../assets/videos/snowfall-night.mp4";
import starryNight from "../assets/videos/starry-night.mp4";
import thunderstorm from "../assets/videos/thunderstorm.mp4";
import initialBg from "../assets/videos/initial-bg-vid.mp4";

function resolveVideo(weatherType, isDay) {
  if (!weatherType) return initialBg;

  const type = weatherType.toLowerCase();
  if (type.includes("thunder")) return thunderstorm;
  if (type.includes("snow")) return isDay ? snowfallDay : snowfallNight;
  if (type.includes("rain")) return isDay ? rainyDay : rainyNight;
  if (type.includes("cloud")) return isDay ? cloudyDay : cloudyNight;
  if (!isDay) return starryNight;
  if (type.includes("sun") || type.includes("clear")) return sunnyDay;

  return initialBg;
}

function Background({ weatherType, isDay }) {
  const [currentSrc, setCurrentSrc] = useState(initialBg);
  const [nextSrc, setNextSrc] = useState(null);
  const [showNext, setShowNext] = useState(false);

  const nextRef = useRef(null);

  useEffect(() => {
    const newSrc = resolveVideo(weatherType, isDay);

    if (newSrc === currentSrc) return;

    setNextSrc(newSrc);
    setShowNext(false);
  }, [weatherType, isDay, currentSrc]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* CURRENT VIDEO (never disappears) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src={currentSrc}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* NEXT VIDEO (fades in) */}
      {nextSrc && (
        <video
          ref={nextRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src={nextSrc}
          onLoadedData={() => {
            setShowNext(true);
            setTimeout(() => {
              setCurrentSrc(nextSrc);
              setNextSrc(null);
              setShowNext(false);
            }, 600);
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            showNext ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}

export default Background;
