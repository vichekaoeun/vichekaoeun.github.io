// Main app — single-page academic-style portfolio
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 45,
  "dark": false,
  "compact": false,
  "showPortrait": true,
  "thumbStyle": "abstract"
}/*EDITMODE-END*/;

const { useState, useEffect } = React;

const InlineLinks = ({ children }) => {
  // replace {EMAIL} {GITHUB} {LINKEDIN} tokens with real anchors
  const parts = String(children).split(/(\{EMAIL\}|\{GITHUB\}|\{LINKEDIN\})/g);
  return parts.map((p, i) => {
    if (p === "{EMAIL}") return <a key={i} className="bio-link" href={`mailto:${window.CONTACT.email}`}>email me</a>;
    if (p === "{GITHUB}") return <a key={i} className="bio-link" href={window.CONTACT.github}>GitHub</a>;
    if (p === "{LINKEDIN}") return <a key={i} className="bio-link" href={window.CONTACT.linkedin}>LinkedIn</a>;
    return p;
  });
};

const Hero = ({ tweaks }) => (
  <section className="hero" id="home">
    <div>
      <div className="role">{window.CONTACT.location}</div>
      <h1>
        {window.SITE.name}
      </h1>
      {window.SITE.blurb.map((p, i) => (
        <p key={i}><InlineLinks>{p}</InlineLinks></p>
      ))}
    </div>
    {tweaks.showPortrait && (
      <div className="portrait" aria-hidden="true">
        <img src="site/images/flower-icon.jpeg" alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} />
      </div>
    )}
  </section>
);

const SectionHead = ({ num, children }) => (
  <h2 className="section-head">
    <span>{children}</span>
    <span className="num">{num}</span>
  </h2>
);

const ProjectEntry = ({ p, thumbStyle }) => (
  <article className="entry">
    <div className="thumb">
      {thumbStyle === "abstract" ? <window.Thumb kind={p.thumb.kind} /> : (
        <div style={{
          width: "100%", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--mono)", fontSize: 22, color: "var(--ink-mute)",
          background: "var(--paper)"
        }}>{p.name.slice(0, 2).toLowerCase()}</div>
      )}
    </div>
    <div className="body">
      <h3><a href={p.href} className="plain">{p.name}</a></h3>
      {p.blurb.map((b, i) => <p key={i}>{b}</p>)}
      <div className="tags">
        {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
      <div className="links">
        {p.links.map((l) => <a key={l.href} href={l.href}>{l.label} ↗</a>)}
        {p.demo && <a href={p.demo}>Demo ↗</a>}
      </div>
    </div>
  </article>
);

const ExperienceEntry = ({ e }) => (
  <article className="exp">
    <div className="when">{e.when}</div>
    <div className="body">
      <h4>{e.role} <span className="org">· {e.org}</span></h4>
      <p>{e.body}</p>
    </div>
  </article>
);

const App = () => {
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useState(false);

  // apply tweaks → body / vars
  useEffect(() => {
    document.body.classList.toggle("dark", !!tweaks.dark);
    document.body.classList.toggle("compact", !!tweaks.compact);
    document.documentElement.style.setProperty(
      "--accent",
      `oklch(${tweaks.dark ? 0.72 : 0.58} ${tweaks.dark ? 0.13 : 0.14} ${tweaks.accentHue})`
    );
    document.documentElement.style.setProperty(
      "--accent-soft",
      `oklch(${tweaks.dark ? 0.32 : 0.92} ${tweaks.dark ? 0.05 : 0.04} ${tweaks.accentHue})`
    );
  }, [tweaks]);

  // tweaks panel host protocol
  useEffect(() => {
    const handler = (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") setTweaksOpen(true);
      if (d.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", handler);
    window.parent && window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  const setTweak = (key, val) => {
    setTweaks((t) => {
      const next = typeof key === "object" ? { ...t, ...key } : { ...t, [key]: val };
      window.parent && window.parent.postMessage(
        { type: "__edit_mode_set_keys", edits: typeof key === "object" ? key : { [key]: val } },
        "*"
      );
      return next;
    });
  };

  return (
    <div className="page" data-screen-label="01 Home">
      <header className="topbar">
        <span className="brand">{window.SITE.name.toUpperCase()}</span>
        <nav>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Stack</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <Hero tweaks={tweaks} />

      <section className="section" id="experience">
        <SectionHead num="01">Experience</SectionHead>
        {window.EXPERIENCE.map((e) => (
          <ExperienceEntry key={e.role + e.org} e={e} />
        ))}
      </section>

      <section className="section" id="projects">
        <SectionHead num="02">Selected work</SectionHead>
        {window.PROJECTS.map((p) => (
          <ProjectEntry key={p.name} p={p} thumbStyle={tweaks.thumbStyle} />
        ))}
      </section>

      <section className="section" id="skills">
        <SectionHead num="03">Stack</SectionHead>
        {Object.entries(window.SKILLS).map(([group, items]) => (
          <div key={group} className="skills">
            <div className="group">{group}</div>
            <div className="items">
              {items.map((it) => <span key={it}>{it}</span>)}
            </div>
          </div>
        ))}
      </section>

      <section className="section" id="contact">
        <SectionHead num="04">Contact</SectionHead>
        <div className="contact">
          <div className="label">Email</div>
          <div className="val"><a href={`mailto:${window.CONTACT.email}`}>{window.CONTACT.email}</a></div>
        </div>
        <div className="contact">
          <div className="label">GitHub</div>
          <div className="val"><a href={window.CONTACT.github}>github.com/vichekaoeun</a></div>
        </div>
        <div className="contact">
          <div className="label">LinkedIn</div>
          <div className="val"><a href={window.CONTACT.linkedin}>linkedin.com/in/vichekaoeun</a></div>
        </div>
        <div className="contact">
          <div className="label">Location</div>
          <div className="val">{window.CONTACT.location}</div>
        </div>
      </section>

      <footer className="foot">
        <span>© 2026 {window.SITE.name}</span>
      </footer>

      <button
        className="theme-fab"
        onClick={() => setTweak("dark", !tweaks.dark)}
        aria-label={tweaks.dark ? "Switch to light mode" : "Switch to dark mode"}
        title={tweaks.dark ? "Light mode" : "Dark mode"}
      >
        {tweaks.dark ? "☼" : "☾"}
      </button>

      {tweaksOpen && (
        <window.TweaksPanel
          onClose={() => {
            setTweaksOpen(false);
            window.parent && window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*");
          }}
        >
          <window.TweakSection title="Theme">
            <window.TweakToggle
              label="Dark mode"
              value={tweaks.dark}
              onChange={(v) => setTweak("dark", v)}
            />
            <window.TweakSlider
              label="Accent hue"
              min={0} max={360} step={1}
              value={tweaks.accentHue}
              onChange={(v) => setTweak("accentHue", v)}
            />
          </window.TweakSection>
          <window.TweakSection title="Layout">
            <window.TweakToggle
              label="Compact density"
              value={tweaks.compact}
              onChange={(v) => setTweak("compact", v)}
            />
            <window.TweakToggle
              label="Show portrait"
              value={tweaks.showPortrait}
              onChange={(v) => setTweak("showPortrait", v)}
            />
            <window.TweakRadio
              label="Thumbnails"
              value={tweaks.thumbStyle}
              options={[
                { value: "abstract", label: "Abstract" },
                { value: "letters", label: "Letters" },
              ]}
              onChange={(v) => setTweak("thumbStyle", v)}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
