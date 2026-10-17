(function(){
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

/* nav */
const nav=$('#nav'), mbook=$('#mbook');
function onScroll(){
  const y=scrollY;
  nav.classList.toggle('solid',y>40);
  mbook.classList.toggle('show',y>innerHeight*.8);
  storyTick();
}
addEventListener('scroll',onScroll,{passive:true});
const burger=$('#burger');
burger.onclick=()=>{const o=document.body.classList.toggle('menu-open');burger.setAttribute('aria-expanded',o);$('#mmenu').setAttribute('aria-hidden',!o)};
$$('#mmenu a').forEach(a=>a.onclick=()=>{document.body.classList.remove('menu-open');burger.setAttribute('aria-expanded',false)});

/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15,rootMargin:'0px 0px -40px 0px'});
$$('.rv,.exp').forEach(el=>io.observe(el));

/* reel hero */
let reelI=0,reelT;
function reel(i){reelI=i;$$('.reel-slide').forEach((s,k)=>s.classList.toggle('on',k===i));$$('.reel-tabs button').forEach((b,k)=>{b.classList.remove('on');void b.offsetWidth;b.classList.toggle('on',k===i)});clearTimeout(reelT);reelT=setTimeout(()=>reel((reelI+1)%4),6000)}
$$('.reel-tabs button').forEach(b=>b.onclick=()=>reel(+b.dataset.i));
reel(0);

/* scroll story */
const steps=$$('.story-step'), frames=$$('.story-frame img'), prog=$('#storyProg');
function storyTick(){
  const mid=innerHeight*.5;let act=0;
  steps.forEach((s,i)=>{const r=s.getBoundingClientRect();if(r.top<mid)act=i});
  steps.forEach((s,i)=>s.classList.toggle('on',i===act));
  const fi=Math.max(0,Math.min(frames.length-1,act-1<0?0:act-1));
  frames.forEach((f,i)=>f.classList.toggle('on',i===fi));
  const box=$('.story-steps').getBoundingClientRect();
  const p=Math.max(0,Math.min(1,(mid-box.top)/box.height));
  if(prog)prog.style.height=(p*100)+'%';
}

/* timeline — verified historical saga */
const TL=[
  {
    yr:'1734',
    lb:'The Fort',
    t:'Nahargarh Fort & The Legend of Nahar Singh',
    img:'assets/fort-day.jpg',
    d:'Commissioned in 1734 by Maharaja Sawai Jai Singh II atop the Aravalli hills, Nahargarh stands as a fortress of mystery. Beyond the palace of the Nine Queens lies the immortal legend of Nahar Singh Bhomia — the spirit whose presence shaped the fort\'s destiny.',
    highlight:'300-year-old heritage site'
  },
  {
    yr:'1878',
    lb:'Theatre Heritage',
    t:'Ram Prakash Talkies — Rajasthan’s First Cinema',
    img:'assets/film-nahargarh.jpg',
    d:'In 1878–79, Maharaja Sawai Ram Singh II built Rajasthan’s first-ever theatre, Ram Prakash Talkies, in Jaipur. Though the original heritage fell into ruins over time, HISTORICA has faithfully reconstructed its facade and spirit as a state-of-the-art 4D Cinematic Theatre.',
    highlight:'Recreating 1878-79 theatre architecture'
  },
  {
    yr:'2016',
    lb:'Museum Milestone',
    t:'The Jaipur Wax Museum at Nahargarh',
    img:'assets/cricket.jpg',
    d:'Inaugurated in December 2016 by Bollywood star Govinda in collaboration with the Department of Archaeology & Museums, Government of Rajasthan. It became the world\'s first wax museum at a heritage fort and rapidly rose to become Jaipur\'s top attraction.',
    highlight:'World\'s first at a heritage site'
  },
  {
    yr:'2024',
    lb:'Reimagining',
    t:'HISTORICA — Reborn 10X Bigger',
    img:'assets/doorway.jpg',
    d:'Conceived by Mr. Anoop Srivastava and Entertainment 7 Creative Ventures, the museum expanded 10X into a multi-experiential universe featuring sets, 4D cinema, VFX, Thikri mirror inlay, and 42+ national icons.',
    highlight:'Multi-experiential history universe'
  },
  {
    yr:'Today',
    lb:'Live The Legend',
    t:'Four Magical Worlds Under One Roof',
    img:'assets/sheesh-mahal-wide.jpg',
    d:'Ram Prakash Talkies, the 2.5-million-mirror Sheesh Mahal with glass flooring, the 18th-century Royal Darbar, and the Hall of Icons — welcoming travellers from all over the world to step into the living history of Rajasthan and India.',
    highlight:'Open all days · 10:00 AM – 6:30 PM'
  }
];
const track=$('#tlTrack'), panel=$('#tlPanel'), fill=$('#tlFill');
TL.forEach((e,i)=>{const b=document.createElement('button');b.setAttribute('role','tab');b.innerHTML=`<span class="yr">${e.yr}</span><span class="lb">${e.lb}</span>`;b.onclick=()=>tl(i);track.appendChild(b)});
let tlI=0;
function tl(i){
  tlI=(i+TL.length)%TL.length;const e=TL[tlI];
  $$('button',track).forEach((b,k)=>{b.classList.toggle('on',k===tlI);b.setAttribute('aria-selected',k===tlI)});
  fill.style.width=(tlI/(TL.length-1)*100)+'%';
  panel.innerHTML=`<div class="img"><img src="${e.img}" alt="${e.t}"></div>
  <div><div class="big">${String(tlI+1).padStart(2,'0')}</div><p class="eyebrow" style="margin-top:14px">${e.lb}</p><h3 class="h-display">${e.t}</h3><p>${e.d}</p>
  ${e.highlight?`<div style="margin-top:14px"><span class="tag-badge">${e.highlight}</span></div>`:''}
  <div class="tl-nav"><button aria-label="Previous" data-d="-1">←</button><button aria-label="Next" data-d="1">→</button></div></div>`;
  $$('.tl-nav button',panel).forEach(b=>b.onclick=()=>tl(tlI+ +b.dataset.d));
}
tl(0);

/* map zones & details */
const MAP_ZONES=[
  {
    id:0,
    title:'Ram Prakash Talkies (4D Cinema)',
    desc:'Reconstructed 1878-79 theatre facade showing two exclusive historical films: "Mystery of Nahargarh" and "Hadi Rani". Equipped with 4D physical motion and atmospheric effects.',
    meta:'Screenings every 30 mins · 4D Theatre · Runtime ~15m'
  },
  {
    id:1,
    title:'Sheesh Mahal — The Palace of Mirrors',
    desc:'Over 2.5 million hand-cut concave mirrors using centuries-old Thikri craft, real gold and gemstone artwork, chandeliers, and the world\'s only Sheesh Mahal with designed glass flooring.',
    meta:'Strictly No Photography · Glass Flooring · Thikri Art'
  },
  {
    id:2,
    title:'The Royal Darbar',
    desc:'Step into an 18th-century Rajputana courtroom adorned with pure gold and handcrafted miniature paintings, featuring lifelike figures of Jaipur\'s royal dynasty.',
    meta:'Royal Courtroom · Pure Gold Art · Dynasty Heritage'
  },
  {
    id:3,
    title:'Hall of Icons',
    desc:'Tribute to Bharat Ratnas, freedom fighters, scientists, sporting heroes, and cinema pioneers with 42+ lifelike statues, plus a dedicated superhero & cartoon zone for children.',
    meta:'42+ Statues · Bharat Ratnas · Kids Superhero Zone'
  },
  {
    id:4,
    title:'Entrance & Welcome Desk',
    desc:'Main gateway inside Nahargarh Fort. Ticket validation, physical ticket counter, cloakroom/baggage holding, visitor guidance, and accessibility assistance.',
    meta:'Main Fort Courtyard · Ticket Counter · Helpdesk'
  }
];

const mapDetail=$('#mapDetail');
function pin(i){
  $$('.pin').forEach(p=>p.classList.toggle('on',+p.dataset.p===i));
  $$('#legend li').forEach(l=>l.classList.toggle('on',+l.dataset.p===i));
  const z=MAP_ZONES[i];
  if(mapDetail&&z){
    mapDetail.innerHTML=`<h4>${z.title}</h4><p>${z.desc}</p><div class="meta"><span>${z.meta}</span></div>`;
  }
}
$$('.pin,#legend li').forEach(el=>{el.addEventListener('mouseenter',()=>pin(+el.dataset.p));el.addEventListener('click',()=>pin(+el.dataset.p))});
pin(0);

/* film synopsis modal */
const FILM_DATA={
  nahargarh:{
    title:'Mystery of Nahargarh — The Fort Remembers',
    kicker:'The Untold Legend of Nahar Singh Bhomia',
    lore:'<p>Nahargarh Fort, poised high on the Aravalli crags, was known to the world merely as the retreat of the Nine Queens. But behind its ramparts lie centuries of royal secrets, strange disappearances, and an unyielding curse.</p><p>Legend tells of Nahar Singh Bhomia, a valiant Rathore prince whose spirit guarded the ridge. When construction of the fort began under Maharaja Sawai Jai Singh II, every wall erected by day mysteriously collapsed by night. It was only when a dedicated shrine was consecrated inside the fort and the bastion was rechristened "Nahargarh" (Abode of Nahar) that the fortress could stand.</p><p>Presented with cutting-edge 4D sensory effects, motion seats, atmospheric wind, and immersive VFX that bring the spirit of Nahargarh alive before your eyes.</p>',
    details:'Duration: ~15 mins · 4D Theatre · Screenings run continuously every 30 mins'
  },
  hadi:{
    title:'Hadi Rani — The Ultimate Sacrifice',
    kicker:'An Immortal Saga of Rajputana Bravery',
    lore:'<p>When the newly-wed Rao Ratan Singh of Salumbar was commanded by the Maharana of Mewar to march into battle against the Mughal army, his heart hesitated, bound by tender love for his bride, the young Hadi Rani.</p><p>Perceiving that her husband’s attachment was eclipsing his sacred duty to defend his motherland, Hadi Rani made the supreme, heart-rending vow. When a royal courier arrived requesting a token of remembrance (Nishani) from the queen, Hadi Rani drew her sword, severed her own head, and sent it on a silver platter so her husband would ride fearless into destiny.</p><p>A deeply moving cinematic tribute to the unmatched valour, honor, and supreme sacrifice of Rajputana women.</p>',
    details:'Duration: ~15 mins · 4D Cinematic Experience · Alternating screenings every 30 mins'
  }
};

const synModal=$('#synopsisModal');
function openSynopsis(filmKey){
  const f=FILM_DATA[filmKey];
  if(!f||!synModal)return;
  $('#synTitle').textContent=f.title;
  $('#synKicker').textContent=f.kicker;
  $('#synLore').innerHTML=f.lore;
  $('#synDetails').textContent=f.details;
  synModal.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeSynopsis(){
  if(synModal){synModal.classList.remove('open');document.body.style.overflow=''}
}
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-synopsis]');
  if(t){e.preventDefault();openSynopsis(t.dataset.synopsis)}
  if(e.target.closest('[data-close-synopsis]'))closeSynopsis();
});

/* group enquiry modal */
const grpModal=$('#groupModal');
function openGrp(){if(grpModal){grpModal.classList.add('open');document.body.style.overflow='hidden'}}
function closeGrp(){if(grpModal){grpModal.classList.remove('open');document.body.style.overflow=''}}
document.addEventListener('click',e=>{
  if(e.target.closest('[data-group-modal]')){e.preventDefault();openGrp()}
  if(e.target.closest('[data-close-grp]'))closeGrp();
});

const grpForm=$('#grpForm');
if(grpForm){
  grpForm.onsubmit=(e)=>{
    e.preventDefault();
    const type=$('#grpType').value;
    const org=$('#grpOrg').value;
    const name=$('#grpName').value;
    const phone=$('#grpPhone').value;
    const count=$('#grpCount').value;
    const date=$('#grpDate').value;
    const msg=`Hello HISTORICA Nahargarh, I would like to enquire about a group booking:\n- Type: ${type}\n- Organization: ${org}\n- Contact Person: ${name}\n- Phone: ${phone}\n- Estimated Visitors: ${count}\n- Preferred Date: ${date}`;
    const url='https://wa.me/919783231953?text='+encodeURIComponent(msg);
    window.open(url,'_blank');
    closeGrp();
  };
}

/* booking */
const TICKETS=[
  {
    id:'full',
    n:'HISTORICA All 4 Worlds',
    d:'Grand Film Experience (Ram Prakash Talkies), Sheesh Mahal, Royal Darbar & Hall of Icons',
    in:500,
    fo:1000,
    was:[750,1500],
    offer:true,
    inclusions:['Grand Film Experience (Ram Prakash Talkies)','Sheesh Mahal (Palace of Mirrors)','The Royal Darbar','Hall of Icons']
  },
  {
    id:'icons',
    n:'Hall of Icons Only',
    d:'Meet 42+ Legends of the Nation & Kids Entertainment Zone',
    in:250,
    fo:500,
    was:[250,500],
    offer:false,
    inclusions:['Hall of Icons Gallery (42+ Statues)','Kids Superhero & Cartoon Zone']
  }
];
const S={step:0,t:TICKETS[0],date:null,ind:1,for:0};
const bk=$('#bk'),body=$('#bkBody'),next=$('#bkNext'),back=$('#bkBack');
const fmt=n=>'₹'+n.toLocaleString('en-IN');
const total=()=>S.t?S.ind*S.t.in+S.for*S.t.fo:0;

function openBk(){
  bk.classList.add('open');
  bk.setAttribute('aria-hidden',false);
  document.body.style.overflow='hidden';
  if(!S.date){
    const d=days()[0];
    S.date=d.toDateString();
  }
  render();
  setTimeout(()=>$('.bk-x').focus(),50);
}
function closeBk(){
  bk.classList.remove('open');
  bk.setAttribute('aria-hidden',true);
  document.body.style.overflow='';
  if(S.step===4)Object.assign(S,{step:0,t:TICKETS[0],date:null,ind:1,for:0});
}
document.addEventListener('click',e=>{
  if(e.target.closest('[data-book]')){e.preventDefault();openBk()}
  if(e.target.closest('[data-close]'))closeBk();
});
addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    if(bk.classList.contains('open'))closeBk();
    closeSynopsis();
    closeGrp();
  }
});

function days(){
  const out=[],now=new Date();
  for(let i=0;i<14;i++){
    const d=new Date(now);
    d.setDate(now.getDate()+i);
    out.push(d);
  }
  return out;
}

function render(){
  $$('#bkSteps span').forEach((s,i)=>{s.className=i===S.step?'on':i<S.step?'done':''});
  $('#bkSteps').style.display=S.step===4?'none':'flex';
  let h='';

  if(S.step===0){
    h=`<h4>Choose your ticket</h4><p class="hint">Includes access to Nahargarh's premier experiential exhibits.</p>`+
    TICKETS.map(t=>`
      <button class="opt ${S.t===t?'on':''}" data-t="${t.id}">
        <span class="ck"></span>
        <h5>${t.n}</h5>
        <p>${t.d}</p>
        <div class="pp">${t.offer?'Inaugural Offer · ':''}Indian ${fmt(t.in)} (was ${fmt(t.was[0])}) · Foreign tourist ${fmt(t.fo)} (was ${fmt(t.was[1])})</div>
        <ul class="inc-list" style="margin-top:10px">
          ${t.inclusions.map(inc=>`<li><i>✓</i>${inc}</li>`).join('')}
        </ul>
      </button>
    `).join('')+
    `<p class="form-note">Full ticket applies for visitors above 5 years. Children aged 5 and under enter free.</p>`;
  }

  if(S.step===1){
    const ds=days();
    h=`<h4>Pick your date</h4><p class="hint">Open all 7 days from 10:00 AM to 6:30 PM (Recommended duration 1.5–2 hrs).</p><p class="month">${ds[0].toLocaleString('en',{month:'long',year:'numeric'})}</p><div class="dates">`+
    ds.map(d=>{
      const k=d.toDateString();
      return `<button data-d="${k}" class="${S.date===k?'on':''}"><small>${d.toLocaleString('en',{weekday:'short'})}</small><b>${d.getDate()}</b></button>`;
    }).join('')+'</div>';
  }

  if(S.step===2){
    h=`<h4>Number of visitors</h4><p class="hint">${S.t.n} · ${new Date(S.date).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'})}</p>`+
    [['ind','Indian Tourist',S.t.in],['for','Foreign Tourist',S.t.fo]].map(([k,l,p])=>`
      <div class="counter">
        <div><h5>${l}</h5><p>${fmt(p)} per person</p></div>
        <div class="stepper">
          <button data-c="${k}" data-v="-1" aria-label="Fewer ${l}">−</button>
          <output>${S[k]}</output>
          <button data-c="${k}" data-v="1" aria-label="More ${l}">+</button>
        </div>
      </div>
    `).join('')+
    `<p class="form-note">Children aged 5 and below enter free with accompanying adults.</p>`;
  }

  if(S.step===3){
    const d=new Date(S.date);
    const dateStr=d.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
    const waText=encodeURIComponent(`Hello HISTORICA Nahargarh, I would like to book tickets:\n- Ticket: ${S.t.n}\n- Date: ${dateStr}\n- Indian Guests: ${S.ind}\n- Foreign Guests: ${S.for}\n- Total: ${fmt(total())}`);
    h=`<h4>Review your visit</h4><p class="hint">Please check your details before proceeding.</p>
    <div class="summary">
      <div><span>Experience</span><b>${S.t.n}</b></div>
      <div><span>Visit Date</span><b>${dateStr}</b></div>
      ${S.ind?`<div><span>Indian Tourists × ${S.ind}</span><span>${fmt(S.ind*S.t.in)}</span></div>`:''}
      ${S.for?`<div><span>Foreign Tourists × ${S.for}</span><span>${fmt(S.for*S.t.fo)}</span></div>`:''}
      <div class="tot"><span>Total Amount</span><span>${fmt(total())}</span></div>
    </div>
    <div style="margin-top:20px;display:flex;flex-direction:column;gap:10px">
      <a href="https://wa.me/919783231953?text=${waText}" target="_blank" rel="noopener" class="btn btn-wa" style="justify-content:center;text-decoration:none">
        Book &amp; Confirm on WhatsApp <span class="arr"></span>
      </a>
    </div>
    <p class="fineprint" style="margin-top:14px">Photography and videography are strictly prohibited inside the Sheesh Mahal and Ram Prakash Talkies.</p>`;
  }

  if(S.step===4){
    h=`<div style="text-align:center;padding-top:24px">
      <div class="done-mark"><img src="assets/logo.png" alt="HISTORICA Crest"></div>
      <h4>You’re ready to visit</h4>
      <p class="hint" style="max-width:24em;margin:12px auto 0">Your reservation details for <b>${new Date(S.date).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</b> are saved. Present your confirmation at the HISTORICA ticket desk inside Nahargarh Fort.</p>
      <div style="margin-top:26px;display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
        <a href="https://www.google.com/maps/search/?api=1&query=Nahargarh+Fort+Jaipur" target="_blank" rel="noopener" class="btn btn-line btn-sm">Get Directions ↗</a>
        <button class="btn btn-gold btn-sm" data-close>Close</button>
      </div>
    </div>`;
  }

  body.innerHTML=h;
  $('#bkTotal').textContent=fmt(total());
  back.style.visibility=S.step>0&&S.step<4?'visible':'hidden';
  next.textContent=S.step===3?'Complete Booking':S.step===4?'Done':'Continue';
  const ok=[!!S.t,!!S.date,S.ind+S.for>0,true,true][S.step];
  next.disabled=!ok;

  $$('[data-t]',body).forEach(b=>b.onclick=()=>{
    S.t=TICKETS.find(t=>t.id===b.dataset.t);
    if(!S.ind&&!S.for)S.ind=1;
    render();
  });
  $$('[data-d]',body).forEach(b=>b.onclick=()=>{S.date=b.dataset.d;render()});
  $$('[data-c]',body).forEach(b=>b.onclick=()=>{
    const k=b.dataset.c;
    S[k]=Math.max(0,Math.min(20,S[k]+ +b.dataset.v));
    render();
  });
}

next.onclick=()=>{if(S.step===4){closeBk();return}S.step++;render()};
back.onclick=()=>{S.step=Math.max(0,S.step-1);render()};

onScroll();
})();

