// Per-project WebAudio synth — each project has a unique theme that loops.
// No external audio files; all generated on the fly.

const THEMES = {
  "01": { // SCANGO-LITE — sharp, staccato security pulse
    name: "Syntax Scanner Dub",
    bpm: 110,
    key: "A minor",
    waveLead: "square",
    waveBass: "sawtooth",
    lead:  [57, 60, 64, 67, 64, 60, 65, 60], // A3 C4 E4 G4 E4 C4 F4 C4
    bass:  [45, 45, 52, 45, 48, 48, 53, 48],
    drums: [1,0,1,0,1,0,1,0],
  },
  "02": { // IDETIC — dreamy, embedding-space float
    name: "Vector Dream",
    bpm: 88,
    key: "D major",
    waveLead: "sine",
    waveBass: "triangle",
    lead:  [62, 66, 69, 74, 71, 69, 66, 74],
    bass:  [38, 38, 45, 45, 43, 43, 50, 50],
    drums: [1,0,0,0,1,0,0,0],
  },
  "03": { // SENTINEL — watchful, minor, steady
    name: "Night Watcher",
    bpm: 96,
    key: "E minor",
    waveLead: "triangle",
    waveBass: "sawtooth",
    lead:  [64, 67, 71, 67, 72, 71, 67, 64],
    bass:  [40, 40, 47, 47, 45, 45, 47, 40],
    drums: [1,0,1,0,1,1,1,0],
  },
  "04": { // NETPULSE — bouncy, pingy, uptempo
    name: "Uplink Bounce",
    bpm: 126,
    key: "G major",
    waveLead: "square",
    waveBass: "triangle",
    lead:  [67, 71, 74, 79, 74, 71, 76, 74],
    bass:  [43, 43, 50, 50, 48, 48, 55, 50],
    drums: [1,1,0,1,1,0,1,0],
  },
};

const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

class ProjectSynth {
  constructor(theme) {
    this.theme = theme;
    this.ctx = null;
    this.master = null;
    this.timer = null;
    this.step = 0;
    this.playing = false;
    this._vol = 0.25;
  }
  _ensure() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this._vol;
    // gentle lowpass to keep it mellow + reverb-y delay
    const lp = this.ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 3800;
    const delay = this.ctx.createDelay();
    delay.delayTime.value = 60 / this.theme.bpm / 2;
    const fb = this.ctx.createGain();
    fb.gain.value = 0.28;
    const wet = this.ctx.createGain();
    wet.gain.value = 0.25;
    this.master.connect(lp);
    lp.connect(this.ctx.destination);
    lp.connect(delay);
    delay.connect(fb);
    fb.connect(delay);
    delay.connect(wet);
    wet.connect(this.ctx.destination);
  }
  setVolume(v) {
    this._vol = v;
    if (this.master) this.master.gain.setTargetAtTime(v, this.ctx.currentTime, 0.05);
  }
  _note(freq, wave, dur, gain = 0.2, when = 0) {
    const t0 = this.ctx.currentTime + when;
    const osc = this.ctx.createOscillator();
    osc.type = wave;
    osc.frequency.value = freq;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }
  _kick(when = 0) {
    const t0 = this.ctx.currentTime + when;
    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(120, t0);
    osc.frequency.exponentialRampToValueAtTime(40, t0 + 0.15);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.5, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.18);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t0);
    osc.stop(t0 + 0.25);
  }
  _tick() {
    const t = this.theme;
    const s = this.step % t.lead.length;
    this._note(mtof(t.lead[s]),  t.waveLead, 0.35, 0.18);
    if (s % 2 === 0) this._note(mtof(t.bass[s]), t.waveBass, 0.55, 0.22);
    if (t.drums[s]) this._kick();
    this.step++;
  }
  play() {
    this._ensure();
    if (this.ctx.state === "suspended") this.ctx.resume();
    if (this.playing) return;
    this.playing = true;
    const interval = 60000 / this.theme.bpm / 2; // 8th notes
    this._tick();
    this.timer = setInterval(() => this._tick(), interval);
  }
  stop() {
    this.playing = false;
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.step = 0;
  }
  destroy() {
    this.stop();
    if (this.ctx) { try { this.ctx.close(); } catch {} this.ctx = null; }
  }
}

window.THEMES = THEMES;
window.ProjectSynth = ProjectSynth;
