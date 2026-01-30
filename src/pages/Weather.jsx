import { useState, useEffect } from "react";
import Background from "../components/Background";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";
import Loader from "../components/Loader";
import AirQualityCard from "../components/AirQualityCard";
import FeelsLikeCard from "../components/FeelsLikeCard";
import UVIndexCard from "../components/UVIndexCard";
import WindCard from "../components/WindCard";
import SunsetCard from "../components/SunsetCard";
import PressureCard from "../components/PressureCard";
import PrecipitationCard from "../components/PrecipitationCard";
import { getHourlySummary } from "../utils/hourlySummary";
import { resolveVideo } from "../utils/resolveVideo";
import initialBg from "../assets/videos/initial-bg-vid.mp4";


const API_KEY = "ca50b6a587ba4f3e95d84901262301";

function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      document.documentElement.style.setProperty(
        "--parallax",
        `${offset * 0.15}px`
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=10&aqi=yes`
      );

      if (!res.ok) throw new Error("City not found");

      const json = await res.json();
      setData(json);
      
      console.log("FULL API DATA", json);

    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const weatherType = data?.current.condition.text;
  const isDay = data?.current.is_day === 1;

  const backgroundVideo = weatherType
    ? resolveVideo(weatherType, isDay)
    : initialBg;


  const glassVariant = (() => {
    if (!weatherType) return "mid";
    const t = weatherType.toLowerCase();

    if (t.includes("snow")) return "light";
    if (t.includes("rain") || t.includes("thunder")) return "dark";
    if (!isDay) return "dark";
    return "mid";
  })();

  const hourlySummary = data ? getHourlySummary(data) : "";
  
  return (
    <>
      <Background videoSrc={backgroundVideo} />

      <div className="relative z-10 min-h-screen px-6 py-10 text-white space-y-10 max-sm:px-4 max-sm:space-y-8">

        {/* HERO */}
        <div className="text-center pt-14 pb-6">
            <h1 className="text-3xl font-medium tracking-wide">
                {data?.location?.name || "WEATHER"}
            </h1>

            {data && (
                <>
                <div className="text-[92px] max-sm:text-[64px] font-thin leading-none">
                    {Math.round(data.current.temp_c)}°
                </div>

                <p className="text-xl opacity-90 mb-2">
                    {data.current.condition.text}
                </p>
                </>
            )}
        </div>

        <div className="h-2" />

        {/* SEARCH BAR*/}
        <div className="w-full max-w-sm mx-auto space-y-4">
          <div className="flex items-center gap-3
                          rounded-full px-5 py-3
                          bg-white/25 backdrop-blur-xl
                          border border-white/30
                          focus-within:bg-white/30
                          transition">
            
            <svg
              className="w-5 h-5 text-white/80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
              className="flex-1 bg-transparent outline-none
                        text-white placeholder-white/70
                        text-base"
              placeholder="Search for a city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && getWeather()}
            />
          </div>

          <button
            onClick={getWeather}
            className="w-full py-3 rounded-full
                      bg-white/35 hover:bg-white/45
                      text-white font-medium
                      backdrop-blur-xl
                      transition active:scale-[0.98]"
          >
            GET WEATHER
          </button>

          {loading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <Loader />
            </div>
          )}

          {error && (
            <p className="text-center text-sm text-red-300">
              {error}
            </p>
          )}
        </div>

        {/* HOURLY FORECAST*/}
        {data && (
          <div className="max-w-md mx-auto">
            <HourlyForecast
              days={data.forecast.forecastday}
              glassVariant={glassVariant}
               summary={hourlySummary}  
            />
          </div>
        )}


        {/* DAILY FORECAST*/}
        {data && (
          <div className="max-w-md mx-auto">
            <DailyForecast
              days={data.forecast.forecastday}
              glassVariant={glassVariant}
            />
          </div>
        )}

        {/* AQI */}
        {data && data.current.air_quality && (
          <div className="max-w-md mx-auto">
            <AirQualityCard
              pm25={Math.round(data.current.air_quality.pm2_5)}
              glassVariant={glassVariant}
            />
          </div>
        )}

        {/* FEELS LIKE + UV */}
        {data && (
          <div className="max-w-md mx-auto grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <FeelsLikeCard
              actual={data.current.temp_c}
              feelsLike={data.current.feelslike_c}
              glassVariant={glassVariant}
            />

            <UVIndexCard
              uv={data.current.uv}
              glassVariant={glassVariant}
            />
          </div>
        )}

        {/* WIND */}
        {data && (
          <div className="max-w-md mx-auto">
            <WindCard
              speed={data.current.wind_kph}
              gust={data.current.gust_kph}
              degree={data.current.wind_degree}
              glassVariant={glassVariant}
            />
          </div>
        )}

        {/* SUNSET + PRESSURE */}
        {data && (
          <div className="max-w-md mx-auto grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <SunsetCard
              sunrise={data.forecast.forecastday[0].astro.sunrise}
              sunset={data.forecast.forecastday[0].astro.sunset}
              glassVariant={glassVariant}
            />

            <PressureCard
              pressure={data.current.pressure_mb}
              glassVariant={glassVariant}
            />
          </div>
        )}

        {/* PRECIPITATION */}
        {data && (
          <div className="max-w-md mx-auto">
            <PrecipitationCard
              todayMM={data.forecast.forecastday[0].day.totalprecip_mm}
              nextMM={data.forecast.forecastday[1]?.day.totalprecip_mm || 0}
              nextDayLabel={new Date(
                data.forecast.forecastday[1]?.date
              ).toLocaleDateString("en-US", { weekday: "short" })}
              glassVariant={glassVariant}
            />
          </div>
        )}

      </div>
    </>
  );
}

export default Weather;


