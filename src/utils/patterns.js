// Decorative background helpers — subtle gym-themed textures used behind
// dark sections (barbell wallpaper, torn-poster grain) so panels don't read
// as flat, empty color fills.

export const barbellPattern = (color = "%23ffffff", opacity = 0.05, size = 160) => `
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 160 160'%3E%3Cg fill='none' stroke='${color}' stroke-width='2.5' stroke-linecap='round' opacity='${opacity}' transform='rotate(-18 80 80)'%3E%3Crect x='14' y='66' width='12' height='28' rx='3'/%3E%3Crect x='30' y='58' width='9' height='44' rx='3'/%3E%3Cline x1='39' y1='80' x2='121' y2='80'/%3E%3Crect x='121' y='58' width='9' height='44' rx='3'/%3E%3Crect x='134' y='66' width='12' height='28' rx='3'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: ${size}px ${size}px;
`;

export const grainOverlay = (opacity = 0.05) => `
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='${opacity}'/%3E%3C/svg%3E");
  background-repeat: repeat;
`;
