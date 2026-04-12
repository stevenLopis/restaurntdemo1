import React from 'react';

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

export default Cart;