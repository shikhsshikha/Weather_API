import GlassCard from "./GlassCard";

function AirQualityCard({ pm25, glassVariant }) {
 
  const getAQIInfo = (value) => {
    if (value <= 50) {
        return {
        label: "Good",
        percent: 20,
        desc: "Air quality is good. Enjoy outdoor activities."
        };
    }

    if (value <= 100) {
        return {
        label: "Satisfactory",
        percent: 35,
        desc: "Air quality is acceptable. Sensitive individuals should take care."
        };
    }

    if (value <= 200) {
        return {
        label: "Moderate",
        percent: 55,
        desc: "Air quality is moderate. Consider limiting prolonged outdoor exertion."
        };
    }

    if (value <= 300) {
        return {
        label: "Poor",
        percent: 75,
        desc: "Air quality is poor. Reduce outdoor activities if possible."
        };
    }

    return {
        label: "Very Poor",
        percent: 90,
        desc: "Air quality is very poor. Avoid outdoor activities."
    };
    };

  const { label, percent, desc } = getAQIInfo(pm25);

  return (
    <GlassCard variant={glassVariant} className="px-4 py-4">
      {/* HEADER  */}
      <div className="flex items-center gap-2 mb-2 opacity-90">
        {/* AQI ICON */}
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="6" cy="12" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="18" cy="12" r="1.5" />
          <circle cx="9" cy="7" r="1.2" />
          <circle cx="15" cy="7" r="1.2" />
          <circle cx="9" cy="17" r="1.2" />
          <circle cx="15" cy="17" r="1.2" />
        </svg>

        <p className="text-md uppercase tracking-wide">
          Air Quality
        </p>
      </div>

      {/* AQI NUMBER */}
      <p className="text-3xl leading-none mb-2">
        {pm25}
      </p>

      {/* AQI STATUS */}
      <p className="text-md opacity-90 mb-3">
        {label}
      </p>

      {/* RANGE BAR */}
        <div className="relative h-1 rounded-full mb-3 overflow-hidden">
        <div
            className="absolute inset-0 rounded-full"
            style={{
            background:
                "linear-gradient(90deg, #22c55e 0%, #84cc16 25%, #eab308 45%, #f97316 65%, #ef4444 85%)",
            }}
        />

        {/* INDICATOR*/}
        <div
            className="absolute top-1/2
                    w-1 h-8 rounded-full
                    bg-white
                    shadow-[0_0_6px_rgba(255,255,255,0.9)]"
            style={{
            left: `${percent}%`,
            transform: "translateX(-50%) translateY(-50%)",
            }}
        />
        </div>


      {/* DESCRIPTION */}
      <p className="text-md opacity-90 leading-snug">
        {desc}
      </p>

    </GlassCard>
  );
}

export default AirQualityCard;
