(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* nav */
  const nav = $('#nav'), mbook = $('#mbook');
  function onScroll() {
    const y = scrollY;
    nav.classList.toggle('solid', y > 40);
    mbook.classList.toggle('show', y > innerHeight * .8);
    revealTick();
    storyTick();
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

  /* scroll story */
  const steps = $$('.story-step'), frames = $$('.story-frame img'), prog = $('#storyProg');
  function storyTick() {
    const steps = $$('.story-step');
    const img = $('#storyImg') || $('.story-frame img');
    if (!steps.length || !img) return;

    const triggerY = window.innerHeight * 0.45;
    let current = null;

    steps.forEach(st => {
      const rect = st.getBoundingClientRect();
      if (rect.top <= triggerY && rect.bottom >= triggerY) {
        current = st;
      }
    });

    if (current) {
      steps.forEach(s => s.classList.remove('active'));
      current.classList.add('active');
      const targetSrc = current.getAttribute('data-img');
      if (targetSrc && !img.src.endsWith(targetSrc)) {
        // Smooth crossfade transition
        img.classList.add('fade-out');
        setTimeout(() => {
          img.src = targetSrc;
          img.classList.remove('fade-out');
        }, 300); // Half of the CSS transition time for a centered fade
      }
    }
  }

  /* timeline — only facts from supplied material; others flagged */
  const TL = [
    { yr: 'Fort', lb: 'Nahargarh', t: 'Nahargarh Fort', img: 'assets/fort-day.jpg', d: 'The fort on the Aravalli ridge above Jaipur — home to HISTORICA today.', note: 'add verified founding date & history' },
    { yr: 'Legend', lb: 'Hadi Rani', t: 'Hadi Rani — The Ultimate Sacrifice', img: 'assets/film-hadi.jpg', d: 'One queen. One vow. One immortal sacrifice — a legend of Rajputana honour, now told in film at Ram Prakash Talkies.', note: 'add historical date & context' },
    { yr: 'Museum', lb: 'Jaipur Wax Museum', t: 'The Jaipur Wax Museum', img: 'assets/cricket.jpg', d: 'The museum at Nahargarh welcomes visitors to meet the icons of India.', note: 'add opening year' },
    { yr: 'Rebirth', lb: 'HISTORICA', t: 'HISTORICA is born', img: 'assets/doorway.jpg', d: 'Conceived by Mr. Anoop Shrivastava, Founder & Director of Entertainment 7 Creative Ventures Pvt. Ltd., the museum expanded 10X into a multi-experiential universe featuring sets, 4D cinema, VFX, Thikri mirror inlay, and 42+ national icons.', note: 'add launch date' },
    { yr: 'Today', lb: 'Now showing', t: 'Step into history', img: 'assets/sheesh-mahal.jpg', d: 'Ram Prakash Talkies, Sheesh Mahal, the Royal Darbar and the Hall of Icons — open to visitors at inaugural prices.', note: '' }
  ];
  const track = $('#tlTrack'), panel = $('#tlPanel'), fill = $('#tlFill');
  TL.forEach((e, i) => { const b = document.createElement('button'); b.setAttribute('role', 'tab'); b.innerHTML = `<span class="yr">${e.yr}</span><span class="lb">${e.lb}</span>`; b.onclick = () => { tl(i); resetTlTimer(); }; track.appendChild(b) });
  let tlI = 0, tlT;
  function tl(i) {
    tlI = (i + TL.length) % TL.length; const e = TL[tlI];
    $$('button', track).forEach((b, k) => { b.classList.toggle('on', k === tlI); b.setAttribute('aria-selected', k === tlI) });
    fill.style.width = (tlI / (TL.length - 1) * 100) + '%';
    panel.innerHTML = `<div class="img"><img src="${e.img}" alt="${e.t}"></div>
  <div><div class="big">${String(tlI + 1).padStart(2, '0')}</div><p class="eyebrow" style="margin-top:14px">${e.lb}</p><h3 class="h-display">${e.t}</h3><p>${e.d} ${e.note ? `<span class="tbc">${e.note}</span>` : ''}</p>
  <div class="tl-nav"><button aria-label="Previous" data-d="-1">←</button><button aria-label="Next" data-d="1">→</button></div></div>`;
    $$('.tl-nav button', panel).forEach(b => b.onclick = () => { tl(tlI + +b.dataset.d); resetTlTimer(); });
  }
  function resetTlTimer() {
    clearTimeout(tlT);
    tlT = setTimeout(() => {
      tl(tlI + 1);
    }, 2000);
  }
  tl(0);
  resetTlTimer();

  // Simplified pause logic: only pause on direct interaction elements
  track.onmouseenter = () => clearTimeout(tlT);
  track.onmouseleave = () => resetTlTimer();
  panel.onmouseenter = () => clearTimeout(tlT);
  panel.onmouseleave = () => resetTlTimer();

  /* map */
  function pin(i) { $$('.pin').forEach(p => p.classList.toggle('on', +p.dataset.p === i)); $$('#legend li').forEach(l => l.classList.toggle('on', +l.dataset.p === i)) }
  $$('.pin,#legend li').forEach(el => { el.addEventListener('mouseenter', () => pin(+el.dataset.p)); el.addEventListener('click', () => pin(+el.dataset.p)) });
  pin(4);

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

  onScroll();
})();
