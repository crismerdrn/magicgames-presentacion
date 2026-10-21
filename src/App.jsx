import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Edges, Float, OrbitControls } from '@react-three/drei'

const LINKS = {
  frontend: import.meta.env.VITE_FRONTEND_URL || 'https://magicgames.vercel.app',
  api: 'https://magicgames-api.onrender.com',
  docs: 'https://magicgames-api.onrender.com/docs',
  products: 'https://magicgames-api.onrender.com/api/v1/products',
}

const COLORS = { blue: '#2563eb', violet: '#7c3aed', emerald: '#10b981' }

/* ---------- UI primitives ---------- */

const badgeTones = {
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-300',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  slate: 'border-slate-600/60 bg-slate-800/60 text-slate-300',
  amber: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
}

function Badge({ children, tone = 'slate' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold ${badgeTones[tone]}`}>
      {children}
    </span>
  )
}

function SlideHeader({ kicker, title, subtitle }) {
  return (
    <header className="mb-5">
      <p className="mb-2 font-mono text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">{kicker}</p>
      <h2 className="font-display text-4xl font-bold leading-tight text-white xl:text-5xl">{title}</h2>
      {subtitle && <p className="mt-2 max-w-5xl text-lg text-slate-400">{subtitle}</p>}
    </header>
  )
}

function Card({ children, className = '', accent }) {
  const border = accent ? { borderTopColor: accent, borderTopWidth: 3 } : undefined
  return (
    <div className={`card p-5 ${className}`} style={border}>
      {children}
    </div>
  )
}

function FlowArrow({ label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-2 py-2 lg:py-0">
      <span className="font-mono text-xs font-semibold text-slate-400">{label}</span>
      <div className="hidden w-full items-center lg:flex">
        <span className="text-blue-400">◀</span>
        <div className="flow-line h-1 flex-1 rounded-full" />
        <span className="text-emerald-400">▶</span>
      </div>
      <div className="flex h-10 flex-col items-center lg:hidden">
        <div className="flow-line w-1 flex-1 rounded-full" />
      </div>
    </div>
  )
}

/* ---------- D20 3D ---------- */

function D20({ wireframe = false }) {
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh castShadow>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial
          color="#8b5cf6"
          metalness={0.55}
          roughness={0.28}
          flatShading
          emissive="#312e81"
          emissiveIntensity={0.45}
          wireframe={wireframe}
        />
        <Edges threshold={1} color="#67e8f9" lineWidth={2.5} />
      </mesh>
    </Float>
  )
}

function DiceCanvas({ autoRotate = true, wireframe = false }) {
  return (
    <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.8} />
      <hemisphereLight args={["#93c5fd", "#064e3b", 1.2]} />
      <directionalLight position={[4, 5, 5]} intensity={3.5} color="#ffffff" />
      <directionalLight position={[-5, -2, -3]} intensity={2.5} color={COLORS.blue} />
      <directionalLight position={[-4, 3, 4]} intensity={1.8} color={COLORS.violet} />
      <pointLight position={[0, -4, 3]} intensity={18} color={COLORS.emerald} />
      <Suspense fallback={null}>
        <D20 wireframe={wireframe} />
      </Suspense>
      <OrbitControls enablePan={false} enableZoom minDistance={3} maxDistance={9} autoRotate={autoRotate} autoRotateSpeed={1.6} />
    </Canvas>
  )
}

/* ---------- Slides ---------- */

function SlidePortada() {
  return (
    <div className="grid h-full items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
      <div>
        <div className="mb-6 flex flex-wrap gap-2">
          <Badge tone="emerald">Proyecto Final 2026</Badge>
          <Badge tone="blue">Tecnologías Informáticas</Badge>
        </div>
        <h1 className="font-display text-6xl font-bold leading-none tracking-tight md:text-8xl">
          <span className="text-gradient">Magic Games</span>
        </h1>
        <p className="mt-5 text-2xl font-medium text-slate-200 md:text-3xl">
          Sistema de Gestión de Inventario y Ludoteca en la Nube
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Card accent={COLORS.blue}>
            <p className="text-sm uppercase tracking-widest text-slate-400">Expositor</p>
            <p className="mt-1 text-xl font-semibold text-white">Carlos Iván Salgado Flores</p>
          </Card>
          <Card accent={COLORS.violet}>
            <p className="text-sm uppercase tracking-widest text-slate-400">Materia</p>
            <p className="mt-1 text-xl font-semibold text-white">Tecnologías Informáticas · Gestión 2026</p>
          </Card>
        </div>
        <Card className="mt-3" accent={COLORS.emerald}>
          <p className="text-sm uppercase tracking-widest text-slate-400">El negocio</p>
          <p className="mt-1 text-lg leading-relaxed text-slate-200">
            Tienda especializada y <strong className="text-white">ludoteca</strong> para alquiler de juegos de mesa y
            cafetería.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="violet">🏝️ Catan</Badge>
            <Badge tone="violet">🎵 Hitster</Badge>
            <Badge tone="violet">🦈 Survive the Island</Badge>
            <Badge tone="amber">🍿 Snacks</Badge>
            <Badge tone="amber">🥤 Bebidas</Badge>
          </div>
        </Card>
      </div>
      <div className="relative hidden h-[460px] lg:block">
        <div className="absolute inset-8 rounded-full bg-violet-600/25 blur-3xl" />
        <DiceCanvas />
      </div>
    </div>
  )
}

function SlideArquitectura() {
  const layers = [
    {
      icon: '⚛️',
      title: 'Frontend SPA',
      host: 'Vercel',
      color: COLORS.blue,
      items: ['React 18 + Vite', 'Tailwind CSS', 'Three.js (d20 3D)', 'fetch → VITE_API_URL'],
      badges: [['React', 'blue'], ['Vite', 'violet'], ['Tailwind', 'emerald']],
    },
    {
      icon: '⚡',
      title: 'Backend RESTful',
      host: 'Render',
      color: COLORS.violet,
      items: ['Python + FastAPI', 'Uvicorn (ASGI)', 'Validación Pydantic', 'CORS habilitado'],
      badges: [['FastAPI', 'emerald'], ['Uvicorn', 'violet'], ['Python', 'blue']],
      url: LINKS.api,
    },
    {
      icon: '🐘',
      title: 'Base de Datos',
      host: 'Supabase',
      color: COLORS.emerald,
      items: ['PostgreSQL gestionado', 'Connection Pooling', 'Modelo relacional 5 tablas', 'Llaves foráneas + integridad'],
      badges: [['PostgreSQL', 'blue'], ['Supabase', 'emerald']],
    },
  ]
  return (
    <div>
      <SlideHeader
        kicker="02 · Arquitectura"
        title="Arquitectura Full Stack en la Nube"
        subtitle="Tres capas desacopladas y desplegadas en servicios cloud independientes, comunicadas por HTTP/JSON."
      />
      <div className="grid items-stretch gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {layers.map((l, i) => (
          <div key={l.title} className="contents">
            <Card accent={l.color} className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-4xl">{l.icon}</span>
                <span className="rounded-md bg-slate-800 px-2.5 py-1 font-mono text-sm font-semibold text-slate-200">
                  ☁ {l.host}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-white">{l.title}</h3>
              <ul className="mt-3 space-y-1.5 text-lg text-slate-300">
                {l.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span style={{ color: l.color }}>▸</span>
                    {it}
                  </li>
                ))}
              </ul>
              {l.url && <p className="mt-3 break-all font-mono text-sm text-violet-300">{l.url}</p>}
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {l.badges.map(([b, t]) => (
                  <Badge key={b} tone={t}>
                    {b}
                  </Badge>
                ))}
              </div>
            </Card>
            {i < layers.length - 1 && <FlowArrow label={i === 0 ? 'HTTPS · JSON · CORS' : 'SQL · Pooler'} />}
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-lg text-slate-300">
        <Badge tone="emerald">⇄ Flujo bidireccional</Badge>
        <span>Request JSON (POST/GET) → API valida → transacción en PostgreSQL → Response JSON → render en la SPA</span>
      </div>
    </div>
  )
}

function Table({ n, name, desc, fields, color }) {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2" style={{ background: `${color}22`, borderBottom: `1px solid ${color}55` }}>
        <span className="flex h-6 w-6 items-center justify-center rounded-md text-sm font-bold text-white" style={{ background: color }}>
          {n}
        </span>
        <span className="font-mono text-lg font-semibold text-white">{name}</span>
      </div>
      <div className="px-4 py-2.5">
        <p className="mb-1.5 text-base text-slate-300">{desc}</p>
        <ul className="space-y-0.5 font-mono text-sm">
          {fields.map(([f, k]) => (
            <li key={f} className="flex items-center justify-between gap-2 text-slate-400">
              <span>{f}</span>
              {k && (
                <span className={`rounded px-1.5 text-xs font-bold ${k === 'PK' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'}`}>
                  {k}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SlideModelo() {
  return (
    <div>
      <SlideHeader
        kicker="03 · Modelo de datos · Rúbrica ≥ 5 tablas ✔"
        title="Modelo Relacional de 5 Tablas"
        subtitle="Esquema normalizado en Supabase (PostgreSQL) con integridad referencial mediante llaves foráneas."
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr_1fr]">
        <div className="space-y-4">
          <Table n={1} name="ludotecas" color={COLORS.emerald} desc="Sedes físicas (Sede Central)." fields={[['id', 'PK'], ['nombre'], ['direccion']]} />
          <Table n={2} name="categorias" color={COLORS.blue} desc="Juegos de Mesa · Snacks y Bebidas." fields={[['id', 'PK'], ['nombre']]} />
        </div>
        <div className="flex flex-col gap-4">
          <Table
            n={4}
            name="products"
            color={COLORS.violet}
            desc="Catálogo maestro de productos."
            fields={[['id', 'PK'], ['name'], ['price'], ['image_url'], ['id_categoria', 'FK'], ['id_medida', 'FK']]}
          />
          <div className="card border-emerald-500/50 bg-emerald-500/10 p-4">
            <p className="font-mono text-sm font-bold text-emerald-300">POST /api/v1/products</p>
            <p className="mt-1 text-base text-slate-200">
              Ejecuta una <strong className="text-white">transacción atómica</strong>: inserta en{' '}
              <code className="text-violet-300">products</code> y <code className="text-emerald-300">stock</code>{' '}
              simultáneamente. Si una falla → <strong>ROLLBACK</strong>.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <Table n={3} name="medidas" color={COLORS.blue} desc="COP = Copias/Cajas · UND = Unidades." fields={[['id', 'PK'], ['codigo'], ['descripcion']]} />
          <Table
            n={5}
            name="stock"
            color={COLORS.emerald}
            desc="Existencias dinámicas por sucursal."
            fields={[['id', 'PK'], ['id_product', 'FK'], ['id_ludoteca', 'FK'], ['cantidad'], ['stock_minimo']]}
          />
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-sm text-slate-400">
        categorias 1─N products · medidas 1─N products · products 1─N stock · ludotecas 1─N stock
      </p>
    </div>
  )
}

function Endpoint({ method, path, desc }) {
  const tone = method === 'GET' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
  return (
    <div className="card flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:gap-4">
      <span className={`w-20 shrink-0 rounded-md py-1 text-center font-mono text-base font-bold ${tone}`}>{method}</span>
      <code className="shrink-0 font-mono text-lg font-semibold text-white">{path}</code>
      <span className="text-base text-slate-400 sm:ml-auto sm:text-right">{desc}</span>
    </div>
  )
}

function SlideBackend() {
  return (
    <div>
      <SlideHeader
        kicker="04 · Backend"
        title="Backend RESTful y Documentación Swagger / OpenAPI"
        subtitle="FastAPI desplegado en Render, servido en producción con Uvicorn (ASGI)."
      />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          <Endpoint method="GET" path="/api/v1/catalogos" desc="Carga de selects normalizados" />
          <Endpoint method="GET" path="/api/v1/products" desc="Consulta relacional con stock consolidado" />
          <Endpoint method="POST" path="/api/v1/products" desc="Alta transaccional + disparo de eventos (Slack)" />
          <div className="card mt-4 p-4 font-mono text-sm leading-relaxed text-slate-300">
            <p className="text-slate-500"># Ejemplo de respuesta GET /api/v1/products</p>
            <p>
              {'{ '}
              <span className="text-blue-300">"name"</span>: <span className="text-emerald-300">"Catan"</span>,{' '}
              <span className="text-blue-300">"price"</span>: <span className="text-amber-300">350</span>,{' '}
              <span className="text-blue-300">"categoria"</span>: <span className="text-emerald-300">"Juegos de Mesa"</span>,{' '}
              <span className="text-blue-300">"medida"</span>: <span className="text-emerald-300">"COP"</span>,{' '}
              <span className="text-blue-300">"stock_actual"</span>: <span className="text-amber-300">4</span>
              {' }'}
            </p>
          </div>
        </div>
        <Card accent={COLORS.emerald} className="flex flex-col">
          <p className="text-4xl">📘</p>
          <h3 className="mt-3 font-display text-2xl font-bold text-white">Swagger UI nativo</h3>
          <p className="mt-2 text-lg text-slate-300">
            FastAPI genera automáticamente el esquema <strong>OpenAPI</strong> y una consola interactiva para probar cada
            endpoint en vivo.
          </p>
          <a href={LINKS.docs} target="_blank" rel="noreferrer" className="mt-4 break-all rounded-lg bg-slate-800 px-3 py-2 font-mono text-base text-emerald-300 hover:bg-slate-700">
            {LINKS.docs} ↗
          </a>
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            <Badge tone="emerald">FastAPI</Badge>
            <Badge tone="violet">Uvicorn</Badge>
            <Badge tone="blue">Pydantic</Badge>
            <Badge tone="slate">Render</Badge>
          </div>
        </Card>
      </div>
    </div>
  )
}

function SlideDado() {
  const [wire, setWire] = useState(false)
  const [spin, setSpin] = useState(true)
  return (
    <div className="grid h-full items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <SlideHeader kicker="05 · Gráficos 3D" title="Componente Visual 3D: Dado D20" subtitle="Three.js / WebGL como elemento distintivo de la ludoteca." />
        <div className="space-y-3">
          <Card accent={COLORS.violet}>
            <h3 className="text-xl font-bold text-white">🎲 Icosaedro poliédrico</h3>
            <p className="mt-1 text-lg text-slate-300">20 caras triangulares · 12 vértices · 30 aristas visibles.</p>
          </Card>
          <Card accent={COLORS.blue}>
            <h3 className="text-xl font-bold text-white">🛠️ Implementación</h3>
            <p className="mt-1 text-lg text-slate-300">
              <code className="text-blue-300">@react-three/fiber</code> + <code className="text-blue-300">@react-three/drei</code>,{' '}
              OrbitControls, luces direccionales y material metálico con aristas (<code>Edges</code>).
            </p>
          </Card>
          <Card accent={COLORS.emerald}>
            <h3 className="text-xl font-bold text-white">🖱️ Interacción en tiempo real</h3>
            <p className="mt-1 text-lg text-slate-300">Arrastra para rotar orbitalmente y usa la rueda del ratón para hacer zoom.</p>
          </Card>
        </div>
      </div>
      <div className="card relative h-[400px] overflow-hidden lg:h-[480px]">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute inset-16 rounded-full bg-violet-600/20 blur-3xl" />
        <DiceCanvas autoRotate={spin} wireframe={wire} />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge tone="emerald">● En vivo · WebGL</Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm text-slate-400">Arrastra ↻ · Rueda = zoom</span>
          <div className="flex gap-2">
            <button onClick={() => setSpin((s) => !s)} className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-sm font-semibold hover:bg-slate-700">
              {spin ? '⏸ Pausar giro' : '▶ Auto-giro'}
            </button>
            <button onClick={() => setWire((w) => !w)} className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-sm font-semibold hover:bg-slate-700">
              {wire ? '◼ Sólido' : '◇ Wireframe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SlideAuditoria() {
  return (
    <div>
      <SlideHeader
        kicker="06 · Auditoría y Feedback"
        title="Auditoría en Tiempo Real y Revisión UI/UX"
        subtitle="Cada alta de inventario queda auditada en Slack; la interfaz fue revisada técnicamente con Comentera."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card accent={COLORS.violet}>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl font-bold text-white">💬 Slack · Incoming Webhooks</h3>
            <Badge tone="violet">#nuevo-canal</Badge>
          </div>
          <p className="mt-2 text-lg text-slate-300">El endpoint POST despacha una notificación instantánea por cada nuevo registro de stock.</p>
          <div className="mt-4 rounded-xl border border-slate-700 bg-[#1a1d21] p-4">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-xl">🎲</div>
              <div className="min-w-0">
                <p className="text-base">
                  <span className="font-bold text-white">Magic Games Bot</span>{' '}
                  <span className="rounded bg-slate-700 px-1 text-xs text-slate-300">APP</span>{' '}
                  <span className="text-sm text-slate-500">10:42</span>
                </p>
                <p className="mt-1 text-base leading-relaxed text-slate-200">
                  🎲 <strong>Nuevo Registro en Magic Games:</strong> Catan | Precio: 350 | Stock: 4 | Responsable: Carlos Iván Salgado Flores
                </p>
              </div>
            </div>
          </div>
          <p className="mt-3 font-mono text-sm text-slate-400">FastAPI → POST hooks.slack.com/services/… (JSON)</p>
        </Card>
        <Card accent={COLORS.emerald}>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl font-bold text-white">📝 Comentera · Revisión UI/UX</h3>
            <Badge tone="emerald">2 revisiones</Badge>
          </div>
          <p className="mt-2 text-lg text-slate-300">Revisiones técnicas registradas sobre la SPA desplegada:</p>
          <div className="mt-4 space-y-3">
            {[
              ['#1', 'Contraste visual de tarjetas', 'Legibilidad de texto y precios sobre fondos oscuros del catálogo.', '🎨'],
              ['#2', 'Rendimiento del canvas 3D', 'Costo de renderizado del d20 (WebGL) y fluidez de la interacción.', '⚙️'],
            ].map(([id, t, d, ic]) => (
              <div key={id} className="flex gap-3 rounded-xl border border-slate-700 bg-slate-800/50 p-4">
                <span className="text-2xl">{ic}</span>
                <div>
                  <p className="text-lg font-semibold text-white">
                    <span className="font-mono text-emerald-400">{id}</span> {t}
                  </p>
                  <p className="text-base text-slate-400">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function SlideDevin() {
  const practices = [
    ['🧩', 'Desacoplamiento modular', 'Componentes, servicios de API y vistas separados por responsabilidad.', COLORS.blue],
    ['🔐', 'Variables de entorno', 'Consumo seguro de la API vía VITE_API_URL, sin URLs ni secretos en el código.', COLORS.violet],
    ['🚀', 'CI/CD hacia Vercel', 'Cada push a la rama principal compila y despliega automáticamente.', COLORS.emerald],
  ]
  return (
    <div>
      <SlideHeader
        kicker="07 · Ingeniería asistida por IA"
        title="Ingeniería Asistida por IA: Devin AI"
        subtitle="Devin AI como agente autónomo de ingeniería de software para acelerar el ciclo de entrega."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Card accent={COLORS.blue}>
          <h3 className="font-display text-2xl font-bold text-white">🤖 Rol de Devin AI</h3>
          <ol className="mt-3 space-y-2">
            {[
              ['Inicialización', 'Boilerplate de la SPA (React + Vite + Tailwind).'],
              ['Tipado de datos', 'Contratos alineados a los esquemas de la API (products, catálogos).'],
              ['Aceleración', 'Iteración rápida: implementar → compilar → probar → desplegar.'],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold">{i + 1}</span>
                <div>
                  <p className="text-lg font-semibold text-white">{t}</p>
                  <p className="text-base text-slate-400">{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-base text-amber-200">
            El estudiante dirige, revisa y valida cada entrega: la IA acelera, no reemplaza el criterio de ingeniería.
          </div>
          <div className="mt-3 rounded-lg border border-slate-700 bg-slate-950/60 p-3 font-mono text-sm text-slate-300">
            <span className="text-slate-500"># .env</span>
            <br />
            <span className="text-violet-300">VITE_API_URL</span>=<span className="text-emerald-300">{LINKS.api}</span>
          </div>
        </Card>
        <div className="space-y-3">
          <p className="font-mono text-sm font-semibold uppercase tracking-widest text-slate-400">Buenas prácticas aplicadas</p>
          {practices.map(([ic, t, d, c]) => (
            <Card key={t} accent={c}>
              <div className="flex gap-4">
                <span className="text-3xl">{ic}</span>
                <div>
                  <h4 className="text-xl font-bold text-white">{t}</h4>
                  <p className="text-lg text-slate-300">{d}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function SlideConclusiones() {
  const rubric = [
    ['Base de datos (5 tablas)', 'Supabase · PostgreSQL', '🐘'],
    ['API RESTful', 'FastAPI · Render', '⚡'],
    ['SPA', 'React + Vite · Vercel', '⚛️'],
    ['Gráficos 3D (d20)', 'Three.js · WebGL', '🎲'],
    ['Notificaciones', 'Slack Webhooks', '💬'],
    ['Feedback UI', 'Comentera', '📝'],
    ['Inteligencia Artificial', 'Devin AI', '🤖'],
  ]
  const links = [
    ['🌐 Aplicación SPA (Vercel)', LINKS.frontend, 'blue'],
    ['⚡ API en producción (Render)', LINKS.api, 'violet'],
    ['📘 Documentación Swagger', LINKS.docs, 'emerald'],
  ]
  return (
    <div>
      <SlideHeader kicker="08 · Cierre" title="Conclusiones y Matriz de Cumplimiento" />
      <div className="grid items-start gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
            <span className="text-lg font-semibold text-white">Rúbrica del Proyecto Final</span>
            <span className="rounded-full bg-emerald-500 px-3 py-0.5 text-sm font-bold text-slate-950">100% ✔</span>
          </div>
          <ul className="divide-y divide-slate-800">
            {rubric.map(([req, tech, ic]) => (
              <li key={req} className="flex items-center gap-3 px-5 py-2.5">
                <span className="text-xl">{ic}</span>
                <span className="text-lg font-medium text-slate-100">{req}</span>
                <span className="ml-auto text-base text-slate-400">{tech}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-400">✓</span>
              </li>
            ))}
          </ul>
          <div className="h-2 bg-slate-800">
            <div className="h-full w-full bg-gradient-to-r from-[#2563eb] via-[#7c3aed] to-[#10b981]" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-mono text-sm font-semibold uppercase tracking-widest text-slate-400">Enlaces en vivo para el jurado</p>
          {links.map(([t, url, tone]) => (
            <a key={url} href={url} target="_blank" rel="noreferrer" className={`card block p-4 transition hover:-translate-y-0.5 hover:border-slate-600 ${badgeTones[tone]}`}>
              <p className="text-lg font-bold text-white">{t} ↗</p>
              <p className="mt-1 break-all font-mono text-sm">{url}</p>
            </a>
          ))}
          <Card className="mt-auto text-center">
            <p className="font-display text-3xl font-bold text-gradient">¡Gracias!</p>
            <p className="mt-1 text-lg text-slate-300">Preguntas del jurado · Carlos Iván Salgado Flores</p>
          </Card>
        </div>
      </div>
    </div>
  )
}

const SLIDES = [
  { id: 'portada', label: 'Portada', Component: SlidePortada },
  { id: 'arquitectura', label: 'Arquitectura', Component: SlideArquitectura },
  { id: 'modelo', label: 'Modelo de datos', Component: SlideModelo },
  { id: 'backend', label: 'Backend', Component: SlideBackend },
  { id: 'dado', label: 'Dado 3D', Component: SlideDado },
  { id: 'auditoria', label: 'Slack y Comentera', Component: SlideAuditoria },
  { id: 'devin', label: 'Devin AI', Component: SlideDevin },
  { id: 'conclusiones', label: 'Conclusiones', Component: SlideConclusiones },
]

/* ---------- App shell ---------- */

function initialSlide() {
  const n = parseInt(window.location.hash.replace('#', ''), 10)
  return Number.isInteger(n) && n >= 1 && n <= SLIDES.length ? n - 1 : 0
}

export default function App() {
  const [index, setIndex] = useState(initialSlide)
  const touchX = useRef(null)
  const total = SLIDES.length

  const go = useCallback((i) => setIndex(Math.max(0, Math.min(total - 1, i))), [total])
  const next = useCallback(() => setIndex((i) => Math.min(total - 1, i + 1)), [total])
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), [])

  useEffect(() => {
    window.history.replaceState(null, '', `#${index + 1}`)
  }, [index])

  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof HTMLElement && ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        prev()
      } else if (e.key === 'Home') go(0)
      else if (e.key === 'End') go(total - 1)
      else if (e.key.toLowerCase() === 'f') {
        if (document.fullscreenElement) document.exitFullscreen()
        else document.documentElement.requestFullscreen?.()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, go, total])

  const { Component, label } = SLIDES[index]
  const progress = ((index + 1) / total) * 100

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden bg-slate-950"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 60) (dx < 0 ? next : prev)()
        touchX.current = null
      }}
    >
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative z-20 h-1.5 w-full bg-slate-800/80" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={index + 1}>
        <div className="h-full bg-gradient-to-r from-[#2563eb] via-[#7c3aed] to-[#10b981] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 py-3 md:px-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎲</span>
          <span className="font-display text-lg font-bold text-white">Magic Games</span>
          <span className="hidden text-sm text-slate-500 sm:inline">· Defensa Proyecto Final · Tecnologías Informáticas 2026</span>
        </div>
        <span className="hidden font-mono text-sm text-slate-400 md:inline">{label}</span>
      </header>

      <main className="no-scrollbar relative z-10 flex-1 overflow-y-auto px-6 pb-4 md:px-10">
        <section key={index} className="mx-auto flex min-h-full max-w-7xl animate-slide-in flex-col justify-center py-2" aria-roledescription="diapositiva" aria-label={`${index + 1} de ${total}: ${label}`}>
          <Component />
        </section>
      </main>

      <footer className="relative z-10 flex items-center justify-between gap-4 border-t border-slate-800/80 bg-slate-950/80 px-6 py-3 backdrop-blur md:px-10">
        <button
          onClick={prev}
          disabled={index === 0}
          className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-base font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Anterior
        </button>

        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-base font-semibold text-slate-200">
            Diapositiva {index + 1} / {total}
          </span>
          <div className="flex gap-1.5">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => go(i)}
                title={`${i + 1}. ${s.label}`}
                aria-label={`Ir a diapositiva ${i + 1}: ${s.label}`}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-emerald-400' : 'w-2 bg-slate-700 hover:bg-slate-500'}`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={next}
          disabled={index === total - 1}
          className="rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-5 py-2.5 text-base font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Siguiente →
        </button>
      </footer>
    </div>
  )
}
