import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const stars = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

export default function WishPage() {
  const [name, setName] = useState("");
  const [focused, setFocused] = useState(false);
  const [shaking, setShaking] = useState(false);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 480 : false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 480);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const combinedStyles = {
    ...styles,
    card: { ...styles.card, padding: isMobile ? '36px 24px 32px' : styles.card.padding, borderRadius: isMobile ? 18 : styles.card.borderRadius, maxWidth: isMobile ? 360 : styles.card.maxWidth },
    title: { ...styles.title, fontSize: isMobile ? 22 : styles.title.fontSize },
    input: { ...styles.input, padding: isMobile ? '12px 14px' : styles.input.padding, fontSize: isMobile ? 14 : styles.input.fontSize },
    btn: { ...styles.btn, padding: isMobile ? '12px 18px' : styles.btn.padding, fontSize: isMobile ? 15 : styles.btn.fontSize },
    orb1: { ...styles.orb1, width: isMobile ? 260 : styles.orb1.width, height: isMobile ? 260 : styles.orb1.height, top: isMobile ? -80 : styles.orb1.top, left: isMobile ? -60 : styles.orb1.left },
    orb2: { ...styles.orb2, width: isMobile ? 200 : styles.orb2.width, height: isMobile ? 200 : styles.orb2.height, bottom: isMobile ? -30 : styles.orb2.bottom, right: isMobile ? -40 : styles.orb2.right },
    orb3: { ...styles.orb3, width: isMobile ? 140 : styles.orb3.width, height: isMobile ? 140 : styles.orb3.height, top: isMobile ? '48%' : styles.orb3.top, left: isMobile ? '55%' : styles.orb3.left },
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }
    navigate("/cake", { state: { name: name.trim() } });
  };

  return (
    <div style={styles.root}>
      {/* Starfield */}
      {stars.map((s) => (
        <span
          key={s.id}
          style={{
            ...combinedStyles.star,
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Floating orbs */}
      <div style={{ ...combinedStyles.orb, ...combinedStyles.orb1 }} />
      <div style={{ ...combinedStyles.orb, ...combinedStyles.orb2 }} />
      <div style={{ ...combinedStyles.orb, ...combinedStyles.orb3 }} />

      <div style={combinedStyles.card}>
        <div style={styles.topAccent} />

        <h1 style={combinedStyles.title}>
          Please Enter <span style={styles.highlight}>Name</span>
        </h1>

        <div style={{ ...styles.inputWrap, ...(shaking ? styles.shake : {}) }}>
          <input
            style={{
              ...combinedStyles.input,
              ...(focused ? combinedStyles.inputFocused : {}),
            }}
            type="text"
            placeholder="Your name here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            maxLength={30}
          />
          {focused && <div style={combinedStyles.inputGlow} />}
        </div>

        <button
          style={{
            ...combinedStyles.btn,
            ...(name.trim() ? combinedStyles.btnActive : combinedStyles.btnDisabled),
          }}
          onClick={handleSubmit}
        >
          <span style={styles.btnText}>Enter</span>
          <div style={styles.btnShine} />
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lato:wght@300;400&display=swap');

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes emojiPop {
          0% { transform: scale(0) rotate(-20deg); }
          70% { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background:
      "radial-gradient(ellipse at 20% 50%, #1a0533 0%, #0d0118 40%, #060010 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Lato', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  star: {
    position: "absolute",
    borderRadius: "50%",
    background: "#fff",
    animation: "twinkle var(--dur, 3s) ease-in-out infinite",
    pointerEvents: "none",
  },
  orb: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(80px)",
    animation: "floatOrb 6s ease-in-out infinite",
    pointerEvents: "none",
  },
  orb1: {
    width: 400,
    height: 400,
    background: "rgba(255, 80, 150, 0.12)",
    top: "-100px",
    left: "-100px",
    animationDelay: "0s",
  },
  orb2: {
    width: 300,
    height: 300,
    background: "rgba(140, 60, 255, 0.15)",
    bottom: "-50px",
    right: "-80px",
    animationDelay: "2s",
  },
  orb3: {
    width: 200,
    height: 200,
    background: "rgba(255, 200, 50, 0.08)",
    top: "40%",
    left: "60%",
    animationDelay: "4s",
  },
  card: {
    position: "relative",
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 28,
    padding: "56px 48px 48px",
    maxWidth: 440,
    width: "90%",
    textAlign: "center",
    boxShadow:
      "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
    animation: "cardIn 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards",
    zIndex: 10,
  },
  topAccent: {
    position: "absolute",
    top: 0,
    left: "20%",
    right: "20%",
    height: 2,
    background:
      "linear-gradient(90deg, transparent, #ff6eb0, #c084fc, #60a5fa, transparent)",
    borderRadius: 2,
  },
  emojiRing: {
    fontSize: 64,
    marginBottom: 20,
    display: "inline-block",
    animation: "emojiPop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.3s both",
    filter: "drop-shadow(0 0 20px rgba(255,200,50,0.5))",
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 32,
    fontWeight: 900,
    color: "#fff",
    margin: "0 0 28px",
    lineHeight: 1.2,
    letterSpacing: "-0.5px",
  },
  highlight: {
    background: "linear-gradient(135deg, #ff6eb0, #c084fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  inputWrap: {
    position: "relative",
    marginBottom: 20,
  },
  shake: {
    animation: "shake 0.5s ease",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    background: "rgba(255,255,255,0.07)",
    border: "1.5px solid rgba(255,255,255,0.15)",
    borderRadius: 14,
    padding: "16px 20px",
    fontSize: 16,
    color: "#fff",
    fontFamily: "'Lato', sans-serif",
    fontWeight: 400,
    outline: "none",
    transition: "border-color 0.3s, background 0.3s",
    letterSpacing: "0.3px",
  },
  inputFocused: {
    background: "rgba(255,255,255,0.1)",
    borderColor: "rgba(192,132,252,0.7)",
  },
  inputGlow: {
    position: "absolute",
    inset: -1,
    borderRadius: 15,
    background:
      "linear-gradient(135deg, rgba(255,110,176,0.3), rgba(192,132,252,0.3))",
    filter: "blur(8px)",
    zIndex: -1,
    pointerEvents: "none",
  },
  btn: {
    position: "relative",
    width: "100%",
    padding: "16px 24px",
    borderRadius: 14,
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    fontFamily: "'Lato', sans-serif",
    fontWeight: 700,
    letterSpacing: "0.5px",
    overflow: "hidden",
    transition: "transform 0.2s, opacity 0.2s, box-shadow 0.3s",
  },
  btnActive: {
    background:
      "linear-gradient(135deg, #ff6eb0 0%, #c084fc 50%, #818cf8 100%)",
    color: "#fff",
    boxShadow:
      "0 8px 32px rgba(192,132,252,0.45), 0 2px 8px rgba(0,0,0,0.3)",
  },
  btnDisabled: {
    background: "rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.3)",
    cursor: "not-allowed",
    boxShadow: "none",
  },
  btnText: {
    position: "relative",
    zIndex: 1,
  },
  btnShine: {
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "60%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
    animation: "shimmer 2.5s infinite",
  },
};