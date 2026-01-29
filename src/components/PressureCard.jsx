import GlassCard from "./GlassCard";

function PressureCard({ pressure, glassVariant }) {
  const min = 980;
  const max = 1040;
  const clamped = Math.min(max, Math.max(min, pressure));

  const angle = ((clamped - min) / (max - min)) * 240 - 120;

  return (
    <GlassCard variant={glassVariant} className="px-5 py-4">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3 opacity-90">
        {/* ICON */}
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5" />
          <circle cx="12" cy="14" r="1" />
        </svg>

        <p className="text-md uppercase tracking-wide">
          Pressure
        </p>
      </div>

      <div className="relative w-32 h-32 mx-auto">

        <svg viewBox="0 0 100 100" className="absolute inset-0">
          {[...Array(40)].map((_, i) => {
            const a = -120 + i * 6;
            return (
              <line
                key={i}
                x1="50"
                y1="6"
                x2="50"
                y2="10"
                stroke="white"
                strokeOpacity="0.4"
                strokeWidth="1.2"
                transform={`rotate(${a} 50 50)`}
              />
            );
          })}
        </svg>

        <div
          className="absolute inset-0 flex items-start justify-center"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div className="w-1 h-6 bg-white rounded-full mt-2" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <svg
            className="w-5 h-5 mb-1 opacity-90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v10" />
            <path d="M7 11l5 5 5-5" />
          </svg>

          <p className="text-2xl leading-none">
            {pressure}
          </p>
          <p className="text-md opacity-90">
            hPa
          </p>
        </div>
      </div>

      <div className="flex justify-between text-md opacity-90 -mt-7">
        <span>Low</span>
        <span>High</span>
      </div>
    </GlassCard>
  );
}

export default PressureCard;
