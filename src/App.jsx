import { useState, useCallback } from 'react';
import Particles from './components/Particles.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Help from './pages/Help.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import { MENU_ITEMS } from './data/menu.js';
import './styles/global.css';

/* ─── APP ROOT ──────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState('Home');
  const [cart, setCart] = useState([]);
  const [productId, setProductId] = useState(null);

  const navigate = useCallback((p) => {
    if(p.startsWith('product:')) {
      setProductId(parseInt(p.split(':')[1]));
      setPage('Product');
    } else {
      setPage(p);
    }
    window.scrollTo({ top:0, behavior:'smooth' });
  }, []);

  const addToCart = useCallback((dish) => {
    setCart(prev=>{
      const existing = prev.find(i=>i.id===dish.id);
      if(existing) return prev.map(i=>i.id===dish.id ? {...i,qty:i.qty+1} : i);
      return [...prev, {...dish, qty:1}];
    });
  }, []);

  const cartCount = cart.reduce((s,i)=>s+i.qty,0);
  const currentDish = productId ? MENU_ITEMS.find(i=>i.id===productId) : null;

  const PAGES = {
    Home: <Home setPage={navigate} addToCart={addToCart}/>,
    Menu: <Menu setPage={navigate} addToCart={addToCart}/>,
    Product: currentDish ? <ProductDetail dish={currentDish} setPage={navigate} addToCart={addToCart}/> : <Menu setPage={navigate} addToCart={addToCart}/>,
    About: <About setPage={navigate}/>,
    Contact: <Contact/>,
    Help: <Help setPage={navigate}/>,
    Cart: <Cart cart={cart} setCart={setCart} setPage={navigate}/>,
    Checkout: <Checkout cart={cart} setCart={setCart} setPage={navigate}/>,
  };

  return (
    <div style={{minHeight:'100vh',background:'#020408',position:'relative'}}>
      <Particles/>
      <Navbar page={page} setPage={navigate} cartCount={cartCount}/>
      <main style={{position:'relative',zIndex:1}}>
        {PAGES[page] || PAGES.Home}
      </main>
      <Footer setPage={navigate}/>
    </div>
  );
}