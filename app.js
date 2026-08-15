// app.js - simple dashboard interactivity + in-memory project store (Export JSON)
const DATA_PATH = './data/projects.json';
let PROJECTS = [];

async function loadProjects(){
  try{
    const res = await fetch(DATA_PATH);
    if(!res.ok) throw new Error('fetch failed');
    const json = await res.json();
    PROJECTS = json.projects || [];
  }catch(e){
    // fallback: embedded sample if fetch blocked (file:// issues)
    PROJECTS = [
      { id:'BRAVO-001', name:'BRAVO', status:'PRE-PILOTO', market:'Bolivia', city:'Cochabamba', short_description:'Prueba piloto de prendas deportivas', kpis:{}, evidence_gap:[], top_providers:[]} 
    ];
  }
  renderProjects();
}

function renderProjects(){
  const list = document.getElementById('projectsList');
  list.innerHTML = '';
  if(PROJECTS.length===0){ list.innerHTML = '<p class="small">No hay proyectos. Usa "Nuevo proyecto" para crear uno.</p>'; return }
  PROJECTS.forEach(p=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `<h4>${escapeHtml(p.name)} <span class="small">(${escapeHtml(p.id)})</span></h4>
      <div class="meta">Estado: ${escapeHtml(p.status)} · Mercado: ${escapeHtml(p.market||'—')} · Ciudad: ${escapeHtml(p.city||'—')}</div>
      <p class="small">${escapeHtml(p.short_description||'—')}</p>
      <div style="margin-top:10px;text-align:right"><button class="btn" onclick="openProject('${p.id}')">Abrir</button></div>`;
    list.appendChild(card);
  })
}

function openProject(id){
  const p = PROJECTS.find(x=>x.id===id);
  if(!p){ alert('Proyecto no encontrado'); return }
  alert(`Abrir proyecto:\n${p.name} (${p.id})\nEstado: ${p.status}\nMercado: ${p.market} - ${p.city}`)
}

// Utilities
function escapeHtml(s){ if(!s) return ''; return String(s).replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"})[c]) }

// Modal actions
const modal = document.getElementById('modal');
const newBtn = document.getElementById('newProjectBtn');
const cancelBtn = document.getElementById('cancel');
const createBtn = document.getElementById('createProject');

newBtn.addEventListener('click', ()=>{ modal.classList.remove('hidden'); });
cancelBtn.addEventListener('click', ()=>{ modal.classList.add('hidden'); });

createBtn.addEventListener('click', ()=>{
  const id = document.getElementById('p_id').value.trim();
  const name = document.getElementById('p_name').value.trim();
  if(!id || !name){ alert('Id y Nombre son obligatorios'); return }
  const status = document.getElementById('p_status').value;
  const market = document.getElementById('p_market').value.trim();
  const city = document.getElementById('p_city').value.trim();
  const desc = document.getElementById('p_desc').value.trim();
  const obj = { id, name, status, market, city, short_description: desc, kpis:{}, evidence_gap:[], top_providers:[] };
  PROJECTS.unshift(obj);
  renderProjects();
  modal.classList.add('hidden');
  // clear inputs
  ['p_id','p_name','p_market','p_city','p_desc'].forEach(i=>document.getElementById(i).value='');
});

// Export JSON
const exportBtn = document.getElementById('exportJsonBtn');
exportBtn.addEventListener('click', ()=>{
  const payload = { generated_at: new Date().toISOString(), owner: 'Natalia', projects: PROJECTS };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'projects.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});

// Search/filter
const searchInput = document.getElementById('searchInput');
const filterMarket = document.getElementById('filterMarket');

searchInput.addEventListener('input', ()=>{
  const q = searchInput.value.toLowerCase();
  const filtered = PROJECTS.filter(p=>p.name.toLowerCase().includes(q)|| (p.short_description||'').toLowerCase().includes(q)|| (p.id||'').toLowerCase().includes(q));
  renderFiltered(filtered);
});
filterMarket.addEventListener('change', ()=>{
  const m = filterMarket.value;
  if(!m) renderProjects(); else renderFiltered(PROJECTS.filter(p=>p.market===m));
});

function renderFiltered(list){
  const root = document.getElementById('projectsList'); root.innerHTML='';
  if(list.length===0){ root.innerHTML = '<p class="small">Sin resultados</p>'; return }
  list.forEach(p=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `<h4>${escapeHtml(p.name)} <span class="small">(${escapeHtml(p.id)})</span></h4>
      <div class="meta">Estado: ${escapeHtml(p.status)} · Mercado: ${escapeHtml(p.market||'—')} · Ciudad: ${escapeHtml(p.city||'—')}</div>
      <p class="small">${escapeHtml(p.short_description||'—')}</p>
      <div style="margin-top:10px;text-align:right"><button class="btn" onclick="openProject('${p.id}')">Abrir</button></div>`;
    root.appendChild(card);
  })
}

// Init
loadProjects();
