export const POOP_COLORS: { color: string; hex: string; accent: string }[] = [
  { color: "Black", hex: "#302c2b", accent: "#262222" },
  { color: "Green", hex: "#375b37", accent: "#2d492d" },
  { color: "Yellow", hex: "#a5923f", accent: "#877735" },
  { color: "Brown", hex: "#5b3e29", accent: "#493222" },
  { color: "White", hex: "#f4eee6", accent: "#d6d2cc" },
  { color: "Red", hex: "#932424", accent: "#771e1e" },
  { color: "Orange", hex: "#b76413", accent: "#9b5012" },
];

export const BRISTOL_TYPES = [
  { type: 1, description: "Separate hard lumps,\nlike nuts (hard to pass)" },
  { type: 2, description: "Sausage-shaped\nbut lumpy" },
  { type: 3, description: "Like a sausage but\nwith cracks on the surface" },
  { type: 4, description: "Like a sausage or snake,\nsmooth and soft (Ideal)" },
  { type: 5, description: "Soft blobs with\nclear-cut edges" },
  { type: 6, description: "Fluffy pieces with ragged\nedges, a mushy stool" },
  { type: 7, description: "Watery, no solid pieces,\nentirely liquid" },
];

export const COLORS = {
  glow: {
    start: "#00b7ff",
    stop: "#ba8cff",
    opacity: 0.5,
  },
  fire: {
    start: "#ba8cff",
    stop: "#f44e4e",
    opacity: 0.5,
  },
  bg: {
    primary: "#fff",
    secondary: "#f0f0f0",
  },
  border: {
    primary: "#e0e0e0",
    selected: "#000",
    width: "2px",
  },
  text: {
    primary: "#000",
    secondary: "#666",
    invert: "#fff",
  },
};
