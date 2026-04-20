// Psychedelic pastel background: liquid swirls, orbiting shapes, halftone dots
const Bg = () => {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(0);
  const tRef = React.useRef(0);

  React.useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // helpers
    const blob = (cx, cy, r, col, t, wob) => {
      ctx.fillStyle = col;
      ctx.beginPath();
      const steps = 60;
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const rr = r + Math.sin(a * 3 + t * wob) * r * 0.18
                     + Math.cos(a * 5 - t * (wob * 0.7)) * r * 0.08;
        const x = cx + Math.cos(a) * rr;
        const y = cy + Math.sin(a) * rr;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    };

    const draw = () => {
      tRef.current += 0.005;
      const t = tRef.current;

      // cream base
      ctx.fillStyle = "#f7efde";
      ctx.fillRect(0, 0, w, h);

      // big soft swirling blobs (pastel)
      blob(w*0.18, h*0.22, 260, "rgba(201,182,255,0.55)", t, 1.0);   // lavender
      blob(w*0.72, h*0.18, 220, "rgba(255,196,163,0.55)", t, 0.8);   // peach
      blob(w*0.86, h*0.78, 300, "rgba(168,230,201,0.55)", t, 0.9);   // mint
      blob(w*0.32, h*0.82, 260, "rgba(255,179,199,0.55)", t, 1.1);   // rose
      blob(w*0.55, h*0.48, 160, "rgba(255,226,138,0.45)", t, 1.3);   // butter

      // concentric groove rings (record)
      ctx.save();
      ctx.translate(w*0.78, h*0.62);
      ctx.rotate(t * 0.2);
      for (let r = 30; r < 220; r += 12) {
        ctx.strokeStyle = `rgba(42,26,62,${0.07 + (r % 24 === 0 ? 0.06 : 0)})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI*2);
        ctx.stroke();
      }
      ctx.restore();

      // second set, smaller, on the left
      ctx.save();
      ctx.translate(w*0.12, h*0.7);
      ctx.rotate(-t * 0.15);
      for (let r = 20; r < 140; r += 10) {
        ctx.strokeStyle = `rgba(75,46,131,${0.06})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI*2);
        ctx.stroke();
      }
      ctx.restore();

      // halftone dots, drifting
      const step = 30;
      const ox = Math.sin(t * 0.6) * 8;
      const oy = Math.cos(t * 0.4) * 8;
      for (let y = -step; y < h + step; y += step) {
        for (let x = -step; x < w + step; x += step) {
          const cx = x + ox + ((y / step) % 2 ? step / 2 : 0);
          const cy = y + oy;
          const d = Math.hypot(cx - w*0.5, cy - h*0.5) / Math.max(w, h);
          const r = 0.8 + (1 - d) * 1.6;
          ctx.fillStyle = "rgba(75,46,131,0.07)";
          ctx.beginPath();
          ctx.arc(cx, cy, Math.max(0.5,r), 0, Math.PI*2);
          ctx.fill();
        }
      }

      // a few orbiting tiny planets
      const orbits = [
        {cx: w*0.22, cy: h*0.5, r: 180, s: 0.6, col: "#ff6aa2", rad: 9},
        {cx: w*0.62, cy: h*0.32, r: 130, s: -0.8, col: "#9ad6ff", rad: 7},
        {cx: w*0.46, cy: h*0.72, r: 220, s: 0.4, col: "#ffe28a", rad: 11},
      ];
      orbits.forEach(o => {
        const x = o.cx + Math.cos(t * o.s) * o.r;
        const y = o.cy + Math.sin(t * o.s) * o.r;
        ctx.fillStyle = o.col;
        ctx.beginPath();
        ctx.arc(x, y, o.rad, 0, Math.PI*2);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(42,26,62,0.75)";
        ctx.stroke();
      });

      // wavy horizon line
      ctx.strokeStyle = "rgba(42,26,62,0.1)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const y = h*0.55 + Math.sin(x*0.012 + t*1.2) * 22 + Math.cos(x*0.005 - t*0.8) * 10;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="bg-wrap">
      <canvas ref={canvasRef} className="bg-canvas" />
    </div>
  );
};

window.Bg = Bg;
