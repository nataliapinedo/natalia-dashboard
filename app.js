// app.js - Final cleaned BRAVO detail implementation (no conflict markers, no alert)
const DATA_PATH = './data/projects.json';
let PROJECTS = [];
let ACTIVE_PROJECT_ID = null;

async function loadProjects(){
  try{
    const res = await fetch(DATA_PATH);
    if(!res.ok) throw new Error('fetch failed');
    const json = await res.json();
    PROJECTS = json.projects || [];
  }catch(e){
    // fallback seed
    PROJECTS = [
      { id:'BRAVO-001', name:'BRAVO', status:'PRE-PILOTO', market:'Bolivia', city:'Cochabamba', short_description:'Prueba piloto de prendas deportivas', kpis:{progress:10,investment:0,products:0,providers:0,tasks:0,target_date:''}, model:{text:'POSICIONAMIENTO: PADEL & TENNIS PERFORMANCE + ATHLEISURE PREMIUM ACCESIBLE. Público 20-45. Canales: Instagram, TikTok, WhatsApp, showroom, clubes.'}, products:[], providers:[], market:{cochabamba:'',santacruz:'',lapaz:'',asuncion:''}, finance:{investment:0,cost_per_unit:0,avg_price:0,margin:0}, timeline:[], tasks:[], docs:[] }
    ];
  }
  renderProjects();
}

function renderProjects(){
  const list = document.getElementById('projectsList');
  if(!list) return;
  list.innerHTML = '';
  if(PROJECTS.length===0){ list.innerHTML = '<p class="small">No hay proyectos.</p>'; return }
  PROJECTS.forEach(p=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `<h4>${escapeHtml(p.name)} <span class="small">(${escapeHtml(p.id)})</span></h4>
      <div class="meta">Estado: ${escapeHtml(p.status)} · Mercado: ${escapeHtml(p.market||'—')} · Ciudad: ${escapeHtml(p.city||'—')}</div>
      <p class="small">${escapeHtml(p.short_description||'—')}</p>
      <div style="margin-top:10px;text-align:right"><button class="btn" onclick="openProject('${p.id}')">Abrir</button></div>`;
    list.appendChild(card);
  });
}

function openProject(id){
  const p = PROJECTS.find(x=>x.id===id);
  if(!p){ console.error('Proyecto no encontrado', id); toast('Proyecto no encontrado'); return }
  ACTIVE_PROJECT_ID = id;
  const projectsList = document.getElementById('projectsList');
  const detail = document.getElementById('projectDetail');
  if(projectsList) projectsList.classList.add('hidden');
  if(detail) detail.classList.remove('hidden');
  populateDetail(p);
}

function populateDetail(p){
  const set = (id, val)=>{ const el=document.getElementById(id); if(el) el.textContent = val||'' };
  set('detailTitle', `${p.name} (${p.id})`);
  set('f_name', p.name);
  set('f_id', p.id);
  set('f_status', p.status);
  set('f_market', p.market||'Bolivia');
  set('f_city', p.city||'Cochabamba');
  set('f_expansion', (p.expansion||[]).join(', '));
  set('f_rubro', p.rubro||'ropa deportiva premium accesible');
  set('f_enfoque', p.enfoque||'pádel, tenis, gym y athleisure');
  set('f_concept', p.concept||'estética premium, limpia y moderna');

  const safe = (id, v)=>{ const el=document.getElementById(id); if(el) el.value = v||'' };
  safe('f_progress', p.kpis?.progress||0);
  safe('f_investment', p.kpis?.investment||0);
  const setText = (id, v)=>{ const el=document.getElementById(id); if(el) el.textContent = v; };
  setText('f_products_count', (p.products||[]).length);
  setText('f_providers_count', (p.providers||[]).length);
  setText('f_tasks_pending', (p.tasks||[]).filter(t=>t.status!=='terminado').length);
  safe('f_target_date', p.kpis?.target_date||'');

  const modelEl = document.getElementById('model_text'); if(modelEl) modelEl.value = p.model?.text||'';

  safe('market_cb', p.market?.cochabamba||'');
  safe('market_sc', p.market?.santacruz||'');
  safe('market_lp', p.market?.lapaz||'');
  safe('market_as', p.market?.asuncion||'');

  safe('fin_investment', p.finance?.investment||0);
  safe('fin_cost_per_unit', p.finance?.cost_per_unit||0);
  safe('fin_avg_price', p.finance?.avg_price||0);
  safe('fin_margin', p.finance?.margin||0);
  updateFinanceSummary();

  renderProductsTable(p.products||[]);
  renderProvidersTable(p.providers||[]);
  renderTimeline(p.timeline||[]);
  renderTasks(p.tasks||[]);
  renderDocs(p.docs||[]);
}

function saveActiveProject(){
  if(!ACTIVE_PROJECT_ID) return;
  const p = PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID);
  if(!p) return;
  const getText = id=>{ const el=document.getElementById(id); return el?el.textContent.trim():'' };
  p.name = getText('f_name');
  p.id = getText('f_id');
  p.status = getText('f_status');
  p.market = getText('f_market');
  p.city = getText('f_city');
  p.expansion = getText('f_expansion').split(',').map(s=>s.trim()).filter(Boolean);
  p.rubro = getText('f_rubro');
  p.enfoque = getText('f_enfoque');
  p.concept = getText('f_concept');
  p.kpis = p.kpis||{};
  p.kpis.progress = Number((document.getElementById('f_progress')||{}).value||0);
  p.kpis.investment = Number((document.getElementById('f_investment')||{}).value||0);
  p.kpis.target_date = (document.getElementById('f_target_date')||{}).value||null;
  p.model = p.model||{}; p.model.text = (document.getElementById('model_text')||{}).value||'';
  p.market = p.market||{};
  p.market.cochabamba = (document.getElementById('market_cb')||{}).value||'';
  p.market.santacruz = (document.getElementById('market_sc')||{}).value||'';
  p.market.lapaz = (document.getElementById('market_lp')||{}).value||'';
  p.market.asuncion = (document.getElementById('market_as')||{}).value||'';
  p.finance = p.finance||{};
  p.finance.investment = Number((document.getElementById('fin_investment')||{}).value||0);
  p.finance.cost_per_unit = Number((document.getElementById('fin_cost_per_unit')||{}).value||0);
  p.finance.avg_price = Number((document.getElementById('fin_avg_price')||{}).value||0);
  p.finance.margin = Number((document.getElementById('fin_margin')||{}).value||0);
  updateFinanceSummary();
  document.getElementById('f_products_count').textContent = (p.products||[]).length;
  document.getElementById('f_providers_count').textContent = (p.providers||[]).length;
  document.getElementById('f_tasks_pending').textContent = (p.tasks||[]).filter(t=>t.status!=='terminado').length;
  ACTIVE_PROJECT_ID = p.id; renderProjects(); toast('Guardado localmente');
}

function toast(msg){ const t=document.createElement('div'); t.className='toast'; t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),2000); }

// minimal tables implementations
function renderProductsTable(products){ const tbody=document.querySelector('#productsTable tbody'); if(!tbody) return; tbody.innerHTML=''; products.forEach((pr,idx)=>{ const tr=document.createElement('tr'); tr.innerHTML = `<td>${escapeHtml(pr.name||'')}</td><td>${escapeHtml(pr.category||'')}</td><td>${escapeHtml(pr.sku||'')}</td><td>${escapeHtml(pr.color||'')}</td><td>${escapeHtml(pr.size||'')}</td><td>${escapeHtml(pr.material||'')}</td><td>${escapeHtml(pr.provider||'')}</td><td>${pr.cost||''}</td><td>${pr.price||''}</td><td>${pr.sample_approved? 'Sí':'No'}</td><td>${escapeHtml(pr.status||'')}</td><td><button class="btn" onclick="editProduct(${idx})">Editar</button> <button class="btn" onclick="removeProduct(${idx})">Eliminar</button></td>`; tbody.appendChild(tr); }); }
function addProduct(){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); if(!p) return; p.products=p.products||[]; p.products.push({name:'Nuevo producto',category:'polos',sku:'',color:'',size:'',material:'',provider:'',cost:0,price:0,margin:0,min_qty:0,sample_approved:false,status:'borrador'}); renderProductsTable(p.products); }
function editProduct(idx){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); const prod=p.products[idx]; const name=prompt('Nombre',prod.name)||prod.name; prod.name=name; renderProductsTable(p.products); }
function removeProduct(idx){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); p.products.splice(idx,1); renderProductsTable(p.products); }

function renderProvidersTable(providers){ const tbody=document.querySelector('#providersTable tbody'); if(!tbody) return; tbody.innerHTML=''; providers.forEach((pr,idx)=>{ const tr=document.createElement('tr'); tr.innerHTML = `<td>${escapeHtml(pr.company||'')}</td><td>${escapeHtml(pr.country||'')}</td><td>${escapeHtml(pr.city||'')}</td><td>${escapeHtml(pr.type||'')}</td><td>${escapeHtml(pr.contact||'')}</td><td>${escapeHtml(pr.moq||'')}</td><td>${escapeHtml(pr.lead_time||'')}</td><td>${escapeHtml(pr.prices||'')}</td><td>${escapeHtml(pr.status||'')}</td><td><button class="btn" onclick="editProvider(${idx})">Editar</button> <button class="btn" onclick="removeProvider(${idx})">Eliminar</button></td>`; tbody.appendChild(tr); }); }
function addProvider(){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); if(!p) return; p.providers=p.providers||[]; p.providers.push({company:'Nuevo proveedor',country:'Bolivia',city:'Cochabamba',type:'OEM potencial',contact:'',web:'',moq:'',lead_time:'',prices:'',quality:'',status:'pendiente',comments:''}); renderProvidersTable(p.providers); }
function editProvider(idx){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); const pr=p.providers[idx]; const name=prompt('Empresa',pr.company)||pr.company; pr.company=name; renderProvidersTable(p.providers); }
function removeProvider(idx){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); p.providers.splice(idx,1); renderProvidersTable(p.providers); }

function renderTimeline(items){ const tbody=document.querySelector('#timelineTable tbody'); if(!tbody) return; tbody.innerHTML=''; items.forEach((it,idx)=>{ const tr=document.createElement('tr'); tr.innerHTML = `<td>${escapeHtml(it.stage||'')}</td><td>${escapeHtml(it.owner||'')}</td><td>${escapeHtml(it.date||'')}</td><td>${escapeHtml(it.status||'')}</td><td>${escapeHtml(it.priority||'')}</td><td><button class="btn" onclick="removeTimeline(${idx})">Eliminar</button></td>`; tbody.appendChild(tr); }); }
function addTimeline(){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); if(!p) return; p.timeline=p.timeline||[]; p.timeline.push({stage:'Nueva etapa',owner:'',date:'',status:'pendiente',priority:'media'}); renderTimeline(p.timeline); }
function removeTimeline(i){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); p.timeline.splice(i,1); renderTimeline(p.timeline); }

function renderTasks(items){ const tbody=document.querySelector('#tasksTable tbody'); if(!tbody) return; tbody.innerHTML=''; items.forEach((t,idx)=>{ const tr=document.createElement('tr'); tr.innerHTML = `<td>${escapeHtml(t.task||'')}</td><td>${escapeHtml(t.owner||'')}</td><td>${escapeHtml(t.due||'')}</td><td>${escapeHtml(t.priority||'')}</td><td>${escapeHtml(t.status||'')}</td><td><button class="btn" onclick="toggleTask(${idx})">Toggle</button> <button class="btn" onclick="removeTask(${idx})">Eliminar</button></td>`; tbody.appendChild(tr); }); }
function addTask(){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); if(!p) return; p.tasks=p.tasks||[]; p.tasks.push({task:'Nueva tarea',owner:'',due:'',priority:'media',status:'pendiente'}); renderTasks(p.tasks); }
function toggleTask(i){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); const t=p.tasks[i]; t.status=(t.status==='terminado')?'pendiente':'terminado'; renderTasks(p.tasks); }
function removeTask(i){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); p.tasks.splice(i,1); renderTasks(p.tasks); }

function renderDocs(docs){ const list=document.getElementById('docsList'); if(!list) return; list.innerHTML=''; docs.forEach((d,idx)=>{ const li=document.createElement('li'); li.innerHTML = `${escapeHtml(d.name||'')} <button class='btn' onclick='removeDoc(${idx})'>Eliminar</button>`; list.appendChild(li); }); }
function addDocFromInput(ev){ const f=ev.target.files[0]; if(!f) return; const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); if(!p) return; p.docs=p.docs||[]; p.docs.push({name:f.name}); renderDocs(p.docs); }
function removeDoc(i){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); if(!p) return; p.docs.splice(i,1); renderDocs(p.docs); }

function updateFinanceSummary(){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); if(!p) return; const inv=p.finance?.investment||0; const cpu=p.finance?.cost_per_unit||0; const price=p.finance?.avg_price||0; const margin=price?(((price-cpu)/price)*100).toFixed(1):0; const out=document.getElementById('fin_summary'); if(out) out.textContent = `Margen bruto estimado: ${margin}%`; }

function exportJson(){ const payload={generated_at:new Date().toISOString(), owner:'Natalia', projects:PROJECTS}; const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='projects.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }

function escapeHtml(s){ if(!s) return ''; return String(s).replace(/[&<>\"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

window.addEventListener('load', ()=>{
  loadProjects();
  const backBtn=document.getElementById('backBtn'); if(backBtn) backBtn.addEventListener('click', backToList);
  const saveBtn=document.getElementById('saveProjectBtn'); if(saveBtn) saveBtn.addEventListener('click', saveActiveProject);
  const exportBtn=document.getElementById('exportJsonBtn'); if(exportBtn) exportBtn.addEventListener('click', exportJson);
  const newBtn=document.getElementById('newProjectBtn'); if(newBtn) newBtn.addEventListener('click', ()=>{ const m=document.getElementById('modal'); if(m) m.classList.remove('hidden'); });
  const cancel=document.getElementById('cancel'); if(cancel) cancel.addEventListener('click', ()=>{ const m=document.getElementById('modal'); if(m) m.classList.add('hidden'); });
  const create=document.getElementById('createProject'); if(create) create.addEventListener('click', ()=>{ const id=document.getElementById('p_id').value.trim(); const name=document.getElementById('p_name').value.trim(); if(!id||!name){ toast('Id y Nombre son obligatorios'); return } PROJECTS.unshift({id,name,status:document.getElementById('p_status').value,market:document.getElementById('p_market').value,city:document.getElementById('p_city').value,short_description:document.getElementById('p_desc').value,kpis:{progress:0,investment:0,products:0,providers:0,tasks:0},products:[],providers:[],model:{text:''},market:{},finance:{},timeline:[],tasks:[],docs:[]}); const m=document.getElementById('modal'); if(m) m.classList.add('hidden'); renderProjects(); });
  document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',(ev)=>{ document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active')); ev.target.classList.add('active'); document.querySelectorAll('.tab-pane').forEach(p=>p.classList.add('hidden')); const id='tab-'+ev.target.dataset.tab; const pane=document.getElementById(id); if(pane) pane.classList.remove('hidden'); }));
  const addProductBtn=document.getElementById('addProductBtn'); if(addProductBtn) addProductBtn.addEventListener('click', addProduct);
  const addProviderBtn=document.getElementById('addProviderBtn'); if(addProviderBtn) addProviderBtn.addEventListener('click', addProvider);
  const addTimelineBtn=document.getElementById('addTimelineBtn'); if(addTimelineBtn) addTimelineBtn.addEventListener('click', addTimeline);
  const addTaskBtn=document.getElementById('addTaskBtn'); if(addTaskBtn) addTaskBtn.addEventListener('click', addTask);
  const docInput=document.getElementById('docFileInput'); if(docInput) docInput.addEventListener('change', addDocFromInput);
  const search=document.getElementById('searchInput'); if(search) search.addEventListener('input', ()=>{ const q=search.value.toLowerCase(); const list=PROJECTS.filter(p=>p.name.toLowerCase().includes(q)||(p.short_description||'').toLowerCase().includes(q)||(p.id||'').toLowerCase().includes(q)); renderFiltered(list); });
  const filterMarket=document.getElementById('filterMarket'); if(filterMarket) filterMarket.addEventListener('change', ()=>{ const m=filterMarket.value; if(!m) renderProjects(); else renderFiltered(PROJECTS.filter(p=>p.market===m)); });
});

function renderFiltered(list){ const root=document.getElementById('projectsList'); if(!root) return; root.innerHTML=''; if(list.length===0){ root.innerHTML='<p class="small">Sin resultados</p>'; return } list.forEach(p=>{ const card=document.createElement('div'); card.className='card'; card.innerHTML=`<h4>${escapeHtml(p.name)} <span class="small">(${escapeHtml(p.id)})</span></h4><div class="meta">Estado: ${escapeHtml(p.status)} · Mercado: ${escapeHtml(p.market||'—')} · Ciudad: ${escapeHtml(p.city||'—')}</div><p class="small">${escapeHtml(p.short_description||'—')}</p><div style="margin-top:10px;text-align:right"><button class="btn" onclick="openProject('${p.id}')">Abrir</button></div>`; root.appendChild(card); }); }
