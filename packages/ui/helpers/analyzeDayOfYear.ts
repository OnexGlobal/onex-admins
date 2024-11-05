export function analyzeDay(day: number) {
  // Calculate the number of weeks, months, and years
  const weeks = Math.floor(day / 7);
  const months = Math.floor(day / 30);
  const years = Math.floor(day / 365);

  const remainingDays = Math.floor(day % 365);

  const additionalWeeks = day > 7 ? Math.floor((day - 7) / 7) : 0;
  const additionalYears = day > 365 ? Math.floor((day - 365) / 365) : 0;

  const totalWeeks = weeks + additionalWeeks + months / 4.345 + years / 52.1775;

  let unit;
  let value;

  if (years >= 1) {
    unit = additionalYears === 1 ? "year" : "years";
    value = `+${years} ${unit}`;
  } else if (months >= 1 && remainingDays > 7) {
    unit = months === 1 ? "month" : "months";
    value = `+${months?.toFixed(0)} ${unit}`;
  } else if (weeks >= 1) {
    unit = totalWeeks === 1 ? "week" : "weeks";
    value = `+${weeks.toFixed(0)} ${unit}`;
  } else if (remainingDays >= 1) {
    unit = remainingDays === 1 ? "day" : "days";
    value = `${remainingDays?.toFixed(0)} ${unit}`;
  }

  return value;
}
