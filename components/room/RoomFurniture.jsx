// The candlelit table, the company gathered around it. Strong, simple
// silhouettes — the warm light sells the scene, not the geometry.
export default function RoomFurniture() {
  return (
    <div className="room-furniture depth-layer" style={{ "--depth": 0.55 }} aria-hidden="true">
      <svg viewBox="0 0 1200 420" className="room-furniture__svg" preserveAspectRatio="xMidYMax meet">
        <defs>
          <linearGradient id="roomRimFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--room-accent-bright)" stopOpacity="0.45" />
            <stop offset="16%" stopColor="#140c05" stopOpacity="1" />
            <stop offset="100%" stopColor="#0a0603" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="roomFlameGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffe2a8" />
            <stop offset="55%" stopColor="var(--room-accent-bright)" />
            <stop offset="100%" stopColor="var(--room-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* gathered silhouettes, seated beyond the table */}
        <g opacity="0.85">
          <ellipse cx="430" cy="232" rx="46" ry="58" fill="url(#roomRimFill)" />
          <circle cx="430" cy="166" r="26" fill="url(#roomRimFill)" />
        </g>
        <g opacity="0.6">
          <ellipse cx="600" cy="208" rx="40" ry="52" fill="url(#roomRimFill)" />
          <circle cx="600" cy="148" r="23" fill="url(#roomRimFill)" />
        </g>
        <g opacity="0.85">
          <ellipse cx="770" cy="238" rx="48" ry="60" fill="url(#roomRimFill)" />
          <circle cx="770" cy="170" r="27" fill="url(#roomRimFill)" />
        </g>

        {/* table */}
        <ellipse cx="600" cy="300" rx="270" ry="44" fill="#150d05" stroke="var(--room-accent)" strokeOpacity="0.25" strokeWidth="1.5" />
        <ellipse cx="600" cy="290" rx="248" ry="7" fill="var(--room-accent-bright)" opacity="0.08" />

        {/* champagne flutes */}
        <g opacity="0.9">
          <rect x="476" y="264" width="3" height="28" fill="#e8dcc5" opacity="0.5" />
          <ellipse cx="477.5" cy="260" rx="9" ry="12" fill="none" stroke="#e8dcc5" strokeOpacity="0.45" strokeWidth="1.3" />
          <rect x="718" y="264" width="3" height="28" fill="#e8dcc5" opacity="0.5" />
          <ellipse cx="719.5" cy="260" rx="9" ry="12" fill="none" stroke="#e8dcc5" strokeOpacity="0.45" strokeWidth="1.3" />
        </g>

        {/* candles */}
        <rect x="552" y="266" width="6" height="32" rx="2" fill="#3a2a16" />
        <ellipse className="room-furniture__flame" cx="555" cy="260" rx="6" ry="11" fill="url(#roomFlameGlow)" style={{ animationDelay: "0s" }} />
        <rect x="638" y="266" width="6" height="32" rx="2" fill="#3a2a16" />
        <ellipse className="room-furniture__flame" cx="641" cy="260" rx="6" ry="11" fill="url(#roomFlameGlow)" style={{ animationDelay: "1.15s" }} />

        {/* foreground lounge chairs, cropped at the edges */}
        <path
          className="room-furniture__chair"
          d="M30,420 C30,328 84,286 148,286 C212,286 256,328 256,420 Z"
          fill="url(#roomRimFill)"
        />
        <path
          className="room-furniture__chair"
          d="M944,420 C944,328 998,286 1062,286 C1126,286 1170,328 1170,420 Z"
          fill="url(#roomRimFill)"
        />
      </svg>
    </div>
  );
}
