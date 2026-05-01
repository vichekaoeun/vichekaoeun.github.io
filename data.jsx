// Content for the site
const SITE = {
  name: "",
  handle: "vic",
  pronunciation: "/vee-cheh-kah/",
  blurb: [
    "I'm a computer science student at Toronto Metropolitan University, building things at the overlap of systems and software engineering, diagnostics, automation, and developer tools that make life less painful for the people running production.",
    "This summer (2026) I'll be a Site Reliability Engineering intern on the IBM Maximo team, working on observability and reliability for their enterprise asset management suite. Before that, I spent a year at SOTI on the VPN team, shipping multi-server, per-app, split-tunnel and SSID-aware support to thousands of enterprise devices.",
    "Outside of work I read a lot, watch films, and play long JRPGs. If you'd like to chat, about systems, security, building open source, or anything else, feel free to {EMAIL}. You can also find me on {GITHUB} and {LINKEDIN}."
  ],
};

const PROJECTS = [
  {
    name: "TinyInference",
    year: "2026",
    role: "solo / C++",
    tags: ["C++", "LLM", "HTTP", "LOCK-FREE"],
    href: "https://github.com/vichekaoeun/tinyinference",
    demo: null,
    thumb: { kind: "tinyinference" },
    blurb: [
      "A self-hosted LLM inference server in C++. A hand-rolled HTTP/1.1 parser, SSE streaming, and JSON live on raw sockets; llama.cpp handles GGUF model loading with configurable GPU-layer offload.",
      "Inference and HTTP run on separate threads, decoupled by a lock-free SPSC ring buffer with cache-line-aligned atomics, tokens pipeline from generation to wire with zero mutex contention.",
      "Per-request sampler overrides (Top-K, Top-P, temperature) plug into llama.cpp's sampler chain and fall back to server defaults when omitted, so callers can tune sampling without a model reload between requests."
    ],
    links: [
      { label: "Repo", href: "https://github.com/vichekaoeun/tinyinference" },
    ],
  },
  {
    name: "kv-from-scratch",
    year: "2026",
    role: "solo / Go",
    tags: ["GO", "SYSTEMS", "DATABASES", "WAL"],
    href: "https://github.com/vichekaoeun/kv-store-scratch",
    demo: null, // no live demo — terminal-only
    thumb: { kind: "kv" },
    blurb: [
      "A persistent, concurrent key-value store in Go. Speaks an inline text protocol over TCP (compatible with `redis-cli -p 6380`) and supports SET, GET, and DEL with optional TTL.",
      "Writes are appended to a write-ahead log before mutating the in-memory map, making crashes recoverable by replay. A background compactor periodically snapshots full state and truncates the WAL, bounding recovery time regardless of uptime; atomic rename ensures a mid-compaction crash leaves the previous snapshot intact.",
      "Concurrency is handled with sync.RWMutex over a hash map. The server flushes responses only when its read buffer empties, allowing pipelined clients to receive all responses in a single syscall. At pipeline depth 16, GET throughput is ~2.5× higher; at depth 64, it exceeds Redis 8.6's baseline on the same machine."
    ],
    links: [
      { label: "Repo", href: "https://github.com/vichekaoeun/kv-store-scratch" },
    ],
  },
  {
    name: "Lupin",
    year: "2026",
    role: "solo / TS, AWS",
    tags: ["NEXT.JS", "AWS", "CLAUDE", "DYNAMODB"],
    href: "https://github.com/vichekaoeun/lupin",
    demo: "https://lupin-kappa.vercel.app/",
    thumb: { kind: "lupin" },
    blurb: [
      "A Japanese vocabulary app that generates complete flashcards from a single word. Input a word and a cultural theme — anime, gaming, manga, or others — and receive a card with reading, meaning, JLPT level, example sentences with furigana, cultural references, and a contextual dialogue, along with native audio via AWS Polly.",
      "Cards enter an SM-2 spaced-repetition queue. After each review, recall is rated 0–5 and the next review date adjusts accordingly. Cards with repeated failures are suspended after 8 cumulative misses to keep the queue manageable.",
      "Built on Next.js 16 with a single-table DynamoDB design and a GSI on nextReview for efficient due-card queries. Auth is AWS Cognito with JWTs in httpOnly cookies; audio is cached 24 hours; rate limiting runs in Redis with an in-process fallback for local development. Infrastructure provisioned with AWS CDK."
    ],
    links: [
      { label: "Repo", href: "https://github.com/vichekaoeun/lupin" },
    ],
  },
  {
    name: "scango-lite",
    year: "2025",
    role: "solo / Go",
    tags: ["GO", "AST", "SECURITY", "CLI"],
    href: "https://github.com/vichekaoeun/scango-lite",
    demo: null,
    thumb: { kind: "scango" },
    blurb: [
      "A lightweight static analyzer for Go security vulnerabilities: hardcoded secrets, SQL injection, insecure HTTP, and command injection.",
      "Analyzes the go/ast tree directly rather than regex matching source text, providing precise line and column reporting. Each rule is isolated to its own file, making them easy to add, remove, or tune independently. Installs as a single binary via go install, outputs JSON or human-readable text, and exits non-zero on findings for clean CI integration."
    ],
    links: [
      { label: "Repo", href: "https://github.com/vichekaoeun/scango-lite" },
    ],
  },
  {
    name: "Idetic",
    year: "2025",
    role: "with collaborators",
    tags: ["TYPESCRIPT", "PYTHON", "ML", "EMBEDDINGS"],
    href: "https://github.com/vichekaoeun/idetic",
    demo: "https://youtu.be/5iVqBLHySLU",
    thumb: { kind: "idetic" },
    blurb: [
      "A semantic search layer for personal video libraries. Extracts audio, transcribes it, segments the transcript by semantic section, embeds each segment, and indexes the result for natural-language querying.",
      "A Next.js front-end ranks results by semantic similarity rather than keyword matching and links each hit to the precise timestamp in the source video. Transcription and embedding run entirely on-device; no video data is sent to external services."
    ],
    links: [
      { label: "Repo", href: "https://github.com/vichekaoeun/idetic" },
    ],
  },
  {
    name: "Sentinel",
    year: "2024",
    role: "solo / Java, React",
    tags: ["JAVA", "SPRING", "KAFKA", "REACT"],
    href: "https://github.com/vichekaoeun/sentinel",
    demo: null,
    thumb: { kind: "sentinel" },
    blurb: [
      "A trade capture and risk monitoring system for financial institutions. Trades publish to a Kafka topic; a risk engine consumes them asynchronously, computes real-time exposure metrics, and pushes alerts and position updates to a React dashboard over a persistent WebSocket.",
      "Spring Boot REST endpoints handle trade capture with full validation before events reach the queue. H2 in-memory database backs positions and P&L, allowing the system to run without external dependencies."
    ],
    links: [
      { label: "Repo", href: "https://github.com/vichekaoeun/sentinel" },
    ],
  },
  {
    name: "Netpulse",
    year: "2024",
    role: "solo / C",
    tags: ["C", "ICMP", "NETWORKING", "NCURSES"],
    href: "https://github.com/vichekaoeun/netpulse",
    demo: null,
    thumb: { kind: "netpulse" },
    blurb: [
      "A network monitoring tool that crafts raw ICMP probes at the socket level without relying on system ping utilities. All targets are polled concurrently, so a slow or unresponsive host does not delay results for others.",
      "An ncurses dashboard refreshes in place as packets return: per-target latency and loss update live, alongside a rolling 24-hour heartbeat history rendered as a compact timeline."
    ],
    links: [
      { label: "Repo", href: "https://github.com/vichekaoeun/netpulse" },
    ],
  },
];

const EXPERIENCE = [
  {
    when: "Current",
    role: "Site Reliability Engineer Intern",
    org: "IBM",
    body: "Incoming on the IBM Maximo team, reliability and observability features for their enterprise asset management suite, with a focus on making the lives of on-call engineers less painful.",
  },
  {
    when: "May 2025 – Apr 2026",
    role: "Software Developer Intern",
    org: "SOTI",
    body: "VPN team. Extended the client to support multiple servers concurrently and shipped per-app, split-tunnel, SSID-aware and internal-domain routing features, landing on thousands of enterprise devices.",
  },
  {
    when: "Expected 04/2027",
    role: "Computer Science Co-op",
    org: "Toronto Metropolitan University",
    body: "Research on model-driven engineering, ran a tech-for-social-good student org (Blueprint), and contributed to a cloud-native open-source project.",
  },
];

const SKILLS = {
  Languages: ["Go", "TypeScript", "Python", "C#", "C++", "Java", "Bash", "SQL"],
  Systems: ["Linux", "Docker", "Jenkins", "Kafka", "DynamoDB", "S3", "MS SQL Server"],
  Frameworks: ["React", "Angular", ".NET", "AWS CDK"]
};

const CONTACT = {
  email: "vicheka.oeun@torontomu.ca",
  github: "https://github.com/vichekaoeun",
  linkedin: "https://www.linkedin.com/in/vichekaoeun/",
  location: "Toronto, ON",
};

Object.assign(window, { SITE, PROJECTS, EXPERIENCE, SKILLS, CONTACT });
