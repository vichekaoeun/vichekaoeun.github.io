// Abstract SVG thumbnails per project — no representational AI-slop drawings,
// just typographic / pattern marks that hint at the project's domain.
const ThumbTinyInference = () => {
  // 3-layer net: input(4) -> hidden(5) -> hidden(4) -> output(3)
  const layers = [
    [22, 38, 54, 70],
    [16, 32, 48, 64, 80],
    [22, 38, 54, 70],
    [38, 54, 70],
  ];
  const xs = [14, 36, 58, 80];
  // pseudo-random weights — deterministic so it doesn't reflow
  const w = (i) => 0.15 + (((i * 53) % 17) / 17) * 0.6;
  const edges = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (let i = 0; i < layers[l].length; i++) {
      for (let j = 0; j < layers[l + 1].length; j++) {
        edges.push({
          x1: xs[l], y1: layers[l][i],
          x2: xs[l + 1], y2: layers[l + 1][j],
          op: w(l * 100 + i * 10 + j),
        });
      }
    }
  }
  // hottest path through the net (highlighted)
  const hot = [
    { x1: xs[0], y1: layers[0][1], x2: xs[1], y2: layers[1][2] },
    { x1: xs[1], y1: layers[1][2], x2: xs[2], y2: layers[2][1] },
    { x1: xs[2], y1: layers[2][1], x2: xs[3], y2: layers[3][1] },
  ];

  return (
    <svg className="thumb-svg" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="var(--paper)" />
      {edges.map((e, i) => (
        <line
          key={i}
          x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke="var(--ink-soft)"
          strokeWidth="0.4"
          opacity={e.op}
        />
      ))}
      {hot.map((e, i) => (
        <line
          key={"h" + i}
          x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke="var(--accent)"
          strokeWidth="1"
        />
      ))}
      {layers.map((col, l) =>
        col.map((y, i) => (
          <circle
            key={`${l}-${i}`}
            cx={xs[l]} cy={y} r="2.4"
            fill="var(--paper)"
            stroke="var(--ink-soft)"
            strokeWidth="0.8"
          />
        ))
      )}
      {/* highlighted activations on the hot path */}
      <circle cx={xs[0]} cy={layers[0][1]} r="2.4" fill="var(--accent)" stroke="var(--accent)" />
      <circle cx={xs[1]} cy={layers[1][2]} r="2.4" fill="var(--accent)" stroke="var(--accent)" />
      <circle cx={xs[2]} cy={layers[2][1]} r="2.4" fill="var(--accent)" stroke="var(--accent)" />
      <circle cx={xs[3]} cy={layers[3][1]} r="2.4" fill="var(--accent)" stroke="var(--accent)" />
      {/* token stream emerging from the output */}
      <text
        x="92" y={layers[3][1] + 1.5}
        fontFamily="var(--mono)" fontSize="5"
        fill="var(--accent)" textAnchor="end"
      >→ tok</text>
    </svg>
  );
};

const ThumbKV = () => (
  <svg className="thumb-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
    <rect width="100" height="100" fill="var(--paper)" />
    <g fontFamily="var(--mono)" fontSize="7" fill="var(--ink-soft)">
      <text x="8" y="22">SET</text>
      <text x="8" y="34">GET</text>
      <text x="8" y="46">DEL</text>
      <text x="8" y="58">PING</text>
      <text x="8" y="70">SET</text>
      <text x="8" y="82">GET</text>
    </g>
    <g fontFamily="var(--mono)" fontSize="7" fill="var(--accent)">
      <text x="38" y="22">+OK</text>
      <text x="38" y="34">$5</text>
      <text x="38" y="46">:1</text>
      <text x="38" y="58">+PONG</text>
      <text x="38" y="70">+OK</text>
      <text x="38" y="82">$3</text>
    </g>
    <line x1="0" y1="88" x2="100" y2="88" stroke="var(--rule)" strokeWidth="1" />
    <text x="8" y="96" fontFamily="var(--mono)" fontSize="6" fill="var(--ink-mute)" letterSpacing="0.5">:6380</text>
  </svg>
);

const ThumbLupin = () => (
  <svg className="thumb-svg" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="var(--paper)" />
    <text x="50" y="58" fontFamily="serif" fontSize="46" fill="var(--ink)" textAnchor="middle" fontWeight="500">語</text>
    <text x="50" y="76" fontFamily="var(--mono)" fontSize="6" fill="var(--ink-mute)" textAnchor="middle" letterSpacing="1">KOTOBA</text>
    <g fill="var(--accent)">
      <circle cx="20" cy="20" r="2" />
      <circle cx="80" cy="20" r="2" />
      <circle cx="20" cy="86" r="2" />
      <circle cx="80" cy="86" r="2" />
    </g>
  </svg>
);

const ThumbScango = () => (
  <svg className="thumb-svg" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="var(--paper)" />
    <g fontFamily="var(--mono)" fontSize="6" fill="var(--ink-soft)">
      <text x="6" y="14">if err :=</text>
      <text x="6" y="24">  http.Get(</text>
      <text x="6" y="34">    url)</text>
      <text x="6" y="44">db.Exec(</text>
      <text x="6" y="54">  "SELECT" +</text>
      <text x="6" y="64">  user)</text>
      <text x="6" y="74">secret :=</text>
      <text x="6" y="84">  "sk-..."</text>
    </g>
    <rect x="2" y="38" width="96" height="10" fill="var(--accent)" opacity="0.18" />
    <rect x="2" y="68" width="96" height="20" fill="var(--accent)" opacity="0.18" />
    <text x="92" y="44" fontFamily="var(--mono)" fontSize="6" fill="var(--accent)" textAnchor="end">!</text>
    <text x="92" y="84" fontFamily="var(--mono)" fontSize="6" fill="var(--accent)" textAnchor="end">!</text>
  </svg>
);

const ThumbIdetic = () => (
  <svg className="thumb-svg" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="var(--paper)" />
    {Array.from({ length: 28 }).map((_, i) => {
      const x = 6 + (i % 7) * 13;
      const y = 14 + Math.floor(i / 7) * 18;
      const h = 4 + ((i * 37) % 9);
      return <rect key={i} x={x} y={y} width="9" height={h} fill="var(--ink-soft)" opacity="0.5" />;
    })}
    <rect x="32" y="40" width="9" height="9" fill="var(--accent)" />
    <line x1="36" y1="49" x2="36" y2="92" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2" />
    <text x="36" y="98" fontFamily="var(--mono)" fontSize="5" fill="var(--accent)" textAnchor="middle">02:14</text>
  </svg>
);

const ThumbSentinel = () => (
  <svg className="thumb-svg" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="var(--paper)" />
    <polyline
      points="2,72 12,68 22,74 32,60 42,64 52,48 62,56 72,40 82,46 98,30"
      fill="none" stroke="var(--ink-soft)" strokeWidth="1.2"
    />
    <polyline
      points="2,80 12,82 22,76 32,84 42,72 52,80 62,66 72,72 82,58 98,64"
      fill="none" stroke="var(--accent)" strokeWidth="1.2"
    />
    <line x1="0" y1="50" x2="100" y2="50" stroke="var(--accent)" strokeDasharray="2 3" strokeWidth="0.8" opacity="0.6" />
    <text x="6" y="14" fontFamily="var(--mono)" fontSize="6" fill="var(--ink-mute)">RISK / P&amp;L</text>
    <text x="6" y="48" fontFamily="var(--mono)" fontSize="5" fill="var(--accent)">LIMIT</text>
  </svg>
);

const ThumbNetpulse = () => (
  <svg className="thumb-svg" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="var(--paper)" />
    {Array.from({ length: 5 }).map((_, row) => (
      <g key={row}>
        {Array.from({ length: 16 }).map((_, col) => {
          const v = ((row * 7 + col * 13) % 11);
          const ok = v > 2;
          return (
            <rect
              key={col}
              x={4 + col * 6}
              y={14 + row * 14}
              width="4"
              height="10"
              fill={ok ? "var(--ink-soft)" : "var(--accent)"}
              opacity={ok ? 0.55 : 1}
            />
          );
        })}
      </g>
    ))}
    <text x="4" y="92" fontFamily="var(--mono)" fontSize="5" fill="var(--ink-mute)">5 HOSTS · 24H</text>
  </svg>
);

const Thumb = ({ kind }) => {
  switch (kind) {
    case "tinyinference": return <ThumbTinyInference />;
    case "kv": return <ThumbKV />;
    case "lupin": return <ThumbLupin />;
    case "scango": return <ThumbScango />;
    case "idetic": return <ThumbIdetic />;
    case "sentinel": return <ThumbSentinel />;
    case "netpulse": return <ThumbNetpulse />;
    default: return null;
  }
};

window.Thumb = Thumb;
