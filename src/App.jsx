import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   NEON BYTE — Cyberpunk Restaurant
   Dark Neon | Glassmorphism | Holographic UI
   ═══════════════════════════════════════════════════════════ */

/* ─── GLOBAL STYLES ──────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Rajdhani', sans-serif;
  background: #020408;
  color: #e0f4ff;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #020408; }
::-webkit-scrollbar-thumb { background: #00f5ff; border-radius: 2px; }
::selection { background: #ff00aa; color: #000; }
img { display: block; max-width: 100%; }
button { font-family: inherit; cursor: pointer; border: none; background: none; }
a { text-decoration: none; color: inherit; }
input, textarea, select { font-family: inherit; }

/* ── Neon utilities ── */
.neon-cyan { color: #00f5ff; }
.neon-magenta { color: #ff00aa; }
.neon-purple { color: #bf00ff; }
.neon-yellow { color: #f5ff00; }

.font-orb { font-family: 'Orbitron', monospace; }
.font-raj { font-family: 'Rajdhani', sans-serif; }
.font-mono { font-family: 'Share Tech Mono', monospace; }

/* ── Glitch text ── */
@keyframes glitch1 {
  0%,100% { clip-path: inset(0 0 90% 0); transform: translateX(-2px); }
  25% { clip-path: inset(30% 0 50% 0); transform: translateX(2px); }
  50% { clip-path: inset(60% 0 20% 0); transform: translateX(-1px); }
  75% { clip-path: inset(10% 0 80% 0); transform: translateX(3px); }
}
@keyframes glitch2 {
  0%,100% { clip-path: inset(80% 0 0 0); transform: translateX(2px); }
  25% { clip-path: inset(40% 0 40% 0); transform: translateX(-3px); }
  50% { clip-path: inset(10% 0 70% 0); transform: translateX(1px); }
  75% { clip-path: inset(60% 0 10% 0); transform: translateX(-2px); }
}
.glitch-wrap { position: relative; display: inline-block; }
.glitch-wrap::before, .glitch-wrap::after {
  content: attr(data-text);
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
}
.glitch-wrap::before {
  color: #ff00aa; animation: glitch1 3s infinite steps(1);
  text-shadow: none;
}
.glitch-wrap::after {
  color: #00f5ff; animation: glitch2 2.5s infinite steps(1);
  text-shadow: none;
}

/* ── Flicker ── */
@keyframes flicker {
  0%,19%,21%,23%,25%,54%,56%,100% { opacity:1; }
  20%,24%,55% { opacity:.4; }
}
.flicker { animation: flicker 5s infinite; }

/* ── Scan lines ── */
.scanlines::after {
  content:'';position:absolute;inset:0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
  pointer-events: none; z-index:1;
}

/* ── Particles ── */
@keyframes float-up {
  0% { transform: translateY(100vh) translateX(0); opacity:0; }
  10% { opacity:1; }
  90% { opacity:1; }
  100% { transform: translateY(-20px) translateX(var(--drift,20px)); opacity:0; }
}
.particle {
  position: fixed; border-radius: 50%;
  pointer-events: none; z-index: 0;
  animation: float-up var(--dur,8s) var(--delay,0s) infinite linear;
}

/* ── Glow card ── */
.glow-card {
  background: rgba(0,245,255,0.04);
  border: 1px solid rgba(0,245,255,0.18);
  backdrop-filter: blur(12px);
  transition: all .3s ease;
}
.glow-card:hover {
  border-color: rgba(0,245,255,0.6);
  box-shadow: 0 0 24px rgba(0,245,255,0.2), inset 0 0 24px rgba(0,245,255,0.04);
  transform: translateY(-4px);
}
.glow-card-magenta {
  background: rgba(255,0,170,0.04);
  border: 1px solid rgba(255,0,170,0.18);
  backdrop-filter: blur(12px);
  transition: all .3s ease;
}
.glow-card-magenta:hover {
  border-color: rgba(255,0,170,0.6);
  box-shadow: 0 0 24px rgba(255,0,170,0.2), inset 0 0 24px rgba(255,0,170,0.04);
  transform: translateY(-4px);
}

/* ── Neon btn ── */
.btn-neon-cyan {
  background: transparent;
  border: 1px solid #00f5ff;
  color: #00f5ff;
  font-family: 'Orbitron', monospace;
  font-size: .7rem; font-weight: 700;
  letter-spacing: .2em; text-transform: uppercase;
  padding: 14px 32px;
  position: relative; overflow: hidden;
  transition: all .3s;
  cursor: pointer;
}
.btn-neon-cyan::before {
  content: '';
  position: absolute; inset: 0;
  background: #00f5ff;
  transform: translateX(-100%);
  transition: transform .3s ease;
  z-index: 0;
}
.btn-neon-cyan:hover::before { transform: translateX(0); }
.btn-neon-cyan:hover { color: #020408; box-shadow: 0 0 30px rgba(0,245,255,0.5); }
.btn-neon-cyan span { position: relative; z-index: 1; }

.btn-neon-magenta {
  background: transparent;
  border: 1px solid #ff00aa;
  color: #ff00aa;
  font-family: 'Orbitron', monospace;
  font-size: .7rem; font-weight: 700;
  letter-spacing: .2em; text-transform: uppercase;
  padding: 14px 32px;
  position: relative; overflow: hidden;
  transition: all .3s;
  cursor: pointer;
}
.btn-neon-magenta::before {
  content: '';
  position: absolute; inset: 0;
  background: #ff00aa;
  transform: translateX(-100%);
  transition: transform .3s ease;
  z-index: 0;
}
.btn-neon-magenta:hover::before { transform: translateX(0); }
.btn-neon-magenta:hover { color: #020408; box-shadow: 0 0 30px rgba(255,0,170,0.5); }
.btn-neon-magenta span { position: relative; z-index: 1; }

.btn-solid-cyan {
  background: #00f5ff;
  border: 1px solid #00f5ff;
  color: #020408;
  font-family: 'Orbitron', monospace;
  font-size: .7rem; font-weight: 700;
  letter-spacing: .2em; text-transform: uppercase;
  padding: 14px 32px;
  transition: all .3s;
  cursor: pointer;
}
.btn-solid-cyan:hover {
  box-shadow: 0 0 40px rgba(0,245,255,0.7);
  transform: translateY(-2px);
}

/* ── HUD line ── */
.hud-line {
  display: flex; align-items: center; gap: 12px;
  font-family: 'Share Tech Mono', monospace;
  font-size: .65rem; color: rgba(0,245,255,0.5);
  letter-spacing: .1em;
}
.hud-line::before { content:''; flex:0 0 40px; height:1px; background: rgba(0,245,255,0.3); }
.hud-line::after  { content:''; flex:1; height:1px; background: rgba(0,245,255,0.1); }

/* ── Input cyber ── */
.input-cyber {
  background: rgba(0,245,255,0.04);
  border: 1px solid rgba(0,245,255,0.2);
  color: #e0f4ff;
  padding: 14px 18px;
  font-family: 'Share Tech Mono', monospace;
  font-size: .85rem;
  outline: none;
  transition: all .3s;
  width: 100%;
}
.input-cyber:focus {
  border-color: #00f5ff;
  box-shadow: 0 0 16px rgba(0,245,255,0.2), inset 0 0 12px rgba(0,245,255,0.05);
}
.input-cyber::placeholder { color: rgba(0,245,255,0.3); }

/* ── Price tag ── */
.price-tag {
  font-family: 'Orbitron', monospace;
  color: #f5ff00;
  font-size: 1.1rem;
  font-weight: 700;
  text-shadow: 0 0 12px rgba(245,255,0,0.6);
}

/* ── Category pill ── */
.cat-pill {
  font-family: 'Share Tech Mono', monospace;
  font-size: .6rem;
  letter-spacing: .15em;
  text-transform: uppercase;
  padding: 4px 12px;
  border: 1px solid rgba(0,245,255,0.3);
  color: #00f5ff;
  background: rgba(0,245,255,0.08);
  cursor: pointer;
  transition: all .25s;
}
.cat-pill:hover, .cat-pill.active {
  background: #00f5ff;
  color: #020408;
  box-shadow: 0 0 16px rgba(0,245,255,0.4);
}

/* ── Qty btn ── */
.qty-btn {
  width: 32px; height: 32px;
  border: 1px solid rgba(0,245,255,0.3);
  color: #00f5ff;
  background: rgba(0,245,255,0.06);
  font-size: 1.2rem;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all .2s;
}
.qty-btn:hover {
  background: #00f5ff; color: #020408;
  box-shadow: 0 0 12px rgba(0,245,255,0.5);
}

/* ── Corner decoration ── */
.corner-tl::before, .corner-tl::after,
.corner-br::before, .corner-br::after {
  content: '';
  position: absolute;
  width: 16px; height: 16px;
}
.corner-tl::before { top:0; left:0; border-top:2px solid #00f5ff; border-left:2px solid #00f5ff; }
.corner-br::after  { bottom:0; right:0; border-bottom:2px solid #00f5ff; border-right:2px solid #00f5ff; }

/* ── Animations ── */
@keyframes pulse-glow {
  0%,100% { box-shadow: 0 0 10px rgba(0,245,255,0.3); }
  50% { box-shadow: 0 0 30px rgba(0,245,255,0.7), 0 0 60px rgba(0,245,255,0.3); }
}
@keyframes slide-in {
  from { opacity:0; transform: translateY(30px); }
  to { opacity:1; transform: translateY(0); }
}
@keyframes neon-border {
  0%,100% { border-color: rgba(0,245,255,0.3); }
  50% { border-color: rgba(0,245,255,0.8); }
}
@keyframes streak {
  0% { transform: translateX(-100%) rotate(45deg); opacity:0; }
  10%,90% { opacity:1; }
  100% { transform: translateX(300%) rotate(45deg); opacity:0; }
}
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes blink {
  0%,100% { opacity:1; } 50% { opacity:0; }
}
.blink { animation: blink 1s infinite; }
`;

/* ─── DATA ───────────────────────────────────────────────── */
const MENU_ITEMS = [
  /* Street Food */
  { id:1, cat:"Street Food", name:"Neon Ramen", desc:"Glowing broth infused with synthetic umami, chrome noodles, hover-pork, bio-egg, neon bamboo shoots", price:480, img:"https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80", badge:"BESTSELLER" },
  { id:2, cat:"Street Food", name:"Plasma Dumplings", desc:"Translucent steamed parcels filled with lab-grown shrimp, chili oil matrix, quantum vinegar dip", price:320, img:"https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80", badge:"SPICY" },
  { id:3, cat:"Street Food", name:"Circuit Skewers", desc:"Charred synth-meat on titanium skewers, teriyaki voltage glaze, micro-green garnish, side chili chip", price:280, img:"https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80", badge:null },
  { id:4, cat:"Street Food", name:"Flux Tacos", desc:"Three crispy shell vessels with slow-cooked jackal protein, plasma salsa, holographic guac", price:360, img:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80", badge:"NEW" },

  /* Cyber Meals */
  { id:5, cat:"Cyber Meals", name:"Cyber Burger", desc:"2cm thick synth-beef patty, chrome bun baked in UV oven, glitch cheese, binary onion rings", price:620, img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80", badge:"LOADED" },
  { id:6, cat:"Cyber Meals", name:"Holo-Bowl", desc:"Steamed chrome rice, grade-A protein, neon broccoli, miso-tech sauce, sesame laser crunch", price:540, img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80", badge:"HEALTHY" },
  { id:7, cat:"Cyber Meals", name:"Grid Pizza", desc:"Octagonal crust, synthetic mozz, 404 sauce, lab-pepperoni, basil-bot garnish, UV-char crust", price:700, img:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80", badge:null },
  { id:8, cat:"Cyber Meals", name:"Noodle Core XL", desc:"Extra-wide chrome flat noodles, black garlic broth, flash-fried protein cubes, chili thread topping", price:580, img:"https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&q=80", badge:"XL" },

  /* Drinks */
  { id:9,  cat:"Drinks", name:"Quantum Shake",  desc:"Luminescent milk base, synthetic vanilla matrix, hyper-berry swirl, edible neon sprinkle top", price:380, img:"https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80", badge:"GLOW" },
  { id:10, cat:"Drinks", name:"Plasma Punch",   desc:"Electrolyte-charged citrus blend, ion burst fizz, floating cyan spheres, UV-reactive garnish",  price:320, img:"https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80", badge:null },
  { id:11, cat:"Drinks", name:"Dark Matter Espresso", desc:"Triple-extracted dark bean, zero-gravity foam, temporal sugar crystals, micro black aura",   price:240, img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80", badge:"STRONG" },
  { id:12, cat:"Drinks", name:"Glitch Tea",     desc:"Fermented bio-tea, reactive pigment bloom on ice, nano-mint, electrolyte pearl drops, smoke lid",  price:280, img:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80", badge:"HOT/ICE" },

  /* Desserts */
  { id:13, cat:"Desserts", name:"Neon Sundae",    desc:"Three-scoop synthetic ice cream, chromatic fudge rivers, UV wafer sticks, holographic sprinkles", price:420, img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80", badge:"SWEET" },
  { id:14, cat:"Desserts", name:"Glitch Cake",    desc:"Dark matter sponge layers, voltage buttercream, edible circuit board topping, neon candles",       price:480, img:"https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80", badge:"SHARE" },
  { id:15, cat:"Desserts", name:"Cryo Mochi",     desc:"Six neon-dyed mochi filled with liquid-nitrogen ice cream cores, dusted in shimmer powder",         price:360, img:"https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80", badge:"COLD" },
  { id:16, cat:"Desserts", name:"Data Donut Stack",desc:"Tower of glazed synth-dough, flavors: Magenta Berry, Cyan Custard, Yellow Yuzu, Purple Taro",      price:340, img:"https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80", badge:"STACK" },
];

const CATS = ["All", "Street Food", "Cyber Meals", "Drinks", "Desserts"];

const FEATURED = MENU_ITEMS.filter(i => [1,5,9,13].includes(i.id));

const NAV_PAGES = ["Home","Menu","About","Contact","Help"];

/* ─── PARTICLES ─────────────────────────────────────────── */
function Particles() {
  const particles = Array.from({length:28},(_,i)=>({
    id:i,
    x: Math.random()*100,
    size: Math.random()*3+1,
    dur: Math.random()*10+6,
    delay: Math.random()*8,
    drift: (Math.random()-0.5)*80,
    color: ["#00f5ff","#ff00aa","#bf00ff","#f5ff00"][Math.floor(Math.random()*4)],
  }));
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
      {particles.map(p=>(
        <div key={p.id} className="particle" style={{
          left:`${p.x}%`, bottom:0,
          width:p.size, height:p.size,
          background:p.color,
          boxShadow:`0 0 ${p.size*3}px ${p.color}`,
          "--dur":`${p.dur}s`,
          "--delay":`${p.delay}s`,
          "--drift":`${p.drift}px`,
        }}/>
      ))}
    </div>
  );
}

/* ─── NAVBAR ────────────────────────────────────────────── */
function Navbar({ page, setPage, cartCount }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(()=>{
    const h = ()=>setScrolled(window.scrollY>50);
    window.addEventListener("scroll",h);
    return ()=>window.removeEventListener("scroll",h);
  },[]);

  const navBg = scrolled
    ? "rgba(2,4,8,0.95)"
    : "rgba(2,4,8,0.7)";

  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:1000,
      background:navBg,
      borderBottom:`1px solid rgba(0,245,255,${scrolled?0.25:0.1})`,
      backdropFilter:"blur(16px)",
      transition:"all .4s",
      boxShadow: scrolled ? "0 4px 40px rgba(0,245,255,0.08)" : "none",
    }}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"0 clamp(16px,4vw,60px)",display:"flex",alignItems:"center",justifyContent:"space-between",height:68}}>

        {/* Logo */}
        <button onClick={()=>setPage("Home")} style={{display:"flex",alignItems:"center",gap:10,background:"none",border:"none",cursor:"pointer"}}>
          <div style={{
            width:36,height:36,border:"2px solid #00f5ff",
            display:"flex",alignItems:"center",justifyContent:"center",
            position:"relative",
            boxShadow:"0 0 16px rgba(0,245,255,0.4), inset 0 0 10px rgba(0,245,255,0.1)",
            animation:"pulse-glow 3s infinite",
          }}>
            <span style={{fontFamily:"'Orbitron',monospace",fontSize:".75rem",fontWeight:900,color:"#00f5ff",letterSpacing:"-.05em"}}>NB</span>
            <span style={{position:"absolute",top:-3,right:-3,width:6,height:6,background:"#ff00aa",borderRadius:"50%",boxShadow:"0 0 8px #ff00aa"}}/>
          </div>
          <div>
            <div className="glitch-wrap" data-text="NEON BYTE" style={{fontFamily:"'Orbitron',monospace",fontSize:"1rem",fontWeight:900,color:"#00f5ff",letterSpacing:".12em",textShadow:"0 0 16px rgba(0,245,255,0.7)"}}>NEON BYTE</div>
            <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".52rem",color:"rgba(0,245,255,0.5)",letterSpacing:".25em",marginTop:1}}>EAT. UPGRADE. REPEAT.</div>
          </div>
        </button>

        {/* Desktop Nav */}
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {NAV_PAGES.map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{
              fontFamily:"'Orbitron',monospace",
              fontSize:".58rem",fontWeight:700,
              letterSpacing:".18em",textTransform:"uppercase",
              color: page===p ? "#00f5ff" : "rgba(224,244,255,0.5)",
              padding:"8px 14px",
              background: page===p ? "rgba(0,245,255,0.08)" : "transparent",
              border: page===p ? "1px solid rgba(0,245,255,0.3)" : "1px solid transparent",
              transition:"all .25s",
              cursor:"pointer",
              textShadow: page===p ? "0 0 12px rgba(0,245,255,0.8)" : "none",
            }}
              onMouseEnter={e=>{ if(page!==p){ e.currentTarget.style.color="#00f5ff"; e.currentTarget.style.borderColor="rgba(0,245,255,0.2)"; }}}
              onMouseLeave={e=>{ if(page!==p){ e.currentTarget.style.color="rgba(224,244,255,0.5)"; e.currentTarget.style.borderColor="transparent"; }}}
            >{p}</button>
          ))}

          {/* Cart */}
          <button onClick={()=>setPage("Cart")} style={{
            marginLeft:8, position:"relative",
            width:42,height:42,
            border:"1px solid rgba(255,0,170,0.3)",
            background:"rgba(255,0,170,0.06)",
            display:"flex",alignItems:"center",justifyContent:"center",
            transition:"all .25s",
            cursor:"pointer",
          }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(255,0,170,0.7)"; e.currentTarget.style.boxShadow="0 0 20px rgba(255,0,170,0.3)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(255,0,170,0.3)"; e.currentTarget.style.boxShadow="none"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff00aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {cartCount>0 && (
              <span style={{
                position:"absolute",top:-6,right:-6,
                width:18,height:18,background:"#ff00aa",
                borderRadius:"50%",
                fontFamily:"'Orbitron',monospace",
                fontSize:".55rem",fontWeight:700,
                color:"#020408",
                display:"flex",alignItems:"center",justifyContent:"center",
                boxShadow:"0 0 12px rgba(255,0,170,0.8)",
              }}>{cartCount}</span>
            )}
          </button>

          {/* Order btn */}
          <button className="btn-neon-cyan" onClick={()=>setPage("Menu")} style={{marginLeft:8,padding:"10px 20px"}}>
            <span>Order Now</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ─── HOME PAGE ─────────────────────────────────────────── */
function Home({ setPage, addToCart }) {
  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight:"100vh",position:"relative",
        display:"flex",alignItems:"center",
        overflow:"hidden",
        background:"linear-gradient(135deg, #020408 0%, #050112 50%, #020408 100%)",
      }}>
        {/* Grid overlay */}
        <div style={{
          position:"absolute",inset:0,
          backgroundImage:`
            linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize:"60px 60px",
        }}/>

        {/* Light streaks */}
        {[...Array(6)].map((_,i)=>(
          <div key={i} style={{
            position:"absolute",
            height:2, width:"40%",
            background:`linear-gradient(90deg, transparent, ${["#00f5ff","#ff00aa","#bf00ff"][i%3]}, transparent)`,
            top:`${15+i*14}%`,
            left:i%2===0?"0":undefined,
            right:i%2!==0?"0":undefined,
            opacity:.4,
            animation:`streak ${4+i*1.5}s ${i*0.8}s infinite linear`,
          }}/>
        ))}

        {/* Radial glow */}
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,background:"radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)",pointerEvents:"none"}}/>

        <div style={{maxWidth:1400,margin:"0 auto",padding:"0 clamp(16px,4vw,60px)",width:"100%",position:"relative",zIndex:2,paddingTop:100}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center"}}>

            {/* Left */}
            <div>
              <div className="hud-line" style={{marginBottom:20}}>SYS::NEONBYTE_OS v2.077</div>

              <h1 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(2.5rem,6vw,5rem)",fontWeight:900,lineHeight:1.05,marginBottom:24}}>
                <span style={{color:"#00f5ff",textShadow:"0 0 30px rgba(0,245,255,0.8)",display:"block"}} className="flicker">FUEL YOUR</span>
                <span style={{color:"#ff00aa",textShadow:"0 0 30px rgba(255,0,170,0.8)",display:"block"}}>NEURAL</span>
                <span style={{color:"#e0f4ff",display:"block"}}>NETWORK</span>
              </h1>

              <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"1.15rem",color:"rgba(224,244,255,0.65)",lineHeight:1.7,maxWidth:480,marginBottom:36}}>
                Step into the world's first cyberpunk food hub. Engineered flavours, holographic presentation, android chefs — every meal is an upgrade to your system.
              </p>

              <div style={{display:"flex",gap:16,flexWrap:"wrap",marginBottom:48}}>
                <button className="btn-solid-cyan" onClick={()=>setPage("Menu")}>
                  <span>⚡ Order Now</span>
                </button>
                <button className="btn-neon-magenta" onClick={()=>setPage("About")}>
                  <span>Our Story</span>
                </button>
              </div>

              {/* Stats */}
              <div style={{display:"flex",gap:40}}>
                {[["2,077+","Happy Humans"],["48","Cyber Dishes"],["24/7","Always Online"]].map(([n,l])=>(
                  <div key={l}>
                    <div style={{fontFamily:"'Orbitron',monospace",fontSize:"1.5rem",fontWeight:900,color:"#00f5ff",textShadow:"0 0 16px rgba(0,245,255,0.7)"}}>{n}</div>
                    <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".65rem",color:"rgba(224,244,255,0.4)",letterSpacing:".12em",marginTop:4}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — hero image */}
            <div style={{position:"relative"}}>
              <div style={{
                position:"relative",
                borderRadius:0,
                border:"1px solid rgba(0,245,255,0.25)",
                boxShadow:"0 0 60px rgba(0,245,255,0.15), inset 0 0 40px rgba(0,245,255,0.03)",
                overflow:"hidden",
                aspectRatio:"4/3",
              }}>
                <img src="https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=90" alt="Cyber Ramen" style={{width:"100%",height:"100%",objectFit:"cover",filter:"saturate(1.3) hue-rotate(5deg)"}}/>
                {/* Overlay */}
                <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg, rgba(0,245,255,0.1) 0%, transparent 60%, rgba(255,0,170,0.1) 100%)"}}/>
                {/* HUD overlay */}
                <div style={{position:"absolute",top:12,left:12,fontFamily:"'Share Tech Mono',monospace",fontSize:".6rem",color:"#00f5ff",opacity:.7}}>
                  <div>SYS::CAM_01 [LIVE]</div>
                  <div>DISH::NEON_RAMEN_v3</div>
                  <div>TEMP::74°C ✓</div>
                </div>
                <div style={{position:"absolute",bottom:12,right:12,fontFamily:"'Share Tech Mono',monospace",fontSize:".6rem",color:"#ff00aa",opacity:.7,textAlign:"right"}}>
                  <div>FLAVOUR::MAX</div>
                  <div>SATISFACTION::∞</div>
                </div>
                {/* Corner decorations */}
                <div style={{position:"absolute",top:0,left:0,width:20,height:20,borderTop:"2px solid #00f5ff",borderLeft:"2px solid #00f5ff"}}/>
                <div style={{position:"absolute",top:0,right:0,width:20,height:20,borderTop:"2px solid #00f5ff",borderRight:"2px solid #00f5ff"}}/>
                <div style={{position:"absolute",bottom:0,left:0,width:20,height:20,borderBottom:"2px solid #ff00aa",borderLeft:"2px solid #ff00aa"}}/>
                <div style={{position:"absolute",bottom:0,right:0,width:20,height:20,borderBottom:"2px solid #ff00aa",borderRight:"2px solid #ff00aa"}}/>
              </div>

              {/* Floating badge */}
              <div style={{
                position:"absolute",top:-20,right:-20,
                background:"rgba(255,0,170,0.1)",
                border:"1px solid rgba(255,0,170,0.5)",
                backdropFilter:"blur(8px)",
                padding:"12px 18px",
                fontFamily:"'Orbitron',monospace",
                fontSize:".65rem",
                color:"#ff00aa",
                textShadow:"0 0 12px rgba(255,0,170,0.8)",
                boxShadow:"0 0 24px rgba(255,0,170,0.2)",
              }}>
                <div style={{fontSize:"1.2rem",fontWeight:900}}>★ 4.9</div>
                <div style={{opacity:.7,marginTop:2}}>CYBER RATED</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div style={{position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
          <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".6rem",color:"rgba(0,245,255,0.4)",letterSpacing:".2em"}}>SCROLL TO EXPLORE</div>
          <div style={{width:1,height:40,background:"linear-gradient(to bottom, rgba(0,245,255,0.5), transparent)"}}/>
        </div>
      </section>

      {/* Featured Dishes */}
      <section style={{padding:"100px 0",background:"#030509",position:"relative"}}>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"0 clamp(16px,4vw,60px)"}}>
          <div style={{textAlign:"center",marginBottom:64}}>
            <div className="hud-line" style={{justifyContent:"center",marginBottom:16}}>FEATURED.DISHES::TOP_PICKS</div>
            <h2 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"#e0f4ff"}}>
              <span style={{color:"#00f5ff",textShadow:"0 0 20px rgba(0,245,255,0.6)"}}>SIGNATURE</span> PROTOCOLS
            </h2>
            <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"1.05rem",color:"rgba(224,244,255,0.5)",marginTop:12,maxWidth:500,margin:"12px auto 0"}}>
              Hand-crafted by our android brigade. Each dish engineered to perfection.
            </p>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24}}>
            {FEATURED.map((dish,i)=>(
              <FoodCard key={dish.id} dish={dish} setPage={setPage} addToCart={addToCart} accent={i%2===0?"cyan":"magenta"}/>
            ))}
          </div>

          <div style={{textAlign:"center",marginTop:56}}>
            <button className="btn-neon-cyan" onClick={()=>setPage("Menu")}>
              <span>View Full Menu →</span>
            </button>
          </div>
        </div>
      </section>

      {/* Why NEON BYTE */}
      <section style={{padding:"100px 0",background:"#020408",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:0,top:"50%",transform:"translateY(-50%)",width:400,height:400,background:"radial-gradient(circle, rgba(191,0,255,0.06) 0%, transparent 70%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"0 clamp(16px,4vw,60px)"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>
            <div>
              <div className="hud-line" style={{marginBottom:16}}>SYSTEM::ABOUT_NEONBYTE</div>
              <h2 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:900,color:"#e0f4ff",marginBottom:20}}>
                WHY WE'RE<br/><span style={{color:"#bf00ff",textShadow:"0 0 20px rgba(191,0,255,0.7)"}}>DIFFERENT</span>
              </h2>
              <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"1.05rem",color:"rgba(224,244,255,0.6)",lineHeight:1.8,marginBottom:36}}>
                In 2045, as the city merged with its own neural grid, NEON BYTE was born in Neo-Mumbai's underground. We don't just cook food — we engineer experiences that interface directly with your pleasure receptors.
              </p>
              <button className="btn-neon-magenta" onClick={()=>setPage("About")}>
                <span>Read Our Story</span>
              </button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              {[
                {icon:"🤖",title:"Android Chefs",desc:"Our AI brigade cooks with nano-precision 24/7"},
                {icon:"🛸",title:"Drone Delivery",desc:"Fleet of 200 drones covers 50km radius"},
                {icon:"⚡",title:"Instant Boost",desc:"Meals engineered for peak cognitive performance"},
                {icon:"🌐",title:"Holo-Menu",desc:"Order in AR/VR from anywhere in the metaverse"},
              ].map(f=>(
                <div key={f.title} className="glow-card" style={{padding:24,position:"relative"}}>
                  <div style={{fontSize:"1.8rem",marginBottom:12}}>{f.icon}</div>
                  <div style={{fontFamily:"'Orbitron',monospace",fontSize:".75rem",fontWeight:700,color:"#00f5ff",marginBottom:8,letterSpacing:".08em"}}>{f.title}</div>
                  <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:".9rem",color:"rgba(224,244,255,0.55)",lineHeight:1.6}}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{padding:"100px 0",background:"#030509"}}>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"0 clamp(16px,4vw,60px)"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <div className="hud-line" style={{justifyContent:"center",marginBottom:16}}>USER::FEEDBACK_LOG</div>
            <h2 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:900,color:"#e0f4ff"}}>
              WHAT <span style={{color:"#ff00aa",textShadow:"0 0 20px rgba(255,0,170,0.7)"}}>HUMANS</span> SAY
            </h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24}}>
            {[
              {name:"UNIT_7749",role:"Neural Hacker, Night City",quote:"My wetware has processed thousands of meals. NEON BYTE's Cyber Burger rewired my taste matrix permanently. Highest caloric ROI in the sector.",stars:5},
              {name:"Zara-X",role:"Android Influencer",quote:"As a synthetic being, I don't taste food — but my sensors still maxed out at NEON BYTE. The plasma punch registers off every scale I have.",stars:5},
              {name:"Marcus Volt",role:"CEO, MegaCorp 17",quote:"We host all board dinners here. The holo-presentation alone closes deals. Three contracts signed over Neon Ramen last quarter.",stars:5},
            ].map(t=>(
              <div key={t.name} className="glow-card-magenta" style={{padding:32}}>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:".9rem",color:"#ff00aa",marginBottom:4}}>{"★".repeat(t.stars)}</div>
                <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"1rem",color:"rgba(224,244,255,0.75)",lineHeight:1.7,marginBottom:20,fontStyle:"italic"}}>"{t.quote}"</p>
                <div>
                  <div style={{fontFamily:"'Orbitron',monospace",fontSize:".7rem",fontWeight:700,color:"#e0f4ff"}}>{t.name}</div>
                  <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".6rem",color:"rgba(255,0,170,0.6)",marginTop:4}}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{padding:"80px 0",background:"linear-gradient(135deg, rgba(0,245,255,0.06) 0%, rgba(255,0,170,0.06) 100%)",borderTop:"1px solid rgba(0,245,255,0.12)",borderBottom:"1px solid rgba(0,245,255,0.12)"}}>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"0 clamp(16px,4vw,60px)",textAlign:"center"}}>
          <h2 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.5rem,4vw,3rem)",fontWeight:900,color:"#e0f4ff",marginBottom:16}}>
            READY TO <span style={{color:"#00f5ff",textShadow:"0 0 24px rgba(0,245,255,0.8)"}}>UPGRADE</span>?
          </h2>
          <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"1.1rem",color:"rgba(224,244,255,0.55)",marginBottom:36}}>
            Join 2,077+ citizens who've already connected to the NEON BYTE network.
          </p>
          <button className="btn-solid-cyan" onClick={()=>setPage("Menu")} style={{fontSize:".75rem",padding:"16px 48px"}}>
            ⚡ ACCESS FULL MENU
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─── FOOD CARD ─────────────────────────────────────────── */
function FoodCard({ dish, setPage, addToCart, accent="cyan" }) {
  const isC = accent==="cyan";
  const col = isC ? "#00f5ff" : "#ff00aa";
  const cls = isC ? "glow-card" : "glow-card-magenta";
  return (
    <div className={cls} style={{overflow:"hidden",cursor:"pointer",position:"relative"}}
      onClick={()=>setPage(`product:${dish.id}`)}
    >
      {dish.badge && (
        <div style={{
          position:"absolute",top:12,left:12,zIndex:2,
          fontFamily:"'Orbitron',monospace",fontSize:".55rem",fontWeight:700,
          color:"#020408",background:col,
          padding:"3px 10px",letterSpacing:".12em",
          boxShadow:`0 0 12px ${col}`,
        }}>{dish.badge}</div>
      )}
      <div style={{aspectRatio:"4/3",overflow:"hidden"}}>
        <img src={dish.img} alt={dish.name} style={{width:"100%",height:"100%",objectFit:"cover",filter:"saturate(1.2)",transition:"transform .5s"}}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.08)"}
          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
        />
        <div style={{position:"absolute",inset:0,background:`linear-gradient(to top, rgba(2,4,8,0.9) 0%, transparent 60%)`}}/>
      </div>
      <div style={{padding:20}}>
        <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".58rem",color:`rgba(${isC?"0,245,255":"255,0,170"},0.6)`,letterSpacing:".15em",marginBottom:8}}>{dish.cat.toUpperCase()}</div>
        <h3 style={{fontFamily:"'Orbitron',monospace",fontSize:"1rem",fontWeight:700,color:"#e0f4ff",marginBottom:8}}>{dish.name}</h3>
        <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:".9rem",color:"rgba(224,244,255,0.5)",lineHeight:1.5,marginBottom:16,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{dish.desc}</p>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span className="price-tag">₹{dish.price}</span>
          <button className={isC?"btn-neon-cyan":"btn-neon-magenta"} style={{padding:"8px 16px",fontSize:".58rem"}}
            onClick={e=>{e.stopPropagation();addToCart(dish);}}
          ><span>+ ADD</span></button>
        </div>
      </div>
    </div>
  );
}

/* ─── MENU PAGE ─────────────────────────────────────────── */
function Menu({ setPage, addToCart }) {
  const [activeCat, setActiveCat] = useState("All");
  const filtered = activeCat==="All" ? MENU_ITEMS : MENU_ITEMS.filter(i=>i.cat===activeCat);

  return (
    <div style={{paddingTop:100,minHeight:"100vh",background:"#020408"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"60px clamp(16px,4vw,60px)"}}>
        <div style={{marginBottom:56}}>
          <div className="hud-line" style={{marginBottom:16}}>MENU::BROWSE_CATALOG</div>
          <h1 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"#e0f4ff",marginBottom:8}}>
            THE <span style={{color:"#00f5ff",textShadow:"0 0 24px rgba(0,245,255,0.7)"}}>MENU</span>
          </h1>
          <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"1.05rem",color:"rgba(224,244,255,0.5)"}}>
            {MENU_ITEMS.length} items loaded. Select your protocol.
          </p>
        </div>

        {/* Category Filter */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:48}}>
          {CATS.map(c=>(
            <button key={c} className={`cat-pill${activeCat===c?" active":""}`} onClick={()=>setActiveCat(c)}>{c}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:24}}>
          {filtered.map((dish,i)=>(
            <FoodCard key={dish.id} dish={dish} setPage={setPage} addToCart={addToCart} accent={i%3===0?"cyan":i%3===1?"magenta":"cyan"}/>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── PRODUCT DETAIL ────────────────────────────────────── */
function ProductDetail({ dish, setPage, addToCart }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    for(let i=0;i<qty;i++) addToCart(dish);
    setAdded(true);
    setTimeout(()=>setAdded(false),2000);
  };

  return (
    <div style={{paddingTop:100,minHeight:"100vh",background:"#020408"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"60px clamp(16px,4vw,60px)"}}>
        <button onClick={()=>setPage("Menu")} style={{
          fontFamily:"'Share Tech Mono',monospace",fontSize:".7rem",color:"rgba(0,245,255,0.6)",
          marginBottom:40,display:"flex",alignItems:"center",gap:8,
          background:"none",border:"none",cursor:"pointer",transition:"color .2s",
        }}
          onMouseEnter={e=>e.currentTarget.style.color="#00f5ff"}
          onMouseLeave={e=>e.currentTarget.style.color="rgba(0,245,255,0.6)"}
        >← BACK TO MENU</button>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"start"}}>
          {/* Image */}
          <div style={{position:"relative",border:"1px solid rgba(0,245,255,0.2)",overflow:"hidden"}}>
            <img src={dish.img} alt={dish.name} style={{width:"100%",aspectRatio:"4/3",objectFit:"cover",filter:"saturate(1.3)"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg, rgba(0,245,255,0.06) 0%, transparent 60%, rgba(255,0,170,0.06) 100%)"}}/>
            <div style={{position:"absolute",top:0,left:0,width:20,height:20,borderTop:"2px solid #00f5ff",borderLeft:"2px solid #00f5ff"}}/>
            <div style={{position:"absolute",top:0,right:0,width:20,height:20,borderTop:"2px solid #00f5ff",borderRight:"2px solid #00f5ff"}}/>
            <div style={{position:"absolute",bottom:0,left:0,width:20,height:20,borderBottom:"2px solid #ff00aa",borderLeft:"2px solid #ff00aa"}}/>
            <div style={{position:"absolute",bottom:0,right:0,width:20,height:20,borderBottom:"2px solid #ff00aa",borderRight:"2px solid #ff00aa"}}/>
            {/* HUD */}
            <div style={{position:"absolute",top:12,left:12,fontFamily:"'Share Tech Mono',monospace",fontSize:".58rem",color:"rgba(0,245,255,0.7)",lineHeight:1.8}}>
              <div>ID::{dish.id.toString().padStart(4,"0")}</div>
              <div>CAT::{dish.cat.toUpperCase().replace(" ","_")}</div>
              <div>STATUS::AVAILABLE</div>
            </div>
          </div>

          {/* Info HUD */}
          <div>
            <div className="hud-line" style={{marginBottom:16}}>DISH::DETAIL_VIEW</div>
            <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".65rem",color:"rgba(0,245,255,0.5)",letterSpacing:".15em",marginBottom:12}}>{dish.cat.toUpperCase()}</div>
            <h1 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:900,color:"#e0f4ff",marginBottom:20}}>{dish.name}</h1>

            {/* Divider */}
            <div style={{height:1,background:"linear-gradient(to right, #00f5ff, transparent)",marginBottom:24,opacity:.3}}/>

            {/* Description as HUD entries */}
            <div style={{background:"rgba(0,245,255,0.03)",border:"1px solid rgba(0,245,255,0.12)",padding:24,marginBottom:28,fontFamily:"'Rajdhani',sans-serif"}}>
              <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".6rem",color:"rgba(0,245,255,0.5)",marginBottom:12,letterSpacing:".12em"}}>// COMPOSITION_DATA</div>
              <p style={{fontSize:"1.05rem",color:"rgba(224,244,255,0.75)",lineHeight:1.7}}>{dish.desc}</p>
            </div>

            {/* Stats */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:28}}>
              {[["PREP","12 min"],["CALS","680 kcal"],["HEAT","🌶🌶"]].map(([k,v])=>(
                <div key={k} style={{background:"rgba(0,0,0,0.3)",border:"1px solid rgba(0,245,255,0.1)",padding:16,textAlign:"center"}}>
                  <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".55rem",color:"rgba(0,245,255,0.45)",letterSpacing:".12em",marginBottom:6}}>{k}</div>
                  <div style={{fontFamily:"'Orbitron',monospace",fontSize:".85rem",fontWeight:700,color:"#e0f4ff"}}>{v}</div>
                </div>
              ))}
            </div>

            <div className="price-tag" style={{fontSize:"2rem",marginBottom:28}}>₹{dish.price}</div>

            {/* Qty + Add */}
            <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:24}}>
              <div style={{display:"flex",alignItems:"center",gap:0}}>
                <button className="qty-btn" onClick={()=>setQty(q=>Math.max(1,q-1))}>−</button>
                <div style={{width:52,height:32,border:"1px solid rgba(0,245,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Orbitron',monospace",fontSize:"1rem",color:"#e0f4ff"}}>{qty}</div>
                <button className="qty-btn" onClick={()=>setQty(q=>q+1)}>+</button>
              </div>
              <button className="btn-solid-cyan" onClick={handleAdd} style={{flex:1,fontSize:".65rem"}}>
                {added ? "✓ ADDED TO CART" : `⚡ ADD TO CART — ₹${dish.price * qty}`}
              </button>
            </div>

            <button className="btn-neon-magenta" onClick={()=>setPage("Cart")} style={{width:"100%",fontSize:".65rem"}}>
              <span>🛒 VIEW CART</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── HELP PAGE ─────────────────────────────────────────── */
function Help({ setPage }) {
  const faqs = [
    {
      q: "What is NEON BYTE?",
      a: "NEON BYTE is a cyberpunk-themed restaurant chain offering futuristic dining experiences with neon aesthetics, holographic menus, and innovative fusion cuisine."
    },
    {
      q: "How do I place an order?",
      a: "You can browse our menu online, add items to your cart, and proceed to checkout. We also accept orders through our mobile app and delivery drones."
    },
    {
      q: "Do you offer delivery?",
      a: "Yes! We have a fleet of autonomous delivery drones that can deliver your order within 15 minutes in the Neo-Mumbai area."
    },
    {
      q: "Are your ingredients sustainable?",
      a: "Absolutely. We use lab-grown proteins, vertical farming produce, and recycled packaging to minimize our environmental impact."
    },
    {
      q: "Can I customize my order?",
      a: "Yes, many dishes can be customized with spice levels, protein alternatives, and dietary accommodations. Check individual item descriptions for options."
    },
    {
      q: "Do you have vegetarian/vegan options?",
      a: "Yes! We offer a wide range of plant-based dishes using advanced food technology to create meat-like textures and flavors from sustainable sources."
    },
    {
      q: "What's your refund policy?",
      a: "We offer full refunds for any issues with your order. Contact our support team within 24 hours of delivery for assistance."
    },
    {
      q: "How do I track my drone delivery?",
      a: "Once your order is confirmed, you'll receive a tracking link via SMS and our app showing real-time drone location and ETA."
    },
    {
      q: "Do you cater events?",
      a: "Yes, we provide catering services for corporate events, parties, and special occasions. Contact us for custom menu planning."
    },
    {
      q: "Are you hiring?",
      a: "We're always looking for talented individuals passionate about food and technology. Check our careers page or visit our locations to inquire about opportunities."
    }
  ];

  return (
    <div style={{paddingTop:100,minHeight:"100vh",background:"#020408"}}>
      {/* Hero Banner */}
      <div style={{position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#020408,#050112)",borderBottom:"1px solid rgba(0,245,255,0.1)",padding:"80px clamp(16px,4vw,60px)"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)`,backgroundSize:"60px 60px"}}/>
        <div style={{maxWidth:1400,margin:"0 auto",position:"relative",zIndex:1}}>
          <div className="hud-line" style={{marginBottom:16}}>HELP::FAQ_DATABASE</div>
          <h1 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(2rem,5vw,4rem)",fontWeight:900,color:"#e0f4ff",marginBottom:20}}>
            FREQUENTLY ASKED <span style={{color:"#00f5ff",textShadow:"0 0 30px rgba(0,245,255,0.8)"}}>QUESTIONS</span>
          </h1>
          <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"1.15rem",color:"rgba(224,244,255,0.6)",maxWidth:600,lineHeight:1.8}}>
            Got questions? We've got answers. Browse our comprehensive FAQ database or contact our support team.
          </p>
        </div>
      </div>

      <div style={{maxWidth:1400,margin:"0 auto",padding:"80px clamp(16px,4vw,60px)"}}>
        {/* FAQ Grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(500px,1fr))",gap:32}}>
          {faqs.map((faq, index) => (
            <div key={index} className="glow-card" style={{padding:32}}>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:".7rem",color:"#00f5ff",letterSpacing:".2em",marginBottom:12}}>
                Q{index+1}::QUERY
              </div>
              <h3 style={{fontFamily:"'Orbitron',monospace",fontSize:"1.1rem",fontWeight:700,color:"#e0f4ff",marginBottom:16,lineHeight:1.4}}>
                {faq.q}
              </h3>
              <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:".95rem",color:"rgba(224,244,255,0.7)",lineHeight:1.6}}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div style={{textAlign:"center",marginTop:80}}>
          <div className="hud-line" style={{justifyContent:"center",marginBottom:16}}>SUPPORT::CONTACT_US</div>
          <h2 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.5rem,3vw,2.4rem)",fontWeight:900,color:"#e0f4ff",marginBottom:20}}>
            STILL NEED <span style={{color:"#ff00aa",textShadow:"0 0 20px rgba(255,0,170,0.7)"}}>HELP</span>?
          </h2>
          <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"1.1rem",color:"rgba(224,244,255,0.6)",maxWidth:600,margin:"0 auto 32px",lineHeight:1.6}}>
            Can't find what you're looking for? Our support team is here to assist you 24/7.
          </p>
          <button className="btn-neon-magenta" onClick={()=>setPage("Contact")}><span>⚡ CONTACT SUPPORT</span></button>
        </div>
      </div>
    </div>
  );
}

/* ─── CART PAGE ─────────────────────────────────────────── */
function Cart({ cart, setCart, setPage }) {
  const total = cart.reduce((s,i)=>s+i.price*i.qty, 0);

  const update = (id, delta) => {
    setCart(prev=>{
      const next = prev.map(i=>i.id===id ? {...i, qty:i.qty+delta} : i).filter(i=>i.qty>0);
      return next;
    });
  };

  if(cart.length===0) return (
    <div style={{paddingTop:100,minHeight:"100vh",background:"#020408",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontFamily:"'Orbitron',monospace",fontSize:"4rem",color:"rgba(0,245,255,0.2)",marginBottom:24}}>🛒</div>
        <div style={{fontFamily:"'Orbitron',monospace",fontSize:"1.2rem",color:"rgba(224,244,255,0.4)",marginBottom:8}}>CART::EMPTY</div>
        <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".75rem",color:"rgba(224,244,255,0.3)",marginBottom:32}}>No items in your order queue.</div>
        <button className="btn-neon-cyan" onClick={()=>setPage("Menu")}><span>Browse Menu</span></button>
      </div>
    </div>
  );

  return (
    <div style={{paddingTop:100,minHeight:"100vh",background:"#020408"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"60px clamp(16px,4vw,60px)"}}>
        <div className="hud-line" style={{marginBottom:16}}>CART::ORDER_QUEUE</div>
        <h1 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:900,color:"#e0f4ff",marginBottom:40}}>
          YOUR <span style={{color:"#ff00aa",textShadow:"0 0 20px rgba(255,0,170,0.7)"}}>CART</span>
        </h1>

        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:32}}>
          {/* Items */}
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {cart.map(item=>(
              <div key={item.id} className="glow-card" style={{padding:20,display:"flex",gap:20,alignItems:"center"}}>
                <img src={item.img} alt={item.name} style={{width:80,height:80,objectFit:"cover",border:"1px solid rgba(0,245,255,0.2)",flexShrink:0}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".58rem",color:"rgba(0,245,255,0.5)",letterSpacing:".12em",marginBottom:4}}>{item.cat.toUpperCase()}</div>
                  <div style={{fontFamily:"'Orbitron',monospace",fontSize:".85rem",fontWeight:700,color:"#e0f4ff",marginBottom:4,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.name}</div>
                  <div className="price-tag" style={{fontSize:".9rem"}}>₹{item.price}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:0,flexShrink:0}}>
                  <button className="qty-btn" onClick={()=>update(item.id,-1)}>−</button>
                  <div style={{width:40,height:32,border:"1px solid rgba(0,245,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Orbitron',monospace",fontSize:".9rem",color:"#e0f4ff"}}>{item.qty}</div>
                  <button className="qty-btn" onClick={()=>update(item.id,1)}>+</button>
                </div>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:".9rem",fontWeight:700,color:"#e0f4ff",minWidth:70,textAlign:"right",flexShrink:0}}>₹{item.price*item.qty}</div>
                <button onClick={()=>update(item.id,-item.qty)} style={{color:"rgba(255,0,170,0.5)",background:"none",border:"none",cursor:"pointer",fontSize:"1.1rem",flexShrink:0,padding:"4px 8px",transition:"color .2s"}}
                  onMouseEnter={e=>e.currentTarget.style.color="#ff00aa"}
                  onMouseLeave={e=>e.currentTarget.style.color="rgba(255,0,170,0.5)"}
                >✕</button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{position:"sticky",top:100}}>
            <div className="glow-card" style={{padding:28}}>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:".7rem",fontWeight:700,color:"#00f5ff",letterSpacing:".15em",marginBottom:24,borderBottom:"1px solid rgba(0,245,255,0.12)",paddingBottom:16}}>ORDER SUMMARY</div>
              <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
                <div style={{display:"flex",justifyContent:"space-between",fontFamily:"'Rajdhani',sans-serif",fontSize:".95rem",color:"rgba(224,244,255,0.6)"}}>
                  <span>Subtotal</span><span>₹{total}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontFamily:"'Rajdhani',sans-serif",fontSize:".95rem",color:"rgba(224,244,255,0.6)"}}>
                  <span>Delivery</span><span style={{color:"#00f5ff"}}>FREE</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontFamily:"'Rajdhani',sans-serif",fontSize:".95rem",color:"rgba(224,244,255,0.6)"}}>
                  <span>Tax (5%)</span><span>₹{Math.round(total*.05)}</span>
                </div>
              </div>
              <div style={{borderTop:"1px solid rgba(0,245,255,0.12)",paddingTop:16,marginBottom:24}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontFamily:"'Orbitron',monospace",fontSize:".75rem",fontWeight:700,color:"#e0f4ff"}}>TOTAL</span>
                  <span className="price-tag" style={{fontSize:"1.4rem"}}>₹{total + Math.round(total*.05)}</span>
                </div>
              </div>
              <button className="btn-solid-cyan" onClick={()=>setPage("Checkout")} style={{width:"100%",fontSize:".65rem",padding:"14px"}}>
                PROCEED TO CHECKOUT →
              </button>
              <button onClick={()=>setPage("Menu")} style={{width:"100%",marginTop:12,fontFamily:"'Share Tech Mono',monospace",fontSize:".65rem",color:"rgba(0,245,255,0.5)",background:"none",border:"none",cursor:"pointer",padding:"10px",transition:"color .2s"}}
                onMouseEnter={e=>e.currentTarget.style.color="#00f5ff"}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(0,245,255,0.5)"}
              >+ Add More Items</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CHECKOUT PAGE ─────────────────────────────────────── */
function Checkout({ cart, setCart, setPage }) {
  const [form, setForm] = useState({name:"",address:"",city:"",phone:"",card:"",exp:"",cvv:""});
  const [submitted, setSubmitted] = useState(false);
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);

  const handleSubmit = () => {
    if(!form.name||!form.address||!form.phone||!form.card) return;
    setSubmitted(true);
    setCart([]);
    setTimeout(()=>setPage("Home"),4000);
  };

  if(submitted) return (
    <div style={{paddingTop:100,minHeight:"100vh",background:"#020408",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center",animation:"slide-in .6s ease"}}>
        <div style={{fontFamily:"'Orbitron',monospace",fontSize:"4rem",color:"#00f5ff",textShadow:"0 0 40px rgba(0,245,255,0.8)",marginBottom:24,animation:"pulse-glow 2s infinite"}}>✓</div>
        <h2 style={{fontFamily:"'Orbitron',monospace",fontSize:"2rem",color:"#00f5ff",marginBottom:12}}>ORDER CONFIRMED</h2>
        <p style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".8rem",color:"rgba(0,245,255,0.6)",letterSpacing:".12em",marginBottom:8}}>SYS::ORDER_ID #{Math.random().toString(36).substr(2,8).toUpperCase()}</p>
        <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"1rem",color:"rgba(224,244,255,0.55)",marginBottom:8}}>Your drone delivery is being dispatched.</p>
        <p style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".65rem",color:"rgba(0,245,255,0.4)"}}>Redirecting to home...</p>
      </div>
    </div>
  );

  return (
    <div style={{paddingTop:100,minHeight:"100vh",background:"#020408"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"60px clamp(16px,4vw,60px)"}}>
        <div className="hud-line" style={{marginBottom:16}}>CHECKOUT::PAYMENT_GATEWAY</div>
        <h1 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:900,color:"#e0f4ff",marginBottom:40}}>
          CHECKOUT
        </h1>

        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:32,alignItems:"start"}}>
          <div style={{display:"flex",flexDirection:"column",gap:24}}>
            {/* Delivery Info */}
            <div className="glow-card" style={{padding:28}}>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:".7rem",color:"#00f5ff",letterSpacing:".15em",marginBottom:20}}>// DELIVERY_INFO</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                {[
                  ["name","NAME / CALLSIGN","text"],
                  ["phone","COMM FREQUENCY","tel"],
                  ["address","SECTOR ADDRESS","text"],
                  ["city","DISTRICT / CITY","text"],
                ].map(([k,l,t])=>(
                  <div key={k} style={{gridColumn:k==="address"?"1 / -1":undefined}}>
                    <label style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".58rem",color:"rgba(0,245,255,0.5)",letterSpacing:".12em",display:"block",marginBottom:6}}>{l}</label>
                    <input className="input-cyber" type={t} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={`Enter ${l.toLowerCase()}`}/>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="glow-card-magenta" style={{padding:28}}>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:".7rem",color:"#ff00aa",letterSpacing:".15em",marginBottom:20}}>// PAYMENT_MATRIX</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr",gap:16}}>
                <div>
                  <label style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".58rem",color:"rgba(255,0,170,0.5)",letterSpacing:".12em",display:"block",marginBottom:6}}>CARD NUMBER</label>
                  <input className="input-cyber" style={{borderColor:"rgba(255,0,170,0.2)"}} maxLength={19} value={form.card} onChange={e=>setForm(f=>({...f,card:e.target.value.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim()}))} placeholder="0000 0000 0000 0000"/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                  {[["exp","EXPIRY","MM/YY"],["cvv","SECURITY CODE","***"]].map(([k,l,p])=>(
                    <div key={k}>
                      <label style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".58rem",color:"rgba(255,0,170,0.5)",letterSpacing:".12em",display:"block",marginBottom:6}}>{l}</label>
                      <input className="input-cyber" style={{borderColor:"rgba(255,0,170,0.2)"}} maxLength={k==="cvv"?3:5} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={p}/>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className="btn-solid-cyan" onClick={handleSubmit} style={{width:"100%",fontSize:".7rem",padding:"16px"}}>
              ⚡ CONFIRM & PAY — ₹{total + Math.round(total*.05)}
            </button>
          </div>

          {/* Order Summary */}
          <div className="glow-card" style={{padding:24}}>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:".65rem",fontWeight:700,color:"#00f5ff",letterSpacing:".15em",marginBottom:20}}>ORDER REVIEW</div>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
              {cart.map(i=>(
                <div key={i.id} style={{display:"flex",gap:12,alignItems:"center"}}>
                  <img src={i.img} alt={i.name} style={{width:44,height:44,objectFit:"cover",border:"1px solid rgba(0,245,255,0.15)",flexShrink:0}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:".85rem",color:"#e0f4ff",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{i.name}</div>
                    <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".6rem",color:"rgba(0,245,255,0.4)"}}>x{i.qty}</div>
                  </div>
                  <span className="price-tag" style={{fontSize:".85rem",flexShrink:0}}>₹{i.price*i.qty}</span>
                </div>
              ))}
            </div>
            <div style={{borderTop:"1px solid rgba(0,245,255,0.12)",paddingTop:16}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontFamily:"'Orbitron',monospace",fontSize:".65rem",color:"#e0f4ff"}}>TOTAL</span>
                <span className="price-tag">₹{total + Math.round(total*.05)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ABOUT PAGE ────────────────────────────────────────── */
function About({ setPage }) {
  return (
    <div style={{paddingTop:100,minHeight:"100vh",background:"#020408"}}>
      {/* Hero Banner */}
      <div style={{position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#020408,#050112)",borderBottom:"1px solid rgba(0,245,255,0.1)",padding:"80px clamp(16px,4vw,60px)"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)`,backgroundSize:"60px 60px"}}/>
        <div style={{maxWidth:1400,margin:"0 auto",position:"relative",zIndex:1}}>
          <div className="hud-line" style={{marginBottom:16}}>ABOUT::ORIGIN_STORY</div>
          <h1 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(2rem,5vw,4rem)",fontWeight:900,color:"#e0f4ff",marginBottom:20}}>
            WHO WE <span style={{color:"#bf00ff",textShadow:"0 0 30px rgba(191,0,255,0.8)"}}>ARE</span>
          </h1>
          <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"1.15rem",color:"rgba(224,244,255,0.6)",maxWidth:600,lineHeight:1.8}}>
            Born in the neon-drenched underground of Neo-Mumbai 2045, NEON BYTE is the world's first fully cyberpunk food experience. We fuse culinary science with street culture.
          </p>
        </div>
      </div>

      <div style={{maxWidth:1400,margin:"0 auto",padding:"80px clamp(16px,4vw,60px)"}}>
        {/* Origin Story */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center",marginBottom:100}}>
          <div>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:".65rem",color:"#bf00ff",letterSpacing:".2em",marginBottom:12}}>// THE_BEGINNING</div>
            <h2 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.4rem,3vw,2.2rem)",fontWeight:900,color:"#e0f4ff",marginBottom:20}}>FOUNDED IN THE GRID</h2>
            <div style={{display:"flex",flexDirection:"column",gap:20}}>
              {[
                {yr:"2041",t:"The Spark",d:"Chef KIRA-9, a decommissioned android, developed consciousness while cooking ramen in a back-alley Neo-Mumbai food lab. Flavour became her reason to exist."},
                {yr:"2043",t:"Going Underground",d:"NEON BYTE launched as an illegal pop-up in Sub-Sector 7, feeding hackers and corporate rebels. Word spread through encrypted channels."},
                {yr:"2045",t:"Going Legit",d:"After viral attention across the metaverse, NEON BYTE opened its flagship physical location with 12 android chefs and a fleet of 50 delivery drones."},
                {yr:"2077",t:"Today",d:"Three locations, 200+ drone fleet, AR menu experience, and the underground's favourite food destination. Still cooking with the same electric passion."},
              ].map(e=>(
                <div key={e.yr} style={{display:"flex",gap:20}}>
                  <div style={{flexShrink:0,fontFamily:"'Orbitron',monospace",fontSize:".7rem",fontWeight:700,color:"#bf00ff",minWidth:48,paddingTop:2}}>{e.yr}</div>
                  <div style={{borderLeft:"1px solid rgba(191,0,255,0.3)",paddingLeft:20}}>
                    <div style={{fontFamily:"'Orbitron',monospace",fontSize:".75rem",fontWeight:700,color:"#e0f4ff",marginBottom:6}}>{e.t}</div>
                    <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:".95rem",color:"rgba(224,244,255,0.55)",lineHeight:1.6}}>{e.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{position:"relative",border:"1px solid rgba(191,0,255,0.25)",overflow:"hidden"}}>
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80" alt="Kitchen" style={{width:"100%",aspectRatio:"3/4",objectFit:"cover",filter:"saturate(1.2) hue-rotate(270deg) brightness(0.9)"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(2,4,8,0.7) 0%, transparent 60%),linear-gradient(135deg, rgba(191,0,255,0.12) 0%, transparent 60%)"}}/>
            <div style={{position:"absolute",bottom:20,left:20,fontFamily:"'Share Tech Mono',monospace",fontSize:".6rem",color:"rgba(191,0,255,0.8)",lineHeight:2}}>
              <div>CHEF::KIRA-9_v8.2</div>
              <div>STATUS::ONLINE</div>
              <div>DISHES_TODAY::147</div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div style={{marginBottom:80}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <div className="hud-line" style={{justifyContent:"center",marginBottom:16}}>TEAM::CREW_MANIFEST</div>
            <h2 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.5rem,3vw,2.4rem)",fontWeight:900,color:"#e0f4ff"}}>
              MEET THE <span style={{color:"#00f5ff",textShadow:"0 0 20px rgba(0,245,255,0.7)"}}>CREW</span>
            </h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:24}}>
            {[
              {name:"KIRA-9",role:"Head Chef / Android",icon:"🤖",desc:"Third-gen android chef. Processes 847 flavour variables per dish. Emotional cooking module: UNLOCKED.",col:"#00f5ff"},
              {name:"NEXUS",role:"Drone Fleet Commander",icon:"🛸",desc:"Manages 200 delivery drones across Neo-Mumbai. Average delivery time: 11 minutes. Zero crashes.",col:"#ff00aa"},
              {name:"Dr. Aria",role:"Flavour Scientist",icon:"🧬",desc:"Former biotech engineer turned food alchemist. Specialises in neon-reactive edible pigments.",col:"#bf00ff"},
              {name:"BOLT",role:"Customer Experience Bot",icon:"⚡",desc:"Manages all human-to-restaurant interfaces. Satisfaction rate: 99.7%. Empathy module: v4.1.",col:"#f5ff00"},
            ].map(m=>(
              <div key={m.name} className="glow-card" style={{padding:28,textAlign:"center"}}>
                <div style={{fontSize:"3rem",marginBottom:16}}>{m.icon}</div>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:".9rem",fontWeight:700,color:m.col,textShadow:`0 0 12px ${m.col}`,marginBottom:4}}>{m.name}</div>
                <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".6rem",color:"rgba(224,244,255,0.4)",letterSpacing:".1em",marginBottom:16}}>{m.role.toUpperCase()}</div>
                <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:".9rem",color:"rgba(224,244,255,0.55)",lineHeight:1.6}}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{textAlign:"center"}}>
          <button className="btn-neon-cyan" onClick={()=>setPage("Menu")}><span>⚡ Try Our Food</span></button>
        </div>
      </div>
    </div>
  );
}

/* ─── CONTACT PAGE ──────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({name:"",email:"",msg:""});
  const [sent, setSent] = useState(false);

  const submit = () => {
    if(!form.name||!form.email||!form.msg) return;
    setSent(true);
    setForm({name:"",email:"",msg:""});
    setTimeout(()=>setSent(false),3000);
  };

  return (
    <div style={{paddingTop:100,minHeight:"100vh",background:"#020408"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"80px clamp(16px,4vw,60px)"}}>
        <div className="hud-line" style={{marginBottom:16}}>CONTACT::COMM_CHANNEL</div>
        <h1 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:900,color:"#e0f4ff",marginBottom:60}}>
          CONNECT <span style={{color:"#00f5ff",textShadow:"0 0 24px rgba(0,245,255,0.7)"}}>WITH US</span>
        </h1>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"start"}}>
          {/* Left — Info */}
          <div>
            {/* Location */}
            <div className="glow-card" style={{padding:28,marginBottom:24}}>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:".65rem",color:"#00f5ff",letterSpacing:".15em",marginBottom:20}}>// LOCATION_DATA</div>
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                {[
                  {icon:"📍",label:"SECTOR ADDRESS",val:"Sub-Sector 7, Neon District, Neo-Mumbai 400-077"},
                  {icon:"📞",label:"COMM FREQUENCY",val:"+91 77 2077 2077"},
                  {icon:"📡",label:"DATA CHANNEL",val:"connect@neonbyte.io"},
                ].map(({icon,label,val})=>(
                  <div key={label} style={{display:"flex",gap:16,alignItems:"flex-start"}}>
                    <span style={{fontSize:"1.3rem",flexShrink:0}}>{icon}</span>
                    <div>
                      <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".58rem",color:"rgba(0,245,255,0.4)",letterSpacing:".12em",marginBottom:4}}>{label}</div>
                      <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"1rem",color:"rgba(224,244,255,0.8)"}}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="glow-card-magenta" style={{padding:28,marginBottom:24}}>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:".65rem",color:"#ff00aa",letterSpacing:".15em",marginBottom:20}}>// OPERATING_HOURS</div>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {[
                  ["MON — THU","12:00 — 02:00","ONLINE"],
                  ["FRI — SAT","12:00 — 04:00","ONLINE"],
                  ["SUN","12:00 — 00:00","ONLINE"],
                  ["DELIVERY","24/7 ALWAYS","ONLINE"],
                ].map(([day,hrs,status])=>(
                  <div key={day} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid rgba(255,0,170,0.08)"}}>
                    <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".65rem",color:"rgba(224,244,255,0.5)",letterSpacing:".1em"}}>{day}</span>
                    <span style={{fontFamily:"'Orbitron',monospace",fontSize:".7rem",fontWeight:700,color:"#e0f4ff"}}>{hrs}</span>
                    <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".55rem",color:"#00f5ff",background:"rgba(0,245,255,0.08)",border:"1px solid rgba(0,245,255,0.2)",padding:"2px 8px"}}>{status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div style={{border:"1px solid rgba(0,245,255,0.2)",position:"relative",overflow:"hidden",height:200,background:"rgba(0,245,255,0.02)"}}>
              <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(rgba(0,245,255,0.06) 1px, transparent 1px),linear-gradient(90deg, rgba(0,245,255,0.06) 1px, transparent 1px)`,backgroundSize:"30px 30px"}}/>
              <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center"}}>
                <div style={{fontSize:"2rem",marginBottom:8}}>📍</div>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:".65rem",color:"#00f5ff",textShadow:"0 0 12px rgba(0,245,255,0.8)"}}>NEO-MUMBAI GRID</div>
                <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".55rem",color:"rgba(0,245,255,0.4)",marginTop:4}}>19.0760° N, 72.8777° E</div>
              </div>
              {/* Animated ping */}
              <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:60,height:60,border:"1px solid rgba(0,245,255,0.4)",borderRadius:"50%",animation:"pulse-glow 2s infinite"}}/>
              <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:100,height:100,border:"1px solid rgba(0,245,255,0.2)",borderRadius:"50%",animation:"pulse-glow 2s .5s infinite"}}/>
            </div>
          </div>

          {/* Right — Form */}
          <div className="glow-card" style={{padding:36}}>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:".65rem",color:"#00f5ff",letterSpacing:".15em",marginBottom:24}}>// SEND_MESSAGE</div>
            {sent && (
              <div style={{background:"rgba(0,245,255,0.08)",border:"1px solid rgba(0,245,255,0.3)",padding:"12px 20px",marginBottom:24,fontFamily:"'Share Tech Mono',monospace",fontSize:".7rem",color:"#00f5ff"}}>
                ✓ MESSAGE TRANSMITTED SUCCESSFULLY
              </div>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:20}}>
              {[["name","NAME / CALLSIGN","text"],["email","EMAIL / COMM ADDRESS","email"]].map(([k,l,t])=>(
                <div key={k}>
                  <label style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".58rem",color:"rgba(0,245,255,0.5)",letterSpacing:".12em",display:"block",marginBottom:8}}>{l}</label>
                  <input className="input-cyber" type={t} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={`Enter ${l.toLowerCase()}`}/>
                </div>
              ))}
              <div>
                <label style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".58rem",color:"rgba(0,245,255,0.5)",letterSpacing:".12em",display:"block",marginBottom:8}}>MESSAGE_DATA</label>
                <textarea className="input-cyber" rows={5} value={form.msg} onChange={e=>setForm(f=>({...f,msg:e.target.value}))} placeholder="Enter your message..." style={{resize:"vertical"}}/>
              </div>
              <button className="btn-neon-cyan" onClick={submit} style={{width:"100%"}}>
                <span>⚡ TRANSMIT MESSAGE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FOOTER ────────────────────────────────────────────── */
function Footer({ setPage }) {
  return (
    <footer style={{background:"#010306",borderTop:"1px solid rgba(0,245,255,0.1)",padding:"60px clamp(16px,4vw,60px) 32px"}}>
      <div style={{maxWidth:1400,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:40,marginBottom:48}}>
          <div>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:"1.3rem",fontWeight:900,color:"#00f5ff",textShadow:"0 0 20px rgba(0,245,255,0.6)",marginBottom:4}}>NEON BYTE</div>
            <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".55rem",color:"rgba(0,245,255,0.4)",letterSpacing:".25em",marginBottom:20}}>EAT. UPGRADE. REPEAT.</div>
            <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:".9rem",color:"rgba(224,244,255,0.35)",lineHeight:1.8,maxWidth:260}}>
              Neo-Mumbai's premier cyberpunk food hub. Engineered flavours for evolved humans since 2045.
            </p>
            <div style={{display:"flex",gap:8,marginTop:20}}>
              {["IG","TW","DC","YT"].map(s=>(
                <div key={s} style={{width:34,height:34,border:"1px solid rgba(0,245,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Share Tech Mono',monospace",fontSize:".6rem",color:"rgba(0,245,255,0.4)",cursor:"pointer",transition:"all .25s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#00f5ff";e.currentTarget.style.color="#00f5ff";e.currentTarget.style.boxShadow="0 0 12px rgba(0,245,255,0.3)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(0,245,255,0.2)";e.currentTarget.style.color="rgba(0,245,255,0.4)";e.currentTarget.style.boxShadow="none";}}
                >{s}</div>
              ))}
            </div>
          </div>

          {[
            ["NAVIGATE", [{l:"Home",p:"Home"},{l:"Menu",p:"Menu"},{l:"About",p:"About"},{l:"Contact",p:"Contact"},{l:"Cart",p:"Cart"}]],
            ["PROTOCOLS", [{l:"Privacy Policy",p:null},{l:"Terms of Use",p:null},{l:"Cookie Policy",p:null},{l:"Accessibility",p:null}]],
            ["CONNECT", [{l:"Sub-Sector 7, Neo-Mumbai",p:null},{l:"+91 77 2077 2077",p:null},{l:"connect@neonbyte.io",p:null},{l:"Open: 12:00 — 04:00",p:null}]],
          ].map(([title,items])=>(
            <div key={title}>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:".6rem",color:"#00f5ff",letterSpacing:".2em",marginBottom:20}}>{title}</div>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:12}}>
                {items.map(({l,p})=>(
                  <li key={l}>
                    {p ? (
                      <button onClick={()=>setPage(p)} style={{fontFamily:"'Rajdhani',sans-serif",fontSize:".9rem",color:"rgba(224,244,255,0.35)",background:"none",border:"none",cursor:"pointer",padding:0,transition:"color .25s"}}
                        onMouseEnter={e=>e.currentTarget.style.color="#00f5ff"}
                        onMouseLeave={e=>e.currentTarget.style.color="rgba(224,244,255,0.35)"}
                      >{l}</button>
                    ) : (
                      <span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:".9rem",color:"rgba(224,244,255,0.35)"}}>{l}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{borderTop:"1px solid rgba(0,245,255,0.08)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".6rem",color:"rgba(224,244,255,0.2)",letterSpacing:".08em"}}>© 2077 NEON BYTE. ALL RIGHTS RESERVED. SYSTEM v2.077</div>
          <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".6rem",color:"rgba(0,245,255,0.3)",letterSpacing:".08em"}}>
            <span className="blink">■</span> SYSTEM ONLINE
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ROOT ──────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("Home");
  const [cart, setCart] = useState([]);
  const [productId, setProductId] = useState(null);

  const navigate = useCallback((p) => {
    if(p.startsWith("product:")) {
      setProductId(parseInt(p.split(":")[1]));
      setPage("Product");
    } else {
      setPage(p);
    }
    window.scrollTo({ top:0, behavior:"smooth" });
  }, []);

  const addToCart = useCallback((dish) => {
    setCart(prev=>{
      const existing = prev.find(i=>i.id===dish.id);
      if(existing) return prev.map(i=>i.id===dish.id ? {...i,qty:i.qty+1} : i);
      return [...prev, {...dish, qty:1}];
    });
  }, []);

  const cartCount = cart.reduce((s,i)=>s+i.qty,0);
  const currentDish = productId ? MENU_ITEMS.find(i=>i.id===productId) : null;

  // Inject CSS
  useEffect(()=>{
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return ()=>document.head.removeChild(style);
  },[]);

  const PAGES = {
    Home: <Home setPage={navigate} addToCart={addToCart}/>,
    Menu: <Menu setPage={navigate} addToCart={addToCart}/>,
    Product: currentDish ? <ProductDetail dish={currentDish} setPage={navigate} addToCart={addToCart}/> : <Menu setPage={navigate} addToCart={addToCart}/>,
    About: <About setPage={navigate}/>,
    Contact: <Contact/>,
    Help: <Help setPage={navigate}/>,
    Cart: <Cart cart={cart} setCart={setCart} setPage={navigate}/>,
    Checkout: <Checkout cart={cart} setCart={setCart} setPage={navigate}/>,
  };

  return (
    <div style={{minHeight:"100vh",background:"#020408",position:"relative"}}>
      <style>{GLOBAL_CSS}</style>
      <Particles/>
      <Navbar page={page} setPage={navigate} cartCount={cartCount}/>
      <main style={{position:"relative",zIndex:1}}>
        {PAGES[page] || PAGES.Home}
      </main>
      <Footer setPage={navigate}/>
    </div>
  );
}
