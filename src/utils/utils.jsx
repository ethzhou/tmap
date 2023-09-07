export const COLOR_CHORD_SELECT = "#f00";

export function clamp(x, lower, upper) {
  return Math.max(lower, Math.min(x, upper));
}

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}