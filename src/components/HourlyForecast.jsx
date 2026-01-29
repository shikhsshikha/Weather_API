import GlassCard from "./GlassCard";

function HourlyForecast({ days, glassVariant, summary }) {
  const now = new Date();

  const allHours = days.flatMap(day => day.hour);

  const startIndex = allHours.findIndex(h =>
    new Date(h.time) >= now
  );

  const safeStart = startIndex === -1 ? 0 : startIndex;

  const upcomingHours = allHours.slice(safeStart, safeStart + 12);


  return (
    <GlassCard variant={glassVariant}>
      {summary && (
        <div className="mb-3 leading-snug">
          <p className="text-md opacity-90">
            {summary.split(".")[0]}.
          </p>
          <p className="text-md opacity-90">
            {summary.split(".")[1]?.trim()}
          </p>
        </div>
      )}

      <div className="h-px bg-white/20 mb-4" />

      <div className="flex gap-6 overflow-x-auto pb-2">
        {upcomingHours.map((h, i) => {
          const isNow =
          Math.abs(new Date(h.time) - now) < 30 * 60 * 1000;

          return (
            <div
              key={i}
              className="min-w-13 flex flex-col items-center"
            >
              {/* TIME */}
              <p className="text-md opacity-90 mb-1">
                {isNow
                  ? "Now"
                  : new Date(h.time).toLocaleString("en-US", {
                      hour: "numeric",
                      hour12: true,
                    })}
              </p>

              {/* ICON */}
              <img
                src={h.condition.icon}
                alt=""
                className="w-7 h-7 mb-1"
              />

              {/* TEMP */}
              <p className="text-base font-medium">
                {Math.round(h.temp_c)}°
              </p>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

export default HourlyForecast;
