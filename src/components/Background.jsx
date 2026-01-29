import { useEffect, useRef } from "react";
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


function Background({ weatherType, isDay }) {
  const videoRef = useRef(null);

  let videoSrc = initialBg;


  if (weatherType) {
    const type = weatherType.toLowerCase();

    if (type.includes("thunder")) videoSrc = thunderstorm;
    else if (type.includes("snow")) videoSrc = isDay ? snowfallDay : snowfallNight;
    else if (type.includes("rain")) videoSrc = isDay ? rainyDay : rainyNight;
    else if (type.includes("cloud")) videoSrc = isDay ? cloudyDay : cloudyNight;
    else if (!isDay) videoSrc = starryNight;
    else if (type.includes("sun") || type.includes("clear")) videoSrc = sunnyDay;
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6; 
    }
  }, [videoSrc]);

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover bg-video"
        src={videoSrc}
      />
    </div>
  );
}

export default Background;
