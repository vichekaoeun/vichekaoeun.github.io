// Right-side rainbow-arch menu — each item is a stacked rainbow that curves
const RAINBOW_SETS = [
  ["#ff6aa2", "#ffa04b", "#ffe28a", "#a8e6c9", "#9ad6ff", "#c9b6ff"],
  ["#c9b6ff", "#9ad6ff", "#a8e6c9", "#ffe28a", "#ffa04b", "#ff6aa2"],
  ["#ffb3c7", "#ffc4a3", "#ffe28a", "#a8e6c9", "#9ad6ff", "#b47dff"],
  ["#a8e6c9", "#9ad6ff", "#c9b6ff", "#ffb3c7", "#ffc4a3", "#ffe28a"],
  ["#ffe28a", "#ffa04b", "#ff6aa2", "#b47dff", "#9ad6ff", "#a8e6c9"],
];

const RainbowArch = ({ colors, active }) => {
  // Concentric rainbow bands drawn as stroked semicircles (a rising sun shape)
  // width 260 × height 84 — an arch
  const bands = colors.length;
  const maxR = 110;
  const gap = 9;
  return (
    <svg
      className={`arch ${active ? "arch-active" : ""}`}
      viewBox="0 0 260 100"
      preserveAspectRatio="xMidYEnd meet"
      aria-hidden="true"
    >
      {colors.map((c, i) => {
        const r = maxR - i * gap;
        return (
          <path
            key={i}
            d={`M ${130 - r} 92 A ${r} ${r} 0 0 1 ${130 + r} 92`}
            fill="none"
            stroke={c}
            strokeWidth={gap - 1.4}
            strokeLinecap="round"
            style={{ transitionDelay: `${i * 30}ms` }}
          />
        );
      })}
      {/* Horizon line */}
      <line x1="12" y1="92" x2="248" y2="92" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      {/* Sun glyph inside arch when active */}
      {active && (
        <g>
          <circle cx="130" cy="92" r="18" fill="var(--butter)" stroke="var(--ink)" strokeWidth="2" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const x1 = 130 + Math.cos(a) * 22;
            const y1 = 92 + Math.sin(a) * 22;
            const x2 = 130 + Math.cos(a) * 30;
            const y2 = 92 + Math.sin(a) * 30;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />;
          })}
        </g>
      )}
    </svg>
  );
};

const Menu = ({ items, activeIndex, onSelect }) => {
  return (
    <aside className="sidebar rainbow-side" aria-label="Main menu">
      <div className="menu-head">
        <span className="chev">✦</span>
        <span>Tune In / Main Menu</span>
        <span style={{ marginLeft: "auto" }} className="blink">●</span>
      </div>

      <nav className="menu rainbow-menu" role="listbox" aria-activedescendant={`m-${activeIndex}`}>
        {items.map((it, i) => {
          const active = i === activeIndex;
          const colors = RAINBOW_SETS[i % RAINBOW_SETS.length];
          return (
            <div
              key={it.id}
              id={`m-${i}`}
              className={`rm-item ${active ? "active" : ""}`}
              role="option"
              aria-selected={active}
              tabIndex={0}
              onClick={() => onSelect(i)}
              onMouseEnter={() => onSelect(i, true)}
            >
              <div className="rm-arch-wrap">
                <RainbowArch colors={colors} active={active} />
              </div>
              <div className="rm-text">
                <span className="rm-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="rm-label">{it.label}</span>
                <span className="rm-sub">{it.sub}</span>
              </div>
              {active && <span className="rm-pointer">✦</span>}
            </div>
          );
        })}
      </nav>

      <div
        style={{
          textAlign: "center",
          marginTop: 14,
          fontFamily: '"DM Mono",monospace',
          fontSize: 10,
          letterSpacing: ".25em",
          textTransform: "uppercase",
          color: "var(--deep)",
        }}
      >
        <span style={{ color: "var(--hot)", fontWeight: 700 }}>{activeIndex + 1}</span>
        {" / "}
        {items.length} · Side A
      </div>
    </aside>
  );
};

window.Menu = Menu;
