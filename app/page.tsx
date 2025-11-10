"use client";

import {
  FormEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
  forwardRef,
  MutableRefObject
} from "react";

type Palette = {
  id: string;
  name: string;
  tagline: string;
  fur: string;
  secondary: string;
  highlight: string;
  accent: string;
  eye: string;
  eyeIris: string;
  nose: string;
};

type BackgroundAtmosphere = {
  id: string;
  name: string;
  description: string;
  gradient: [string, string, string];
  starColor: string;
  moon: string;
  horizon: string;
  streak: string;
};

type WolfPreviewProps = {
  palette: Palette;
  background: BackgroundAtmosphere;
  detail: number;
  patternStrength: number;
  showMoon: boolean;
  showGlow: boolean;
  starSeed: number;
};

const palettes: Palette[] = [
  {
    id: "shadow-silver",
    name: "Shadow Silver",
    tagline: "Midnight wolf with silver-lined fur.",
    fur: "#4b5563",
    secondary: "#1f2933",
    highlight: "#9ca3af",
    accent: "#cbd5f5",
    eye: "#facc15",
    eyeIris: "#fde047",
    nose: "#0f172a"
  },
  {
    id: "arctic-haze",
    name: "Arctic Haze",
    tagline: "Cold glare with frost-kissed edges.",
    fur: "#e2e8f0",
    secondary: "#94a3b8",
    highlight: "#f8fafc",
    accent: "#38bdf8",
    eye: "#22d3ee",
    eyeIris: "#67e8f9",
    nose: "#334155"
  },
  {
    id: "ember-howl",
    name: "Ember Howl",
    tagline: "Warpaint glow against dusk embers.",
    fur: "#78350f",
    secondary: "#4c1d0c",
    highlight: "#fbbf24",
    accent: "#fb7185",
    eye: "#f97316",
    eyeIris: "#fb923c",
    nose: "#1f2937"
  },
  {
    id: "nebula-veil",
    name: "Nebula Veil",
    tagline: "Dreamlit hunter cloaked in aurora.",
    fur: "#3730a3",
    secondary: "#1e1b4b",
    highlight: "#a855f7",
    accent: "#8b5cf6",
    eye: "#f472b6",
    eyeIris: "#f9a8d4",
    nose: "#111827"
  }
];

const atmospheres: BackgroundAtmosphere[] = [
  {
    id: "lunar-night",
    name: "Lunar Nightfall",
    description: "Deep blues with moonlit frost.",
    gradient: ["#030712", "#0b1120", "#111827"],
    starColor: "#f8fafc",
    moon: "#e2e8f0",
    horizon: "#1f2937",
    streak: "#bae6fd"
  },
  {
    id: "aurora-breath",
    name: "Aurora Breath",
    description: "Violet ribbons grazing the snowline.",
    gradient: ["#0f172a", "#312e81", "#0f172a"],
    starColor: "#ede9fe",
    moon: "#f4f1ff",
    horizon: "#4338ca",
    streak: "#c4b5fd"
  },
  {
    id: "ember-glow",
    name: "Ember Glow",
    description: "Crimson twilight burning the horizon.",
    gradient: ["#1a0b0c", "#3f0e1c", "#0f0a12"],
    starColor: "#fee2e2",
    moon: "#fde68a",
    horizon: "#7f1d1d",
    streak: "#fb7185"
  },
  {
    id: "frost-dawn",
    name: "Frost Dawn",
    description: "Calm silver morning after fresh snowfall.",
    gradient: ["#0b1120", "#1e293b", "#101827"],
    starColor: "#e2e8f0",
    moon: "#f8fafc",
    horizon: "#334155",
    streak: "#bae6fd"
  }
];

const detailLabels = [
  { value: 20, label: "Velvet" },
  { value: 50, label: "Balanced" },
  { value: 80, label: "Sharp" }
];

type StarPoint = {
  id: number;
  x: number;
  y: number;
  radius: number;
  opacity: number;
};

const WolfPreview = forwardRef<SVGSVGElement, WolfPreviewProps>(function WolfPreview(
  { palette, background, detail, patternStrength, showMoon, showGlow, starSeed },
  ref
) {
  const detailRatio = detail / 100;
  const patternRatio = patternStrength / 100;
  const starCount = Math.floor(40 + detailRatio * 25 + patternRatio * 15);
  const stars = useMemo(
    () => generateStars(starSeed, starCount),
    [starSeed, starCount]
  );

  const shadingOpacity = 0.25 + detailRatio * 0.45;
  const highlightOpacity = 0.15 + (1 - Math.abs(detailRatio - 0.5) * 0.6);
  const patternOpacity = 0.28 + patternRatio * 0.4;

  const glowFilterId = useMemo(
    () => `wolf-glow-${palette.id}-${background.id}`,
    [palette.id, background.id]
  );
  const bgGradientId = useMemo(
    () => `bg-gradient-${background.id}`,
    [background.id]
  );
  const vignetteId = useMemo(
    () => `bg-vignette-${background.id}`,
    [background.id]
  );
  const highlightGradientId = useMemo(
    () => `fur-highlight-${palette.id}`,
    [palette.id]
  );
  const eyeGradientId = useMemo(() => `eye-${palette.id}`, [palette.id]);
  const irisGradientId = useMemo(() => `eye-iris-${palette.id}`, [palette.id]);
  const horizonGradientId = useMemo(
    () => `horizon-${background.id}`,
    [background.id]
  );
  const moonGlowId = useMemo(
    () => `moon-glow-${background.id}`,
    [background.id]
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 540 540"
      role="img"
      aria-labelledby="wolf-illustration-title wolf-illustration-desc"
      className="h-full w-full drop-shadow-[0_25px_45px_rgba(15,23,42,0.55)]"
    >
      <title id="wolf-illustration-title">{palette.name} wolf illustration</title>
      <desc id="wolf-illustration-desc">
        Stylized geometric wolf bust with dynamic atmosphere and aurora palette.
      </desc>
      <defs>
        <linearGradient id={bgGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          {background.gradient.map((stop, index) => (
            <stop key={stop} offset={`${(index / (background.gradient.length - 1)) * 100}%`} stopColor={stop} />
          ))}
        </linearGradient>
        <radialGradient id={vignetteId}>
          <stop offset="40%" stopColor="rgba(15,23,42,0)" />
          <stop offset="100%" stopColor="rgba(2,6,23,0.65)" />
        </radialGradient>
        <linearGradient id={highlightGradientId} x1="30%" y1="0%" x2="70%" y2="90%">
          <stop offset="0%" stopColor={palette.highlight} stopOpacity={0.9} />
          <stop offset="100%" stopColor={palette.fur} stopOpacity={0.4} />
        </linearGradient>
        <linearGradient id={eyeGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={palette.eye} />
          <stop offset="70%" stopColor={palette.eyeIris} />
        </linearGradient>
        <radialGradient id={irisGradientId} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={palette.eyeIris} stopOpacity={0.85} />
          <stop offset="70%" stopColor={palette.eye} stopOpacity={0.9} />
          <stop offset="100%" stopColor={palette.eye} stopOpacity={0.2} />
        </radialGradient>
        <linearGradient id={horizonGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={background.horizon} stopOpacity={0} />
          <stop offset="80%" stopColor={background.horizon} stopOpacity={0.75} />
          <stop offset="100%" stopColor={background.horizon} stopOpacity={0.95} />
        </linearGradient>
        <radialGradient id={moonGlowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={background.moon} stopOpacity={0.85} />
          <stop offset="60%" stopColor={background.moon} stopOpacity={0.25} />
          <stop offset="100%" stopColor={background.moon} stopOpacity={0} />
        </radialGradient>
        <filter id={glowFilterId} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation={12 + detailRatio * 12} result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="frame">
          <rect x="30" y="30" width="480" height="480" rx="40" />
        </clipPath>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${bgGradientId})`} rx="40" />
      <rect width="100%" height="100%" fill={`url(#${vignetteId})`} clipPath="url(#frame)" />
      {stars.map((star) => (
        <circle
          key={star.id}
          cx={star.x}
          cy={star.y}
          r={star.radius}
          fill={background.starColor}
          opacity={star.opacity}
          filter={`url(#${glowFilterId})`}
        />
      ))}
      <rect
        x="40"
        y="340"
        width="460"
        height="140"
        fill={`url(#${horizonGradientId})`}
        opacity={0.65 + patternRatio * 0.25}
        clipPath="url(#frame)"
      />
      {showMoon && (
        <g>
          <circle cx="400" cy="120" r="70" fill={`url(#${moonGlowId})`} opacity={0.8} />
          <circle cx="400" cy="120" r="48" fill={background.moon} opacity={0.85} />
        </g>
      )}
      <path
        d="M140 370 Q270 320 400 370"
        stroke={background.streak}
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.45 + patternRatio * 0.2}
      />
      <path
        d="M120 400 Q270 360 420 400"
        stroke={background.streak}
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.25 + patternRatio * 0.1}
      />
      <g filter={showGlow ? `url(#${glowFilterId})` : undefined} transform="translate(20, 10)">
        <path
          d="M270 90 L312 150 L350 250 L338 310 L330 365 L270 415 L210 365 L202 310 L190 250 L228 150 Z"
          fill={palette.fur}
        />
        <path
          d="M270 110 L295 150 L322 220 L315 260 L308 310 L270 350 L232 310 L225 260 L218 220 L245 150 Z"
          fill={`url(#${highlightGradientId})`}
          opacity={highlightOpacity}
        />
        <path
          d="M236 150 L210 115 L205 170 L218 210 Z"
          fill={palette.secondary}
        />
        <path
          d="M304 150 L330 115 L335 170 L322 210 Z"
          fill={palette.secondary}
        />
        <path
          d="M240 155 L220 130 L214 175 L228 205 Z"
          fill={palette.highlight}
          opacity={0.35}
        />
        <path
          d="M300 155 L320 130 L326 175 L312 205 Z"
          fill={palette.highlight}
          opacity={0.35}
        />
        <path
          d="M270 225 C315 225 344 266 334 312 C324 362 290 390 270 390 C250 390 216 362 206 312 C196 266 225 225 270 225 Z"
          fill={palette.secondary}
          opacity={shadingOpacity}
        />
        <path
          d="M270 232 C304 232 328 266 320 305 C313 340 288 360 270 360 C252 360 227 340 220 305 C212 266 236 232 270 232 Z"
          fill={palette.highlight}
          opacity={0.45 + detailRatio * 0.35}
        />
        <path
          d="M270 255 C288 255 302 272 300 296 C298 324 284 340 270 340 C256 340 242 324 240 296 C238 272 252 255 270 255 Z"
          fill={palette.fur}
          opacity={0.65}
        />
        <path
          d="M270 305 C281 303 290 312 290 322 C290 334 281 344 270 344 C259 344 250 334 250 322 C250 312 259 303 270 305 Z"
          fill={palette.nose}
        />
        <path
          d="M270 344 Q278 350 270 356 Q262 350 270 344 Z"
          fill={palette.highlight}
          opacity={0.35}
        />
        <path
          d="M248 325 Q270 332 292 325"
          stroke={palette.highlight}
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.18 + detailRatio * 0.2}
        />
        <ellipse
          cx={308}
          cy={248}
          rx={18 + detailRatio * 4}
          ry={12 + detailRatio * 2}
          fill={`url(#${eyeGradientId})`}
          transform="rotate(-8 308 248)"
        />
        <ellipse
          cx={305}
          cy={248}
          rx={10 + detailRatio * 3}
          ry={9 + detailRatio * 2}
          fill={`url(#${irisGradientId})`}
          transform="rotate(-8 305 248)"
        />
        <circle cx={300} cy={244} r={3.8} fill="#0f172a" opacity={0.85} />
        <circle cx={303} cy={240} r={2.2} fill="#ffffff" opacity={0.9} />
        <path
          d="M235 250 Q265 240 295 250"
          stroke={palette.highlight}
          strokeWidth={4}
          strokeLinecap="round"
          opacity={0.25 + detailRatio * 0.25}
        />
        <path
          d="M224 280 Q270 265 316 280"
          stroke={palette.highlight}
          strokeWidth={6}
          strokeLinecap="round"
          opacity={0.12 + detailRatio * 0.18}
        />
        <path
          d="M198 265 L210 310 L208 340 L220 365 L188 340 L182 290 Z"
          fill={palette.secondary}
          opacity={0.45 + detailRatio * 0.25}
        />
        <path
          d="M342 265 L330 310 L332 340 L320 365 L352 340 L358 290 Z"
          fill={palette.secondary}
          opacity={0.4 + detailRatio * 0.3}
        />
        <path
          d="M270 365 L300 390 L270 415 L240 390 Z"
          fill={palette.secondary}
          opacity={0.55}
        />
        <path
          d="M228 340 Q270 365 312 340"
          stroke={palette.highlight}
          strokeWidth={5}
          strokeLinecap="round"
          opacity={0.12 + detailRatio * 0.25}
        />
        <path
          d="M205 212 Q270 190 335 212"
          stroke={palette.accent}
          strokeWidth={4}
          strokeLinecap="round"
          opacity={0.15 + detailRatio * 0.2}
        />
        <path
          d="M216 180 Q270 150 324 180"
          stroke={palette.accent}
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.12 + patternRatio * 0.2}
        />
        <g opacity={patternOpacity}>
          <path d="M230 310 L260 275 L252 330 Z" fill={palette.secondary} />
          <path d="M310 310 L280 275 L288 330 Z" fill={palette.secondary} />
          <path d="M250 250 L270 215 L290 250 Z" fill={palette.highlight} opacity={0.45} />
          <path d="M220 280 L240 240 L232 300 Z" fill={palette.highlight} opacity={0.45} />
          <path d="M320 280 L300 240 L308 300 Z" fill={palette.highlight} opacity={0.45} />
        </g>
        <path
          d="M270 90 L312 150 L350 250 L338 310 L330 365 L270 415 L210 365 L202 310 L190 250 L228 150 Z"
          fill="none"
          stroke={palette.accent}
          strokeWidth={3}
          strokeLinejoin="round"
          strokeOpacity={0.35 + detailRatio * 0.25}
        />
      </g>
    </svg>
  );
});

WolfPreview.displayName = "WolfPreview";

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateStars(seed: number, count: number): StarPoint[] {
  const rng = mulberry32(Math.floor(seed * 1_000_000));
  return Array.from({ length: count }, (_, index) => {
    const x = 60 + rng() * 420;
    const y = 60 + rng() * 320;
    const radius = 0.5 + rng() * 1.8;
    const opacity = Number((0.2 + rng() * 0.6).toFixed(2));
    return {
      id: index,
      x,
      y,
      radius,
      opacity
    };
  });
}

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function useStableRef<T>(value: T): MutableRefObject<T> {
  const ref = useRef(value);
  ref.current = value;
  return ref as MutableRefObject<T>;
}

export default function Page() {
  const [paletteId, setPaletteId] = useState(palettes[0].id);
  const [atmosphereId, setAtmosphereId] = useState(atmospheres[0].id);
  const [detail, setDetail] = useState(56);
  const [patternStrength, setPatternStrength] = useState(62);
  const [showMoon, setShowMoon] = useState(true);
  const [showGlow, setShowGlow] = useState(true);
  const [starSeed, setStarSeed] = useState(() => Math.random());
  const svgRef = useRef<SVGSVGElement | null>(null);
  const paletteRef = useStableRef(paletteId);

  const palette = useMemo(
    () => palettes.find((item) => item.id === paletteId) ?? palettes[0],
    [paletteId]
  );
  const atmosphere = useMemo(
    () => atmospheres.find((item) => item.id === atmosphereId) ?? atmospheres[0],
    [atmosphereId]
  );

  const handleDownload = useCallback(() => {
    const node = svgRef.current;
    if (!node) {
      return;
    }
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(node);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `wolf-${paletteRef.current}-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }, [paletteRef]);

  const handleRandomize = useCallback(() => {
    setPaletteId(pickRandom(palettes).id);
    setAtmosphereId(pickRandom(atmospheres).id);
    setDetail(Math.floor(35 + Math.random() * 55));
    setPatternStrength(Math.floor(25 + Math.random() * 70));
    setShowMoon(Math.random() > 0.25);
    setShowGlow(Math.random() > 0.35);
    setStarSeed(Math.random());
  }, []);

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    handleRandomize();
  }, [handleRandomize]);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-12 lg:flex-row">
      <section className="glass-panel relative flex-1 overflow-hidden rounded-3xl border border-slate-800/60 p-6 shadow-2xl lg:p-10">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h1 className="title-glow font-[family:var(--font-display)] text-4xl uppercase tracking-[0.3em] text-sky-200 sm:text-5xl">
              Wolf Atelier
            </h1>
            <p className="mt-2 max-w-md text-sm text-slate-300 sm:text-base">
              Sculpt a bespoke illustration. Tune the pelt, atmosphere, and luminous details—then export your wolf as scalable art.
            </p>
          </div>
          <button
            type="button"
            onClick={handleRandomize}
            className="rounded-full border border-sky-400/40 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200 transition hover:border-sky-300 hover:bg-sky-400/20"
          >
            Shuffle
          </button>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/40">
          <WolfPreview
            ref={svgRef}
            palette={palette}
            background={atmosphere}
            detail={detail}
            patternStrength={patternStrength}
            showMoon={showMoon}
            showGlow={showGlow}
            starSeed={starSeed}
          />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-sky-300/80" />
            <span>{palette.tagline}</span>
          </div>
          <button
            type="button"
            onClick={handleDownload}
            className="rounded-full border border-sky-300/40 bg-gradient-to-r from-sky-500/60 via-sky-400/50 to-cyan-400/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-50 shadow-lg shadow-sky-500/30 transition hover:from-sky-400 hover:via-sky-500 hover:to-cyan-500 hover:shadow-sky-400/50"
          >
            Download SVG
          </button>
        </div>
      </section>
      <aside className="glass-panel control-panel w-full max-w-xl rounded-3xl border border-slate-800/50 p-6 shadow-xl sm:p-8 lg:max-w-sm">
        <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
          <div>
            <h2 className="font-[family:var(--font-display)] text-sm uppercase tracking-[0.25em] text-slate-200">
              Palette <span>{palette.name}</span>
            </h2>
            <p className="mt-1 text-sm text-slate-400">{palette.tagline}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {palettes.map((option) => {
                const active = option.id === paletteId;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setPaletteId(option.id)}
                    className={`group rounded-2xl border px-4 py-3 text-left transition ${
                      active
                        ? "border-sky-400/70 bg-sky-400/10 shadow-lg shadow-sky-500/20"
                        : "border-slate-700/60 bg-slate-900/40 hover:border-slate-500/60 hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="mb-2 flex gap-1.5">
                      {[option.fur, option.secondary, option.highlight, option.eye].map((tone) => (
                        <span
                          key={tone}
                          style={{ backgroundColor: tone }}
                          className="h-2.5 w-full rounded-full"
                        />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-slate-100">{option.name}</p>
                    <p className="mt-1 text-xs text-slate-400">{option.tagline}</p>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="font-[family:var(--font-display)] text-sm uppercase tracking-[0.25em] text-slate-200">
              Atmosphere <span>{atmosphere.name}</span>
            </h2>
            <p className="mt-1 text-sm text-slate-400">{atmosphere.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {atmospheres.map((option) => {
                const active = option.id === atmosphereId;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setAtmosphereId(option.id)}
                    className={`rounded-2xl border p-4 transition ${
                      active
                        ? "border-sky-300/80 bg-sky-400/10 shadow-lg shadow-sky-500/25"
                        : "border-slate-700/60 bg-slate-900/40 hover:border-slate-500/60 hover:bg-slate-800/50"
                    }`}
                  >
                    <div
                      className="h-20 w-full rounded-xl"
                      style={{
                        background: `linear-gradient(180deg, ${option.gradient[0]}, ${option.gradient[1]}, ${option.gradient[2]})`
                      }}
                    />
                    <p className="mt-3 text-sm font-semibold text-slate-100">{option.name}</p>
                    <p className="mt-1 text-xs text-slate-400">{option.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="font-[family:var(--font-display)] text-sm uppercase tracking-[0.25em] text-slate-200">
              Detail &amp; Texture
            </h2>
            <div className="mt-4 space-y-5">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Fur Definition</span>
                <input
                  type="range"
                  min={20}
                  max={95}
                  value={detail}
                  onChange={(event) => setDetail(Number(event.target.value))}
                  className="mt-2 w-full accent-sky-400"
                />
                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  {detailLabels.map((marker) => (
                    <span key={marker.value}>{marker.label}</span>
                  ))}
                </div>
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Pattern Energy</span>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={patternStrength}
                  onChange={(event) => setPatternStrength(Number(event.target.value))}
                  className="mt-2 w-full accent-sky-400"
                />
                <p className="mt-2 text-xs text-slate-400">
                  {patternStrength < 30 && "Gentle tufts with minimal layering."}
                  {patternStrength >= 30 && patternStrength < 70 && "Balanced markings emphasizing facial structure."}
                  {patternStrength >= 70 && "Bold streaks etch through the pelt for a fierce look."}
                </p>
              </label>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex items-center justify-between gap-3 rounded-2xl border border-slate-700/60 bg-slate-900/40 px-4 py-3 text-sm text-slate-200 transition hover:border-slate-500/60 hover:bg-slate-800/50">
              <span className="uppercase tracking-[0.25em] text-slate-400">Moon Halo</span>
              <input
                type="checkbox"
                checked={showMoon}
                onChange={(event) => setShowMoon(event.target.checked)}
                className="h-4 w-4 accent-sky-300"
              />
            </label>
            <label className="flex items-center justify-between gap-3 rounded-2xl border border-slate-700/60 bg-slate-900/40 px-4 py-3 text-sm text-slate-200 transition hover:border-slate-500/60 hover:bg-slate-800/50">
              <span className="uppercase tracking-[0.25em] text-slate-400">Auric Glow</span>
              <input
                type="checkbox"
                checked={showGlow}
                onChange={(event) => setShowGlow(event.target.checked)}
                className="h-4 w-4 accent-sky-300"
              />
            </label>
          </div>
          <button
            type="submit"
            className="rounded-full border border-slate-600/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200 transition hover:border-sky-400 hover:bg-sky-400/10"
          >
            Surprise Me
          </button>
          <p className="text-xs text-slate-500">
            Download exports a crisp SVG ideal for merch, prints, or inspiration boards. Use the shuffle or surprise actions to curate packs of wolves.
          </p>
        </form>
      </aside>
    </main>
  );
}
