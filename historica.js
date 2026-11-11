(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* nav */
  const nav = $('#nav'), mbook = $('#mbook');
  function onScroll() {
    const y = scrollY;
    nav.classList.toggle('solid', y > 40);
    mbook.classList.toggle('show', y > innerHeight * .8);
    revealTick();
  }
  addEventListener('scroll', onScroll, { passive: true });
  const burger = $('#burger');
  burger.onclick = () => { const o = document.body.classList.toggle('menu-open'); burger.setAttribute('aria-expanded', o); $('#mmenu').setAttribute('aria-hidden', !o) };
  $$('#mmenu a').forEach(a => a.onclick = () => { document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', false) });

  /* reveal */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .15, rootMargin: '0px 0px -40px 0px' });
  $$('.rv,.exp').forEach(el => io.observe(el));
  function revealTick() { const lim = innerHeight * .92; $$('.rv:not(.in),.exp:not(.in)').forEach(el => { if (el.getBoundingClientRect().top < lim) el.classList.add('in') }) }
  setTimeout(() => $$('.rv,.exp').forEach(el => el.classList.add('in')), 2500);

  /* reel hero */
  let reelI = 0, reelT;
  function reel(i) { reelI = i; $$('.reel-slide').forEach((s, k) => s.classList.toggle('on', k === i)); $$('.reel-tabs button').forEach((b, k) => { b.classList.remove('on'); void b.offsetWidth; b.classList.toggle('on', k === i) }); clearTimeout(reelT); reelT = setTimeout(() => reel((reelI + 1) % 4), 6000) }
  $$('.reel-tabs button').forEach(b => b.onclick = () => reel(+b.dataset.i));
  reel(0);


  /* timeline — Scroll-Driven Sticky Storytelling */
  const track = document.getElementById('timeline-scroll-track');
  const cards = document.querySelectorAll('.timeline-chapter-card');
  const nodes = document.querySelectorAll('.milestone-node');
  const progressFill = document.getElementById('timelineProgressFill');
  const totalChapters = cards.length;

  function getTimelineStickyTop() {
    return window.innerWidth <= 860 ? 64 : 80;
  }

  function updateTimelineOnScroll() {
    if (!track || totalChapters === 0) return;
    const rect = track.getBoundingClientRect();
    const stickyTop = getTimelineStickyTop();
    const trackHeight = track.offsetHeight - window.innerHeight + stickyTop;
    if (trackHeight <= 0) return;

    const scrollProgress = Math.min(Math.max((stickyTop - rect.top) / trackHeight, 0), 0.9999);
    const activeIndex = Math.min(Math.floor(scrollProgress * totalChapters), totalChapters - 1);

    cards.forEach((card, idx) => {
      card.classList.toggle('active', idx === activeIndex);
    });

    nodes.forEach((node, idx) => {
      const isActive = idx === activeIndex;
      node.classList.toggle('active', isActive);
      node.setAttribute('aria-selected', String(isActive));
    });

    if (progressFill) {
      progressFill.style.width = (scrollProgress * 100).toFixed(2) + '%';
    }
  }

  // Click milestone nodes to scroll directly to the corresponding chapter
  nodes.forEach((node, idx) => {
    node.addEventListener('click', () => {
      if (!track || totalChapters === 0) return;
      const stickyTop = getTimelineStickyTop();
      const trackHeight = track.offsetHeight - window.innerHeight + stickyTop;
      const trackTopDoc = window.scrollY + track.getBoundingClientRect().top;
      const targetProgress = (idx + 0.08) / totalChapters;
      const targetY = trackTopDoc - stickyTop + targetProgress * trackHeight;

      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(targetY, { duration: 1.0 });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    });
  });

  window.addEventListener('scroll', updateTimelineOnScroll, { passive: true });
  window.addEventListener('resize', updateTimelineOnScroll, { passive: true });
  if (window.lenis && typeof window.lenis.on === 'function') {
    window.lenis.on('scroll', updateTimelineOnScroll);
  }
  updateTimelineOnScroll();

  /* map */
  const ZONES = [
    { p: 0, num: 'I', name: 'Ram Prakash Talkies', sub: 'Grand Cinematic Experience (1878-79)', desc: 'Screening "Mystery of Nahargarh" & "Hadi Rani" with physical sensory immersion, 4D effects and period theatre facade.', target: '#exp-talkies' },
    { p: 1, num: 'II', name: 'Sheesh Mahal', sub: 'The Palace of Mirrors', desc: 'Over 2.5 million hand-cut Thikri mirrors and the world’s only designed glass floor reflecting endlessly into infinity.', target: '#exp-sheesh' },
    { p: 2, num: 'III', name: 'The Royal Darbar', sub: 'Feel What It Was Like To Be Royalty', desc: '18th-century Rajputana courtroom with pure gold artwork, miniature paintings, thrones, and lifelike Jaipur royal figures.', target: '#exp-darbar' },
    { p: 3, num: 'IV', name: 'Hall of Icons', sub: 'Bharat Ratnas & World Heroes', desc: '42+ lifelike statues honoring India’s legends, scientists, cricket icons, plus kids superhero realm.', target: '#exp-icons' },
    { p: 4, num: '✦', name: 'Main Entrance & Tickets', sub: 'Nahargarh Fort Reception', desc: 'Ticket booths, visitor welcome reception, guided group assembly, and safety guidelines.', target: '#visit' }
  ];

  const mapDetail = $('#mapDetail');
  function scrollToTarget(sel) {
    const el = $(sel);
    if (el) {
      const navH = ($('#nav')?.offsetHeight || 70) + 16;
      const top = el.getBoundingClientRect().top + window.pageYOffset - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  function pin(i, scroll) {
    const zone = ZONES[i] || ZONES[0];
    $$('.pin').forEach(p => p.classList.toggle('on', +p.dataset.p === i));
    $$('#legend li').forEach(l => l.classList.toggle('on', +l.dataset.p === i));
    if (mapDetail) {
      mapDetail.innerHTML = `<h5>${zone.num} &middot; ${zone.name}</h5><p style="color:var(--gold);font-size:11px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">${zone.sub}</p><p>${zone.desc}</p><a href="${zone.target}" class="map-detail-btn" data-target="${zone.target}">Explore this area &rarr;</a>`;
      const btn = $('.map-detail-btn', mapDetail);
      if (btn) {
        btn.onclick = e => {
          e.preventDefault();
          scrollToTarget(zone.target);
        };
      }
    }
    if (scroll) {
      scrollToTarget(zone.target);
    }
  }

  $$('.pin').forEach(el => {
    el.addEventListener('mouseenter', () => pin(+el.dataset.p, false));
    el.addEventListener('click', e => {
      e.preventDefault();
      pin(+el.dataset.p, true);
    });
  });

  $$('#legend li').forEach(el => {
    el.addEventListener('mouseenter', () => pin(+el.dataset.p, false));
    el.addEventListener('click', e => {
      e.preventDefault();
      pin(+el.dataset.p, true);
    });
  });

  pin(0, false);

  /* booking */
  const TICKETS = [
    { id: 'full', n: 'HISTORICA Entry', d: 'Grand Film Experience, Sheesh Mahal, Royal Darbar & Hall of Icons', in: 500, fo: 1000, was: [750, 1500], offer: true },
    { id: 'icons', n: 'Hall of Icons', d: 'Meet the Legends of the Nation', in: 250, fo: 500 }
  ];
  const S = { step: 0, t: null, date: null, ind: 0, for: 0 };
  const bk = $('#bk'), body = $('#bkBody'), next = $('#bkNext'), back = $('#bkBack');
  const fmt = n => '₹' + n.toLocaleString('en-IN');
  const total = () => S.t ? S.ind * S.t.in + S.for * S.t.fo : 0;
  function openBk() { bk.classList.add('open'); bk.setAttribute('aria-hidden', false); document.body.style.overflow = 'hidden'; render(); setTimeout(() => $('.bk-x').focus(), 50) }
  function closeBk() { bk.classList.remove('open'); bk.setAttribute('aria-hidden', true); document.body.style.overflow = ''; if (S.step === 4) Object.assign(S, { step: 0, t: null, date: null, ind: 0, for: 0 }) }
  document.addEventListener('click', e => { if (e.target.closest('[data-book]')) { e.preventDefault(); openBk() } if (e.target.closest('[data-close]')) closeBk() });
  addEventListener('keydown', e => { if (e.key === 'Escape' && bk.classList.contains('open')) closeBk() });
  function days() { const out = [], now = new Date(); for (let i = 0; i < 14; i++) { const d = new Date(now); d.setDate(now.getDate() + i); out.push(d) } return out }
  function render() {
    $$('#bkSteps span').forEach((s, i) => { s.className = i === S.step ? 'on' : i < S.step ? 'done' : '' });
    $('#bkSteps').style.display = S.step === 4 ? 'none' : 'flex';
    let h = '';
    if (S.step === 0) { h = `<h4>Choose your ticket</h4><p class="hint">Full ticket applies for visitors above 5 years.</p>` + TICKETS.map(t => `<button class="opt ${S.t === t ? 'on' : ''}" data-t="${t.id}"><span class="ck"></span><h5>${t.n}</h5><p>${t.d}</p><div class="pp">${t.offer ? 'Inaugural offer · ' : ''}Indian ${fmt(t.in)} · Foreign tourist ${fmt(t.fo)}</div></button>`).join('') }
    if (S.step === 1) { const ds = days(); h = `<h4>Pick a date</h4><p class="hint">Opening hours to be confirmed by the museum.</p><p class="month">${ds[0].toLocaleString('en', { month: 'long', year: 'numeric' })}</p><div class="dates">` + ds.map(d => { const k = d.toDateString(); return `<button data-d="${k}" class="${S.date === k ? 'on' : ''}"><small>${d.toLocaleString('en', { weekday: 'short' })}</small><b>${d.getDate()}</b></button>` }).join('') + '</div>' }
    if (S.step === 2) { h = `<h4>Who’s visiting?</h4><p class="hint">${S.t.n}</p>` + [['ind', 'Indian', S.t.in], ['for', 'Foreign tourist', S.t.fo]].map(([k, l, p]) => `<div class="counter"><div><h5>${l}</h5><p>${fmt(p)} each</p></div><div class="stepper"><button data-c="${k}" data-v="-1" aria-label="Fewer ${l}">−</button><output>${S[k]}</output><button data-c="${k}" data-v="1" aria-label="More ${l}">+</button></div></div>`).join('') + `<p class="fineprint">Children aged 5 and under — <span class="tbc">confirm policy</span></p>` }
    if (S.step === 3) { const d = new Date(S.date); h = `<h4>Review</h4><p class="hint">Check your booking before payment.</p><div class="summary"><div><span>Ticket</span><span>${S.t.n}</span></div><div><span>Date</span><span>${d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</span></div>${S.ind ? `<div><span>Indian × ${S.ind}</span><span>${fmt(S.ind * S.t.in)}</span></div>` : ''}${S.for ? `<div><span>Foreign tourist × ${S.for}</span><span>${fmt(S.for * S.t.fo)}</span></div>` : ''}<div class="tot"><span>Total</span><span>${fmt(total())}</span></div></div><p class="fineprint">Photography and video are not allowed inside the Sheesh Mahal. Payment gateway <span class="tbc">to be connected</span></p>` }
    if (S.step === 4) { h = `<div style="text-align:center;padding-top:30px"><div class="done-mark"><img src="assets/logo.png" alt=""></div><h4>You’re booked</h4><p class="hint" style="max-width:22em;margin:10px auto 0">Your tickets for ${new Date(S.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })} will be sent by email. See you at Nahargarh.</p></div>` }
    body.innerHTML = h;
    $('#bkTotal').textContent = fmt(total());
    back.style.visibility = S.step > 0 && S.step < 4 ? 'visible' : 'hidden';
    next.textContent = S.step === 3 ? 'Pay ' + fmt(total()) : S.step === 4 ? 'Done' : 'Continue';
    const ok = [!!S.t, !!S.date, S.ind + S.for > 0, true, true][S.step];
    next.disabled = !ok;
    $$('[data-t]', body).forEach(b => b.onclick = () => { S.t = TICKETS.find(t => t.id === b.dataset.t); if (!S.ind && !S.for) S.ind = 1; render() });
    $$('[data-d]', body).forEach(b => b.onclick = () => { S.date = b.dataset.d; render() });
    $$('[data-c]', body).forEach(b => b.onclick = () => { const k = b.dataset.c; S[k] = Math.max(0, Math.min(20, S[k] + +b.dataset.v)); render() });
  }
  next.onclick = () => { if (S.step === 4) { closeBk(); return } S.step++; render() };
  back.onclick = () => { S.step = Math.max(0, S.step - 1); render() };

  /* visionary modal */
  const vmodal = $('#visionary-modal');
  function openVModal() {
    if (!vmodal) return;
    vmodal.classList.add('open');
    vmodal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const closeBtn = $('.vmodal-close', vmodal);
    if (closeBtn) closeBtn.focus();
  }
  function closeVModal() {
    if (!vmodal) return;
    vmodal.classList.remove('open');
    vmodal.setAttribute('aria-hidden', 'true');
    if (!bk.classList.contains('open')) {
      document.body.style.overflow = '';
    }
  }
  document.addEventListener('click', e => {
    if (e.target.closest('.open-visionary-modal, [href="#visionary-modal"], [data-modal="visionary"]')) {
      e.preventDefault();
      document.body.classList.remove('menu-open');
      const burger = $('#burger');
      if (burger) burger.setAttribute('aria-expanded', 'false');
      openVModal();
    }
    if (e.target.closest('[data-vmodal-close]')) {
      e.preventDefault();
      closeVModal();
    }
  });
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && vmodal && vmodal.classList.contains('open')) {
      closeVModal();
    }
  });

  onScroll();
})();
