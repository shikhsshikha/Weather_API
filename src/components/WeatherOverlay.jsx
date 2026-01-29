function WeatherOverlay({ weatherType }) {
  if (!weatherType) return null;

  const isThunder = weatherType.toLowerCase().includes("thunder");

  return <>{isThunder && <div className="lightning-flash" />}</>;
}

export default WeatherOverlay;
