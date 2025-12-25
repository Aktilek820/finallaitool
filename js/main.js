// Enhanced JS: nav, sticky header, form, reveal on scroll, lightbox and lazy-loading fallbacks
(function(){
  'use strict';
  // Mobile nav
  const navToggle = document.querySelector('.js-nav-toggle');
  const navList = document.querySelector('.nav__list');
  if(navToggle && navList){
    navToggle.addEventListener('click', ()=>{
      const isOpen = navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Sticky header small shrink on scroll
  const header = document.querySelector('.js-header');
  if(header){
    window.addEventListener('scroll', ()=>{
      const s = window.scrollY;
      if(s > 40) header.classList.add('header--scrolled');
      else header.classList.remove('header--scrolled');
    },{passive:true});
  }

  // Form handling (simple): validate and simulate submission
  const form = document.querySelector('.js-form');
  const notice = document.querySelector('.js-form-notice');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(!form.checkValidity()){
        notice.textContent = 'Пожалуйста, заполните форму корректно.';
        return;
      }
      notice.textContent = 'Отправка...';
      // Simulate submission
      setTimeout(()=>{
        notice.textContent = 'Спасибо! Мы свяжемся в течение 24 часов.';
        if(window.gtag){ gtag('event','lead_submission',{event_category:'lead', event_label: form.querySelector('[name="email"]')?.value || ''}); }
        form.reset();
      },900);
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({behavior:'smooth'});
      }
    });
  });

  // Track CTA clicks and Calendly
  document.querySelectorAll('.btn--primary, .btn--ghost, .btn--secondary').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const label = btn.textContent.trim();
      if(window.gtag){ gtag('event','cta_click',{event_category:'engagement', event_label: label}); }
    });
  });

  document.querySelectorAll('[data-calendly]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const url = btn.getAttribute('data-calendly');
      if(window.Calendly && typeof Calendly.showPopupWidget === 'function'){
        Calendly.showPopupWidget(url);
      } else {
        window.open(url, '_blank', 'noopener');
      }
      if(window.gtag){ gtag('event','schedule_demo',{event_category:'engagement', event_label: url}); }
    });
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && reveals.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');

          // If this reveal contains stat counters, animate them
          const counters = entry.target.querySelectorAll('.stat__value');
          if(counters && counters.length){
            counters.forEach(c => animateCounter(c));
          }

          io.unobserve(entry.target);
        }
      });
    },{threshold:0.12});
    reveals.forEach(r=>io.observe(r));
  } else {
    // fallback: show all and run counters
    reveals.forEach(r=>{
      r.classList.add('is-visible');
      const counters = r.querySelectorAll('.stat__value');
      if(counters && counters.length){ counters.forEach(c => animateCounter(c)); }
    });
  }

  // Animate numeric counters when visible
  function animateCounter(el, duration = 1400){
    if(!el || el.dataset.animated) return;
    const raw = el.getAttribute('data-target') || el.textContent || '0';
    const target = parseFloat(raw.replace(/[+,%\s]/g,'')) || 0;
    if(target <= 0) { el.textContent = raw; el.dataset.animated = 'true'; return; }
    el.dataset.animated = 'true';
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const val = Math.floor(progress * target);
      el.textContent = val;
      if(progress < 1) requestAnimationFrame(tick);
      else el.textContent = String(target);
    }
    requestAnimationFrame(tick);
  }

  // Testimonial slider (simple, accessible)
  (function initTestimonials(){
    const track = document.querySelector('.testimonials__track');
    if(!track) return;
    const items = Array.from(track.children);
    const total = items.length;
    let idx = 0;
    const prev = document.querySelector('.testimonials__prev');
    const next = document.querySelector('.testimonials__next');

    function show(i){
      idx = ((i % total) + total) % total;
      track.style.transform = `translateX(-${idx * 100}%)`;
      items.forEach((it, j)=> it.setAttribute('aria-hidden', String(j !== idx)));
    }

    prev?.addEventListener('click', ()=>{ show(idx - 1); resetAuto(); });
    next?.addEventListener('click', ()=>{ show(idx + 1); resetAuto(); });

    // autoplay with pause on hover/focus
    let auto = setInterval(()=> show(idx + 1), 6000);
    function resetAuto(){ clearInterval(auto); auto = setInterval(()=> show(idx + 1), 6000); }
    track.addEventListener('mouseenter', ()=> clearInterval(auto));
    track.addEventListener('mouseleave', ()=> resetAuto());
    // init
    show(0);
  })();

  // Lightbox for portfolio images
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox__close');
  document.querySelectorAll('.js-open-lightbox').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const src = btn.getAttribute('data-src');
      if(!lightbox) return;
      lightboxImg.src = src;
      lightbox.setAttribute('aria-hidden','false');
      lightbox.classList.add('is-open');
      lightboxClose?.focus();
    });
  });
  function closeLightbox(){
    if(!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden','true');
    lightboxImg.src = '';
  }
  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e)=>{ if(e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeLightbox(); });

  // Lazy-loading fallback for older browsers
  if(!('loading' in HTMLImageElement.prototype)){
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if('IntersectionObserver' in window){
      const lazyIo = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            observer.unobserve(img);
          }
        });
      });
      lazyImages.forEach(img=>lazyIo.observe(img));
    }
  }
})();