"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

// A slowly rotating brain drawn as a graph: nodes sampled over two cerebral
// hemispheres, a cerebellum and a brainstem, each wired to its nearest neighbours.
// Signals hop along the wires and branch, so activity cascades across the surface.

const BRAIN = "206,98,132"; // rose pink
const SIGNAL = "214,32,84"; // deep ruby, so firing stands out against the pink
const NODES_PER_HEMI = 340;
const NODES_CEREBELLUM = 110;
const NODES_STEM = 30;
const NEIGHBOURS = 4;
const SPIN = 0.18; // rad/s
const TILT = 0.28; // rad, so we look slightly down on it
const CAMERA = 4.2;
const FIT = 0.84; // share of the canvas the brain fills at zoom 1
const HOP = 0.45; // seconds for a signal to cross one wire
const MAX_PULSES = 220;

type Vec = [number, number, number];

// Small seeded RNG so the brain looks the same every load.
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Evenly spread points over an ellipsoid, with sulci-like ripples pushed along the normal.
function ellipsoid(n: number, c: Vec, r: Vec, fold: number, shape: (p: Vec) => Vec): Vec[] {
  const out: Vec[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - ((i + 0.5) / n) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    const ux = Math.cos(th) * rad;
    const uz = Math.sin(th) * rad;
    const ripple =
      1 +
      fold * (Math.sin(9 * ux + 3 * y) * Math.sin(8 * y + 2 * uz) + 0.6 * Math.sin(11 * uz + 5 * ux));
    out.push(shape([c[0] + ux * r[0] * ripple, c[1] + y * r[1] * ripple, c[2] + uz * r[2] * ripple]));
  }
  return out;
}

function buildBrain() {
  const rand = rng(7);
  const pts: Vec[] = [];

  for (const s of [-1, 1]) {
    pts.push(
      ...ellipsoid(NODES_PER_HEMI, [s * 0.4, 0.05, 0], [0.62, 0.82, 1.2], 0.07, ([x, y, z]) => [
        s * Math.max(0.05, s * x), // keep a gap down the midline
        y < -0.25 ? -0.25 + (y + 0.25) * 0.55 : y, // flatter underside
        z,
      ]),
    );
  }
  pts.push(...ellipsoid(NODES_CEREBELLUM, [0, -0.62, -0.85], [0.55, 0.3, 0.4], 0.1, (p) => p));
  for (let i = 0; i < NODES_STEM; i++) {
    const t = rand();
    const a = rand() * Math.PI * 2;
    pts.push([Math.cos(a) * 0.17, -0.5 - t * 0.75, -0.45 - t * 0.1 + Math.sin(a) * 0.17]);
  }

  // Wire each node to its nearest neighbours.
  const seen = new Set<number>();
  const ea: number[] = [];
  const eb: number[] = [];
  const adj: number[][] = pts.map(() => []);
  pts.forEach((p, i) => {
    const near = pts
      .map((q, j) => ({ j, d: (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, NEIGHBOURS);
    for (const { j } of near) {
      const key = Math.min(i, j) * pts.length + Math.max(i, j);
      if (seen.has(key)) continue;
      seen.add(key);
      ea.push(i);
      eb.push(j);
      adj[i].push(j);
      adj[j].push(i);
    }
  });
  return { pts, ea, eb, adj };
}

type Pulse = { from: number; to: number; t: number; energy: number };

export default function NeuralBrain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { pts, ea, eb, adj } = buildBrain();
    const n = pts.length;
    const px = new Float32Array(n);
    const py = new Float32Array(n);
    const pz = new Float32Array(n);
    const glow = new Float32Array(n);
    const pulses: Pulse[] = [];
    const rand = Math.random;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    // What the viewer controls. `vel` is the current spin speed: it follows a drag, then
    // eases back to the idle spin.
    const view = { yaw: 0.6, pitch: TILT, zoom: 1, panX: 0, panY: 0, vel: SPIN, dragging: false };
    let last = performance.now() / 1000;
    let raf = 0;

    const fire = (node: number, energy: number, from = -1) => {
      glow[node] = 1;
      if (energy < 0.15 || pulses.length >= MAX_PULSES) return;
      const options = adj[node].filter((m) => m !== from);
      // Branch to one or two neighbours; energy fades with each hop so cascades die out.
      const count = rand() < 0.35 ? 2 : 1;
      for (let k = 0; k < count && options.length; k++) {
        const to = options.splice(Math.floor(rand() * options.length), 1)[0];
        pulses.push({ from: node, to, t: 0, energy });
      }
    };

    const simulate = (dt: number) => {
      if (!view.dragging) {
        view.yaw += view.vel * dt;
        view.vel += (SPIN - view.vel) * (1 - Math.exp(-dt / 1.2));
      }
      if (rand() < 2.5 * dt) fire(Math.floor(rand() * n), 1);
      for (let i = glow.length - 1; i >= 0; i--) glow[i] *= Math.exp(-dt / 0.45);
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += dt / HOP;
        if (p.t >= 1) {
          pulses.splice(i, 1);
          fire(p.to, p.energy * 0.8, p.from);
        }
      }
    };

    // Perspective-projected position at unit scale, for a given spin and pitch.
    const place = (p: Vec, a: number, pitch: number): [number, number, number] => {
      const [x, y, z] = p;
      const ct = Math.cos(pitch);
      const st = Math.sin(pitch);
      const x1 = x * Math.cos(a) + z * Math.sin(a);
      const z1 = -x * Math.sin(a) + z * Math.cos(a);
      const y2 = y * ct - z1 * st;
      const z2 = y * st + z1 * ct;
      const s = CAMERA / (CAMERA - z2);
      return [x1 * s, y2 * s, z2];
    };

    // The brain's footprint over one full turn, so no angle ever clips it.
    let fit = { unit: 1, midY: 0 };
    const measure = () => {
      let maxX = 0;
      let minY = Infinity;
      let maxY = -Infinity;
      for (let a = 0; a < Math.PI * 2; a += 0.05) {
        for (const p of pts) {
          const [x, y] = place(p, a, TILT);
          maxX = Math.max(maxX, Math.abs(x));
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      }
      // The padding leaves room for the glow around nodes at the edge.
      fit = {
        unit: FIT * Math.min(w / (2 * maxX), h / (maxY - minY)),
        midY: (maxY + minY) / 2,
      };
    };

    const project = () => {
      for (let i = 0; i < n; i++) {
        const [x, y, z] = place(pts[i], view.yaw, view.pitch);
        const u = fit.unit * view.zoom;
        px[i] = w / 2 + view.panX + x * u;
        py[i] = h / 2 + view.panY - (y - fit.midY) * u;
        pz[i] = z;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      project();

      // Wires: far ones fainter than near ones.
      for (const near of [false, true]) {
        ctx.strokeStyle = `rgba(${BRAIN},${near ? 0.3 : 0.12})`;
        ctx.lineWidth = near ? 0.8 : 0.6;
        ctx.beginPath();
        for (let e = 0; e < ea.length; e++) {
          const a = ea[e];
          const b = eb[e];
          if (pz[a] + pz[b] > 0 !== near) continue;
          ctx.moveTo(px[a], py[a]);
          ctx.lineTo(px[b], py[b]);
        }
        ctx.stroke();
      }

      // Nodes
      for (let i = 0; i < n; i++) {
        const depth = Math.min(1, Math.max(0, (pz[i] + 1.4) / 2.8));
        ctx.fillStyle = `rgba(${BRAIN},${0.2 + depth * 0.6})`;
        ctx.beginPath();
        ctx.arc(px[i], py[i], (1 + depth * 1.1) * Math.sqrt(view.zoom), 0, Math.PI * 2);
        ctx.fill();
      }

      // Firing nodes glow
      for (let i = 0; i < n; i++) {
        if (glow[i] < 0.04) continue;
        const r = 3 + glow[i] * 9;
        const g = ctx.createRadialGradient(px[i], py[i], 0, px[i], py[i], r);
        g.addColorStop(0, `rgba(${SIGNAL},${0.85 * glow[i]})`);
        g.addColorStop(1, `rgba(${SIGNAL},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px[i], py[i], r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Signals travelling along wires, with a short tail
      ctx.lineCap = "round";
      for (const p of pulses) {
        const x = px[p.from] + (px[p.to] - px[p.from]) * p.t;
        const y = py[p.from] + (py[p.to] - py[p.from]) * p.t;
        const t0 = Math.max(0, p.t - 0.35);
        const x0 = px[p.from] + (px[p.to] - px[p.from]) * t0;
        const y0 = py[p.from] + (py[p.to] - py[p.from]) * t0;
        ctx.strokeStyle = `rgba(${SIGNAL},${0.35 + 0.6 * p.energy})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = `rgba(${SIGNAL},${0.5 + 0.5 * p.energy})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      measure();
    };

    const tick = () => {
      const now = performance.now() / 1000;
      const dt = Math.min(now - last, 0.05); // a hidden tab must not fast-forward
      last = now;
      simulate(dt);
      draw();
      if (!still) raf = requestAnimationFrame(tick);
    };

    resize();
    if (still) {
      // One calm frame: a few nodes lit, nothing moving.
      for (let i = 0; i < 12; i++) glow[Math.floor(rand() * n)] = 0.7;
      draw();
    } else {
      raf = requestAnimationFrame(tick);
    }
    const ro = new ResizeObserver(() => {
      resize();
      if (still) draw();
    });
    ro.observe(canvas);

    // Drag to rotate, shift/right/middle-drag to pan, wheel to zoom, double-click to reset.
    const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
    const redraw = () => {
      if (still) draw();
    };
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    let panning = false;

    const onDown = (e: PointerEvent) => {
      canvas.setPointerCapture(e.pointerId);
      view.dragging = true;
      panning = e.shiftKey || e.button === 1 || e.button === 2;
      [lastX, lastY, lastT] = [e.clientX, e.clientY, performance.now()];
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!view.dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const now = performance.now();
      const dt = Math.max((now - lastT) / 1000, 1 / 240);
      [lastX, lastY, lastT] = [e.clientX, e.clientY, now];
      if (panning) {
        view.panX = clamp(view.panX + dx, -w / 2, w / 2);
        view.panY = clamp(view.panY + dy, -h / 2, h / 2);
      } else {
        view.yaw += dx * 0.008;
        view.pitch = clamp(view.pitch + dy * 0.008, -1.3, 1.3);
        view.vel = clamp(0.6 * view.vel + 0.4 * ((dx * 0.008) / dt), -6, 6);
      }
      redraw();
    };
    const onUp = (e: PointerEvent) => {
      view.dragging = false;
      if (performance.now() - lastT > 100) view.vel = 0; // released while holding still
      canvas.releasePointerCapture(e.pointerId);
      canvas.style.cursor = "grab";
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      view.zoom = clamp(view.zoom * Math.exp(-e.deltaY * 0.0015), 0.5, 4);
      redraw();
    };
    const onReset = () => {
      Object.assign(view, { pitch: TILT, zoom: 1, panX: 0, panY: 0 });
      redraw();
    };
    const noMenu = (e: Event) => e.preventDefault();

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("dblclick", onReset);
    canvas.addEventListener("contextmenu", noMenu);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("dblclick", onReset);
      canvas.removeEventListener("contextmenu", noMenu);
    };
  }, []);

  return (
    <figure className={cn("flex w-full flex-col", className)}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="A slowly rotating brain made of connected nodes, with signals travelling between them. Drag to rotate, scroll to zoom, shift-drag to pan."
        className="min-h-0 w-full flex-1 cursor-grab touch-pan-y"
      />
    </figure>
  );
}
