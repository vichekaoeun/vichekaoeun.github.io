const ACCENTS = [
  { name: "hot pink", color: "#ff6aa2" },
  { name: "peach",    color: "#ffa04b" },
  { name: "violet",   color: "#b47dff" },
  { name: "mint",     color: "#5fd9a0" },
  { name: "sky",      color: "#6fbaff" },
];

const MOODS = [
  { name: "pastel",  bg: "#f7efde", ink: "#2a1a3e" },
  { name: "dusk",    bg: "#2a1a3e", ink: "#f7efde" },
  { name: "orchid",  bg: "#f1dff0", ink: "#3b1d49" },
  { name: "lagoon",  bg: "#d9f0ea", ink: "#0f3d2e" },
];

const TweaksPanel = ({ open, tweaks, setTweaks }) => {
  if (!open) return null;
  const set = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent && window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
  };

  return (
    <div className="tweaks open">
      <h5>✦ Tweaks</h5>

      <label>Accent</label>
      <div className="row">
        {ACCENTS.map((a) => (
          <div
            key={a.name}
            className="sw"
            title={a.name}
            onClick={() => set("accent", a.color)}
            style={{
              background: a.color,
              outline: tweaks.accent === a.color ? "3px solid var(--ink)" : "none",
              outlineOffset: "2px",
            }}
          />
        ))}
      </div>

      <label>Mood</label>
      <div className="row" style={{flexDirection:"column",alignItems:"stretch"}}>
        {MOODS.map((m) => (
          <div
            key={m.name}
            onClick={() => { set("bg", m.bg); set("ink", m.ink); }}
            style={{
              cursor:"pointer",padding:"8px 12px",marginBottom:4,
              fontFamily:'"Fraunces",serif',fontWeight:900,fontStyle:"italic",fontSize:14,
              background: m.bg, color: m.ink,
              border: tweaks.bg === m.bg ? "2px solid var(--ink)" : "2px solid transparent",
              borderRadius: 999,
            }}
          >
            {m.name}
          </div>
        ))}
      </div>

      <label>Wobble intensity ({tweaks.wobble})</label>
      <input type="range" min="0" max="3" step="0.1"
        value={tweaks.wobble}
        onChange={(e) => set("wobble", Number(e.target.value))}
      />

      <label>Animated background</label>
      <div className="toggle" onClick={() => set("animBg", !tweaks.animBg)}>
        <div style={{
          width:36,height:20,background: tweaks.animBg ? "var(--hot)" : "#ddd",
          borderRadius:999,border:"2px solid var(--ink)",position:"relative"
        }}>
          <div style={{
            position:"absolute",top:1,left: tweaks.animBg ? 17 : 1,
            width:14,height:14,background:"var(--ink)",borderRadius:"50%",transition:"left .15s"
          }}/>
        </div>
        <span style={{fontWeight:700,letterSpacing:".2em"}}>{tweaks.animBg ? "ON" : "OFF"}</span>
      </div>

      <label>Record spin</label>
      <div className="toggle" onClick={() => set("spin", !tweaks.spin)}>
        <div style={{
          width:36,height:20,background: tweaks.spin ? "var(--hot)" : "#ddd",
          borderRadius:999,border:"2px solid var(--ink)",position:"relative"
        }}>
          <div style={{
            position:"absolute",top:1,left: tweaks.spin ? 17 : 1,
            width:14,height:14,background:"var(--ink)",borderRadius:"50%",transition:"left .15s"
          }}/>
        </div>
        <span style={{fontWeight:700,letterSpacing:".2em"}}>{tweaks.spin ? "ON" : "OFF"}</span>
      </div>
    </div>
  );
};

window.TweaksPanel = TweaksPanel;
