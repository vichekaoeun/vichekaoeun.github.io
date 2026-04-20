// Content data for the site
const SITE = {
  handle: "VICHEKA.OEUN",
  name: "Vicheka Oeun",
  subtitle: "Builder / Security-leaning Engineer",
  codeName: "CODE NAME — WANDERER",
  location: "EARTH // IRL",
};

const SECTIONS = [
  {
    id: "about",
    label: "About",
    sub: "Profile",
    mark: "A",
    kicker: "Dossier / 01",
    title: ["Hey, I'm ", "Vic", "."],
    render: "about",
  },
  {
    id: "experience",
    label: "Experience",
    sub: "Logs",
    mark: "E",
    kicker: "Mission Log / 04",
    title: ["Work", " History", "."],
    render: "experience",
  },
  {
    id: "projects",
    label: "Projects",
    sub: "Heists",
    mark: "P",
    kicker: "Current Targets / 03",
    title: ["Selected", " Work", "."],
    render: "projects",
  },
  {
    id: "skills",
    label: "Stats",
    sub: "Abilities",
    mark: "S",
    kicker: "Ability Set / 02",
    title: ["Skills &", " Stack", "."],
    render: "skills",
  },
  {
    id: "contact",
    label: "Contact",
    sub: "Request",
    mark: "C",
    kicker: "Establish Contact / 05",
    title: ["Let's", " Talk", "."],
    render: "contact",
  },
];

const ABOUT = [
  "I build things that live at the overlap of systems engineering and software engineering i.e CLIs, scanners, and small tools that make life less painful for the people who have to run production.",
  "Lately I've been into Machine Learning, Go, and anything that lets me write a tool once and forget about it. I like projects with a clear shape: a real input, a real output, a small blast radius.",
  "Outside of that: painting, JRPGs, films, books.",
];

const SKILLS = [
  { group: "Languages", items: ["Go", "TypeScript", "Python", "C#", "Bash", "SQL"], acid: true },
  { group: "Systems & Infra", items: ["Linux", "Docker", "Jenkins", "MS SQL Server", "WireShark", "Apache Kafka"] },
  { group: "Frontend / Backend", items: ["React", "Angular", ".NET", "xUnit", "Jasmine", "Playwright"] },
  { group: "Concepts", items: ["OOP", "SOLID", "Release Engineering", "Unit Testing"], acid: true },
];

const PROJECTS = [
  {
    num: "01",
    name: "SCANGO-LITE",
    sub: "Static analyzer for Go, the solo edition",
    desc: "A lightweight static analyzer for Go security issues.",
    tags: ["GO", "AST", "SECURITY", "CLI"],
    href: "https://github.com/vichekaoeun/scango-lite",
    year: "2025",
    runtime: "~10 MIN READ",
    palette: ["#ff6aa2", "#ffa04b", "#ffe28a", "#a8e6c9", "#9ad6ff", "#c9b6ff"],
    story: [
      "Scango-lite will scan through a Go application looking for security issues like, hardcoded secrets, sql injection, unsecure http and command injection; only scanning through the current directory you're in (folders and files). "
    ],
    features: [
      { title: "AST-based scanning", body: "Walks the go/ast tree. Precise line/column reporting without regex guesswork." },
      { title: "Pluggable rules", body: "Each check lives in its own file. Add, remove, or tune without touching the runner." },
      { title: "Single binary", body: "`go install` and go. No services, no agents, no daemons." },
      { title: "CI-friendly output", body: "JSON + human-readable modes. Non-zero exit on findings by default." }
    ],
    stack: ["Go", "go/ast", "go/parser", "Cobra"],
    media: [
      { type: "video", src: "site/videos/scango-lite-demo.mp4", caption: "Demo walkthrough" },
    ],
    links: [{ label: "Repo", href: "https://github.com/vichekaoeun/scango-lite" }]
  },
  {
    num: "02",
    name: "IDETIC",
    sub: "Personal Embedded Video Vector",
    desc: "A machine learning video-to-text search engine for clips and moments within long videos",
    tags: ["TYPESCRIPT", "PYTHON"],
    href: "https://github.com/vichekaoeun/idetic",
    year: "2025",
    runtime: "~12 MIN READ",
    palette: ["#b47dff", "#9ad6ff", "#a8e6c9", "#ffe28a", "#ffa04b", "#ff6aa2"],
    story: [
      "Idetic is the answer to \"where was that bit in the video again?\", an embedding-powered search layer over personal video libraries.",
      "It pulls audio, transcribes it, chunks by semantic sections, embeds those, and indexes them. A Next.js front lets you search in natural language and jump to the exact moment."
    ],
    features: [
      { title: "Semantic search", body: "Query in natural language; hits rank by meaning, not keyword overlap." },
      { title: "Timestamped jumps", body: "Every result links to the precise second in the source video." },
      { title: "Data pipeline", body: "Transcription + embedding run locally. Your footage doesn't leave the machine." },
      { title: "Snappy UI", body: "Next.js app streams results as they arrive instead of waiting on the full scan." }
    ],
    stack: ["TypeScript", "Next.js", "Python", "FastAPI", "PyTorch", "OpenCV"],
    media: [
      { type: "youtube", id: "5iVqBLHySLU", caption: "Demo walkthrough" },
    ],
    links: [{ label: "Repo", href: "https://github.com/vichekaoeun/idetic" }]
  },
  {
    num: "03",
    name: "SENTINEL",
    sub: "Watchful, not noisy",
    desc: "A comprehensive trade capture and risk management system for financial institutions.",
    tags: ["MONITORING", "OBSERVABILITY", "JAVA"],
    href: "https://github.com/vichekaoeun/sentinel",
    year: "2024",
    runtime: "~8 MIN READ",
    palette: ["#a8e6c9", "#9ad6ff", "#c9b6ff", "#ffb3c7", "#ffc4a3", "#ffe28a"],
    story: [
      "Sentinel enables financial institutions to monitor trading activities, calculate real-time risk metrics, and generate alerts when risk limits are breached. It provides traders and risk managers with immediate visibility into trading positions and risk exposure through a real-time dashboard. "
    ],
    features: [
      { title: "Kafka event streaming", body: "Trades publish to a Kafka topic; the risk engine consumes and processes them asynchronously." },
      { title: "WebSocket push", body: "Alerts and position updates flow to the React dashboard over a persistent socket, no polling." },
      { title: "REST trade API", body: "Spring Boot endpoints handle trade capture with full validation before events hit the queue." },
      { title: "In-memory state", body: "H2 backs positions and P&L so the whole system spins up with zero external dependencies." }
    ],
    media: [
      { type: "video", src: "site/videos/sentinel-demo.mp4", caption: "Demo walkthrough" },
    ],
    stack: ["Java", "Spring", "React", "Kafka", "FinnHub API"],
    links: [{ label: "Repo", href: "https://github.com/vichekaoeun/sentinel" }]
  },
  {
    num: "04",
    name: "NETPULSE",
    sub: "Is it up? For real?",
    desc: "Real-time network monitoring tool for tracking latency and packet loss across multiple targets.",
    tags: ["NETWORKING", "SYSTEMS", "C"],
    href: "https://github.com/vichekaoeun/netpulse",
    year: "2024",
    runtime: "~6 MIN READ",
    palette: ["#ffe28a", "#ffa04b", "#ff6aa2", "#b47dff", "#9ad6ff", "#a8e6c9"],
    story: [
      "Netpulse was born out of frustration with status pages that lie. It's a small probe + dashboard pair that pings endpoints at a honest cadence and shows the truth in real time.",
      "The dashboard keeps the last 24 hours in memory and renders it as a wall of tiny heartbeats, glance at it, know the state."
    ],
    features: [
      { title: "Raw ICMP probes", body: "Crafted at the socket level in C. No ping subprocess, no abstraction layer lying to you." },
      { title: "Live terminal UI", body: "NCURSES dashboard refreshes in place — latency and loss update as packets come back." },
      { title: "Multi-target fanout", body: "Polls all hosts concurrently. One slow target doesn't stall the rest." },
      { title: "Heartbeat history", body: "Rolling time-series per host. Packet loss spikes are visible at a glance, not buried in logs." }
    ],
    stack: ["C", "ICMP", "NCURSES"],
    media: [
      { type: "video", src: "site/videos/netpulse-demo.mp4", caption: "Demo walkthrough" },
    ],
    links: [{ label: "Repo", href: "https://github.com/vichekaoeun/netpulse" }]
  },
];

const EXPERIENCE = [
  {
    date: "NOW",
    role: "Site Reliability Engineer Intern",
    co: "IBM",
    body: "Incoming on the IBM Maximo team for Summer 2026. I'll be working on reliability and observability features for their enterprise asset management suite, with a focus on making the lives of on-call engineers less painful.",
  },
  {
    date: "05/2025 - 04/2026",
    role: "Software Developer Intern",
    co: "SOTI",
    body: "I worked on the VPN team, improving vpn to support multiple servers and adding features for per-app, split-tunnel, ssid and internal domains support, impacting thousands of enterprise devices.",
  },
  {
    date: "EXP 04/2027",
    role: "Computer Science Co-op Student",
    co: "Toronto Metropolitan University",
    body: "I did various things including research on model-driven engineering, ran a tech-for-social-good student org and worked on a cloud native open source project.",
  },
];

const CONTACT = [
  { label: "Email", val: "vicheka.oeun@torontomu.ca", href: "mailto:vic@example.com", acid: true },
  { label: "GitHub", val: "vichekaoeun", href: "https://github.com/vichekaoeun" },
  { label: "LinkedIn", val: "/in/vichekaoeun", href: "https://www.linkedin.com/in/vichekaoeun/" },
  { label: "Location", val: "Toronto, ON", href: "#" },
];

Object.assign(window, { SITE, SECTIONS, ABOUT, SKILLS, PROJECTS, EXPERIENCE, CONTACT });
