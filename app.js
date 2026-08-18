<<<<<<< HEAD
// Cleaned app.js - compact, BRAVO detail view, no alert(), validated
=======
// app.js - dashboard with detailed project view for BRAVO
>>>>>>> origin/master
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
<<<<<<< HEAD
    PROJECTS = [
      { id:'BRAVO-001', name:'BRAVO', status:'PRE-PILOTO', market:'Bolivia', city:'Cochabamba', short_description:'Prueba piloto de prendas deportivas', kpis:{progress:10,investment:0,products:0,providers:0,tasks:0,target_date:''}, model:{text:'POSICIONAMIENTO: PADEL & TENNIS PERFORMANCE + ATHLEISURE PREMIUM ACCESIBLE. Público 20-45. Canales: Instagram, TikTok, WhatsApp, showroom, clubes.'}, products:[], providers:[], market:{cochabamba:'',santacruz:'',lapaz:'',asuncion:''}, finance:{investment:0,cost_per_unit:0,avg_price:0,margin:0}, timeline:[], tasks:[], docs:[] }
=======
    // fallback embedded sample
    PROJECTS = [
      { id:'BRAVO-001', name:'BRAVO', status:'PRE-PILOTO', market:'Bolivia', city:'Cochabamba', expansion:['Santa Cruz','La Paz','Asunción'], rubro:'ropa deportiva premium accesible', enfoque:'pádel, tenis, gym, athleisure', concept:'estética premium, limpia y moderna', kpis:{progress:10,investment:0,products:0,providers:0,tasks:0,target_date:null}, model:{text:'POSICIONAMIENTO: PADEL & TENNIS PERFORMANCE + ATHLEISURE PREMIUM ACCESIBLE. Público 20–45. Canales: Instagram, TikTok, WhatsApp, showroom, clubes.'}, products:[], providers:[], market:{cochabamba:'',santacruz:'',lapaz:'',asuncion:''}, finance:{investment:0,cost_per_unit:0,avg_price:0,margin:0}, timeline:[], tasks:[], docs:[] }
>>>>>>> origin/master
    ];
  }
  renderProjects();
}

function renderProjects(){
  const list = document.getElementById('projectsList');
  list.innerHTML = '';
  if(!list) return;
  if(PROJECTS.length===0){ list.innerHTML = '<p class="small">No hay proyectos.</p>'; return }
  PROJECTS.forEach(p=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `<h4>${escapeHtml(p.name)} <span class="small">(${escapeHtml(p.id)})</span></h4>
      <div class="meta">Estado: ${escapeHtml(p.status)} · Mercado: ${escapeHtml(p.market||'—')} · Ciudad: ${escapeHtml(p.city||'—')}</div>
      <p class="small">${escapeHtml(p.short_description||'—')}</p>
      <div style="margin-top:10px;text-align:right"><button class="btn" data-id="${p.id}" onclick="openProject('${p.id}')">Abrir</button></div>`;
    list.appendChild(card);
  })
}

// New behavior: openProject renders full detail view instead of alert
function openProject(id){
  const p = PROJECTS.find(x=>x.id===id);
<<<<<<< HEAD
  if(!p){ console.error('Proyecto no encontrado', id); toast('Proyecto no encontrado'); return }
=======
  if(!p){ alert('Proyecto no encontrado'); return }
>>>>>>> origin/master
  ACTIVE_PROJECT_ID = id;
  document.getElementById('projectsList').classList.add('hidden');
  document.getElementById('projectDetail').classList.remove('hidden');
  populateDetail(p);
}

function populateDetail(p){
  document.getElementById('detailTitle').textContent = `${p.name} (${p.id})`;
<<<<<<< HEAD
  setText('f_name', p.name);
  setText('f_id', p.id);
  setText('f_status', p.status);
  setText('f_market', p.market || 'Bolivia');
  setText('f_city', p.city || 'Cochabamba');
  setText('f_expansion', (p.expansion||[]).join(', '));
  setText('f_rubro', p.rubro || 'ropa deportiva premium accesible');
  setText('f_enfoque', p.enfoque || 'pádel, tenis, gym y athleisure');
  setText('f_concept', p.concept || 'estética premium, limpia y moderna');

=======
  // basic fields
  setEditable('f_name', p.name);
  setEditable('f_id', p.id);
  setEditable('f_status', p.status);
  setEditable('f_market', p.market || 'Bolivia');
  setEditable('f_city', p.city || 'Cochabamba');
  setEditable('f_expansion', (p.expansion||[]).join(', '));
  setEditable('f_rubro', p.rubro || 'ropa deportiva premium accesible');
  setEditable('f_enfoque', p.enfoque || 'pádel, tenis, gym y athleisure');
  setEditable('f_concept', p.concept || 'estética premium, limpia y moderna');

  // KPIs
>>>>>>> origin/master
  document.getElementById('f_progress').value = p.kpis?.progress || 0;
  document.getElementById('f_investment').value = p.kpis?.investment || 0;
  document.getElementById('f_products_count').textContent = (p.products||[]).length;
  document.getElementById('f_providers_count').textContent = (p.providers||[]).length;
  document.getElementById('f_tasks_pending').textContent = (p.tasks||[]).filter(t=>t.status!=='terminado').length;
  document.getElementById('f_target_date').value = p.kpis?.target_date || '';

<<<<<<< HEAD
  document.getElementById('model_text').value = p.model?.text || '';
  document.getElementById('market_cb').value = p.market?.cochabamba || '';
  document.getElementById('market_sc').value = p.market?.santacruz || '';
  document.getElementById('market_lp').value = p.market?.lapaz || '';
  document.getElementById('market_as').value = p.market?.asuncion || '';

=======
  // Model text
  document.getElementById('model_text').value = p.model?.text || defaultModelText();

  // Market
  document.getElementById('market_cb').value = p.market?.cochabamba || '';
  document.getElementById('market_sc').value = p.market?.santacruz || '';
  document.getElementById('market_lp').value = p.market?.lapaz || '';
  document.getElementById('market_as').value = p.market?.asuncion || '';

  // Finance
>>>>>>> origin/master
  document.getElementById('fin_investment').value = p.finance?.investment || 0;
  document.getElementById('fin_cost_per_unit').value = p.finance?.cost_per_unit || 0;
  document.getElementById('fin_avg_price').value = p.finance?.avg_price || 0;
  document.getElementById('fin_margin').value = p.finance?.margin || 0;
  updateFinanceSummary();

<<<<<<< HEAD
=======
  // products table
>>>>>>> origin/master
  renderProductsTable(p.products||[]);
  renderProvidersTable(p.providers||[]);
  renderTimeline(p.timeline||[]);
  renderTasks(p.tasks||[]);
  renderDocs(p.docs||[]);
}

<<<<<<< HEAD
function setText(id, v){ const el=document.getElementById(id); if(el) el.textContent = v || ''; }
function backToList(){ ACTIVE_PROJECT_ID = null; document.getElementById('projectDetail').classList.add('hidden'); document.getElementById('projectsList').classList.remove('hidden'); }

=======
function defaultModelText(){
  return 'POSICIONAMIENTO: PADEL & TENNIS PERFORMANCE + ATHLEISURE PREMIUM ACCESIBLE. Público 20–45. Canales: Instagram, TikTok, WhatsApp, showroom, clubes.';
}

function setEditable(id, value){
  const el = document.getElementById(id);
  if(el){ el.textContent = value || ''; }
}

function backToList(){
  ACTIVE_PROJECT_ID = null;
  document.getElementById('projectDetail').classList.add('hidden');
  document.getElementById('projectsList').classList.remove('hidden');
}

// Save project from detail view back to PROJECTS
>>>>>>> origin/master
function saveActiveProject(){
  if(!ACTIVE_PROJECT_ID) return;
  const p = PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID);
  if(!p) return;
<<<<<<< HEAD
=======
  // basic
>>>>>>> origin/master
  p.name = document.getElementById('f_name').textContent.trim();
  p.id = document.getElementById('f_id').textContent.trim();
  p.status = document.getElementById('f_status').textContent.trim();
  p.market = document.getElementById('f_market').textContent.trim();
  p.city = document.getElementById('f_city').textContent.trim();
  p.expansion = document.getElementById('f_expansion').textContent.split(',').map(s=>s.trim()).filter(Boolean);
  p.rubro = document.getElementById('f_rubro').textContent.trim();
  p.enfoque = document.getElementById('f_enfoque').textContent.trim();
  p.concept = document.getElementById('f_concept').textContent.trim();
<<<<<<< HEAD
=======
  // kpis
>>>>>>> origin/master
  p.kpis = p.kpis || {};
  p.kpis.progress = Number(document.getElementById('f_progress').value || 0);
  p.kpis.investment = Number(document.getElementById('f_investment').value || 0);
  p.kpis.target_date = document.getElementById('f_target_date').value || null;
<<<<<<< HEAD
  p.model = p.model || {};
  p.model.text = document.getElementById('model_text').value;
=======
  // model
  p.model = p.model || {};
  p.model.text = document.getElementById('model_text').value;
  // market
>>>>>>> origin/master
  p.market = p.market || {};
  p.market.cochabamba = document.getElementById('market_cb').value;
  p.market.santacruz = document.getElementById('market_sc').value;
  p.market.lapaz = document.getElementById('market_lp').value;
  p.market.asuncion = document.getElementById('market_as').value;
<<<<<<< HEAD
=======
  // finance
>>>>>>> origin/master
  p.finance = p.finance || {};
  p.finance.investment = Number(document.getElementById('fin_investment').value || 0);
  p.finance.cost_per_unit = Number(document.getElementById('fin_cost_per_unit').value || 0);
  p.finance.avg_price = Number(document.getElementById('fin_avg_price').value || 0);
  p.finance.margin = Number(document.getElementById('fin_margin').value || 0);
  updateFinanceSummary();
<<<<<<< HEAD
  document.getElementById('f_products_count').textContent = (p.products||[]).length;
  document.getElementById('f_providers_count').textContent = (p.providers||[]).length;
  document.getElementById('f_tasks_pending').textContent = (p.tasks||[]).filter(t=>t.status!=='terminado').length;
  ACTIVE_PROJECT_ID = p.id;
  renderProjects();
  toast('Guardado localmente');
}

function toast(msg){ const t=document.createElement('div'); t.className='toast'; t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),2000); }

// Tables: products/providers/timeline/tasks/docs (minimal implementations)
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
=======

  // Persist counts
  document.getElementById('f_products_count').textContent = (p.products||[]).length;
  document.getElementById('f_providers_count').textContent = (p.providers||[]).length;
  document.getElementById('f_tasks_pending').textContent = (p.tasks||[]).filter(t=>t.status!=='terminado').length;

  // Reflect any id change in PROJECTS key
  // if id changed, update ACTIVE_PROJECT_ID and PROJECTS array
  ACTIVE_PROJECT_ID = p.id;
  renderProjects();
  alertSave('Guardado localmente');
}

function alertSave(msg){
  // small non-blocking notice: create temporary toast
  const t = document.createElement('div'); t.className='toast'; t.textContent = msg; document.body.appendChild(t);
  setTimeout(()=>t.remove(),2000);
}

// Products management
function renderProductsTable(products){
  const tbody = document.querySelector('#productsTable tbody'); tbody.innerHTML='';
  products.forEach((pr, idx)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${escapeHtml(pr.name||'')}</td><td>${escapeHtml(pr.category||'')}</td><td>${escapeHtml(pr.sku||'')}</td><td>${escapeHtml(pr.color||'')}</td><td>${escapeHtml(pr.size||'')}</td><td>${escapeHtml(pr.material||'')}</td><td>${escapeHtml(pr.provider||'')}</td><td>${pr.cost||''}</td><td>${pr.price||''}</td><td>${pr.sample_approved? 'Sí':'No'}</td><td>${escapeHtml(pr.status||'')}</td><td><button class="btn" onclick="editProduct(${idx})">Editar</button> <button class="btn" onclick="removeProduct(${idx})">Eliminar</button></td>`;
    tbody.appendChild(tr);
  })
}

function addProduct(){
  const p = PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID);
  if(!p) return;
  p.products = p.products||[];
  p.products.push({name:'Nuevo producto',category:'polos',sku:'',color:'',size:'',material:'',provider:'',cost:0,price:0,margin:0,min_qty:0,sample_approved:false,status:'borrador'});
  renderProductsTable(p.products);
}

function editProduct(idx){
  const p = PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID);
  const prod = p.products[idx];
  const name = prompt('Nombre', prod.name) || prod.name;
  prod.name = name;
  // quick inline edits for demo
  renderProductsTable(p.products);
}
function removeProduct(idx){
  const p = PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID);
  p.products.splice(idx,1);
  renderProductsTable(p.products);
}

// Providers management
function renderProvidersTable(providers){
  const tbody = document.querySelector('#providersTable tbody'); tbody.innerHTML='';
  providers.forEach((pr, idx)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${escapeHtml(pr.company||'')}</td><td>${escapeHtml(pr.country||'')}</td><td>${escapeHtml(pr.city||'')}</td><td>${escapeHtml(pr.type||'')}</td><td>${escapeHtml(pr.contact||'')}</td><td>${escapeHtml(pr.moq||'')}</td><td>${escapeHtml(pr.lead_time||'')}</td><td>${escapeHtml(pr.prices||'')}</td><td>${escapeHtml(pr.status||'')}</td><td><button class="btn" onclick="editProvider(${idx})">Editar</button> <button class="btn" onclick="removeProvider(${idx})">Eliminar</button></td>`;
    tbody.appendChild(tr);
  })
}
function addProvider(){
  const p = PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID);
  p.providers = p.providers||[];
  p.providers.push({company:'Nuevo proveedor',country:'Bolivia',city:'Cochabamba',type:'OEM potencial',contact:'',web:'',moq:'',lead_time:'',prices:'',quality:'',status:'pendiente',comments:''});
  renderProvidersTable(p.providers);
}
function editProvider(idx){
  const p = PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID);
  const pr = p.providers[idx];
  const name = prompt('Empresa', pr.company) || pr.company; pr.company = name;
  renderProvidersTable(p.providers);
}
function removeProvider(idx){
  const p = PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID);
  p.providers.splice(idx,1); renderProvidersTable(p.providers);
}

// Timeline
function renderTimeline(items){
  const tbody = document.querySelector('#timelineTable tbody'); tbody.innerHTML='';
  items.forEach((it, idx)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${escapeHtml(it.stage||'')}</td><td>${escapeHtml(it.owner||'')}</td><td>${escapeHtml(it.date||'')}</td><td>${escapeHtml(it.status||'')}</td><td>${escapeHtml(it.priority||'')}</td><td><button class="btn" onclick="removeTimeline(${idx})">Eliminar</button></td>`;
    tbody.appendChild(tr);
  })
}
function addTimeline(){
  const p = PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); p.timeline = p.timeline||[]; p.timeline.push({stage:'Nueva etapa',owner:'',date:'',status:'pendiente',priority:'media'}); renderTimeline(p.timeline);
}
function removeTimeline(i){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); p.timeline.splice(i,1); renderTimeline(p.timeline); }

// Tasks
function renderTasks(items){
  const tbody = document.querySelector('#tasksTable tbody'); tbody.innerHTML='';
  items.forEach((t,idx)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${escapeHtml(t.task||'')}</td><td>${escapeHtml(t.owner||'')}</td><td>${escapeHtml(t.due||'')}</td><td>${escapeHtml(t.priority||'')}</td><td>${escapeHtml(t.status||'')}</td><td><button class="btn" onclick="toggleTask(${idx})">Toggle</button> <button class="btn" onclick="removeTask(${idx})">Eliminar</button></td>`;
    tbody.appendChild(tr);
  })
}
function addTask(){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); p.tasks=p.tasks||[]; p.tasks.push({task:'Nueva tarea',owner:'',due:'',priority:'media',status:'pendiente'}); renderTasks(p.tasks);} 
function toggleTask(i){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); const t=p.tasks[i]; t.status = (t.status==='terminado')? 'pendiente' : 'terminado'; renderTasks(p.tasks);} 
function removeTask(i){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); p.tasks.splice(i,1); renderTasks(p.tasks);} 

// Docs
function renderDocs(docs){ const list=document.getElementById('docsList'); list.innerHTML=''; docs.forEach((d,idx)=>{ const li=document.createElement('li'); li.innerHTML=`${escapeHtml(d.name||'')} <button class='btn' onclick='removeDoc(${idx})'>Eliminar</button>`; list.appendChild(li); }); }
function addDocFromInput(ev){ const f=ev.target.files[0]; if(!f) return; const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); p.docs=p.docs||[]; p.docs.push({name:f.name}); renderDocs(p.docs);} function removeDoc(i){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); p.docs.splice(i,1); renderDocs(p.docs);} 

// Finance summary
function updateFinanceSummary(){ const p=PROJECTS.find(x=>x.id===ACTIVE_PROJECT_ID); if(!p) return; const inv = p.finance?.investment||0; const cpu = p.finance?.cost_per_unit||0; const price = p.finance?.avg_price||0; const margin = price? ((price-cpu)/price*100).toFixed(1):0; document.getElementById('fin_summary').textContent = `Margen bruto estimado: ${margin}%` }

// Export
function exportJson(){ const payload = { generated_at: new Date().toISOString(), owner: 'Natalia', projects: PROJECTS }; const blob = new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}); const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='projects.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }

// Utilities
function escapeHtml(s){ if(!s) return ''; return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

// Event wiring
window.addEventListener('load', ()=>{
  loadProjects();
  document.getElementById('backBtn').addEventListener('click', backToList);
  document.getElementById('saveProjectBtn').addEventListener('click', saveActiveProject);
  document.getElementById('exportJsonBtn').addEventListener('click', exportJson);
  document.getElementById('newProjectBtn').addEventListener('click', ()=>{ document.getElementById('modal').classList.remove('hidden'); });
  document.getElementById('cancel').addEventListener('click', ()=>{ document.getElementById('modal').classList.add('hidden'); });
  document.getElementById('createProject').addEventListener('click', ()=>{
    const id=document.getElementById('p_id').value.trim(); const name=document.getElementById('p_name').value.trim(); if(!id||!name){ alert('Id y Nombre son obligatorios'); return };
    PROJECTS.unshift({id, name, status:document.getElementById('p_status').value, market:document.getElementById('p_market').value, city:document.getElementById('p_city').value, short_description:document.getElementById('p_desc').value, kpis:{progress:0,investment:0,products:0,providers:0,tasks:0}, products:[], providers:[], model:{text:defaultModelText()}, market:{}, finance:{}, timeline:[], tasks:[], docs:[]});
    document.getElementById('modal').classList.add('hidden'); renderProjects();
  });

  // tabs
  document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click', (ev)=>{ document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active')); ev.target.classList.add('active'); document.querySelectorAll('.tab-pane').forEach(p=>p.classList.add('hidden')); document.getElementById('tab-'+ev.target.dataset.tab).classList.remove('hidden'); }));

  // product/provider add
  document.getElementById('addProductBtn').addEventListener('click', addProduct);
  document.getElementById('addProviderBtn').addEventListener('click', addProvider);
  document.getElementById('addTimelineBtn').addEventListener('click', addTimeline);
  document.getElementById('addTaskBtn').addEventListener('click', addTask);
  document.getElementById('docFileInput').addEventListener('change', addDocFromInput);

  // search/filter
  document.getElementById('searchInput').addEventListener('input', ()=>{ const q=document.getElementById('searchInput').value.toLowerCase(); const list = PROJECTS.filter(p=>p.name.toLowerCase().includes(q)|| (p.short_description||'').toLowerCase().includes(q)|| (p.id||'').toLowerCase().includes(q)); renderFiltered(list); });
  document.getElementById('filterMarket').addEventListener('change', ()=>{ const m=document.getElementById('filterMarket').value; if(!m) renderProjects(); else renderFiltered(PROJECTS.filter(p=>p.market===m)); });
});

function renderFiltered(list){ const root=document.getElementById('projectsList'); root.innerHTML=''; if(list.length===0){ root.innerHTML='<p class="small">Sin resultados</p>'; return } list.forEach(p=>{ const card=document.createElement('div'); card.className='card'; card.innerHTML=`<h4>${escapeHtml(p.name)} <span class="small">(${escapeHtml(p.id)})</span></h4><div class="meta">Estado: ${escapeHtml(p.status)} · Mercado: ${escapeHtml(p.market||'—')} · Ciudad: ${escapeHtml(p.city||'—')}</div><p class="small">${escapeHtml(p.short_description||'—')}</p><div style="margin-top:10px;text-align:right"><button class="btn" onclick="openProject('${p.id}')">Abrir</button></div>`; root.appendChild(card); }); }
>>>>>>> origin/master
