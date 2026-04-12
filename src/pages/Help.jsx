import React from 'react';

/* ─── HELP PAGE ─────────────────────────────────────────── */
function Help({ setPage }) {
  const faqs = [
    {
      q: "What is NEON BYTE?",
      a: "NEON BYTE is a cyberpunk-themed restaurant chain offering futuristic dining experiences with neon aesthetics, holographic menus, and innovative fusion cuisine."
    },
    {
      q: "How do I place an order?",
      a: "You can browse our menu online, add items to your cart, and proceed to checkout. We also accept orders through our mobile app and delivery drones."
    },
    {
      q: "Do you offer delivery?",
      a: "Yes! We have a fleet of autonomous delivery drones that can deliver your order within 15 minutes in the Neo-Mumbai area."
    },
    {
      q: "Are your ingredients sustainable?",
      a: "Absolutely. We use lab-grown proteins, vertical farming produce, and recycled packaging to minimize our environmental impact."
    },
    {
      q: "Can I customize my order?",
      a: "Yes, many dishes can be customized with spice levels, protein alternatives, and dietary accommodations. Check individual item descriptions for options."
    },
    {
      q: "Do you have vegetarian/vegan options?",
      a: "Yes! We offer a wide range of plant-based dishes using advanced food technology to create meat-like textures and flavors from sustainable sources."
    },
    {
      q: "What's your refund policy?",
      a: "We offer full refunds for any issues with your order. Contact our support team within 24 hours of delivery for assistance."
    },
    {
      q: "How do I track my drone delivery?",
      a: "Once your order is confirmed, you'll receive a tracking link via SMS and our app showing real-time drone location and ETA."
    },
    {
      q: "Do you cater events?",
      a: "Yes, we provide catering services for corporate events, parties, and special occasions. Contact us for custom menu planning."
    },
    {
      q: "Are you hiring?",
      a: "We're always looking for talented individuals passionate about food and technology. Check our careers page or visit our locations to inquire about opportunities."
    }
  ];

  return (
    <div style={{paddingTop:100,minHeight:"100vh",background:"#020408"}}>
      {/* Hero Banner */}
      <div style={{position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#020408,#050112)",borderBottom:"1px solid rgba(0,245,255,0.1)",padding:"80px clamp(16px,4vw,60px)"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)`,backgroundSize:"60px 60px"}}/>
        <div style={{maxWidth:1400,margin:"0 auto",position:"relative",zIndex:1}}>
          <div className="hud-line" style={{marginBottom:16}}>HELP::FAQ_DATABASE</div>
          <h1 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(2rem,5vw,4rem)",fontWeight:900,color:"#e0f4ff",marginBottom:20}}>
            FREQUENTLY ASKED <span style={{color:"#00f5ff",textShadow:"0 0 30px rgba(0,245,255,0.8)"}}>QUESTIONS</span>
          </h1>
          <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"1.15rem",color:"rgba(224,244,255,0.6)",maxWidth:600,lineHeight:1.8}}>
            Got questions? We've got answers. Browse our comprehensive FAQ database or contact our support team.
          </p>
        </div>
      </div>

      <div style={{maxWidth:1400,margin:"0 auto",padding:"80px clamp(16px,4vw,60px)"}}>
        {/* FAQ Grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(500px,1fr))",gap:32}}>
          {faqs.map((faq, index) => (
            <div key={index} className="glow-card" style={{padding:32}}>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:".7rem",color:"#00f5ff",letterSpacing:".2em",marginBottom:12}}>
                Q{index+1}::QUERY
              </div>
              <h3 style={{fontFamily:"'Orbitron',monospace",fontSize:"1.1rem",fontWeight:700,color:"#e0f4ff",marginBottom:16,lineHeight:1.4}}>
                {faq.q}
              </h3>
              <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:".95rem",color:"rgba(224,244,255,0.7)",lineHeight:1.6}}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div style={{textAlign:"center",marginTop:80}}>
          <div className="hud-line" style={{justifyContent:"center",marginBottom:16}}>SUPPORT::CONTACT_US</div>
          <h2 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.5rem,3vw,2.4rem)",fontWeight:900,color:"#e0f4ff",marginBottom:20}}>
            STILL NEED <span style={{color:"#ff00aa",textShadow:"0 0 20px rgba(255,0,170,0.7)"}}>HELP</span>?
          </h2>
          <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"1.1rem",color:"rgba(224,244,255,0.6)",maxWidth:600,margin:"0 auto 32px",lineHeight:1.6}}>
            Can't find what you're looking for? Our support team is here to assist you 24/7.
          </p>
          <button className="btn-neon-magenta" onClick={()=>setPage("Contact")}><span>⚡ CONTACT SUPPORT</span></button>
        </div>
      </div>
    </div>
  );
}

export default Help;