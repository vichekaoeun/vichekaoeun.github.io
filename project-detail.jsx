// Project detail view — "record sleeve" style

// Renders a single media item: image, video (mp4/webm), or youtube/vimeo embed
const MediaBlock = ({ m }) => {
  const t = m.type || "image";
  if (t === "image") {
    return (
      <figure className="pd-media-item pd-media-image">
        <img src={m.src} alt={m.caption || ""} />
        {m.caption && <figcaption>{m.caption}</figcaption>}
      </figure>
    );
  }
  if (t === "video") {
    return (
      <figure className="pd-media-item pd-media-video">
        <video src={m.src} poster={m.poster} controls playsInline preload="metadata">
          Your browser doesn't play this video format.
        </video>
        {m.caption && <figcaption>{m.caption}</figcaption>}
      </figure>
    );
  }
  if (t === "youtube") {
    // accept either a bare id or a full url
    const id = m.id || (m.src && (m.src.match(/[?&]v=([^&]+)/) || m.src.match(/youtu\.be\/([^?&]+)/) || m.src.match(/embed\/([^?&]+)/) || [])[1]);
    return (
      <figure className="pd-media-item pd-media-embed">
        <div className="pd-media-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}`}
            title={m.caption || "YouTube video"}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {m.caption && <figcaption>{m.caption}</figcaption>}
      </figure>
    );
  }
  if (t === "embed") {
    return (
      <figure className="pd-media-item pd-media-embed">
        <div className="pd-media-frame">
          <iframe src={m.src} title={m.caption || "Embed"} frameBorder="0" allowFullScreen />
        </div>
        {m.caption && <figcaption>{m.caption}</figcaption>}
      </figure>
    );
  }
  return null;
};

const ProjectDetail = ({ project, onBack }) => {
  const [playing, setPlaying] = React.useState(false);
  const synthRef = React.useRef(null);

  React.useEffect(() => {
    // stop any old synth when project changes or on unmount
    return () => {
      if (synthRef.current) { synthRef.current.destroy(); synthRef.current = null; }
    };
  }, [project]);

  const toggle = () => {
    if (!project) return;
    if (!synthRef.current) {
      const theme = window.THEMES[project.num] || window.THEMES["01"];
      synthRef.current = new window.ProjectSynth(theme);
    }
    if (playing) {
      synthRef.current.stop();
      setPlaying(false);
    } else {
      synthRef.current.play();
      setPlaying(true);
    }
  };

  const back = () => {
    if (synthRef.current) { synthRef.current.destroy(); synthRef.current = null; }
    setPlaying(false);
    onBack();
  };

  if (!project) return null;
  const p = project;
  const theme = window.THEMES[p.num] || {};

  return (
    <div className="pd">
      <button className="pd-back" onClick={back}>
        <span className="pd-back-arrow">←</span>
        <span>Back to Tracklist</span>
      </button>

      <div className="pd-grid">
        {/* Left — the sleeve */}
        <div className="pd-sleeve">
          <div className="pd-sleeve-inner" style={{background:p.palette[1]}}>
            <svg viewBox="0 0 400 400" className={`pd-rings ${playing ? "spinning" : "paused"}`} aria-hidden="true">
              {[180, 164, 148, 132, 116, 100].map((r, i) => (
                <circle key={r} cx="200" cy="200" r={r} fill="none" stroke={p.palette[i]} strokeWidth="14" />
              ))}
              <circle cx="200" cy="200" r="48" fill="var(--cream)" stroke="var(--ink)" strokeWidth="2.5" />
              <circle cx="200" cy="200" r="5" fill="var(--ink)" />
              <text x="200" y="30" textAnchor="middle" fontSize="20" fill="var(--ink)">✦</text>
              <text x="30" y="210" textAnchor="middle" fontSize="18" fill="var(--ink)">✦</text>
              <text x="370" y="210" textAnchor="middle" fontSize="18" fill="var(--ink)">✦</text>
              <text x="200" y="390" textAnchor="middle" fontSize="20" fill="var(--ink)">✦</text>
            </svg>
            <svg className="pd-sleeve-title" viewBox="0 0 400 200" aria-hidden="true">
              <defs>
                <path id="pdArc" d="M 40 160 Q 200 0 360 160" fill="none"/>
              </defs>
              <text>
                <textPath href="#pdArc" startOffset="50%" textAnchor="middle">
                  {p.name} · SIDE {p.num}
                </textPath>
              </text>
            </svg>
          </div>

          {/* Play button + theme info */}
          <div className="pd-player">
            <button
              className={`pd-play ${playing ? "is-playing" : ""}`}
              onClick={toggle}
              aria-label={playing ? "Stop" : "Play"}
            >
              {playing ? "■" : "▶"}
            </button>
            <div className="pd-player-info">
              <div className="pd-player-label">Now Spinning</div>
              <div className="pd-player-title">{theme.name || "—"}</div>
              <div className="pd-player-meta">{theme.bpm} BPM · {theme.key}</div>
            </div>
            {playing && (
              <div className="pd-eq" aria-hidden="true">
                <span /><span /><span /><span /><span />
              </div>
            )}
          </div>

          <div className="pd-meta">
            <div><span className="pd-meta-k">Side</span><span className="pd-meta-v">{p.num}</span></div>
            <div><span className="pd-meta-k">Year</span><span className="pd-meta-v">{p.year}</span></div>
            <div><span className="pd-meta-k">Length</span><span className="pd-meta-v">{p.runtime}</span></div>
          </div>
        </div>

        {/* Right — liner notes */}
        <div className="pd-notes">
          <div className="pd-kicker">
            <span>▸ {playing ? "Now Playing" : "Ready to Spin"}</span>
            <span className="pd-dots">● ● ●</span>
          </div>
          <h2 className="pd-title">{p.name}</h2>
          <div className="pd-sub">{p.sub}</div>

          <div className="pd-tags">
            {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>

          <div className="pd-liner">
            <div className="pd-label">Liner Notes</div>
            {p.story.map((s, i) => <p key={i}>{s}</p>)}
          </div>

          <div className="pd-tracks">
            <div className="pd-label">Tracklist</div>
            {p.features.map((f, i) => (
              <div className="pd-track" key={i}>
                <div className="pd-track-num">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="pd-track-title">{f.title}</div>
                  <div className="pd-track-body">{f.body}</div>
                </div>
                <div className="pd-track-play">▸</div>
              </div>
            ))}
          </div>

          {p.media && p.media.length > 0 && (
            <div className="pd-media">
              <div className="pd-label">B-Roll</div>
              <div className="pd-media-grid">
                {p.media.map((m, i) => (
                  <MediaBlock key={i} m={m} />
                ))}
              </div>
            </div>
          )}

          <div className="pd-credits">
            <div className="pd-label">Credits</div>
            <div className="pd-stack">
              {p.stack.map((s) => <span key={s} className="chip alt">{s}</span>)}
            </div>
          </div>

          <div className="pd-cta-row">
            {p.links.map((l) => (
              <a key={l.href} className="pd-cta" href={l.href} target="_blank" rel="noreferrer">
                {l.label} <span>↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

window.ProjectDetail = ProjectDetail;
