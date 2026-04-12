import React, { useState } from 'react';

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
              {[
                ["PREP","12 min"],
                ["CALS","680 kcal"],
                ["HEAT","🌶🌶"]
              ].map(([k,v])=>(
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

export default ProductDetail;