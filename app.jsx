// Main app
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#ff6aa2",
  "bg": "#f7efde",
  "ink": "#2a1a3e",
  "wobble": 1,
  "animBg": true,
  "spin": true
}/*EDITMODE-END*/;

const useKey = (handler) => {
  React.useEffect(() => {
    const h = (e) => handler(e);
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [handler]);
};

const App = () => {
  const items = window.SECTIONS;

  const [idx, setIdx] = React.useState(() => {
    const saved = Number(localStorage.getItem("vic:idx"));
    return Number.isFinite(saved) && saved >= 0 && saved < items.length ? saved : 0;
  });
  const [openProj, setOpenProj] = React.useState(null);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => { localStorage.setItem("vic:idx", String(idx)); }, [idx]);

  // listen for project open events from the Projects list
  React.useEffect(() => {
    const h = (e) => setOpenProj(e.detail);
    window.addEventListener("vic:openProject", h);
    return () => window.removeEventListener("vic:openProject", h);
  }, []);

  // apply tweaks → CSS vars
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--hot", tweaks.accent);
    r.style.setProperty("--cream", tweaks.bg);
    r.style.setProperty("--ink", tweaks.ink);
    // record spin
    document.querySelectorAll(".record").forEach((el) => {
      el.style.animationPlayState = tweaks.spin ? "running" : "paused";
    });
  }, [tweaks]);

  // edit mode
  React.useEffect(() => {
    const handler = (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") setTweaksOpen(true);
      if (d.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", handler);
    window.parent && window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  useKey(React.useCallback((e) => {
    if (openProj && e.key === "Escape") { setOpenProj(null); e.preventDefault(); return; }
    if (openProj) return;
    if (["ArrowDown","ArrowRight","j","s"].includes(e.key)) {
      setIdx((i) => (i + 1) % items.length); e.preventDefault();
    } else if (["ArrowUp","ArrowLeft","k","w"].includes(e.key)) {
      setIdx((i) => (i - 1 + items.length) % items.length); e.preventDefault();
    } else if (/[1-9]/.test(e.key)) {
      const n = Number(e.key) - 1;
      if (n < items.length) setIdx(n);
    }
  }, [items.length, openProj]));

  const active = items[idx];

  const renderPanel = (() => {
    switch (active.render) {
      case "about": return <window.About />;
      case "skills": return <window.Skills />;
      case "projects": return <window.Projects />;
      case "experience": return <window.Experience />;
      case "contact": return <window.Contact />;
      default: return null;
    }
  })();

  return (
    <div
      className="stage"
      data-screen-label={`${String(idx+1).padStart(2,"0")} ${active.label}`}
    >
      {tweaks.animBg ? <window.Bg /> : <div className="bg-wrap" style={{background:"var(--cream)"}}/>}

      <div className="grain" />

      {/* top bar */}
      <div className="topbar">
        <div><span className="dot" />{window.SITE.handle} · PERSONAL RADIO · STATION 108.3</div>
        <div className="right">{window.SITE.codeName || "IN TRANSIT"}</div>
      </div>

      {/* main grid */}
      <div className="main">
        {/* LEFT — content */}
        <div className="content" key={active.id}>
          <window.CurvedKicker text={active.kicker} />
          <h1 className="section-title">
            {active.title[0]}
            <span className="hl">{active.title[1]}</span>
            <span className="wave">{active.title[2]}</span>
          </h1>
          {renderPanel}
        </div>

        {/* RIGHT — menu */}
        <div className={`menu-col ${drawerOpen ? "drawer-open" : ""}`} style={{position:"relative"}}>
          <window.Menu
            items={items}
            activeIndex={idx}
            onSelect={(i, hoverOnly) => {
              setIdx(i);
              if (!hoverOnly) setDrawerOpen(false);
            }}
          />
          <window.Emblem />
        </div>

        {/* Drawer backdrop — sibling to menu-col so stacking works */}
        {drawerOpen && (
          <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)} />
        )}
      </div>

      {/* Mobile menu trigger */}
      <button
        className={`menu-trigger ${drawerOpen ? "is-open" : ""}`}
        aria-label={drawerOpen ? "Close menu" : "Open menu"}
        aria-expanded={drawerOpen}
        onClick={() => setDrawerOpen((o) => !o)}
      >
        <span /><span /><span />
      </button>

      {/* mood footer */}
      <div className="mood">
        <div className="amt">☽ <b>∞</b></div>
        <div className="lbl">Good vibrations</div>
      </div>

      {/* bottom hints */}
      <div className="hints">
        <div className="group">
          <span className="key"><b>↑</b><b>↓</b> NAVIGATE</span>
          <span className="key"><b>ENTER</b> SELECT</span>
          <span className="key"><b>1-5</b> JUMP</span>
        </div>
        <div className="group">
          <span style={{opacity:.65}}>{window.SITE.name} · {new Date().getFullYear()} · Side A</span>
        </div>
      </div>

      <window.TweaksPanel open={tweaksOpen} tweaks={tweaks} setTweaks={setTweaks} />

      {openProj && (
        <div className="pd-overlay">
          <window.ProjectDetail project={openProj} onBack={() => setOpenProj(null)} />
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
