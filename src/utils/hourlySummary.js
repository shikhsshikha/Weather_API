export function getHourlySummary(data) {
  if (!data) return "";

  const hours = data.forecast.forecastday.flatMap(d => d.hour);
  const now = new Date();

  const upcoming = hours
    .filter(h => new Date(h.time) >= now)
    .slice(0, 12);

  if (!upcoming.length) return "";

  const isNight = data.current.is_day === 0;

  const precipHour = upcoming.find(h =>
    h.will_it_rain === 1 ||
    h.will_it_snow === 1 ||
    h.chance_of_rain > 50 ||
    h.chance_of_snow > 50
  );

  if (precipHour) {
    const time = new Date(precipHour.time).toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
    });

    const type = precipHour.will_it_snow ? "Snow" : "Rain";
    return `${type} expected around ${time}. Wind gusts up to ${Math.round(
      data.current.gust_kph
    )} kph.`;
  }

  const clearHour = upcoming.find(h =>
    h.condition.text.toLowerCase().includes("clear")
  );

  if (clearHour) {
    if (isNight) {
      return `Clear conditions tonight, continuing through the morning. Wind gusts are up to ${Math.round(
        data.current.gust_kph
      )} kph.`;
    } else {
      const time = new Date(clearHour.time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      });

      return `Clear conditions expected around ${time}. Wind gusts up to ${Math.round(
        data.current.gust_kph
      )} kph.`;
    }
  }

  const cloudyHour = upcoming.find(h =>
    h.condition.text.toLowerCase().includes("cloud")
  );

  if (cloudyHour) {
    return `Cloudy conditions expected for the next few hours. Wind gusts up to ${Math.round(
      data.current.gust_kph
    )} kph.`;
  }

  if (data.current.gust_kph >= 20) {
    return `Windy conditions expected. Gusts up to ${Math.round(
      data.current.gust_kph
    )} kph.`;
  }

  const tempDiff =
    upcoming[upcoming.length - 1].temp_c - upcoming[0].temp_c;

  if (Math.abs(tempDiff) >= 5) {
    return tempDiff < 0
      ? "Temperatures dropping later tonight."
      : "Temperatures rising later today.";
  }

  return `${data.current.condition.text}. Wind gusts are up to ${Math.round(
    data.current.gust_kph
  )} kph.`;
}
