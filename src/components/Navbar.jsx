import React, { useState, useEffect } from 'react';
import { NAV_PAGES } from '../data/menu.js';

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

export default Navbar;