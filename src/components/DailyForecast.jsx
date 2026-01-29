import GlassCard from "./GlassCard";

function DailyForecast({ days, glassVariant }) {
  const temps = days.flatMap(d => [
    d.day.mintemp_c,
    d.day.maxtemp_c,
  ]);

  const globalMin = Math.min(...temps);
  const globalMax = Math.max(...temps);
  const range = globalMax - globalMin;

  return (
    <GlassCard 
    variant={glassVariant}
    className="px-3 py-4"
    >
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3">
        <svg
          className="w-4 h-5 opacity-90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2.5" x2="16" y2="6" />
          <line x1="8" y1="2.5" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>

        <p className="text-md uppercase tracking-wide opacity-90">
          10-Day Forecast
        </p>
      </div>

      <div className="h-px bg-white/20 mb-2" />

      <div className="divide-y divide-white/20">
        {days.map((day, i) => {
          const label =
            i === 0
              ? "Today"
              : new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                });

          const min = day.day.mintemp_c;
          const max = day.day.maxtemp_c;

          const left = ((min - globalMin) / range) * 100;
          const width = ((max - min) / range) * 100 ;

          return (
            <div
              key={i}
              className="grid items-center py-3 text-md
                        grid-cols-[8rem_3rem_4fr_4fr_2fr]"
            >

              {/* DAY */}
              <span>
                {label}
              </span>

              {/* ICON */}
              <img
                src={day.day.condition.icon}
                alt=""
                className="w-7 h-6 "
              />

              {/* MIN TEMP */}
              <span className="text-right opacity-90">
                {Math.round(min)}°
              </span>

              {/* RANGE BAR */}
              <div className="flex items-center mx-3">
                <div className="relative w-20 h-1 bg-white/25 rounded-full">
                  <div
                    className="absolute h-1 rounded-full
                              bg-linear-to-r from-green-400 to-yellow-400"
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                    }}
                  />
                </div>
              </div>

              {/* MAX TEMP */}
              <span>
                {Math.round(max)}°
              </span>

            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

export default DailyForecast;
