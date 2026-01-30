import GlassCard from "./GlassCard";

function SunsetCard({ sunrise, sunset, glassVariant }) {
  return (
    <GlassCard variant={glassVariant} className="px-5 py-5">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3 opacity-90">

        {/* ICON */}
        <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <line x1="3" y1="18" x2="21" y2="18" />

        {/* Half sun */}
        <path d="M6 18a6 6 0 0 1 12 0" />

        {/* Center ray */}
        <line x1="12" y1="4" x2="12" y2="7" />

        {/* Left rays */}
        <line x1="7" y1="9" x2="5.5" y2="7.5" />
        <line x1="4" y1="13" x2="6" y2="13" />

        {/* Right rays */}
        <line x1="17" y1="9" x2="18.5" y2="7.5" />
        <line x1="18" y1="13" x2="20" y2="13" />
        </svg>

        <p className="text-md uppercase tracking-wide">
          Sunset
        </p>
      </div>

      <p className="text-3xl leading-none mb-10">
        {sunset}
      </p>

        <div className="relative my-3">

            <div className="h-px bg-white/40" />

        </div>

      <p className="text-md opacity-90 mt-7">
        Sunrise: {sunrise}
      </p>
    </GlassCard>
  );
}

export default SunsetCard;
