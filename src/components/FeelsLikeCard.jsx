import GlassCard from "./GlassCard";

function FeelsLikeCard({ feelsLike, glassVariant }) {
  if (feelsLike == null) return null;

  return (
    <GlassCard variant={glassVariant} className="px-5 py-5">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3 opacity-90">
        
        {/* ICON */}
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          viewBox="0 0 24 24"
        >
          <path d="M14 14.76V3a2 2 0 10-4 0v11.76a4 4 0 104 0z" />
        </svg>

        <p className="text-md uppercase tracking-wide">
          Feels Like
        </p>
      </div>

      {/* VALUE */}
      <p className="text-4xl leading-none mb-8">
        {Math.round(feelsLike)}°
      </p>

      {/* DESCRIPTION */}
      <p className="text-md opacity-90 leading-snug">
        Similar to the actual temperature.
      </p>
    </GlassCard>
  );
}

export default FeelsLikeCard;
