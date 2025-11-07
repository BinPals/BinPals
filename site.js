(function(){
  async function loadPartials(){
    const placeholders = Array.from(document.querySelectorAll('[data-include]'));
    await Promise.all(placeholders.map(async (placeholder)=>{
      const file = placeholder.getAttribute('data-include');
      if(!file) return;
      try{
        const response = await fetch(file);
        if(!response.ok){
          throw new Error(response.statusText);
        }
        const html = await response.text();
        placeholder.outerHTML = html;
      }catch(error){
        console.error('Failed to load partial', file, error);
      }
    }));
  }

  function adjustNavLinks(){
    document.querySelectorAll('[data-nav-target]').forEach(link => {
      const target = link.getAttribute('data-nav-target');
      if(!target) return;
      if(document.querySelector(target)){
        link.setAttribute('href', target);
      }else{
        link.setAttribute('href', `index.html${target}`);
      }
    });
  }

  function initDrawer(){
    const drawer = document.getElementById('drawer');
    const openBtn = document.getElementById('openMenu');
    const closeBtn = document.getElementById('closeMenu');
    if(!drawer) return;

    const closeLinks = drawer.querySelectorAll('[data-close]');
    const setOpen = (open)=>{
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    };

    openBtn && openBtn.addEventListener('click', ()=>setOpen(true));
    closeBtn && closeBtn.addEventListener('click', ()=>setOpen(false));
    drawer.addEventListener('click', (event)=>{
      if(event.target === drawer){
        setOpen(false);
      }
    });
    closeLinks.forEach(link => link.addEventListener('click', ()=>setOpen(false)));
  }

  function setCurrentYear(){
    const yearEl = document.querySelector('[data-current-year]');
    if(yearEl){
      yearEl.textContent = new Date().getFullYear();
    }
  }

  function applyHeaderCtaVariant(){
    const cta = document.querySelector('[data-header-cta]');
    if(!cta) return;
    const variant = document.body.getAttribute('data-header-cta');
    if(variant === 'solid'){
      cta.classList.remove('btn--ghost');
    }else{
      cta.classList.add('btn--ghost');
    }
  }

  async function init(){
    await loadPartials();
    adjustNavLinks();
    initDrawer();
    setCurrentYear();
    applyHeaderCtaVariant();
    document.dispatchEvent(new CustomEvent('partials:ready'));
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
})();
