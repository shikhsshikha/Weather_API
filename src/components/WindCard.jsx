import GlassCard from "./GlassCard";

function WindCard({ speed, gust, degree, glassVariant }) {
  const rotation = degree ?? 0;

  const getDirectionLabel = (deg) => {
    if (deg >= 337.5 || deg < 22.5) return "N";
    if (deg < 67.5) return "NE";
    if (deg < 112.5) return "E";
    if (deg < 157.5) return "SE";
    if (deg < 202.5) return "S";
    if (deg < 247.5) return "SW";
    if (deg < 292.5) return "W";
    return "NW";
  };


  return (
    <GlassCard variant={glassVariant} className="px-5 py-5">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4 opacity-90">
        {/* ICON */}
        <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 8h11a3 3 0 1 0-3-3" />
            <path d="M3 12h15a3 3 0 1 1-3 3" />
            <path d="M3 16h9a2.5 2.5 0 1 1-2.5 2.5" />
        </svg>

        <p className="text-md uppercase tracking-wide">Wind</p>
      </div>

      <div className="grid grid-cols-[1fr_200px] gap-10 items-center max-sm:grid-cols-1 max-sm:gap-6"> 

        <div className="text-md divide-y divide-white/25">
          <div className="flex justify-between py-2">
            <span className="opacity-90">Wind</span>
            <span>{speed} kph</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="opacity-90">Gusts</span>
            <span>{gust} kph</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="opacity-90">Direction</span>
            <span>
                {degree}° {getDirectionLabel(degree)}
            </span>

          </div>
        </div>

        {/* COMPASS */}
        <div className="relative w-36 h-36 ml-auto max-sm:mx-auto max-sm:ml-0">

          <div className="absolute inset-0 rounded-full border border-white/30" />

          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0"
          >
            {[...Array(60)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="2"
                x2="50"
                y2={i % 5 === 0 ? "8" : "5"}
                stroke="white"
                strokeOpacity={i % 5 === 0 ? 0.6 : 0.25}
                strokeWidth={i % 5 === 0 ? 1.5 : 1}
                transform={`rotate(${i * 6} 50 50)`}
              />
            ))}
          </svg>

          {/* Directions */}
          <span className="absolute top-2 left-1/2 -translate-x-1/2 text-md opacity-90">N</span>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-md opacity-90">E</span>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-md opacity-90">S</span>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-md opacity-90">W</span>

          {/* SPEED */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xl leading-none">{speed}</p>
            <p className="text-xs opacity-90">kph</p>
          </div>

          {/* NEEDLE */}
          <div
            className="absolute inset-8 flex items-center justify-center"
            style={{ transform: `rotate(${rotation}deg)` }}
          >

            {/* Dot */}
            <div className="absolute left-1 w-2.5 h-2.5 bg-white rounded-full" />

            {/* Arrow */}
            <div className="absolute right-0">
              <svg
                width="20"
                height="10"
                viewBox="0 0 22 12"
                fill="white"
              >
                <path d="M0 6h16l-4-4 2-2 8 6-8 6-2-2 4-4H0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export default WindCard;
