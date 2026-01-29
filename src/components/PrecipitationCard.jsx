import GlassCard from "./GlassCard";

function PrecipitationCard({ todayMM, nextMM, nextDayLabel, glassVariant }) {
  return (
    <GlassCard variant={glassVariant} className="px-5 py-5">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3 opacity-90">
        {/* ICON */}
        <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            >
            <path d="M12 2C12 2 5 10.2 5 14.3C5 18.1 8.1 21 12 21C15.9 21 19 18.1 19 14.3C19 10.2 12 2 12 2Z" />
        </svg>

        <p className="text-md uppercase tracking-wide">
          Precipitation
        </p>
      </div>

      <p className="text-3xl leading-none mb-1">
        {todayMM} mm
      </p>

      <p className="text-sm opacity-80 mb-4">
        in last 24h
      </p>

      {/* DESCRIPTION */}
      <p className="text-md opacity-90 leading-snug">
        {nextMM > 0
          ? `Next expected is ${nextMM} mm on ${nextDayLabel}.`
          : "No precipitation expected tomorrow."}
      </p>
    </GlassCard>
  );
}

export default PrecipitationCard;
