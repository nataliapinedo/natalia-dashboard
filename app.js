// Natalia Project Engine - graphical enhancements + charts
const EMBEDDED_PROJECTS = {
  generated_at: "2026-08-14T00:00:00Z",
  owner: "Natalia",
  projects: [
    {
      id: "BRAVO-001",
      name: "BRAVO",
      status: "PRE-PILOTO",
      score: 6.8,
      investment: "Bs 27,070",
      sales12: "Bs 120,000",
      profit12: "Bs 35,000",
      sector: "Apparel / Sportswear",
      tags: ["skort","polo","short","athleisure"],
      created_at: "2026-08-14"
    },
    {
      id: "CARBON-5000",
      name: "Credito Carbono - 5000 ha",
      status: "IDEA",
      score: null,
      investment: null,
      sales12: null,
      profit12: null,
      sector: "Agro / Carbon credits",
      tags: ["carbon","land","forestry"],
      created_at: "2026-08-14"
    }
  ]
};

let sampleProjects = [];

async function loadProjectsFromMatrix(){
  sampleProjects = (EMBEDDED_PROJECTS && EMBEDDED_PROJECTS.projects) ? EMBEDDED_PROJECTS.projects.slice() : [];
  return Promise.resolve();
}

function renderProjects(){
  const el = document.getElementById('projectsList'); el.innerHTML='';
  sampleProjects.forEach(p=>{
    const d = document.createElement('div'); d.className='project';
    const id = p.id || ('P-'+Math.floor(Math.random()*9000+1000));
    d.innerHTML = `<div><strong>${p.name}</strong><div style='font-size:12px;color:var(--muted)'>${id} 	 ${p.sector||'N/A'}</div></div><div><button class='btn' onclick="loadProject('${id}')">Abrir</button></div>`;
    el.appendChild(d);
  });
}

function findProjectById(id){
  return sampleProjects.find(x=>x.id===id || x.id===id);
}

function loadProject(id){
  const p = findProjectById(id) || sampleProjects[0];
  if(!p) return;
  document.getElementById('scoreValue').innerText = (p.score!==null && p.score!==undefined) ? (Number(p.score).toFixed(1)+ ' / 10') : '\u2014';
  document.getElementById('scoreLabel').innerText = p.status || 'PRELIMINAR';
  document.getElementById('invInit').innerText = p.investment || 'PENDIENTE';
  document.getElementById('sales12').innerText = p.sales12 || 'PENDIENTE';
  document.getElementById('profit12').innerText = p.profit12 || 'PENDIENTE';
  document.getElementById('decisionTag').innerText = p.status==='PRE-PILOTO'? 'PRELIMINAR - PENDIENTE' : (p.status||'PRELIMINAR');
}

function populateMarketCards(){
  document.getElementById('tamLatam').innerText = '$187B';
  document.getElementById('tamBolivia').innerText = '$2.3B';
  // create donut chart
  const donutCtx = document.getElementById('donutMarket')?.getContext('2d');
  if(donutCtx){
    new Chart(donutCtx, {
      type: 'doughnut',
      data: { labels: ['LATAM','Bolivia','Resto'], datasets: [{ data: [187, 2.3, 20], backgroundColor: ['#06b6d4','#7c3aed','#60a5fa'] }] },
      options: { plugins:{legend:{position:'bottom'}},responsive:true }
    });
  }
}

function runSim(){
  const price = Number(document.getElementById('price').value)||0;
  const cost = Number(document.getElementById('cost').value)||0;
  const units = Number(document.getElementById('units').value)||0;
  const months = 12;
  const revenues = [];
  let u = units;
  for(let m=0;m<months;m++){
    revenues.push({month: m+1, revenue: u*price, units: u});
    u = Math.round(u * (1 + 0.08));
  }
  const totalRevenue = revenues.reduce((s,r)=>s+r.revenue,0);
  const totalCost = revenues.reduce((s,r)=>s+(r.units*cost),0);
  const profit = totalRevenue - totalCost;
  document.getElementById('simOutput').innerHTML = `<div><strong>Ingresos 12m:</strong> ${totalRevenue.toLocaleString()} <br/><strong>COGS 12m:</strong> ${totalCost.toLocaleString()} <br/><strong>Utilidad 12m:</strong> ${profit.toLocaleString()}</div>`;
  renderLine(revenues);
}

let revenueChart = null;
function renderLine(data){
  const ctx = document.getElementById('lineRevenue').getContext('2d');
  const labels = data.map(d=>'M'+d.month);
  const vals = data.map(d=>d.revenue);
  if(revenueChart) revenueChart.destroy();
  revenueChart = new Chart(ctx,{
    type:'line',
    data:{labels, datasets:[{label:'Ingresos',data:vals,backgroundColor:'rgba(6,182,212,0.15)',borderColor:'var(--accent)',tension:0.35,fill:true}]},
    options:{responsive:true,plugins:{legend:{display:false}}}
  });
}

function addEvidence(){
  const ul = document.getElementById('evidenceList'); ul.innerHTML='';
  const items = ['3 cotizaciones proveedores \u2014 NO_VERIFICADO','10 observaciones de precio locales \u2014 NO_VERIFICADO','3 clubes objetivo \u2014 PENDIENTE'];
  items.forEach(i=>{ const li = document.createElement('li'); li.innerText = i; ul.appendChild(li); });
}

function renderProviders(){
  const container = document.getElementById('providersCards'); container.innerHTML='';
  const rows = [
    {name:'Taller Deportivo LA',country:'Bolivia',fit:'ALTO'},
    {name:'Maquila Sport S.A.',country:'Peru',fit:'MEDIO'}
  ];
  rows.forEach(r=>{
    const card = document.createElement('div'); card.className='provider-card';
    card.innerHTML = `<div class='provider-logo'>LOGO</div><div><strong>${r.name}</strong><div style='font-size:12px;color:var(--muted)'>${r.country} 	 	 Fit: ${r.fit}</div></div>`;
    container.appendChild(card);
  });
}

function exportJSON(){
  const payload = {projects:sampleProjects, generated_at: new Date().toISOString()};
  const blob = new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='projects_export.json'; document.body.appendChild(a); a.click(); a.remove();
}

function newProject(){
  const name = prompt('Nombre proyecto (ej: PROYECTO_03_NOMBRE)');
  if(!name) return;
  const id = 'PROJ-'+Math.floor(Math.random()*9000+1000);
  const newP = {id,name,score:5.0,status:'PRELIMINAR',investment:'PENDIENTE',sales12:'PENDIENTE',profit12:'PENDIENTE',sector:'Sin definir',tags:[],created_at:new Date().toISOString()};
  sampleProjects.push(newP);
  renderProjects();
}

window.addEventListener('DOMContentLoaded',async()=>{
  await loadProjectsFromMatrix();
  renderProjects();
  populateMarketCards();
  addEvidence();
  renderProviders();
  document.getElementById('runBtn').addEventListener('click',runSim);
  document.getElementById('exportBtn').addEventListener('click',exportJSON);
  document.getElementById('newProjectBtn').addEventListener('click',newProject);
});
