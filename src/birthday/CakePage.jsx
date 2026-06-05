import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Chynne from '../assets/Chynne.jpg';
import Beauty from '../assets/Beauty.jpg';
import happyBirthday from '../assets/happy_birthday.mp3';

/* ── Confetti Logic ── */
const confettiItems = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 2,
  duration: Math.random() * 2 + 2,
  color: ["#ff6eb0", "#c084fc", "#fbbf24", "#34d399", "#60a5fa", "#f97316"][Math.floor(Math.random() * 6)],
  size: Math.random() * 8 + 5,
  shape: Math.random() > 0.5 ? "circle" : "rect",
  rotation: Math.random() * 360,
}));

/* ── Glitter Logic ── */
const glitterItems = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2.5,
  size: Math.random() * 2 + 0.5,
  color: ["#ff6eb0", "#c084fc", "#fbbf24", "#34d399", "#60a5fa", "#fff", "#ffd6ff"][Math.floor(Math.random() * 7)],
}));

/* ── Fireworks Component ── */
function Fireworks({ active }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = ["#ff6eb0", "#c084fc", "#fbbf24", "#34d399", "#60a5fa", "#f97316", "#fff", "#fd7185"];

    const spawnBurst = () => {
      const x = 80 + Math.random() * (canvas.width - 160);
      const y = 60 + Math.random() * (canvas.height * 0.55);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const count = 55 + Math.floor(Math.random() * 35);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 2.5 + Math.random() * 4.5;
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: 1.8 + Math.random() * 2,
          decay: 0.013 + Math.random() * 0.009,
          trail: [],
        });
      }
    };

    for (let i = 0; i < 6; i++) setTimeout(spawnBurst, i * 220);
    const interval = setInterval(spawnBurst, 900);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.shift();
        p.trail.forEach((pt, i) => {
          ctx.save();
          ctx.globalAlpha = (i / p.trail.length) * p.alpha * 0.4;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.07;
        p.vx *= 0.97;
        p.alpha -= p.decay;
      });
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(interval);
      cancelAnimationFrame(rafRef.current);
      particlesRef.current = [];
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 5 }} />;
}

/* ── SVG Cake ── */
function BirthdayCake({ blownOut }) {
  return (
    <svg viewBox="0 0 420 400" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 420, filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}>
      <defs>
        <linearGradient id="layer1Grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f9a8d4" /><stop offset="100%" stopColor="#ec4899" /></linearGradient>
        <linearGradient id="layer2Grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fce7f3" /><stop offset="100%" stopColor="#f9a8d4" /></linearGradient>
        <linearGradient id="layer3Grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ffe4e6" /><stop offset="100%" stopColor="#fda4af" /></linearGradient>
        <linearGradient id="frostingGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#fff1f2" /><stop offset="50%" stopColor="#ffe4e6" /><stop offset="100%" stopColor="#fecdd3" /></linearGradient>
        <linearGradient id="plateGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e2e8f0" /><stop offset="100%" stopColor="#94a3b8" /></linearGradient>
        <linearGradient id="candleBody" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#a78bfa" /><stop offset="40%" stopColor="#c4b5fd" /><stop offset="100%" stopColor="#7c3aed" /></linearGradient>
        <radialGradient id="flameGlow" cx="50%" cy="70%" r="60%"><stop offset="0%" stopColor="#fff7ed" stopOpacity="1" /><stop offset="40%" stopColor="#fbbf24" stopOpacity="0.9" /><stop offset="100%" stopColor="#ef4444" stopOpacity="0" /></radialGradient>
        <radialGradient id="flameCore" cx="50%" cy="60%" r="50%"><stop offset="0%" stopColor="#fef9c3" /><stop offset="60%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#f97316" /></radialGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="softGlow"><feGaussianBlur stdDeviation="6" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <radialGradient id="sprinkleGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="plateRim" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#e6eef7" /><stop offset="50%" stopColor="#cbd5e1" /><stop offset="100%" stopColor="#9aa6b8" /></linearGradient>
        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="10" stdDeviation="18" floodColor="#000" floodOpacity="0.35"/></filter>
        <radialGradient id="cherryGrad" cx="30%" cy="30%" r="70%"><stop offset="0%" stopColor="#fff1f2" stopOpacity="0.9"/><stop offset="40%" stopColor="#ff6b6b"/><stop offset="100%" stopColor="#c02424"/></radialGradient>
        <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#ff9a9e"/><stop offset="50%" stopColor="#fecfef"/><stop offset="100%" stopColor="#fbc2eb"/></linearGradient>
        <linearGradient id="glossGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ffffff" stopOpacity="0.8"/><stop offset="100%" stopColor="#ffffff" stopOpacity="0"/></linearGradient>
        <filter id="flameGlowFilter" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <linearGradient id="purpleRibbon" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#8b5cf6"/><stop offset="50%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#6d28d9"/></linearGradient>
      </defs>
      <ellipse cx="210" cy="358" rx="175" ry="18" fill="#cbd5e1" opacity="0.6" />
      <ellipse cx="210" cy="352" rx="165" ry="12" fill="url(#plateRim)" opacity="0.6" filter="url(#softShadow)" />
      <ellipse cx="210" cy="354" rx="170" ry="14" fill="url(#plateGrad)" />
      <ellipse cx="210" cy="351" rx="160" ry="9" fill="#f1f5f9" opacity="0.5" />
      <ellipse cx="210" cy="350" rx="145" ry="10" fill="url(#ribbonGrad)" opacity="0.12" />
      <g fill="#fff7f9" opacity="0.95">
        <path d="M120 290c6 12 18 16 28 12 8-3 10-10 18-12 10-2 20 6 30 8 12 2 22-6 34-6 10 0 18 6 28 8 8 1 20-4 30-6 10-2 22 2 28-8v12c-6 10-18 12-28 10-12-2-20-6-30-6-12 0-22 8-34 6-10-1-18-8-28-6-10 1-18 10-30 8-12-2-24-12-34-12-10 0-18 4-26-2-6-4-8-8-8-8z" />
        <path d="M100 220c8 6 18 10 28 8 12-2 18-10 30-8 10 2 18 8 28 8 12 0 18-8 30-8 10 0 18 6 28 8 8 1 18-4 26-2 0 0-6 18-22 22-18 4-28-6-44-4-16 2-28 14-44 12-14-2-24-12-36-14-12-2-20 0-28-6 0 0 8-10 6-14z" />
      </g>
      <ellipse cx="210" cy="142" rx="64" ry="8" fill="url(#glossGrad)" opacity="0.9" />
      <rect x="60" y="290" width="300" height="60" rx="4" fill="url(#layer1Grad)" />
      <ellipse cx="210" cy="290" rx="150" ry="18" fill="url(#frostingGrad)" opacity="0.8" />
      <g>
        <circle cx="130" cy="300" r="2" fill="#ff6eb0" />
        <circle cx="160" cy="292" r="2" fill="#c084fc" />
        <circle cx="190" cy="306" r="2" fill="#fbbf24" />
        <circle cx="230" cy="298" r="2" fill="#34d399" />
        <circle cx="270" cy="304" r="2" fill="#60a5fa" />
      </g>
      <g fill="#fff" opacity="0.9">
        <path d="M120 250 L122 254 L126 255 L122 256 L120 260 L118 256 L114 255 L118 254 Z" opacity="0.9" fill="#fff8ea" />
        <path d="M300 230 L302 234 L306 235 L302 236 L300 240 L298 236 L294 235 L298 234 Z" opacity="0.9" fill="#fff5ff" />
      </g>
      <rect x="80" y="215" width="260" height="75" rx="4" fill="url(#layer2Grad)" />
      <ellipse cx="210" cy="215" rx="130" ry="16" fill="url(#frostingGrad)" opacity="0.85" />
      <g>
        <rect x="80" y="246" width="260" height="14" rx="8" fill="url(#purpleRibbon)" opacity="0.98" />
        <g transform="translate(194,247)">
          <path d="M0 0 C-8 -8 -18 -8 -20 0 C-18 8 -8 8 0 0 Z" fill="#6d28d9" />
          <path d="M32 0 C40 -8 50 -8 52 0 C50 8 40 8 32 0 Z" fill="#6d28d9" transform="translate(-12,0)" />
          <circle cx="10" cy="0" r="3" fill="#ffd6ff" />
        </g>
      </g>
      <g>
        <circle cx="150" cy="220" r="2" fill="#ff6eb0" />
        <circle cx="170" cy="210" r="2.5" fill="#c084fc" />
        <circle cx="200" cy="225" r="2" fill="#fbbf24" />
        <circle cx="230" cy="212" r="2" fill="#34d399" />
        <circle cx="250" cy="218" r="2" fill="#60a5fa" />
      </g>
      <rect x="110" y="150" width="200" height="65" rx="4" fill="url(#layer3Grad)" />
      <ellipse cx="210" cy="150" rx="100" ry="13" fill="url(#frostingGrad)" opacity="0.9" />
      <g>
        <circle cx="160" cy="148" r="3" fill="#ff6eb0" />
        <circle cx="180" cy="140" r="2.5" fill="#c084fc" />
        <circle cx="200" cy="150" r="2" fill="#fbbf24" />
        <circle cx="220" cy="142" r="2.5" fill="#34d399" />
        <circle cx="240" cy="150" r="3" fill="#60a5fa" />
        <circle cx="190" cy="132" r="2" fill="#f97316" />
        <ellipse cx="210" cy="132" rx="6" ry="2" fill="url(#sprinkleGrad)" opacity="0.6" />
      </g>
      <g transform="translate(150, 30)">
        <rect x="0" y="70" width="28" height="52" rx="5" fill="url(#candleBody)" />
        <g fill="rgba(255,255,255,0.12)">
          <rect x="2" y="80" width="24" height="4" rx="2" />
          <rect x="2" y="92" width="24" height="4" rx="2" />
          <rect x="2" y="104" width="24" height="4" rx="2" />
        </g>
        <text x="14" y="106" textAnchor="middle" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="36" fill="white">2</text>
        {!blownOut && (
          <g>
            <path d="M14,30 C18,38 22,44 20,54 C18,62 10,66 14,74 C18,66 22,62 20,54 C24,50 20,40 14,30z" fill="url(#flameCore)" filter="url(#glow)" />
            <ellipse cx="14" cy="40" rx="6" ry="10" fill="rgba(255,210,75,0.18)" filter="url(#flameGlowFilter)" />
          </g>
        )}
      </g>
      <g transform="translate(230, 30)">
        <rect x="0" y="70" width="28" height="52" rx="5" fill="url(#candleBody)" />
        <g fill="rgba(255,255,255,0.12)">
          <rect x="2" y="80" width="24" height="4" rx="2" />
          <rect x="2" y="92" width="24" height="4" rx="2" />
        </g>
        <text x="14" y="106" textAnchor="middle" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="36" fill="white">1</text>
        {!blownOut && (
          <g>
            <path d="M14,30 C18,38 22,44 20,54 C18,62 10,66 14,74 C18,66 22,62 20,54 C24,50 20,40 14,30z" fill="url(#flameCore)" filter="url(#glow)" />
            <ellipse cx="14" cy="40" rx="5" ry="8" fill="rgba(255,210,75,0.16)" filter="url(#flameGlowFilter)" />
          </g>
        )}
      </g>
      <g>
        <circle cx="208" cy="120" r="8" fill="url(#cherryGrad)" />
        <circle cx="222" cy="124" r="6" fill="url(#cherryGrad)" />
        <path d="M216 112 C214 106 208 106 206 112" stroke="#4a2a1f" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ── Main Component ── */
export default function CakePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state?.name || "Friend";
  const [blownOut, setBlownOut] = useState(false);
  const [fireworks, setFireworks] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const audioRef = useRef(null);

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 480 : false
  );

  // Fade in content
  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Auto-play song
  useEffect(() => {
    audioRef.current = new Audio(happyBirthday);
    audioRef.current.preload = 'auto';
    const t = setTimeout(() => {
      audioRef.current?.play().catch(() => {});
    }, 600);
    return () => {
      clearTimeout(t);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 480);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleBlow = () => {
    setBlownOut(true);
    setFireworks(true);
  };

  // ── Derived sizes based on viewport ──
  const photoW  = isMobile ? 110 : 150;
  const photoH  = isMobile ? 150 : 200;
  const heartSz = isMobile ? 130 : 170;

  return (
    <div style={styles.root}>

      {/* Confetti */}      {/* Glitter background */}
      {glitterItems.map((g) => (
        <div
          key={`glitter-${g.id}`}
          style={{
            position: 'fixed',
            left: `${g.x}%`,
            top: `${g.y}%`,
            width: g.size,
            height: g.size,
            background: g.color,
            borderRadius: '50%',
            opacity: 0.6,
            pointerEvents: 'none',
            zIndex: 0,
            animation: `glitterTwinkle ${g.duration}s ease-in-out infinite`,
            animationDelay: `${g.delay}s`,
            boxShadow: `0 0 ${g.size * 3}px ${g.color}, 0 0 ${g.size * 4}px ${g.color}33`,
          }}
        />
      ))}
      {confettiItems.map((c) => (
        <div
          key={c.id}
          style={{
            ...styles.confetti,
            left: `${c.x}%`,
            background: c.color,
            width: c.shape === "circle" ? c.size : c.size * 0.6,
            height: c.size,
            borderRadius: c.shape === "circle" ? "50%" : 2,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
            transform: `rotate(${c.rotation}deg)`,
          }}
        />
      ))}

      <Fireworks active={fireworks} />

      {/* Back button */}
      <button
        style={{
          ...styles.backBtn,
          top: isMobile ? 12 : 24,
          left: isMobile ? 12 : 24,
          padding: isMobile ? '6px 10px' : '8px 16px',
          fontSize: isMobile ? 13 : 16,
        }}
        onClick={() => {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          navigate("/");
        }}
      >
        ← Back
      </button>

      {/* Main content */}
      <div
        style={{
          ...styles.content,
          padding: isMobile ? '20px 16px' : '40px 20px',
        }}
      >

        {/* ── Greeting ── */}
        <div
          style={{
            ...styles.greetingWrap,
            opacity: showContent ? 1 : 0,
            transform: showContent ? "translateY(0)" : "translateY(-20px)",
            transition: "all 0.7s ease",
          }}
        >
          <p style={{ ...styles.happyText, fontSize: isMobile ? 13 : 18 }}>
            🎉 Happy 21st Birthday 🎉
          </p>
          <h1
            style={{
              ...styles.nameText,
              fontSize: isMobile ? 'clamp(28px, 8vw, 44px)' : 'clamp(40px, 8vw, 72px)',
            }}
          >
            {name}!
          </h1>
        </div>

        {/* ── Mobile layout: photos row + cake stacked ── */}
        {/* ── Desktop layout: photos + cake side by side ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? 20 : 50,
            width: '100%',
          }}
        >

          {/* Photos row — always horizontal */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? 18 : 20,
              flexShrink: 0,
              transform: 'rotate(-10deg)'
            }}
          >
            {/* Photo 1 — rectangular white frame */}
            <div
              style={{
                width: photoW,
                height: photoH,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '250%', height: '300%', overflow: 'visible' }}
              >
                <defs>
                  <clipPath id="heartClip1">
                    <path d="M50 91 C20 72 5 50 20 32 C35 14 50 28 50 28 C50 28 65 14 80 32 C95 50 80 72 50 91 Z" />
                  </clipPath>
                </defs>
                <image
                  href={Chynne}
                  x="10" y="24"
                  width="70%" height="110%"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#heartClip1)"
                />
                {/* Purple border */}
                <path
                  d="M50 91 C20 72 5 50 20 32 C35 14 50 28 50 28 C50 28 65 14 80 32 C95 50 80 72 50 91 Z"
                  fill="none"
                  stroke="#6d28d9"
                  strokeWidth="1.6"
                />
              </svg>
            </div>

            {/* Photo 2 — heart shape */}
            <div
              style={{
                width: heartSz,
                height: heartSz,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '200%', height: '200%', overflow: 'visible',  transform: 'rotate(25deg)' }}
              >
                <defs>
                  <clipPath id="heartClip2">
                    <path d="M50 91 C20 72 5 50 20 32 C35 14 50 28 50 28 C50 28 65 14 80 32 C95 50 80 72 50 91 Z" />
                  </clipPath>
                </defs>
                <image
                  href={Beauty}
                  x="0" y="0"
                  width="85%" height="145%"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#heartClip2)"
                />
                <path
                  d="M50 91 C20 72 5 50 20 32 C35 14 50 28 50 28 C50 28 65 14 80 32 C95 50 80 72 50 91 Z"
                  fill="none"
                  stroke="#6d28d9"
                  strokeWidth="1.6"
                />
              </svg>
            </div>
          </div>

          {/* Cake */}
          <div
            style={{
              width: isMobile ? 'min(300px, 88vw)' : 'min(400px, 90vw)',
              animation: 'cakeFloat 4s ease-in-out infinite',
              flexShrink: 0,
            }}
          >
            <BirthdayCake blownOut={blownOut} />
          </div>

        </div>

        {/* ── Blow button / wish message ── */}
        {!blownOut ? (
          <button
            style={{
              ...styles.blowBtn,
              padding: isMobile ? '12px 28px' : '16px 40px',
              fontSize: isMobile ? 16 : 18,
            }}
            onClick={handleBlow}
          >
            💨 Make a Wish &amp; Blow!
          </button>
        ) : (
          <div style={styles.wishMsg}>
            <p style={styles.wishText}>🎂Happy 21st Birthday🎂</p>
            <p style={styles.wishText}>🎂{name}🎂 </p>
            <p style={styles.wishSub}>
              I hope this day is as wonderful as you My Lady. Meeting you was something I never expected, 
              yet it became one of the moments I cherish most. 
            </p><br />
            <p style={styles.wishSub}>
              As you begin another year of your journey, I wish you endless happiness, good health, success 
              in everything you pursue, and the courage to chase every dream in your heart. May this year open 
              new doors, create unforgettable memories, and bring countless blessings into your life. 
              May this year be filled with love, laughter and all the things that make you smile.
            </p> <br />
            <p style={styles.MSub}>💕Enjoy your special day💕</p>
            <p style={styles.MSub}>😍I love you My Lady 😍</p>
          </div>
        )}

      </div>

      <style>{`
        @keyframes fall {
          0%   { top: -20px; opacity: 1; transform: rotate(0deg); }
          100% { top: 110%; opacity: 0; transform: rotate(720deg); }
        }
        @keyframes cakeFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-15px); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(251,191,36,0.4); }
          50%       { box-shadow: 0 0 40px rgba(251,191,36,0.7); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }        @keyframes glitterTwinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.5) translateY(0); }
          50% { opacity: 1; transform: scale(1) translateY(-20px); }
        }      `}</style>
    </div>
  );
}

/* ── Styles ── */
const styles = {
  root: {
    minHeight: "100vh",
    background: "radial-gradient(ellipse at 30% 20%, #1e0b33 0%, #0f0020 50%, #080010 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Lato', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  confetti: {
    position: "fixed",
    top: -20,
    animation: "fall linear infinite",
    pointerEvents: "none",
    zIndex: 1,
  },
  backBtn: {
    position: "fixed",
    top: 24,
    left: 24,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "rgba(255,255,255,0.7)",
    borderRadius: 10,
    cursor: "pointer",
    backdropFilter: "blur(10px)",
    zIndex: 100,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 30,
    zIndex: 10,
  },
  greetingWrap: {
    textAlign: "center",
  },
  happyText: {
    fontWeight: 300,
    color: "rgba(255,255,255,0.65)",
    letterSpacing: "2px",
    margin: 0,
  },
  nameText: {
    fontWeight: 900,
    color: "#fff",
    margin: "10px 0",
    background: "linear-gradient(135deg, #d946ef 0%, #a855f7 50%, #7c3aed 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: "1.2",
    padding: "5px 0",
    display: "inline-block",
  },
  blowBtn: {
    background: "linear-gradient(135deg, #fbbf24, #f97316)",
    border: "none",
    color: "#1a0000",
    fontWeight: 700,
    borderRadius: 50,
    cursor: "pointer",
    animation: "glowPulse 2s infinite",
  },
  wishMsg: {
    textAlign: "center",
    animation: "fadeUp 0.8s ease both",
    padding: "0 16px",
  },
  wishText: {
    fontSize: 22,
    color: "#b47aee",
    margin: "0 0 9px",
    fontWeight: 1000,
  },
  wishSub: {
    color: "rgba(255,255,255,0.75)",
    maxWidth: 500,
    fontWeight: 700,
    lineHeight: 1.7,
    margin: "0 auto",
    textAlign: "justify",
  },
  MSub: {
  color: "rgba(255,255,255,0.75)",
  maxWidth: 500,
  fontWeight: 900,
  lineHeight: 1.7,
  margin: "0 auto",
  },
};