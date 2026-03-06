// ── Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Lucide icons
lucide.createIcons();

// ── Copy install command
function handleCopyBtn(btn) {
  navigator.clipboard.writeText('pip install p4n4').then(() => {
    const original = btn.textContent;
    btn.textContent = '✓ copied!';
    btn.style.background = 'var(--accent2)';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
    }, 2000);
  });
}

document.getElementById('copy-btn').addEventListener('click', (e) => handleCopyBtn(e.currentTarget));
document.getElementById('copy-btn-mobile').addEventListener('click', (e) => handleCopyBtn(e.currentTarget));

// ── Mobile nav toggle
const hamburger = document.getElementById('nav-hamburger');
const navMobile = document.getElementById('nav-mobile');

function closeMobileNav() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  navMobile.classList.remove('open');
  navMobile.setAttribute('aria-hidden', 'true');
}

hamburger.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  navMobile.setAttribute('aria-hidden', String(!isOpen));
});

// Close on nav link click
navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

// Close on outside click
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMobile.contains(e.target)) {
    closeMobileNav();
  }
});

// ── CLI preview data
const previews = {
  init: {
    label: 'p4n4 init — interactive wizard',
    body: `<span style="color:var(--muted)">$ p4n4 init</span>
<span style="color:var(--muted)">──────────────────────────────────────</span>
<span style="color:var(--amber)">? Project name: </span><span style="color:#fff">my-factory-stack</span>
<span style="color:var(--amber)">? Site ID: </span><span style="color:#fff">factory-floor-1</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--muted)">─── Stacks ──────────────────────────</span>
<span style="color:var(--amber)">? IoT stack?   </span><span style="color:var(--accent)">Y</span>
<span style="color:var(--amber)">? GenAI stack? </span><span style="color:var(--accent)">y</span>
<span style="color:var(--amber)">? Edge stack?  </span><span style="color:var(--accent)">y</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--muted)">─── Secrets ─────────────────────────</span>
<span style="color:var(--accent)">✓ MQTT password generated</span>
<span style="color:var(--accent)">✓ InfluxDB token generated</span>
<span style="color:var(--accent)">✓ n8n encryption key generated</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--accent)">✓ Scaffolded at ./my-factory-stack</span>`
  },
  template: {
    label: 'p4n4 template pull acme/factory-baseline',
    body: `<span style="color:var(--muted)">$ p4n4 template pull acme/factory-baseline</span>
<span style="color:var(--muted)">──────────────────────────────────────────</span>
<span style="color:var(--blue)">  Resolving acme/factory-baseline...</span>
<span style="color:var(--accent)">  ✓ Found v1.2.0 → github.com/acme/p4n4-template-factory</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--amber)">? site_id [site-1]: </span><span style="color:#fff">plant-a</span>
<span style="color:var(--amber)">? ollama_model: </span><span style="color:#fff">phi3:mini</span>
<span style="color:var(--amber)">? EI model path: </span><span style="color:#fff">./models/motor-fault-v3.eim</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--accent)">  ✓ Rendered 8 template files</span>
<span style="color:var(--accent)">  ✓ Copied 13 static files</span>
<span style="color:var(--accent)">  ✓ Secrets generated</span>
<span style="color:var(--accent)">  ✓ Template locked: acme/factory-baseline@1.2.0</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--accent)">  ✓ Project ready at ./plant-a</span>`
  },
  up: {
    label: 'p4n4 up --all',
    body: `<span style="color:var(--muted)">$ p4n4 up --all</span>
<span style="color:var(--muted)">──────────────────────────────────────────</span>
<span style="color:var(--blue)">  Starting IoT stack...</span>
<span style="color:var(--accent)">  ✓ mosquitto   healthy</span>
<span style="color:var(--accent)">  ✓ influxdb    healthy</span>
<span style="color:var(--accent)">  ✓ node-red    healthy</span>
<span style="color:var(--accent)">  ✓ grafana     healthy</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--blue)">  Starting GenAI stack...</span>
<span style="color:var(--accent)">  ✓ ollama      healthy</span>
<span style="color:var(--accent)">  ✓ letta       healthy</span>
<span style="color:var(--accent)">  ✓ n8n         healthy</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--blue)">  Starting Edge stack...</span>
<span style="color:var(--accent)">  ✓ ei-vibration-fault  healthy  :1337</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--accent)">  All stacks healthy. Access points:</span>
<span style="color:var(--text)">    Node-RED → http://localhost:1880</span>
<span style="color:var(--text)">    Grafana  → http://localhost:3000</span>
<span style="color:var(--text)">    n8n      → http://localhost:5678</span>`
  },
  status: {
    label: 'p4n4 status',
    body: `<span style="color:var(--muted)">$ p4n4 status</span>
<span style="color:var(--muted)">──────────────────────────────────────────</span>
<span style="color:var(--text)">  p4n4 — plant-a @ factory-floor-1</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--blue)">  IoT Stack</span>
<span style="color:var(--accent)">  ✓ mosquitto   2d 14h   :1883 :8883</span>
<span style="color:var(--accent)">  ✓ node-red    2d 14h   :1880</span>
<span style="color:var(--accent)">  ✓ influxdb    2d 14h   :8086</span>
<span style="color:var(--accent)">  ✓ grafana     2d 14h   :3000</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--amber)">  GenAI Stack</span>
<span style="color:var(--accent)">  ✓ ollama      2d 14h   :11434</span>
<span style="color:var(--accent)">  ✓ letta       2d 14h   :8283</span>
<span style="color:var(--accent)">  ✓ n8n         2d 14h   :5678</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--accent)">  Edge Stack</span>
<span style="color:var(--accent)">  ✓ ei-vibration-fault  2d 14h  :1337</span>
<span style="color:var(--muted)">    model: motor-fault-v3.eim</span>`
  },
  ei: {
    label: 'p4n4 ei infer vibration-fault',
    body: `<span style="color:var(--muted)">$ p4n4 ei infer vibration-fault \</span>
<span style="color:var(--muted)">    --features "0.12,-0.05,1.01,0.33"</span>
<span style="color:var(--muted)">──────────────────────────────────────────</span>
<span style="color:var(--blue)">  Inference: ei-vibration-fault @ :1337</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--text)">  Label       Score</span>
<span style="color:var(--muted)">  ─────────────────</span>
<span style="color:var(--accent)">  normal      0.964</span>
<span style="color:var(--red)">  fault       0.031</span>
<span style="color:var(--muted)">  unknown     0.005</span>
<span style="color:var(--muted)">  ─────────────────</span>
<span style="color:var(--amber)">  anomaly    -0.18</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--muted)">  Timing: dsp=2ms  classification=1ms</span>`
  },
  secret: {
    label: 'p4n4 secret status',
    body: `<span style="color:var(--muted)">$ p4n4 secret status</span>
<span style="color:var(--muted)">──────────────────────────────────────────────</span>
<span style="color:var(--text)">  Key                        Status   Used By</span>
<span style="color:var(--muted)">  ──────────────────────────────────────────</span>
<span style="color:var(--accent)">  MQTT_PASSWORD              ✓ set    mosquitto, node-red</span>
<span style="color:var(--accent)">  INFLUXDB_ADMIN_TOKEN       ✓ set    influxdb, node-red, n8n</span>
<span style="color:var(--accent)">  GF_SECURITY_ADMIN_PASSWORD ✓ set    grafana</span>
<span style="color:var(--accent)">  N8N_ENCRYPTION_KEY         ✓ set    n8n</span>
<span style="color:var(--accent)">  LETTA_SERVER_PASSWORD      ✓ set    letta</span>
<span style="color:var(--amber)">  EI_API_KEY                 ─ unset  edge-impulse (optional)</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--text)">  $ p4n4 secret rotate influxdb-token --restart</span>
<span style="color:var(--accent)">  ✓ INFLUXDB_ADMIN_TOKEN rotated</span>
<span style="color:var(--accent)">  ✓ influxdb restarted</span>
<span style="color:var(--accent)">  ✓ node-red restarted</span>`
  },
  validate: {
    label: 'p4n4 validate',
    body: `<span style="color:var(--muted)">$ p4n4 validate</span>
<span style="color:var(--muted)">──────────────────────────────────────────</span>
<span style="color:var(--accent)">  ✓ docker 27.3.1</span>
<span style="color:var(--accent)">  ✓ docker compose v2.29.1</span>
<span style="color:var(--accent)">  ✓ .env present and readable</span>
<span style="color:var(--accent)">  ✓ All required secrets set</span>
<span style="color:var(--accent)">  ✓ docker-compose.iot.yml  — valid</span>
<span style="color:var(--accent)">  ✓ docker-compose.ai.yml   — valid</span>
<span style="color:var(--accent)">  ✓ docker-compose.edge.yml — valid</span>
<span style="color:var(--accent)">  ✓ EI models present:</span>
<span style="color:var(--muted)">      motor-fault-v3.eim  (1.2 MB, aarch64)</span>
<span style="color:var(--accent)">  ✓ Port conflicts: none</span>
<span style="color:var(--accent)">  ✓ Node-RED flows.json — valid JSON</span>
<span style="color:var(--accent)">  ✓ Mosquitto passwd — non-empty</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--accent)">  All checks passed. Ready: p4n4 up --all</span>`
  }
};

// ── CLI command switcher — event delegation
document.querySelector('.cli-commands').addEventListener('click', (e) => {
  const item = e.target.closest('.cli-cmd-item');
  if (!item) return;
  document.querySelectorAll('.cli-cmd-item').forEach(i => i.classList.remove('active'));
  item.classList.add('active');
  const key = item.dataset.cmd;
  const p = previews[key];
  document.getElementById('preview-label').textContent = p.label;
  const body = document.getElementById('preview-body');
  body.style.opacity = '0';
  setTimeout(() => {
    body.innerHTML = p.body;
    body.style.opacity = '1';
    body.style.transition = 'opacity 0.2s';
  }, 150);
});
