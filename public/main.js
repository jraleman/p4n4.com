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
    body: `<span style="color:var(--muted)">$ p4n4 init my-factory-stack</span>
<span style="color:var(--muted)">──────────────────────────────────────</span>
<span style="color:var(--muted)">  Press Enter to accept defaults.</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--amber)">? InfluxDB organisation: </span><span style="color:#fff">ming</span>
<span style="color:var(--amber)">? Timezone: </span><span style="color:#fff">UTC</span>
<span style="color:var(--amber)">? InfluxDB admin password: </span><span style="color:var(--muted)">(auto-generated)</span>
<span style="color:var(--amber)">? InfluxDB API token: </span><span style="color:var(--muted)">(auto-generated)</span>
<span style="color:var(--amber)">? Grafana admin password: </span><span style="color:var(--muted)">(auto-generated)</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--muted)">─── Scaffolding ─────────────────────</span>
<span style="color:var(--accent)">  ✓ docker-compose.yml</span>
<span style="color:var(--accent)">  ✓ config/mosquitto/mosquitto.conf</span>
<span style="color:var(--accent)">  ✓ config/node-red/flows.json</span>
<span style="color:var(--accent)">  ✓ config/grafana/provisioning/</span>
<span style="color:var(--accent)">  ✓ .env  (secrets generated)</span>
<span style="color:var(--accent)">  ✓ .p4n4.json</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--accent)">✓ Project created at ./my-factory-stack</span>
<span style="color:var(--text)">  cd my-factory-stack &amp;&amp; p4n4 up</span>`
  },
  template: {
    label: 'p4n4 template apply factory-baseline',
    body: `<span style="color:var(--muted)">$ p4n4 template search</span>
<span style="color:var(--muted)">──────────────────────────────────────────</span>
<span style="color:var(--text)">  factory-baseline   iot+ai+edge  Manufacturing vibration monitoring</span>
<span style="color:var(--text)">  iot-minimal        iot          Minimal sensor monitoring stack</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--muted)">$ p4n4 template apply factory-baseline</span>
<span style="color:var(--muted)">──────────────────────────────────────────</span>
<span style="color:var(--accent)">  ✓ Scaffolded project from template</span>
<span style="color:var(--accent)">  ✓ Secrets generated</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--muted)">  Next: cd factory-baseline &amp;&amp; p4n4 up</span>`
  },
  up: {
    label: 'p4n4 up / --ai / --edge',
    body: `<span style="color:var(--muted)">$ p4n4 up</span>
<span style="color:var(--muted)">──────────────────────────────────────────</span>
<span style="color:var(--accent)">  ✓ mosquitto   healthy  :1883</span>
<span style="color:var(--accent)">  ✓ influxdb    healthy  :8086</span>
<span style="color:var(--accent)">  ✓ node-red    healthy  :1880</span>
<span style="color:var(--accent)">  ✓ grafana     healthy  :3000</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--muted)">$ p4n4 up --ai</span>
<span style="color:var(--muted)">──────────────────────────────────────────</span>
<span style="color:var(--accent)">  ✓ ollama      healthy  :11434</span>
<span style="color:var(--accent)">  ✓ letta       healthy  :8283</span>
<span style="color:var(--accent)">  ✓ n8n         healthy  :5678</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--muted)">$ p4n4 up --edge</span>
<span style="color:var(--muted)">──────────────────────────────────────────</span>
<span style="color:var(--accent)">  ✓ ei-runner   healthy  :8080</span>`
  },
  status: {
    label: 'p4n4 status',
    body: `<span style="color:var(--muted)">$ p4n4 status</span>
<span style="color:var(--muted)">──────────────────────────────────────────</span>
<span style="color:var(--text)">       Stack status — my-factory-stack</span>
<span style="color:var(--muted)">  ┏━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━━━━━┓</span>
<span style="color:var(--muted)">  ┃ Service  ┃ Status  ┃ Health  ┃ Ports       ┃</span>
<span style="color:var(--muted)">  ┡━━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━━━━━┩</span>
<span style="color:var(--accent)">  │ mqtt     │ running │ healthy │ 1883/tcp    │</span>
<span style="color:var(--accent)">  │ influxdb │ running │ healthy │ 8086/tcp    │</span>
<span style="color:var(--accent)">  │ node-red │ running │ healthy │ 1880/tcp    │</span>
<span style="color:var(--accent)">  │ grafana  │ running │ healthy │ 3000/tcp    │</span>
<span style="color:var(--muted)">  └──────────┴─────────┴─────────┴─────────────┘</span>`
  },
  ei: {
    label: 'p4n4 ei deploy / run',
    body: `<span style="color:var(--muted)">$ p4n4 ei deploy</span>
<span style="color:var(--muted)">──────────────────────────────────────────</span>
<span style="color:var(--amber)">  p4n4 ei deploy — not yet implemented</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--muted)">  Use p4n4-edge directly:</span>
<span style="color:var(--text)">  make deploy-model MODEL=~/motor-fault.eim</span>
<span style="color:var(--text)">  make up</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--muted)">  The runner subscribes to MQTT:</span>
<span style="color:var(--text)">  sensors/raw      ← feature vectors in</span>
<span style="color:var(--text)">  inference/results → label + confidence out</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--muted)">  Health endpoint:</span>
<span style="color:var(--accent)">  curl http://localhost:8080/health</span>`
  },
  secret: {
    label: 'p4n4 secret',
    body: `<span style="color:var(--muted)">$ p4n4 secret</span>
<span style="color:var(--muted)">──────────────────────────────────────────────</span>
<span style="color:var(--text)">         Secrets to rotate</span>
<span style="color:var(--muted)">  ┏━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━┓</span>
<span style="color:var(--muted)">  ┃ Key                     ┃ New value            ┃</span>
<span style="color:var(--muted)">  ┡━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━┩</span>
<span style="color:var(--text)">  │ INFLUXDB_PASSWORD       │ 3f8a2c...            │</span>
<span style="color:var(--text)">  │ INFLUXDB_TOKEN          │ 9b1d4e...            │</span>
<span style="color:var(--text)">  │ GRAFANA_PASSWORD        │ a72f1b...            │</span>
<span style="color:var(--muted)">  └─────────────────────────┴──────────────────────┘</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--amber)">  Rotate these secrets in .env? [Y/n]</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--accent)">  ✓ Secrets rotated in .env</span>
<span style="color:var(--text)">  Remember: p4n4 down &amp;&amp; p4n4 up to apply.</span>`
  },
  validate: {
    label: 'p4n4 validate',
    body: `<span style="color:var(--muted)">$ p4n4 validate</span>
<span style="color:var(--muted)">──────────────────────────────────────────</span>
<span style="color:var(--accent)">  ✓ .p4n4.json present (schema_version: 1)</span>
<span style="color:var(--accent)">  ✓ .env present and readable</span>
<span style="color:var(--accent)">  ✓ INFLUXDB_TOKEN set</span>
<span style="color:var(--accent)">  ✓ GRAFANA_PASSWORD set</span>
<span style="color:var(--accent)">  ✓ docker-compose.yml — valid</span>
<span style="color:var(--accent)">  ✓ config/mosquitto/mosquitto.conf — present</span>
<span style="color:var(--accent)">  ✓ config/node-red/flows.json — valid JSON</span>
<span style="color:var(--accent)">  ✓ config/grafana/provisioning/ — present</span>
<span style="color:var(--muted)"></span>
<span style="color:var(--accent)">  All checks passed. Ready: p4n4 up</span>`
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
