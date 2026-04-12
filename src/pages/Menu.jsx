import React, { useState } from 'react';
import { MENU_ITEMS, CATS } from '../data/menu.js';
import FoodCard from '../components/FoodCard.jsx';

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

export default Menu;