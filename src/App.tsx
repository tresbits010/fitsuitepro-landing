import {
  ArrowRight,
  Fingerprint,
  MessageCircle,
  Trophy,
  WifiOff,
  Cpu,
  Cable,
  Zap,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5491100000000?text=Hola%20quiero%20una%20demo%20de%20FitSuite%20Pro";

export default function App() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-orange-500/30">
      {/* NAV / HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 bg-neutral-950/60 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-orange-600 flex items-center justify-center font-mono text-sm font-bold text-white shadow-[0_0_15px_rgba(234,88,12,0.5)]">
              FS
            </div>
            <span className="text-lg font-semibold tracking-tight">
              FitSuite <span className="text-orange-500 font-bold">Pro</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
            <a href="#beneficios" className="hover:text-white transition-colors">Beneficios</a>
            <a href="#diferencial" className="hover:text-white transition-colors">Hardware</a>
            <a href="#prueba" className="hover:text-white transition-colors">Casos</a>
            <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
          </nav>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-orange-500 text-white font-semibold shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:bg-orange-600 transition"
          >
            <MessageCircle className="h-4 w-4" /> Demo
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="top" className="relative pt-32 pb-28 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-950/20 via-neutral-950 to-neutral-950">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-orange-400 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
            Hardware + Software · Sistema integral
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] mb-6 max-w-5xl mx-auto tracking-tight">
            Tu gimnasio en <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">piloto automático</span>.
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
            Control de acceso, cobros automáticos, WhatsApp y gamificación en una sola plataforma.
            Con <span className="text-orange-400 font-medium">modo offline garantizado</span> para que tu operación nunca se detenga.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-md bg-orange-500 text-white font-semibold shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:bg-orange-600 transition"
            >
              <MessageCircle className="h-4 w-4" /> Hablar por WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#diferencial"
              className="inline-flex items-center justify-center h-12 px-8 rounded-md border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900 transition"
            >
              Ver cómo funciona
            </a>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" className="py-28 relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-orange-500 mb-4">
            // 01 — Beneficios
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Resolvemos los <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">dolores reales</span> de tu operación.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              i: Fingerprint,
              t: "Cero filas en recepción",
              d: "Control de acceso con molinetes y RFID. Tus socios entran en menos de 0.5s sin asistencia humana.",
            },
            {
              i: MessageCircle,
              t: "Adiós a la morosidad",
              d: "Cobros automáticos y recordatorios por WhatsApp. Recuperá hasta un 17% de socios morosos el primer mes.",
            },
            {
              i: Trophy,
              t: "Retención que se nota",
              d: "Gamificación con insignias, retos y rankings. Tus socios vuelven porque ganan algo cada vez que entrenan.",
            },
          ].map((b) => (
            <div
              key={b.t}
              className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 hover:border-orange-500 transition-all hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-lg bg-orange-600 flex items-center justify-center shadow-[0_0_15px_rgba(234,88,12,0.4)] mb-6">
                <b.i className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{b.t}</h3>
              <p className="text-neutral-400 leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIFERENCIAL HARDWARE-TO-SOFTWARE */}
      <section id="diferencial" className="py-28 bg-neutral-900/30 border-y border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-orange-500 mb-4">
              // 02 — Diferencial
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Hardware-to-Software: una sola plataforma de punta a punta.
            </h2>
            <p className="text-lg text-neutral-400 mb-8">
              No somos solo software. Integramos directamente con molinetes, relés, lectores RFID y
              sistemas de acceso. Sin middlewares, sin licencias extra, sin integradores externos.
            </p>
            <ul className="space-y-4">
              {[
                { i: Cable, t: "Integración nativa con molinetes y relés industriales" },
                { i: Cpu, t: "Lectores RFID, QR y biometría en una sola API" },
                { i: WifiOff, t: "Modo offline garantizado: si se cae internet, el gimnasio sigue operando" },
                { i: ShieldCheck, t: "Arquitectura robusta con sincronización automática al volver la conexión" },
              ].map((x) => (
                <li key={x.t} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <x.i className="h-5 w-5 text-orange-500" />
                  </div>
                  <span className="pt-1.5 text-neutral-200">{x.t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Consola Tech Interactiva */}
          <div className="relative">
            <div className="absolute -inset-4 bg-orange-500/10 blur-3xl rounded-3xl" />
            <div className="relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 h-10 border-b border-neutral-800 bg-neutral-950/80">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="ml-3 text-xs font-mono text-neutral-500">fitsuite · gateway.log</span>
              </div>
              <div className="p-6 font-mono text-xs space-y-2 bg-neutral-950/40 text-orange-400">
                <div><span className="text-neutral-600">$</span> rfid.read <span className="text-neutral-200">→ socio #4821 · check-in 0.4s ✓</span></div>
                <div><span className="text-neutral-600">$</span> rele.molinete <span className="text-neutral-200">→ pulse OPEN · ok</span></div>
                <div><span className="text-neutral-600">$</span> offline.queue <span className="text-neutral-200">→ 0 pendientes · sync 100%</span></div>
                <div><span className="text-neutral-600">$</span> whatsapp.bot <span className="text-neutral-200">→ 23 recordatorios enviados ✓</span></div>
                <div><span className="text-neutral-600">$</span> gamify.badge <span className="text-neutral-200">→ "Racha 30 días" otorgada x4 ✓</span></div>
              </div>
              <div className="grid grid-cols-3 gap-px bg-neutral-800 border-t border-neutral-800">
                {[
                  { t: "Uptime", v: "99.98%" },
                  { t: "Latencia", v: "0.4s" },
                  { t: "Offline OK", v: "24/7" },
                ].map((k) => (
                  <div key={k.t} className="bg-neutral-900 p-4">
                    <div className="text-[10px] uppercase tracking-wider text-neutral-500">{k.t}</div>
                    <div className="text-lg font-bold mt-1 font-mono text-orange-500">{k.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRUEBA SOCIAL: NICHEAS GYM */}
      <section id="prueba" className="py-28 max-w-5xl mx-auto px-6">
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="font-mono text-xs uppercase tracking-widest text-orange-500 mb-6">// 03 — En producción real</div>
            <Zap className="h-10 w-10 text-orange-500 mx-auto mb-6 animate-pulse" />
            <p className="text-2xl md:text-4xl font-semibold leading-tight mb-8">
              "FitSuite Pro funciona <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">en producción real</span> en <span className="text-orange-500 font-bold">Nicheas Gym</span>, gestionando accesos, cobros y comunicación todos los días."
            </p>
            <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-neutral-800">
              {[
                { v: "+1.400", l: "Socios activos" },
                { v: "99.98%", l: "Uptime molinetes" },
                { v: "−92%", l: "Errores admin" },
              ].map((s) => (
                <div key={s.l} className="min-w-[120px]">
                  <div className="text-3xl md:text-4xl font-bold font-mono text-orange-500">{s.v}</div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER & CONTACTO */}
      <footer id="contacto" className="border-t border-neutral-900 py-16 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-md bg-orange-600 flex items-center justify-center font-mono text-sm font-bold text-white shadow-[0_0_15px_rgba(234,88,12,0.4)]">
                FS
              </div>
              <span className="text-lg font-semibold">FitSuite <span className="text-orange-500">Pro</span></span>
            </div>
            <p className="text-neutral-400 max-w-md text-sm">
              El cerebro tecnológico de tu gimnasio. Hardware + software, en piloto automático.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-neutral-300">Contacto</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-orange-500" />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">WhatsApp directo</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-orange-500" />
                <a href="mailto:hola@fitsuite.pro" className="hover:text-white transition">hola@fitsuite.pro</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-orange-500" />
                <span>+54 9 11 0000-0000</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-neutral-300">Oficina</h4>
            <p className="text-sm text-neutral-400 flex items-start gap-3">
              <MapPin className="h-4 w-4 text-orange-500 mt-0.5" />
              <span>Buenos Aires, Argentina</span>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-neutral-900 flex flex-col md:flex-row justify-between gap-4 text-xs text-neutral-500 font-mono">
          <span>© {new Date().getFullYear()} FitSuite Pro · Todos los derechos reservados</span>
          <span>build: stable · status: operational</span>
        </div>
      </footer>
    </main>
  );
}