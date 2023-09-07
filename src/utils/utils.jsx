export const COLOR_CHORD_SELECT = "#f00";

export function clamp(x, a, b) {
  return Math.max(a, Math.min(x, b));
}

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}