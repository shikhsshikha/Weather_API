import GlassCard from "./GlassCard";

function UVIndexCard({ uv, glassVariant }) {
  if (uv == null) return null;

  const getUVInfo = (value) => {
    if (value < 3)
      return {
        label: "Low",
        percent: 15,
        desc: "Low risk from UV rays.",
      };
    if (value < 6)
      return {
        label: "Moderate",
        percent: 35,
        desc: "Use sun protection until 3PM.",
      };
    if (value < 8)
      return {
        label: "High",
        percent: 55,
        desc: "Reduce time in the sun between noon and 4PM.",
      };
    if (value < 11)
      return {
        label: "Very High",
        percent: 75,
        desc: "Avoid being outside during mid-day hours.",
      };
    return {
      label: "Extreme",
      percent: 90,
      desc: "Take all precautions. UV is extremely high.",
    };
  };

  const { label, percent, desc } = getUVInfo(uv);

  return (
    <GlassCard variant={glassVariant} className="px-5 py-5">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3 opacity-90">
        {/* ICON */}
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <circle cx="12" cy="12" r="3.5" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
          <line x1="4.2" y1="4.2" x2="6.5" y2="6.5" />
          <line x1="17.5" y1="17.5" x2="19.8" y2="19.8" />
          <line x1="4.2" y1="19.8" x2="6.5" y2="17.5" />
          <line x1="17.5" y1="6.5" x2="19.8" y2="4.2" />
        </svg>

        <p className="text-md uppercase tracking-wide">
          UV Index
        </p>
      </div>

      <p className="text-3xl leading-none mb-2">
        {uv}
      </p>

      {/* LABEL */}
      <p className="text-md opacity-90 mb-3">
        {label}
      </p>

      {/* RANGE BAR */}
      <div className="relative h-1 rounded-full mb-3 overflow-hidden">
        <div
            className="absolute inset-0 rounded-full"
            style={{
            background:
                "linear-gradient(90deg, #22c55e 0%, #eab308 35%, #f97316 65%, #ec4899 100%)",
            }}
        />

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

export default UVIndexCard;
