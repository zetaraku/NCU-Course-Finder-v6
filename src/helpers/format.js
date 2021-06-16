const timeUnits = [
  { unit: 'year', time: 1000 * 60 * 60 * 24 * 365 },
  { unit: 'month', time: 1000 * 60 * 60 * 24 * 30 },
  { unit: 'week', time: 1000 * 60 * 60 * 24 * 7 },
  { unit: 'day', time: 1000 * 60 * 60 * 24 },
  { unit: 'hour', time: 1000 * 60 * 60 },
  { unit: 'minute', time: 1000 * 60 },
  { unit: 'second', time: 1000 },
];

let dateTimeFormatter = new Intl.DateTimeFormat('zh-TW', {
  dateStyle: 'medium',
  timeStyle: 'short',
  hour12: false,
});
let dateFormatter = new Intl.DateTimeFormat('zh-TW', {
  dateStyle: 'short',
});
let relativeTimeFormatter = new Intl.RelativeTimeFormat('zh-TW');

export function formatNumber(n, maxDigits = 2) {
  if (n === Number.POSITIVE_INFINITY) return '∞';
  if (n === Number.NEGATIVE_INFINITY) return '-∞';
  if (Number.isNaN(n)) return '--';
  if (Number.isFinite(n)) return String(Number(n.toFixed(maxDigits)));
  return String(n);
}

export function formatDate(date) {
  return dateFormatter.format(date);
}

export function formatDateTime(date) {
  return dateTimeFormatter.format(date);
}

export function formatRelativeTime(date, pivot = new Date()) {
  let elapsedTime = date.getTime() - pivot.getTime();

  let usingTimeUnit = timeUnits.find(
    timeUnit => Math.abs(elapsedTime) >= timeUnit.time,
  ) ?? timeUnits.slice(-1)[0];

  return relativeTimeFormatter.format(
    Math.trunc(elapsedTime / usingTimeUnit.time),
    usingTimeUnit.unit,
  );
}
