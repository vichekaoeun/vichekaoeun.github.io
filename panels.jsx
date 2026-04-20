// Curved arched title (SVG textPath)
const CurvedKicker = ({ text }) => (
  <svg className="curved-title" width="440" height="50" viewBox="0 0 440 50">
    <defs>
      <path id="arcP" d="M 10 42 Q 220 -8 430 42" fill="none" />
    </defs>
    <text>
      <textPath href="#arcP" startOffset="50%" textAnchor="middle">{text}</textPath>
    </text>
  </svg>
);

const About = () => (
  <div className="panel">
    <span className="label">Dossier</span>
    <div className="body">
      {window.ABOUT.map((p, i) => <p key={i}>{p}</p>)}
    </div>

    {/* Toronto blue-jay flourish */}
    <div className="toronto">
      <svg viewBox="0 0 240 150" className="bluejay" aria-hidden="true">
        {/* sky arc */}
        <path d="M 10 120 Q 120 30 230 120" fill="none" stroke="#9ad6ff" strokeWidth="4" strokeLinecap="round"/>
        <path d="M 10 120 Q 120 50 230 120" fill="none" stroke="#c9b6ff" strokeWidth="3" strokeLinecap="round" opacity=".6"/>
        {/* tiny CN-tower-ish silhouette */}
        <g transform="translate(180 82)">
          <rect x="-2" y="0" width="4" height="38" fill="#2a1a3e"/>
          <ellipse cx="0" cy="0" rx="9" ry="5" fill="#2a1a3e"/>
          <rect x="-1" y="-18" width="2" height="18" fill="#2a1a3e"/>
        </g>
        {/* blue jay body */}
        <g transform="translate(90 80)">
          {/* tail */}
          <path d="M -28 10 L -54 20 L -48 4 Z" fill="#6fbaff" stroke="#2a1a3e" strokeWidth="2"/>
          {/* body */}
          <ellipse cx="0" cy="0" rx="28" ry="20" fill="#9ad6ff" stroke="#2a1a3e" strokeWidth="2"/>
          {/* wing */}
          <path d="M -6 -8 Q 8 -20 22 -4 Q 10 8 -4 2 Z" fill="#6fbaff" stroke="#2a1a3e" strokeWidth="2"/>
          {/* belly accent */}
          <ellipse cx="-4" cy="8" rx="14" ry="7" fill="#f7efde" stroke="#2a1a3e" strokeWidth="1.5"/>
          {/* head */}
          <circle cx="24" cy="-8" r="14" fill="#9ad6ff" stroke="#2a1a3e" strokeWidth="2"/>
          {/* crest */}
          <path d="M 22 -20 L 18 -30 L 28 -22 L 32 -30 L 34 -20 Z" fill="#6fbaff" stroke="#2a1a3e" strokeWidth="2"/>
          {/* eye */}
          <circle cx="28" cy="-10" r="2.5" fill="#2a1a3e"/>
          <circle cx="29" cy="-11" r="0.8" fill="#f7efde"/>
          {/* beak */}
          <path d="M 38 -8 L 48 -6 L 38 -4 Z" fill="#2a1a3e"/>
          {/* black face mark */}
          <path d="M 16 -4 Q 22 -2 30 -4 L 30 0 Q 22 2 16 0 Z" fill="#2a1a3e"/>
        </g>
        {/* musical notes drifting */}
        <text x="155" y="50" fontFamily="Fraunces,serif" fontSize="18" fill="#ff6aa2">♪</text>
        <text x="175" y="38" fontFamily="Fraunces,serif" fontSize="14" fill="#b47dff">♫</text>
        <text x="40" y="58" fontFamily="Fraunces,serif" fontSize="16" fill="#ffa04b">♪</text>
        {/* little speech pill */}
        <g transform="translate(134 52)">
          <rect x="-2" y="-14" width="66" height="22" rx="11" fill="#ffe28a" stroke="#2a1a3e" strokeWidth="2"/>
          <text x="31" y="1" textAnchor="middle" fontFamily="DM Mono,monospace" fontSize="9" fill="#2a1a3e" letterSpacing="1.5">CAW! ✦ HI</text>
          <path d="M 4 4 L 0 14 L 12 6 Z" fill="#ffe28a" stroke="#2a1a3e" strokeWidth="2"/>
        </g>
      </svg>
      <div className="toronto-text">
        <div className="toronto-k">Currently orbiting</div>
        <div className="toronto-v">Toronto, ON <span className="flag">🍁</span></div>
      </div>
    </div>

    <div className="stat-row">
      <div className="stat-card"><div className="k">Status</div><div className="v">Building</div></div>
      <div className="stat-card"><div className="k">Focus</div><div className="v">Systems + Ops</div></div>
      <div className="stat-card"><div className="k">Based</div><div className="v">Toronto, ON</div></div>
    </div>
  </div>
);

const SKILL_COLORS = ["alt","mint","rose","lav"];

const Skills = () => (
  <div className="panel">
    <span className="label">Ability Set</span>
    <div className="skills">
      {window.SKILLS.map((g, gi) => (
        <div key={g.group}>
          <h4>✦ {g.group}</h4>
          <div className="skill-tags">
            {g.items.map((s) => (
              <span key={s} className={`chip ${SKILL_COLORS[gi % SKILL_COLORS.length]}`}>{s}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Projects = () => {
  const onPick = (p) => {
    window.dispatchEvent(new CustomEvent("vic:openProject", { detail: p }));
  };
  return (
    <div className="panel">
      <span className="label">Selected Tracks</span>
      <div className="proj-grid">
        {window.PROJECTS.map((p) => (
          <div
            key={p.num}
            className="proj"
            onClick={() => onPick(p)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onPick(p); }}
          >
            <div className="num">{p.num}</div>
            <div>
              <div className="name">{p.name}</div>
              <div className="desc">{p.desc}</div>
              <div className="meta">
                {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div className="go">PLAY <span>▸</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Experience = () => (
  <div className="panel">
    <span className="label">Tour History</span>
    <div className="xp">
      {window.EXPERIENCE.map((x, i) => (
        <div key={i} className="xp-row">
          <div className="xp-date">{x.date}</div>
          <div>
            <div className="xp-role">{x.role}</div>
            <div className="xp-co">{x.co}</div>
            <div className="xp-body">{x.body}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Contact = () => (
  <div className="panel">
    <span className="label">Send Transmission</span>
    <div className="body" style={{marginBottom:16}}>
      <p>Got a project, a question, or a weird idea? Drop a line, the channels are always open.</p>
    </div>
    <div className="contact-grid">
      {window.CONTACT.map((c) => (
        <a key={c.label} className="contact-card" href={c.href} target="_blank" rel="noreferrer">
          <div className="c-label">{c.label}</div>
          <div className="c-val">{c.val}</div>
        </a>
      ))}
    </div>
  </div>
);

// Psychedelic floral/eye SVG emblem (original composition)
const Emblem = () => (
  <svg
    aria-hidden="true"
    width="320" height="320" viewBox="0 0 320 320"
    style={{
      position:"absolute", right:-40, bottom:-40, zIndex:1, pointerEvents:"none",
      filter:"drop-shadow(6px 6px 0 rgba(42,26,62,.15))"
    }}
  >
    {/* Flower petals */}
    <g transform="translate(160 160)">
      {Array.from({length: 10}).map((_, i) => {
        const a = (i / 10) * 360;
        const colors = ["#ffb3c7","#c9b6ff","#ffe28a","#a8e6c9","#ffc4a3"];
        return (
          <ellipse
            key={i}
            cx="0" cy="-90" rx="34" ry="70"
            fill={colors[i % colors.length]}
            stroke="#2a1a3e" strokeWidth="2"
            transform={`rotate(${a})`}
          />
        );
      })}
      {/* Eye-ish center */}
      <circle cx="0" cy="0" r="52" fill="#f7efde" stroke="#2a1a3e" strokeWidth="2.5"/>
      <ellipse cx="0" cy="0" rx="44" ry="26" fill="#9ad6ff" stroke="#2a1a3e" strokeWidth="2"/>
      <circle cx="0" cy="0" r="18" fill="#2a1a3e"/>
      <circle cx="6" cy="-5" r="4" fill="#ff6aa2"/>
      <circle cx="-14" cy="8" r="2.5" fill="#f7efde"/>
    </g>
  </svg>
);

Object.assign(window, { About, Skills, Projects, Experience, Contact, Emblem, CurvedKicker });
