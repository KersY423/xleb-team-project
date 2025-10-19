(function(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const pages = {
    home: document.getElementById('page-home'),
    rules: document.getElementById('page-rules'),
    about: document.getElementById('page-about'),
  };

  function show(route){
    Object.keys(pages).forEach(k => {
      if(pages[k]) pages[k].classList.toggle('visible', k === route);
    });
    const select = document.getElementById('routeSelect');
    if(select) select.value = route;
    history.replaceState({}, '', '#' + route);
  }

  // initial route (hash support)
  const initial = (location.hash || '#home').replace('#','');
  show(pages[initial] ? initial : 'home');

  // desktop nav
  document.querySelectorAll('.nav-btn,[data-route]').forEach(el => {
    el.addEventListener('click', (e) => {
      const r = el.getAttribute('data-route');
      if(r){ show(r); }
    });
  });

  // mobile select
  const select = document.getElementById('routeSelect');
  if(select){
    select.addEventListener('change', (e) => show(select.value));
  }

  // copy IP
  const copyBtn = document.getElementById('copyIp');
  if(copyBtn){
    copyBtn.addEventListener('click', async () => {
      const ip = copyBtn.getAttribute('data-ip');
      try{
        await navigator.clipboard.writeText(ip);
        const original = copyBtn.textContent;
        copyBtn.textContent = 'IP скопирован!';
        setTimeout(()=>{ copyBtn.textContent = original; }, 1600);
      }catch(err){
        console.error(err);
      }
    });
  }
})();

/* Reveal on scroll */
(function(){
  const els = document.querySelectorAll('[data-anim]');
  if (!('IntersectionObserver' in window)){
    els.forEach(el=>el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {threshold:.12});
  els.forEach(el=>io.observe(el));
})();


/* Online map integration */
(function(){
  const cfg = window.__CONFIG__ || {};
  const mp = document.querySelector('.map-preview');
  if(!mp) return;
  const link = mp.querySelector('.map-link');
  const frame = mp.querySelector('.map-frame');
  if (cfg.map && typeof cfg.map === 'string' && cfg.map.length > 4){
    frame.src = cfg.map;
    mp.classList.add('loaded');
    if (link) { link.href = cfg.map; link.style.display = 'inline-flex'; }
  } else {
    if (link) { link.style.display = 'none'; }
  }
})();
