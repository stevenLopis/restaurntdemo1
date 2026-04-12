import React from 'react';

/* ─── PARTICLES ─────────────────────────────────────────── */
function Particles() {
  const particles = Array.from({length:28},(_,i)=>({
    id:i,
    x: Math.random()*100,
    size: Math.random()*3+1,
    dur: Math.random()*10+6,
    delay: Math.random()*8,
    drift: (Math.random()-0.5)*80,
    color: ["#00f5ff","#ff00aa","#bf00ff","#f5ff00"][Math.floor(Math.random()*4)],
  }));
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
      {particles.map(p=>(
        <div key={p.id} className="particle" style={{
          left:`${p.x}%`, bottom:0,
          width:p.size, height:p.size,
          background:p.color,
          boxShadow:`0 0 ${p.size*3}px ${p.color}`,
          "--dur":`${p.dur}s`,
          "--delay":`${p.delay}s`,
          "--drift":`${p.drift}px`,
        }}/>
      ))}
    </div>
  );
}

export default Particles;