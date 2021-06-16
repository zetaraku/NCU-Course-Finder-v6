// eslint-disable-next-line import/prefer-default-export
export function clamp(value, min, max) {
  return Math.min(Math.max(min, value), max);
}
