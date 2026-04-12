import React from 'react';
import { FEATURED } from '../data/menu.js';
import FoodCard from '../components/FoodCard.jsx';

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
                {[
                  ["2,077+","Happy Humans"],
                  ["48","Cyber Dishes"],
                  ["24/7","Always Online"]
                ].map(([n,l])=>(
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

export default Home;