function GlassCard({ children, variant = "mid", className= "" }) {
  const variants = {
    light: "bg-white/35 text-white backdrop-blur-2xl",
    mid: "bg-white/22 text-white backdrop-blur-2xl",
    dark: "bg-black/40 text-white backdrop-blur-3xl",
  };

  return (
    <div className="relative rounded-3xl p-px shadow-2xl">
      <div className="absolute inset-0 rounded-3xl bg-white/20 blur-xl opacity-40" />

      <div
        className={`relative rounded-3xl px-4 py-4 sm:px-5 sm:py-4 ${variants[variant]} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default GlassCard;
