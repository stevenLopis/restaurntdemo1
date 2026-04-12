import React from 'react';

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

export default FoodCard;