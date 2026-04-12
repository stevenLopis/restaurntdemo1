import React, { useState } from 'react';

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
                  {[
                    ["exp","EXPIRY","MM/YY"],
                    ["cvv","SECURITY CODE","***"]
                  ].map(([k,l,p])=>(
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

export default Checkout;