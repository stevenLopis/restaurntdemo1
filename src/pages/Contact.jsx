import React, { useState } from 'react';

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
              {[
                ["name","NAME / CALLSIGN","text"],
                ["email","EMAIL / COMM ADDRESS","email"]
              ].map(([k,l,t])=>(
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

export default Contact;