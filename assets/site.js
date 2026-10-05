(() => {
 'use strict';
 const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
 const nav = document.querySelector('#mainNav');
 const menu = document.querySelector('.nav-menu-button');
 menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('menu-open');menu.setAttribute('aria-expanded', String(open));menu.textContent = open ? 'Close' : 'Menu';
 });
 document.addEventListener('keydown', e => {if(e.key==='Escape' && nav?.classList.contains('menu-open')) menu.click();});
 if(!reduce) {
  const io = new IntersectionObserver(entries => entries.forEach(entry => {
   if(!entry.isIntersecting)return;
   entry.target.animate([{opacity:0,translate:'0 28px'},{opacity:1,translate:'0 0'}],{duration:750,easing:'cubic-bezier(.16,1,.3,1)',delay:Number(entry.target.dataset.motionDelay||0)});
   io.unobserve(entry.target);
  }),{threshold:.12});
  document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right,.process-step,.testimonial-card,.gallery-cell').forEach((el,i)=>{
   if(el.matches('.process-step,.testimonial-card,.gallery-cell'))el.dataset.motionDelay=(i%4)*70;
   io.observe(el);
  });
  document.querySelectorAll('.hero-headline .line,.hero-sub,.hero-actions,.page-hero-title,.page-hero-eyebrow,.contact-hero-title,.contact-hero-eyebrow').forEach((el,i)=>{
   el.animate([{opacity:0,translate:'0 24px',filter:'blur(5px)'},{opacity:1,translate:'0 0',filter:'blur(0)'}],{duration:900,delay:100+i*90,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
  });
  const zoom=document.querySelector('.zoom-img');
  if(zoom) {
   let ticking=false;
   const update=()=>{const r=zoom.closest('.zoom-section').getBoundingClientRect();const p=Math.min(1,Math.max(0,-r.top/Math.max(1,r.height-innerHeight)));zoom.style.transform=`scale(${1.02+p*.12})`;ticking=false;};
   addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});update();
  }
 }
 const track=document.querySelector('.services-track-wrap');
 if(track) {
  let down=false,start=0,left=0,moved=false;
  track.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;down=true;moved=false;start=e.clientX;left=track.scrollLeft;});
  track.addEventListener('pointermove',e=>{if(!down)return;const d=e.clientX-start;if(Math.abs(d)>8)moved=true;if(moved)track.scrollLeft=left-d;});
  addEventListener('pointerup',()=>{down=false;});
  track.addEventListener('click',e=>{if(moved){e.preventDefault();moved=false;}},true);
 }
 // Keep gallery filtering and the full-size viewer available without a CDN dependency.
 const items=[...document.querySelectorAll('.gallery-item')];
 let visible=items,index=0;
 const box=document.querySelector('#lightbox'),image=document.querySelector('#lightboxImg'),caption=document.querySelector('#lightboxCaption');
 let previousFocus;
 const show=()=>{const item=visible[index],img=item?.querySelector('img');if(!img)return;image.src=img.src;image.alt=img.alt;caption.textContent=item.querySelector('.gallery-item-label')?.textContent||img.alt;};
 const close=()=>{box?.classList.remove('active');document.body.style.overflow='';previousFocus?.focus();};
 document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelector('.filter-btn.active')?.classList.remove('active');btn.classList.add('active');
  items.forEach(item=>{const hide=btn.dataset.filter!=='all'&&item.dataset.category!==btn.dataset.filter;item.classList.toggle('hidden',hide);});
  visible=items.filter(item=>!item.classList.contains('hidden'));const count=document.getElementById('filterCount');if(count)count.textContent=`${visible.length} Photos`;
 }));
 items.forEach(item=>{item.tabIndex=0;item.setAttribute('role','button');item.setAttribute('aria-label',`View ${item.querySelector('img')?.alt||'glass project'}`);
  const open=()=>{index=visible.indexOf(item);previousFocus=document.activeElement;show();box?.classList.add('active');document.body.style.overflow='hidden';document.querySelector('#lightboxClose')?.focus();};
  item.addEventListener('click',open);item.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
 });
 document.querySelector('#lightboxClose')?.addEventListener('click',close);
 const step=delta=>{if(visible.length){index=(index+delta+visible.length)%visible.length;show();}};
 document.querySelector('#lightboxPrev')?.addEventListener('click',()=>step(-1));
 document.querySelector('#lightboxNext')?.addEventListener('click',()=>step(1));
 box?.addEventListener('click',e=>{if(e.target===box)close();});
 document.addEventListener('keydown',e=>{if(!box?.classList.contains('active'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1);
  if(e.key==='Tab'){const controls=[...box.querySelectorAll('button')].filter(el=>el.getClientRects().length);const first=controls[0],last=controls.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
 });
 // Every quote form has a real native POST fallback as well as an inline AJAX flow.
 document.querySelectorAll('[data-quote-form]').forEach(form=>{
  const status=document.getElementById(form.dataset.status),button=form.querySelector('[type="submit"]'),original=button.textContent;
  const fallback=document.getElementById(form.dataset.fallback);
  const setStatus=(message,error=false)=>{status.textContent=message;status.classList.toggle('is-error',error);};
  form.addEventListener('submit',async e=>{
   e.preventDefault();if(button.disabled||!form.reportValidity())return;
   const data=Object.fromEntries(new FormData(form));
   if(String(data._honey||'').trim())return;
   const phone=String(data.phone||'').replace(/\D/g,'');
   if(phone.length<7||phone.length>15){setStatus('Please enter a valid phone number.',true);form.querySelector('[name="phone"]')?.focus();return;}
   const text=['Quote request — Toronto Premium Glass',...Object.entries(data).filter(([key,value])=>!key.startsWith('_')&&value).map(([key,value])=>`${key}: ${value}`)].join('\n');
   fallback?.querySelectorAll('[data-sms]').forEach(a=>{a.href=`sms:${a.dataset.sms}?body=${encodeURIComponent(text)}`;});
   const emailLink=fallback?.querySelector('[data-email]');if(emailLink)emailLink.href=`mailto:info@torontopremiumglass.com?subject=${encodeURIComponent('Glass quote request')}&body=${encodeURIComponent(text)}`;
   button.disabled=true;button.textContent='Sending…';form.setAttribute('aria-busy','true');setStatus('Sending your request…');
   const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
   try {
    const response=await fetch('https://formsubmit.co/ajax/info@torontopremiumglass.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({...data,_subject:'New glass quote — Toronto Premium Glass',_template:'table',_url:'https://torontopremiumglass.com'+location.pathname}),signal:controller.signal});
    const result=await response.json();
    if(!response.ok||!(result.success===true||result.success==='true')||/activat|confirm your email/i.test(result.message||''))throw new Error('delivery');
    setStatus('Your request has been submitted. We’ll contact you within one business day.');
    form.reset();const success=document.getElementById('formSuccess');if(success&&form.id==='contactForm')success.classList.add('visible');if(fallback)fallback.hidden=true;
   } catch(error) {
    setStatus('We couldn’t confirm delivery. Your details are still here. Please text your request to either number below, or send it by email.',true);if(fallback)fallback.hidden=false;
   } finally {clearTimeout(timeout);button.disabled=false;button.textContent=original;form.removeAttribute('aria-busy');}
  });
 });
 if(new URLSearchParams(location.search).get('quote')==='submitted') {
  const status=document.querySelector('#quoteStatus');if(status)status.textContent='Your request has been submitted. We’ll contact you within one business day.';
 }
})();
