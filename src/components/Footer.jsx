import React from 'react';

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

export default Footer;