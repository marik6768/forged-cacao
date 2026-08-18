import { useEffect, useState } from 'react';

const asset = (file) => `${import.meta.env.BASE_URL}assets/${file}`;

const products = [
  { id: 'wrench', name: 'The Wrench', price: 28, badge: 'Best seller', image: asset('product-wrench.jpg'), pos: '50% 50%' },
  { id: 'socket', name: 'Socket Set', price: 42, badge: 'Limited drop', image: asset('product-socket.jpg'), pos: '50% 50%' },
  { id: 'bolt', name: 'Big Bolt', price: 18, image: asset('product-bolt.png'), pos: '50% 50%' },
  { id: 'gear', name: 'Gear Stack', price: 34, image: asset('product-gear.jpg'), pos: '50% 50%' },
];

const money = (value) => `$${value.toFixed(2)}`;

function ProductImage({ product, className = '' }) {
  return <img className={className} src={product.image} style={{ objectPosition: product.pos }} alt={`${product.name} chocolate tool`} />;
}

function ProductCard({ product, onAdd, onNavigate }) {
  return <article className="product-card">
    <button className="product-image" onClick={() => onNavigate(`/product/${product.id}`)} aria-label={`View ${product.name}`}>
      <ProductImage product={product} />
      {product.badge && <span className="badge">{product.badge}</span>}
    </button>
    <div className="product-info"><div><p className="eyebrow">Hand cast · 1:1 scale</p><h3>{product.name}</h3><p>{money(product.price)}</p></div><button className="add-button" onClick={() => onAdd(product)} aria-label={`Quick add ${product.name}`}>Add +</button></div>
  </article>;
}

function Header({ count, onNavigate, onCart, onMenu, menuOpen }) {
  return <><div className="announcement">MELT-FREE DELIVERY — THERMAL PACKAGING ON EVERY ORDER</div>
    <header className="header"><button className="brand" onClick={() => onNavigate('/')}>FORGED<span>CACAO</span></button>
      <nav className="nav" aria-label="Main navigation"><button onClick={() => onNavigate('/')}>Shop</button><button onClick={() => onNavigate('/wholesale')}>Wholesale</button><button onClick={() => onNavigate('/craft')}>Our craft</button></nav>
      <div className="header-actions"><button onClick={() => alert('Search is ready for your Shopify catalog.')}>Search</button><button onClick={onCart}>Bag ({count})</button><button className="menu" onClick={onMenu} aria-label="Open menu">Menu</button></div>
    </header>
    {menuOpen && <div className="mobile-menu" role="navigation" aria-label="Mobile navigation"><button onClick={() => onNavigate('/')}>Shop all</button><button onClick={() => onNavigate('/wholesale')}>Wholesale gifts</button><button onClick={() => onNavigate('/craft')}>Our craft</button><button onClick={onCart}>Your bag ({count})</button></div>}</>;
}

function Cart({ cart, open, onClose, onQty, onRemove, onAdd }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity + (item.wrap === 'Premium metal box' ? 8 : 0), 0);
  return <aside className={`cart ${open ? 'open' : ''}`} aria-label="Shopping cart" aria-hidden={!open}><div className="cart-top"><p className="eyebrow">Your gift bag</p><button onClick={onClose}>Close ×</button></div>
    {cart.length ? <><div className="cart-lines">{cart.map(item => <div className="cart-line" key={item.id}><ProductImage product={item} className="cart-thumb"/><div><strong>{item.name}</strong><small>{item.wrap}</small>{item.note && <small>“{item.note}”</small>}<div className="quantity"><button onClick={() => onQty(item.id, -1)} aria-label={`Decrease ${item.name}`}>−</button><span>{item.quantity}</span><button onClick={() => onQty(item.id, 1)} aria-label={`Increase ${item.name}`}>+</button><button className="text-button" onClick={() => onRemove(item.id)}>Remove</button></div></div><strong>{money(item.price * item.quantity)}</strong></div>)}</div>
    <div className="upsell"><p className="eyebrow">Add a little extra</p><button onClick={() => onAdd(products[3])}>+ Gear Stack — $34</button></div><div className="cart-bottom"><div><span>Subtotal</span><strong>{money(total)}</strong></div><button className="button primary" onClick={() => alert('Portfolio checkout complete — connect this button to Shopify Checkout.')}>Checkout securely</button></div></> : <div className="empty"><h3>Your bag is empty.</h3><p>A very convincing gift is one click away.</p><button className="button primary" onClick={onClose}>Keep browsing</button></div>}
  </aside>;
}

function Home({ onAdd, onNavigate }) {
  return <main><section className="hero" data-section="hero"><div className="hero-copy"><p className="eyebrow">EDIBLE METALLIC FINISH · HANDMADE IN SMALL BATCHES</p><h1>No workshop<br/>required.</h1><p className="hero-text">The world’s most convincing chocolate tools. Cast to fool them. Made to delight them.</p><button className="button primary" onClick={() => document.getElementById('bestsellers').scrollIntoView({ behavior: 'smooth' })}>See the illusion <span>→</span></button><p className="proof">★★★★★ &nbsp; 4.9 from 1,200+ gifts given</p></div><img src={asset('hero-toolbox.jpg')} alt="Chocolate tools presented as a gift" /></section>
    <section className="trust" data-section="trust">{[['01','Hand cast','Every edge, groove and thread finished by hand.'],['02','Premium cacao','Single-origin chocolate with a proper snap.'],['03','Thermal safe','Insulated, tracked and gift-ready on arrival.']].map(([n,t,d]) => <div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</section>
    <section className="products section" id="bestsellers" data-section="featured-products"><div className="section-heading"><div><p className="eyebrow">THE HALL OF FAME</p><h2>Tools they’ll<br/>talk about.</h2></div><button className="line-button" onClick={() => onNavigate('/product/wrench')}>Shop all four →</button></div><div className="product-grid">{products.map(product => <ProductCard key={product.id} product={product} onAdd={onAdd} onNavigate={onNavigate} />)}</div></section>
    <section className="reviews section" data-section="reviews"><div className="review-lead"><p className="eyebrow">NO ONE EXPECTS DESSERT</p><h2>“He tried to<br/>put it in his<br/>toolbox.”</h2><p>— Emily R., bought for Dad</p></div><div className="review-stack"><article><p>★★★★★</p><p>“The double-take was priceless. Then he ate the bolt in one bite.”</p><small>James M. · Verified buyer</small></article><img src={asset('chocolate-detail.jpg')} alt="Chocolate pieces on a dark surface" /></div></section>
    <section className="newsletter" data-section="newsletter"><p className="eyebrow">FIRST DIBS ON THE NEXT DROP</p><h2>Built for people<br/>who are hard to buy for.</h2><form onSubmit={(event) => { event.preventDefault(); event.currentTarget.reset(); alert('You’re on the list.'); }}><label className="sr-only" htmlFor="email">Email</label><input id="email" required type="email" placeholder="Your email address"/><button className="button primary">Join the club →</button></form></section>
  </main>;
}

function CraftPage() {
  return <main className="craft-page" data-section="craft-page">
    <section className="craft-page-hero"><div><p className="eyebrow">THE ILLUSION, EXPLAINED</p><h1>Looks forged.<br/><em>Breaks beautifully.</em></h1><p>Every piece is hand-cast to fool the eye, then made to reward the first bite.</p></div><img src={asset('hero-toolbox.jpg')} alt="Chocolate tool gift set" /></section>
    <section className="craft-story section"><p className="eyebrow">THREE STEPS. ONE DOUBLE-TAKE.</p><div className="craft-story-grid"><article><span>01</span><img src={asset('product-wrench.jpg')} alt="Chocolate tool casting detail" /><h2>Cast at 1:1</h2><p>We build the familiar proportions first, right down to the threads and edges.</p></article><article><span>02</span><img src={asset('product-bolt.png')} alt="Chocolate tools with cacao detail" /><h2>Finish by hand</h2><p>An edible sheen gives every piece its metallic first impression.</p></article><article><span>03</span><img src={asset('product-gear.jpg')} alt="Chocolate tool gift set" /><h2>Pack to surprise</h2><p>Every gift is insulated, protected and ready for the reveal.</p></article></div></section>
    <section className="craft-promise"><img src={asset('chocolate-detail.jpg')} alt="Dark chocolate detail" /><div><p className="eyebrow">SERIOUSLY GOOD CHOCOLATE</p><h2>The reveal is only<br/><em>the beginning.</em></h2><p>Behind the illusion is a proper cacao snap: balanced, rich and genuinely delicious.</p></div></section>
  </main>;
}

function ProductPage({ product, onAdd }) {
  const [wrap, setWrap] = useState('Standard wrapping'); const [note, setNote] = useState(''); const [selected, setSelected] = useState(0); const [open, setOpen] = useState(null);
  const gallery = [{ pos: product.pos }, { pos: '42% 48%' }, { pos: '85% 25%' }]; const rows = [['Ingredients & allergens','70% dark chocolate (cocoa mass, sugar, cocoa butter), cocoa powder, edible colour. Contains soy; may contain milk and nuts.'],['Dimensions & weight','Life-size 17cm wrench · 160g of chocolate · gift box 24 × 12cm.'],['Thermal-safe delivery','Every order ships in a reusable insulated mailer. We monitor weather so your gift arrives looking impossible.']];
  return <main className="pdp" data-section="product"><div className="breadcrumbs"><button onClick={() => history.back()}>← Shop</button><span>/</span><span>{product.name}</span></div><div className="pdp-grid"><section className="gallery"><div className="main-shot"><img src={product.image} style={{ objectPosition: gallery[selected].pos }} alt={`${product.name}, close view`} /></div><div className="thumbs">{gallery.map((image, index) => <button key={index} className={selected === index ? 'selected' : ''} onClick={() => setSelected(index)}><img src={product.image} style={{ objectPosition: image.pos }} alt={`View ${index + 1}`} /></button>)}</div></section>
  <section className="buy-box"><p className="eyebrow">BEST SELLER · IN STOCK</p><h1>{product.name}</h1><div className="rating">★★★★★ <span>4.9 (286)</span></div><p className="price">{money(product.price)}</p><p>A 1:1 chocolate replica with an edible chrome finish and a proper dark-chocolate crunch.</p><fieldset><legend>Make it gift-ready</legend><label className={wrap === 'Standard wrapping' ? 'choice chosen' : 'choice'}><input type="radio" name="wrap" checked={wrap === 'Standard wrapping'} onChange={() => setWrap('Standard wrapping')}/>Standard wrapping <span>Included</span></label><label className={wrap === 'Premium metal box' ? 'choice chosen' : 'choice'}><input type="radio" name="wrap" checked={wrap === 'Premium metal box'} onChange={() => setWrap('Premium metal box')}/>Premium metal box <span>+ $8</span></label></fieldset><label className="note-label">Complimentary gift note<textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Make it personal…" maxLength="120"/></label><button className="button primary full" onClick={() => onAdd(product, { wrap, note })}>Add to cart — {money(product.price + (wrap === 'Premium metal box' ? 8 : 0))}</button><button className="button outline full" onClick={() => onAdd(product, { wrap, note })}>Buy it now</button>
  <div className="accordions">{rows.map(([title, text], index) => <div className="accordion" key={title}><button onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index}>{title}<span>{open === index ? '−' : '+'}</span></button>{open === index && <p>{text}</p>}</div>)}</div></section></div></main>;
}

function Wholesale() { const [sent, setSent] = useState(false); return <main className="wholesale" data-section="wholesale"><section className="wholesale-hero"><p className="eyebrow">CORPORATE GIFTING, REBUILT</p><h1>Give them<br/>something to<br/><em>chew on.</em></h1><p>Branded chocolate tool kits for teams, clients and occasions worth remembering.</p><a className="button primary" href="#enquiry">Start a project →</a></section><section className="benefits section"><p className="eyebrow">WHY FORGED CACAO</p><div>{[['A gift with a story','The moment of confusion becomes the moment they remember your brand.'],['Made around you','Custom sleeves, message cards and volume options from 25 gifts.'],['Actually delicious','Every set starts with serious small-batch chocolate.']].map(([h,p],i)=><article key={h}><span>0{i+1}</span><h2>{h}</h2><p>{p}</p></article>)}</div></section><section className="process section"><div><p className="eyebrow">SIMPLE BY DESIGN</p><h2>From brief to<br/>big reveal.</h2></div><ol><li><b>01</b>Tell us who you’re celebrating.</li><li><b>02</b>Choose your tools and finishing touches.</li><li><b>03</b>We cast, pack and deliver the surprise.</li></ol></section><section className="enquiry" id="enquiry"><div><p className="eyebrow">START WITH AN IDEA</p><h2>Let’s make your<br/>next gift impossible.</h2></div>{sent ? <div className="success"><h3>We’ll be in touch.</h3><p>Your gifting project is now in the right hands.</p></div> : <form onSubmit={(event)=>{event.preventDefault();setSent(true)}}><label>Work email<input required type="email" placeholder="you@company.com"/></label><label>Tell us a little<input required placeholder="100 gifts for a team…"/></label><button className="button primary">Request a quote →</button></form>}</section></main> }

export function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const routeFromLocation = () => { const raw = window.location.pathname.replace(base, '') || '/'; return raw.startsWith('/') ? raw : `/${raw}`; };
  const [path, setPath] = useState(routeFromLocation); const [cart, setCart] = useState([]); const [cartOpen, setCartOpen] = useState(false); const [menuOpen, setMenuOpen] = useState(false);
  const navigate = (to) => { window.history.pushState({}, '', `${base}${to}`); setPath(to); setMenuOpen(false); window.scrollTo(0,0); };
  useEffect(() => { const handler = () => setPath(routeFromLocation()); window.addEventListener('popstate', handler); return () => window.removeEventListener('popstate', handler); }, []);
  const add = (product, gift = { wrap: 'Standard wrapping', note: '' }) => { setCart(current => { const exists = current.find(item => item.id === product.id && item.wrap === gift.wrap && item.note === gift.note); return exists ? current.map(item => item === exists ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, ...gift, quantity: 1 }]; }); setCartOpen(true); };
  const updateQty = (id, change) => setCart(current => current.flatMap(item => item.id === id ? (item.quantity + change < 1 ? [] : [{ ...item, quantity: item.quantity + change }]) : [item]));
  const product = products.find(item => path.endsWith(item.id)) || products[0]; const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  return <><Header count={count} onNavigate={navigate} onCart={() => setCartOpen(true)} onMenu={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen}/>{path === '/wholesale' ? <Wholesale/> : path === '/craft' ? <CraftPage/> : path.startsWith('/product/') ? <ProductPage product={product} onAdd={add}/> : <Home onAdd={add} onNavigate={navigate}/>}<footer><button className="brand" onClick={() => navigate('/')}>FORGED<span>CACAO</span></button><p>Chocolate tools for people who have everything.</p><p>© 2026 Forged Cacao · Instagram · TikTok · Visa · Mastercard</p></footer><div className={`scrim ${cartOpen ? 'show' : ''}`} onClick={() => setCartOpen(false)}/><Cart cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} onQty={updateQty} onRemove={(id) => setCart(items => items.filter(item => item.id !== id))} onAdd={add}/></>;
}
