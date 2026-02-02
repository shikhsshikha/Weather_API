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

export function resolveVideo(weatherType, isDay) {
  if (!weatherType) return null; 

  const type = weatherType.toLowerCase();

  if (type.includes("thunder")) return thunderstorm;
  if (type.includes("snow")) return isDay ? snowfallDay : snowfallNight;
  if (type.includes("rain") || type.includes("drizzle") || type.includes("shower"))
    return isDay ? rainyDay : rainyNight;
  if (type.includes("cloud") || type.includes("overcast") || type.includes("mist"))
    return isDay ? cloudyDay : cloudyNight;
  if (!isDay) return starryNight;
  if (type.includes("sun") || type.includes("clear")) return sunnyDay;

  return cloudyDay; 
}
