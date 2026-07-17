// Simplified schematic contour of Chilika Lagoon, reused as a visual signature
// across the site — faint watermark on content pages, literal basemap on the dashboard.
export default function LagoonMotif({ className, opacity = 1, stroke = "var(--accent-cyan)", strokeWidth = 1.4 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <path
        d="M 210 20 C 260 25, 300 45, 330 90 C 355 128, 360 175, 345 220
           C 332 260, 300 295, 270 330 C 240 365, 195 395, 150 400
           C 105 405, 60 385, 35 345 C 12 308, 15 260, 30 215
           C 42 178, 65 145, 95 110 C 125 75, 160 15, 210 20 Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <path
        d="M 210 20 C 260 25, 300 45, 330 90 C 355 128, 360 175, 345 220
           C 332 260, 300 295, 270 330 C 240 365, 195 395, 150 400
           C 105 405, 60 385, 35 345 C 12 308, 15 260, 30 215
           C 42 178, 65 145, 95 110 C 125 75, 160 15, 210 20 Z"
        stroke={stroke}
        strokeWidth={strokeWidth * 0.6}
        strokeDasharray="2 6"
        transform="scale(0.88) translate(28 30)"
        opacity="0.5"
      />
    </svg>
  );
}
