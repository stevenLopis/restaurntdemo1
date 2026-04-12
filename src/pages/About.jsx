import React from 'react';

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
            <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".65rem",color:"#bf00ff",letterSpacing:".2em",marginBottom:12}}>// THE_BEGINNING</div>
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

export default About;