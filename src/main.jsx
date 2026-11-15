import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
let csrf = '';
async function api(action, body, signal) {
  const res = await fetch(`api.php?action=${action}`, body === undefined ? {signal} : {
    method: 'POST', headers: {'Content-Type':'application/json','X-CSRF-Token':csrf}, body:JSON.stringify(body)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}
function App() {
  const [user,setUser]=useState(null), [ready,setReady]=useState(false);
  const [properties,setProperties]=useState([]), [cities,setCities]=useState([]);
  const [filters,setFilters]=useState({city:'',min:'',max:'',gender:'',shortlist:false});
  const [loading,setLoading]=useState(true), [error,setError]=useState(''), [notice,setNotice]=useState('');
  const [mode,setMode]=useState(''), [authBusy,setAuthBusy]=useState(false), [pending,setPending]=useState({});
  const [revision,setRevision]=useState(0);
  useEffect(()=>{api('session').then(d=>{csrf=d.csrf;setUser(d.user);setReady(true);}).catch(e=>{setError(e.message);setLoading(false);});},[]);
  useEffect(()=>{
    if (!ready) return;
    const controller=new AbortController();
    setLoading(true); setError('');
    const q=new URLSearchParams({...filters,shortlist:filters.shortlist?'1':'0'});
    const timer=setTimeout(()=>api(`properties&${q}`,undefined,controller.signal).then(d=>{
      setProperties(d.properties);setCities(d.cities);
    }).catch(e=>{if(e.name!=='AbortError')setError(e.message);}).finally(()=>{if(!controller.signal.aborted)setLoading(false);}),250);
    return ()=>{clearTimeout(timer);controller.abort();};
  },[filters,ready,user,revision]);
  const change=(e)=>setFilters(f=>({...f,[e.target.name]:e.target.type==='checkbox'?e.target.checked:e.target.value}));
  async function authenticate(e) {
    e.preventDefault(); setAuthBusy(true);setError('');
    try {const d=await api(mode,Object.fromEntries(new FormData(e.currentTarget)));setUser(d.user);setMode('');setNotice('You are signed in.');}
    catch(e){setError(e.message);}finally{setAuthBusy(false);}
  }
  async function logout(){
    setAuthBusy(true);setError('');
    try {await api('logout',{});setFilters(f=>({...f,shortlist:false}));setUser(null);setNotice('Signed out.');}
    catch(e){setError(e.message);}finally{setAuthBusy(false);}
  }
  async function interest(p){
    if(!user){setMode('login');setError('Log in to save properties.');window.scrollTo({top:0,behavior:'smooth'});return;}
    setPending(v=>({...v,[p.id]:true}));setError('');
    try {const d=await api('interest',{property_id:Number(p.id),interested:!Boolean(Number(p.interested))});
      setProperties(list=>filters.shortlist&&!d.interested?list.filter(x=>x.id!==p.id):list.map(x=>x.id===p.id?{...x,interested:d.interested?1:0}:x));
      setNotice(d.interested?'Property added to shortlist.':'Property removed from shortlist.');
    }catch(e){setError(e.message);}finally{setPending(v=>({...v,[p.id]:false}));}
  }
  return <>
    <nav className="navbar bg-white border-bottom"><div className="container gap-2"><a className="navbar-brand" href="index.php">StudentStay</a><div className="d-flex align-items-center gap-2 flex-wrap">{user?<><span>Hello, {user.name}</span><button disabled={authBusy} className="btn btn-outline-secondary" onClick={logout}>Log out</button></>:<><button disabled={!ready} className="btn btn-outline-primary" onClick={()=>setMode('login')}>Log in</button><button disabled={!ready} className="btn btn-primary" onClick={()=>setMode('signup')}>Sign up</button></>}</div></div></nav>
    <header className="hero"><div className="container"><p className="eyebrow">STUDENT LIVING, SIMPLIFIED</p><h1>Find a place to feel at home.</h1><p>Explore student accommodation, compare monthly rent, and save your favourites.</p><small>Demonstration website. All properties, addresses and ratings are sample data.</small></div></header>
    <main className="container py-4">
      {error&&<div className="alert alert-danger" role="alert">{error}</div>}
      <div role="status" aria-live="polite">{notice&&<p className="text-success">{notice}</p>}</div>
      {mode&&<section className="card p-4 mb-4 auth"><h2>{mode==='signup'?'Create your account':'Welcome back'}</h2><form onSubmit={authenticate}>
        {mode==='signup'&&<><label className="form-label" htmlFor="name">Name</label><input id="name" name="name" className="form-control mb-3" required maxLength="100" autoComplete="name"/><label className="form-label" htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" className="form-control mb-3" required maxLength="25" autoComplete="tel"/></>}
        <label className="form-label" htmlFor="email">Email</label><input id="email" name="email" type="email" className="form-control mb-3" required autoComplete="email"/>
        <label className="form-label" htmlFor="password">Password</label><input id="password" name="password" type="password" className="form-control mb-3" minLength="8" maxLength="72" required autoComplete={mode==='signup'?'new-password':'current-password'}/>
        <button disabled={authBusy} className="btn btn-primary me-2">{authBusy?'Please wait…':mode==='signup'?'Sign up':'Log in'}</button><button type="button" className="btn btn-outline-secondary" onClick={()=>setMode('')}>Cancel</button></form></section>}
      <section className="card p-3 mb-4" aria-label="Property filters"><div className="row g-3">
        <div className="col-sm-6 col-lg-3"><label htmlFor="city" className="form-label">City</label><select id="city" name="city" value={filters.city} onChange={change} className="form-select"><option value="">All cities</option>{cities.map(c=><option key={c}>{c}</option>)}</select></div>
        {['min','max'].map(k=><div className="col-sm-6 col-lg-3" key={k}><label htmlFor={k} className="form-label">{k==='min'?'Minimum':'Maximum'} rent (₹/month)</label><input id={k} type="number" min="0" max="99999999" name={k} value={filters[k]} onChange={change} className="form-control" placeholder="No limit"/></div>)}
        <div className="col-sm-6 col-lg-3"><label htmlFor="gender" className="form-label">Accommodation for</label><select id="gender" name="gender" value={filters.gender} onChange={change} className="form-select"><option value="">Everyone</option>{['Male','Female','Unisex'].map(g=><option key={g}>{g}</option>)}</select></div>
        <div className="col-12 d-flex gap-3 align-items-center flex-wrap"><label><input type="checkbox" name="shortlist" checked={filters.shortlist} disabled={!user} onChange={change}/> My shortlist {user?'':'(login required)'}</label><button className="btn btn-sm btn-outline-secondary" onClick={()=>setFilters({city:'',min:'',max:'',gender:'',shortlist:false})}>Reset filters</button><button className="btn btn-sm btn-outline-secondary" onClick={()=>setRevision(n=>n+1)}>Refresh results</button></div>
      </div></section>
      <h2 className="h4 mb-3">{filters.shortlist?'Your saved homes':'Explore accommodation'}</h2>
      {loading?<p role="status"><span className="spinner-border spinner-border-sm me-2"/>Loading properties…</p>:error?null:<><p>{properties.length} properties found</p><div className="row g-4">{properties.map(p=><div className="col-md-6 col-xl-4" key={p.id}><article className="card property-card h-100"><img src={p.image||'images/room.svg'} className="card-img-top" alt={`Illustration for ${p.name}`}/><div className="card-body d-flex flex-column"><div className="d-flex justify-content-between"><span className="badge text-bg-light">{p.gender}</span><span>Rating {p.rating}/5</span></div><h3 className="h5 mt-3">{p.name}</h3><p className="text-secondary">{p.city} · {p.address}</p><p className="price">₹{Number(p.price).toLocaleString('en-IN')} <small>/ month</small></p><div className="d-flex gap-2 mt-auto"><a className="btn btn-outline-primary" href={`property.php?id=${p.id}`}>View details</a><button className="btn btn-primary" disabled={!!pending[p.id]} aria-pressed={!!Number(p.interested)} onClick={()=>interest(p)}>{pending[p.id]?'Saving…':Number(p.interested)?'Saved — remove':'Shortlist'}</button></div></div></article></div>)}</div>{!properties.length&&<p>No properties match these filters. Try resetting them.</p>}</>}
    </main><footer className="container py-4 text-secondary border-top">StudentStay · Educational demonstration · No bookings or payments.</footer>
  </>;
}
createRoot(document.getElementById('root')).render(<App/>);
