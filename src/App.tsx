import { useState, useEffect } from "react";
import {
  ArrowRight,
  Fingerprint,
  MessageCircle,
  Trophy,
  WifiOff,
  Cable,
  Zap,
  Mail,
  MapPin,
  Dumbbell,
  CheckCircle2,
  XCircle,
  ChevronDown,
  HelpCircle,
  Flame,
  TrendingUp,
  Activity,
  Bot,
  Star,
  Clock,
  Wrench,
  Send
} from "lucide-react";

// ==========================================
// CONFIGURACIÓN DE DATOS
// ==========================================
const CLIENTES_GYMS = [
  { 
    nombre: "Nichea's Gym", 
    logoUrl: "/nicheas-logo.jpg", 
    mapsUrl: "https://www.google.com/maps?q=Nicheas+Gym+Viedma" 
  }, 
  { 
    nombre: "Iron Fitness", 
    logoUrl: "", 
    mapsUrl: "https://www.google.com/maps?q=Iron+Fitness+Gym" 
  },
  { 
    nombre: "Spartan Center", 
    logoUrl: "", 
    mapsUrl: "https://www.google.com/maps?q=Spartan+Center+Gym" 
  },
  { 
    nombre: "Alpha Training", 
    logoUrl: "", 
    mapsUrl: "https://www.google.com/maps?q=Alpha+Training+Gym" 
  },
  { 
    nombre: "Power House", 
    logoUrl: "", 
    mapsUrl: "https://www.google.com/maps?q=Power+House+Gym" 
  },
];

const FAQS = [
  {
    q: "¿El sistema funciona si se corta internet por completo?",
    a: "Sí, absolutamente. FitSuite Pro cuenta con una arquitectura de resiliencia operativa. El control de accesos, los cobros y la gestión siguen funcionando al 100% offline ante cortes de internet. El sistema se sincroniza automáticamente en segundo plano en cuanto vuelve la conexión."
  },
  {
    q: "¿Tengo que comprar molinetes o lectoras nuevas?",
    a: "No es necesario. Nos adaptamos al hardware que ya tenés. Desarrollamos la integración directa mediante relés y APIs nativas para lectores RFID, QR o biometría existentes, ahorrándote costosos gastos de recambio."
  },
  {
    q: "¿Cómo funciona el envío de recordatorios por WhatsApp?",
    a: "El sistema automatiza de forma inteligente los avisos de vencimientos de cuotas, alertas de morosidad y mensajes de cumpleaños. Todo sale de forma transparente y sin que tu recepción tenga que enviar un solo mensaje manual."
  }
];

// Tu número base para llamadas generales
const WHATSAPP_BASE_PHONE = "5492920513369"; 
const WHATSAPP_URL_GENERAL = `https://wa.me/${WHATSAPP_BASE_PHONE}?text=Hola%20quiero%20mis%2030%20d%C3%ADas%20de%20prueba%20gratis%20de%20FitSuite%20Pro`;

export default function App() {
  const listaMarquesina = [...CLIENTES_GYMS, ...CLIENTES_GYMS, ...CLIENTES_GYMS];
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);
  const [hoveredBadge, setHoveredBadge] = useState<number | null>(null);
  const [imagenesRotas, setImagenesRotas] = useState<Record<number, boolean>>({});
  // Agregá esto a tus estados dentro de App()
const [currentAppImg, setCurrentAppImg] = useState(0);
const appImages = ["/AppPWa.JPG", "/AppPWa2.JPG", "/AppPWa3.JPG", "/AppPWa4.JPG"];

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentAppImg((prev) => (prev + 1) % appImages.length);
  }, 3000);
  return () => clearInterval(interval);
}, []);

  // ESTADO PARA EL FORMULARIO DE REUNIÓN
  const [formData, setFormData] = useState({
    nombre: "",
    gym: "",
    dolor: ""
  });

  // MANEJADOR DEL FORMULARIO HACIA WHATSAPP
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mensaje = `¡Hola equipo de FitSuite Pro! 👋%0A%0ASoy *${formData.nombre}*, dueño de *${formData.gym}*.%0A%0AEl mayor problema que tengo hoy en mi gimnasio es:%0A_"${formData.dolor}"_%0A%0AQuiero agendar la demo para ver cómo pueden solucionarme esto.`;
    window.open(`https://wa.me/${WHATSAPP_BASE_PHONE}?text=${mensaje}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-orange-500/30 font-sans overflow-x-hidden">
      
      {/* NAV / HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-orange-600 flex items-center justify-center font-mono text-sm font-bold text-white shadow-[0_0_15px_rgba(234,88,12,0.5)]">
              FS
            </div>
            <span className="text-lg font-semibold tracking-tight">
              FitSuite <span className="text-orange-500 font-bold">Pro</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-400">
            <a href="#beneficios" className="hover:text-white transition-colors">Beneficios</a>
            <a href="#app" className="hover:text-white transition-colors">App Socios</a>
            <a href="#diferencial" className="hover:text-white transition-colors">Hardware</a>
            <a href="#reunion" className="hover:text-white transition-colors text-orange-400 font-bold">Agendar Demo</a>
          </nav>
          <a
            href={WHATSAPP_URL_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-orange-500 hover:text-white transition-all duration-300 text-sm"
          >
            <Zap className="h-4 w-4" /> 30 Días Gratis
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="top" className="relative pt-40 pb-24 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-950/30 via-neutral-950 to-neutral-950">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-mono uppercase tracking-widest text-orange-400 mb-8 animate-pulse">
            <Flame className="h-4 w-4 text-orange-500" /> El Ecosistema de Alto Rendimiento
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tighter mb-8 max-w-5xl mx-auto">
            Tu Gimnasio en <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-500 bg-clip-text text-transparent">Piloto Automático.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
            Velocidad sub-segundo en molinetes. Cobros que se persiguen solos. Socios adictos a entrenar. 
            La única plataforma con <span className="text-orange-400 font-semibold">resiliencia operativa offline</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#reunion"
              className="group relative inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-black text-lg overflow-hidden shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              <Zap className="h-5 w-5 group-hover:scale-125 transition-transform" /> Comenzar 30 Días Gratis
            </a>
            <a
              href="#diferencial"
              className="inline-flex items-center justify-center h-14 px-10 rounded-full border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900 transition text-lg font-bold w-full sm:w-auto"
            >
              Ver Integración <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </div>
          <p className="mt-6 text-sm text-neutral-500 font-medium">
            * Sin tarjeta de crédito. Instalación y asesoramiento técnico incluidos.
          </p>
        </div>
      </section>

      {/* 01 — BENEFICIOS */}
      <section id="beneficios" className="py-24 relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-orange-500 mb-4"></div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Diseñado para eliminar las fricciones diarias de tu negocio.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              i: Fingerprint,
              t: "Cero Filas en Recepción",
              d: "Validación inteligente y apertura de molinetes en menos de 0.4 segundos. Tus clientes ingresan de manera fluida sin requerir personal administrativo constante.",
            },
            {
              i: MessageCircle,
              t: "Cobranzas Automatizadas",
              d: "Emisión de recordatorios preventivos y alertas de morosidad personalizadas directo al WhatsApp del socio. Optimizá tu flujo de caja de manera orgánica.",
            },
            {
              i: Trophy,
              t: "Fidelización Mecanizada",
              d: "Estrategia de gamificación integrada que premia la constancia con insignias y desafíos. Reducí la tasa de abandono mensual de forma drástica.",
            },
          ].map((b) => (
            <div key={b.t} className="bg-neutral-900/40 backdrop-blur-md border border-neutral-900 rounded-2xl p-8 hover:border-orange-500 transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-orange-600/10 border border-orange-500/30 flex items-center justify-center mb-6 text-orange-500">
                <b.i className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{b.t}</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

     {/* APP PWA Y RUTINAS - CON CARRUSEL DINÁMICO */}
      <section id="app" className="py-24 bg-neutral-900/20 border-y border-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Mockup con Carrusel */}
          <div className="order-2 lg:order-1 relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 blur-3xl rounded-full" />
            <div className="relative bg-neutral-950 border border-neutral-800 rounded-[2.5rem] p-3 shadow-2xl max-w-sm transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-neutral-900 rounded-[2rem] overflow-hidden h-[600px] flex flex-col relative">
                {/* Aquí está el carrusel: cambia según el estado currentAppImg */}
                <img 
                  src={appImages[currentAppImg]} 
                  alt="FitSuite Pro App" 
                  className="w-full h-full object-cover transition-opacity duration-500" 
                />
                {/* Indicadores de página */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {appImages.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${i === currentAppImg ? 'bg-orange-500 w-4' : 'bg-neutral-600'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Texto descriptivo */}
          <div className="order-1 lg:order-2">
            <div className="font-mono text-xs uppercase tracking-widest text-orange-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              La App que los vuelve <span className="text-orange-500">Adictos a tu Gimnasio.</span>
            </h2>
            <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
              Tus socios llevan su evolución en el bolsillo mediante nuestra <strong>Progressive Web App</strong>. Ven sus rutinas, anotan sus pesos máximos y generan un compromiso real con sus resultados.
            </p>
            <ul className="space-y-5">
              {[
                { t: "Check-in digital ultrarrápido desde la pantalla del celular.", i: Zap },
                { t: "Registro histórico de pesos y progreso por ejercicio.", i: TrendingUp },
                { t: "Visualización de rutinas y videos asignados por los profes.", i: Activity },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-neutral-300 font-medium">
                  <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                    <item.i className="h-5 w-5 text-orange-500" />
                  </div>
                  {item.t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* GAMIFICACIÓN RPG */}
      <section className="py-24 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-xs uppercase tracking-widest mb-8">
          <Star className="h-4 w-4" /> Motor de Gamificación Nativo
        </div>
        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
          Convertí el sudor en <span className="text-purple-400">Estatus y Recompensas.</span>
        </h2>
        <p className="text-lg text-neutral-400 max-w-3xl mx-auto mb-16 leading-relaxed">
          El único sistema con un motor RPG incorporado. Tus socios ganan experiencia, suben de nivel y desbloquean insignias por entrenar o crear rachas. <strong>La retención se dispara sola.</strong>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: "Leyenda Viviente", l: "NIVEL 100", c: "from-fuchsia-500 to-purple-600", i: Trophy, d: "El máximo estatus alcanzable." },
            { n: "Máquina Humana", l: "RACHA 30 DÍAS", c: "from-cyan-400 to-blue-500", i: Flame, d: "Entrenar 30 días seguidos." },
            { n: "Fuerza Bruta", l: "+100 KG", c: "from-red-500 to-orange-600", i: Dumbbell, d: "Superar los 100kg en un ejercicio." },
            { n: "Vampiro", l: "HORARIO EXTREMO", c: "from-neutral-700 to-black border border-red-500/50", i: Clock, d: "Entrenar después de las 23:00." },
          ].map((badge, i) => (
            <div 
              key={i} 
              onMouseEnter={() => setHoveredBadge(i)}
              onMouseLeave={() => setHoveredBadge(null)}
              className={`relative bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 text-center transition-all duration-300 ${hoveredBadge === i ? 'scale-105 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)] bg-neutral-900' : ''}`}
            >
              <div className={`h-16 w-16 mx-auto rounded-full bg-gradient-to-br ${badge.c} flex items-center justify-center shadow-lg mb-4 transform transition-transform duration-500 ${hoveredBadge === i ? 'rotate-12' : ''}`}>
                <badge.i className="h-6 w-6 text-white drop-shadow-md" />
              </div>
              <p className="font-bold text-base leading-tight mb-1">{badge.n}</p>
              <p className="text-[10px] font-mono font-bold text-purple-400 mb-3">{badge.l}</p>
              <p className="text-xs text-neutral-500">{badge.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOT DE WHATSAPP */}
      <section className="py-24 bg-gradient-to-b from-green-900/10 to-neutral-950 border-y border-green-900/20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-green-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Tu propio <span className="text-green-500">Asistente de Cobranzas</span> por WhatsApp.
            </h2>
            <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
              Olvidate de que los recepcionistas pierdan tiempo mandando mensajitos incómodos. Nuestra IA detecta vencimientos y envía recordatorios preventivos automáticamente. <strong>Recuperá morosos sin mover un dedo.</strong>
            </p>
            <div className="space-y-4">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 flex gap-4">
                <Bot className="h-6 w-6 text-green-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">Cuentas Claras Automáticas</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">Si el socio debe, el bot le manda el link de Mercado Pago, el socio paga, y el sistema le destraba el molinete en el acto.</p>
                </div>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 flex gap-4">
                <MessageCircle className="h-6 w-6 text-orange-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">Fidelización Activa</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">Saludos automáticos de cumpleaños, avisos de inasistencia ("¡Te extrañamos!") y notificaciones de rutinas nuevas.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
            <div className="flex items-center gap-3 mb-6 border-b border-neutral-800 pb-4">
              <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center shadow-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">FitSuite IA</h3>
                <p className="text-[10px] text-green-500 uppercase tracking-widest font-bold">En línea</p>
              </div>
            </div>
            
            <div className="space-y-4 font-sans text-sm">
              <div className="bg-neutral-800 rounded-2xl rounded-tl-sm p-4 w-10/12 text-neutral-300 leading-relaxed">
                ¡Hola Marcos! 👋 Te aviso que tu plan "Musculación Full" vence mañana. Podés renovarlo por aca, cuando verifiquen tu pago, pasás directo por el molinete. 💪
              </div>
              <div className="flex justify-end">
                <div className="bg-green-600 rounded-2xl rounded-tr-sm p-4 w-8/12 text-white leading-relaxed">
                  ¡Ah, genial! Ahí lo pagué, gracias por el aviso.
                </div>
              </div>
              <div className="bg-neutral-800 rounded-2xl rounded-tl-sm p-4 w-10/12 text-neutral-300 leading-relaxed">
                ¡Pago recibido! ✅ Membresía activa. Además, te ganaste la insignia "Autosuficiente". ¡Nos vemos en el gym! 🏆
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUESINA DE VERIFICACIÓN REAL (LOGOS PROFESIONALES) */}
      <section id="clientes" className="py-20 bg-neutral-900/30 border-y border-neutral-800 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-mono uppercase tracking-widest text-green-400 mb-4">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
            En Producción Real
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Gimnasios que ya escalaron al <span className="text-orange-500">siguiente nivel.</span>
          </h2>
        </div>

        <div className="w-full overflow-hidden">
          <div className="animate-marquee gap-8 py-4">
            {listaMarquesina.map((gym, idx) => (
              <a 
                key={idx} 
                href={gym.mapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-8 bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/80 px-10 py-6 rounded-3xl min-w-[380px] justify-start flex-nowrap transition-all duration-300 hover:scale-105 hover:border-orange-500/80 hover:bg-neutral-900 hover:shadow-[0_0_50px_rgba(234,88,12,0.15)] group"
              >
                <div className="h-16 w-auto max-w-[160px] flex items-center justify-center shrink-0">
                  {gym.logoUrl && !imagenesRotas[idx] ? (
                    <img 
                      src={gym.logoUrl} 
                      alt={gym.nombre} 
                      onError={() => setImagenesRotas(prev => ({ ...prev, [idx]: true }))}
                      className="h-full w-auto max-w-full object-contain filter group-hover:scale-110 transition-transform duration-300 brightness-110 drop-shadow-md" 
                    />
                  ) : (
                    <div className="h-full aspect-square bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/20 group-hover:bg-orange-500/20 transition-colors shrink-0">
                      <Dumbbell className="h-8 w-8 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-start text-left flex-1 min-w-0">
                  <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                    {gym.nombre}
                  </span>
                  <span className="inline-flex items-center gap-1.5 mt-2 px-3.5 py-1 rounded-full bg-neutral-800 text-[10px] font-bold font-mono text-neutral-400 group-hover:bg-orange-500 group-hover:text-white transition-colors shadow-sm">
                    <MapPin className="h-3 w-3" /> Maps ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — HARDWARE TO SOFTWARE */}
      <section id="diferencial" className="py-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-orange-500 mb-4"></div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            El Panel de Control de un <span className="text-orange-500">CEO.</span>
          </h2>
          <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
            Sin intermediarios ni middlewares aacomplejos. FitSuite Pro se comunica directamente con las controladoras y relés de tu gimnasio mediante una infraestructura robusta.
          </p>
          <ul className="space-y-4">
            {[
              { i: Cable, t: "Soporte nativo para relés industriales y automatización de molinetes." },
              { i: Wrench, t: "Módulo de Mantenimiento Preventivo para el cuidado de tus máquinas." },
              { i: WifiOff, t: "Resiliencia Operativa: Tu gimnasio sigue funcionando 100% offline ante cortes de red." },
            ].map((x) => (
              <li key={x.t} className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-orange-500">
                  <x.i className="h-5 w-5" />
                </div>
                <span className="text-neutral-300 font-medium">{x.t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-orange-500/5 blur-3xl rounded-3xl" />
          <div className="relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 h-11 border-b border-neutral-800 bg-neutral-950/50">
              <div className="flex items-center gap-6">
                <span className="text-xs font-mono font-bold tracking-wider text-orange-500">FITSUITE GATEWAY v2.0</span>
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-neutral-800" />
                <div className="h-2 w-2 rounded-full bg-neutral-800" />
              </div>
            </div>
            <div className="p-6 font-mono text-xs space-y-3 bg-neutral-950/20 text-neutral-400">
              <div className="flex justify-between border-b border-neutral-900 pb-2">
                <span className="text-neutral-500">[Lectura RFID]</span>
                <span className="text-orange-400 font-bold">Tarjeta ID #4821 detectada</span>
              </div>
              <div className="flex justify-between border-b border-neutral-900 pb-2">
                <span className="text-neutral-500">[Estado Socio]</span>
                <span className="text-green-400">Cuota al día · Plan Musculación</span>
              </div>
              <div className="flex justify-between border-b border-neutral-900 pb-2">
                <span className="text-neutral-500">[Actuador Relé]</span>
                <span className="text-orange-400">Pulso de apertura enviado (0.4s) ✓</span>
              </div>
              <div className="flex justify-between text-neutral-500 pt-1">
                <span>[Estado de Red]</span>
                <span className="text-neutral-300 font-bold">Conexión Estable</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-px bg-neutral-800 border-t border-neutral-800 text-center">
              {[
                { t: "Uptime Puertas", v: "99.98%" },
                { t: "Latencia Sistema", v: "0.15s" },
                { t: "Modo Offline", v: "Activo" },
              ].map((k) => (
                <div key={k.t} className="bg-neutral-900 p-4">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono">{k.t}</div>
                  <div className="text-sm font-bold mt-1 font-mono text-orange-500">{k.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
{/* 05 — GESTIÓN DE RRHH */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600" />
            <h3 className="text-xl font-black mb-6">Gestión de Personal</h3>
            <div className="space-y-4 font-mono text-xs text-neutral-400">
               <div className="flex justify-between p-3 bg-neutral-800 rounded-lg"><span>Juan Pérez (Profesor)</span><span className="text-purple-400 font-bold">$145.000</span></div>
               <div className="flex justify-between p-3 bg-neutral-800 rounded-lg"><span>Comisión % (Plan Full)</span><span className="text-neutral-300">40%</span></div>
               <div className="flex justify-between p-3 bg-neutral-800 rounded-lg"><span>Alquiler Espacio</span><span className="text-neutral-300">Mensual</span></div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="font-mono text-xs uppercase tracking-widest text-purple-500 mb-4"></div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Tu equipo, <span className="text-purple-400">bajo control total.</span></h2>
          <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
            Manejá profesores externos, contratos por porcentaje, alquileres de espacio o sueldos fijos. Todo integrado con el control de asistencia para liquidar horas trabajadas automáticamente.
          </p>
        </div>
      </section>

      {/* 06 — SISTEMA POS */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-blue-500 mb-4"></div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Tienda, Stock y Facturación <span className="text-blue-500">en un solo clic.</span>
          </h2>
          <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
            No necesitas programas extra. Vendé suplementos, indumentaria o servicios extras. Control de stock en tiempo real, lector de códigos de barras y cierre de caja automatizado.
          </p>
        </div>
        <div>
           <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-600" />
            <h3 className="text-xl font-black mb-6">Cierre de Caja</h3>
            <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between border-b border-neutral-800 pb-2"><span>Total Ventas</span><span className="text-blue-400 font-bold">$250.000</span></div>
                <div className="flex justify-between border-b border-neutral-800 pb-2"><span>Efectivo</span><span className="text-white">$120.000</span></div>
                <div className="flex justify-between border-b border-neutral-800 pb-2"><span>Mercado Pago</span><span className="text-white">$130.000</span></div>
            </div>
          </div>
        </div>
      </section>
      {/* COMPARATIVA DE COSTOS: SUSCRIPCIÓN MENSUAL */}
      <section id="comparativa" className="py-24 bg-neutral-900/10 border-y border-neutral-900 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-orange-500 mb-4"></div>
          <h2 className="text-4xl font-black tracking-tight mb-4">Evitá costos ocultos y escalá seguro.</h2>
          <p className="text-neutral-400 text-lg">Un modelo de suscripción predecible. Olvidate de compras de software carísimas y actualizaciones sorpresa.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Tradicional */}
          <div className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-8 opacity-60">
            <h3 className="text-lg font-bold mb-6 text-neutral-400 flex items-center gap-2">
              <XCircle className="text-neutral-500 h-5 w-5" /> Sistemas Tradicionales
            </h3>
            <ul className="space-y-4 text-sm text-neutral-500 font-medium">
              <li className="flex items-start gap-3"><span className="text-red-500 font-bold">✕</span> Compra inicial elevada o licencias anuales obligatorias.</li>
              <li className="flex items-start gap-3"><span className="text-red-500 font-bold">✕</span> Cargos ocultos por usar el middleware del molinete.</li>
              <li className="flex items-start gap-3"><span className="text-red-500 font-bold">✕</span> Si se corta internet, no entra nadie (o entran gratis).</li>
              <li className="flex items-start gap-3"><span className="text-red-500 font-bold">✕</span> Necesitás contratar servicios de bots externos aparte.</li>
            </ul>
          </div>
          {/* FitSuite Pro */}
          <div className="bg-neutral-900/80 border border-orange-500/40 shadow-[0_0_30px_rgba(234,88,12,0.15)] rounded-2xl p-8 relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-400 to-red-500" />
            
            {/* BADGE 30 DÍAS GRATIS */}
            <div className="absolute top-4 right-[-30px] bg-red-600 text-white font-black text-[10px] px-10 py-1.5 transform rotate-45 shadow-lg tracking-widest">
              30 DÍAS GRATIS
            </div>

            <h3 className="text-xl font-black mb-6 text-orange-400 flex items-center gap-2 mt-2">
              <CheckCircle2 className="text-orange-500 h-6 w-6" /> Suscripción FitSuite Pro
            </h3>
            <ul className="space-y-4 text-sm text-neutral-200 font-medium">
              <li className="flex items-start gap-3"><CheckCircle2 className="text-orange-500 h-5 w-5 shrink-0" /> Suscripción mensual accesible y escalable sin pagos iniciales absurdos.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-orange-500 h-5 w-5 shrink-0" /> Resiliencia operativa: El sistema sigue funcionando 100% offline ante cortes de red.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-orange-500 h-5 w-5 shrink-0" /> Bot IA de WhatsApp y App de socios incluidos desde el día 1.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-green-500 h-5 w-5 shrink-0" /> <span className="text-green-400 font-bold">Iniciá hoy con 30 días de prueba sin riesgo.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (FAQS) */}
      <section id="faqs" className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-orange-500 mb-4"></div>
          <h2 className="text-4xl font-black tracking-tight">Preguntas Frecuentes</h2>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-neutral-900/40 border border-neutral-800 rounded-xl overflow-hidden transition-all">
              <button
                onClick={() => setFaqAbierta(faqAbierta === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left font-bold text-neutral-200 hover:text-orange-400 transition-colors"
              >
                <span className="flex items-center gap-3 text-base">
                  <HelpCircle className="h-5 w-5 text-neutral-500 shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown className={`h-5 w-5 text-neutral-500 transition-transform duration-300 ${faqAbierta === idx ? "transform rotate-180 text-orange-500" : ""}`} />
              </button>
              {faqAbierta === idx && (
                <div className="px-6 pb-6 text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/50 pt-4 font-normal">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 NUEVO: FORMULARIO DE REUNIÓN / DIAGNÓSTICO (LEAD GEN) 🔥 */}
      <section id="reunion" className="py-32 relative border-t border-orange-500/20 bg-neutral-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-neutral-950 to-neutral-950" />
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          
          {/* Copy agresivo de Ventas */}
          <div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
              Tu gimnasio está perdiendo plata.<br/>
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Averigüemos dónde.</span>
            </h2>
            <p className="text-xl text-neutral-400 mb-8 font-medium">
              Contanos cuál es tu mayor cuello de botella operativo y te demostramos en vivo cómo FitSuite Pro lo automatiza.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-neutral-300 font-medium">
                <CheckCircle2 className="h-5 w-5 text-orange-500" /> Instalación y configuración guiada.
              </li>
              <li className="flex items-center gap-3 text-neutral-300 font-medium">
                <CheckCircle2 className="h-5 w-5 text-orange-500" /> 30 días de prueba 100% bonificados.
              </li>
              <li className="flex items-center gap-3 text-neutral-300 font-medium">
                <CheckCircle2 className="h-5 w-5 text-orange-500" /> Demo enfocada en tu problema real.
              </li>
            </ul>
          </div>

          {/* Formulario que dispara a WhatsApp */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-500 to-red-600" />
            <h3 className="text-2xl font-black mb-6">Agendar Demostración</h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wide mb-2">Tu Nombre</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Marcos Pérez"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wide mb-2">Nombre de tu Gimnasio</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Titan Fitness Center"
                  value={formData.gym}
                  onChange={(e) => setFormData({...formData, gym: e.target.value})}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wide mb-2">¿Cuál es tu mayor dolor de cabeza hoy?</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Ej: Cobrarle a los socios morosos a tiempo..."
                  value={formData.dolor}
                  onChange={(e) => setFormData({...formData, dolor: e.target.value})}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full group relative inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-orange-600 text-white font-black text-lg overflow-hidden hover:bg-orange-500 transition-all duration-300 shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)]"
              >
                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                Agendar y Resolver
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FOOTER METADATOS COMPAÑÍA REAL */}
      <footer id="contacto" className="border-t border-neutral-900 py-16 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-md bg-orange-600 flex items-center justify-center font-mono text-sm font-bold text-white shadow-[0_0_15px_rgba(234,88,12,0.4)]">
                FS
              </div>
              <span className="text-lg font-semibold tracking-tight">FitSuite <span className="text-orange-500 font-bold">Pro</span></span>
            </div>
            <p className="text-neutral-400 max-w-sm text-sm leading-relaxed">
              Ecosistema integral de automatización para centros deportivos desarrollada por la empresa de ingeniería de software <span className="text-neutral-200 font-medium font-mono">tresbits010</span>.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-neutral-500">Contacto Directo</h4>
            <ul className="space-y-3 text-sm text-neutral-400 font-medium">
              <li className="flex items-center gap-3 hover:text-orange-400 transition-colors">
                <MessageCircle className="h-4 w-4 text-neutral-600" />
                <a href={WHATSAPP_URL_GENERAL} target="_blank" rel="noopener noreferrer">Atención Comercial ↗</a>
              </li>
              <li className="flex items-center gap-3 hover:text-orange-400 transition-colors">
                <Mail className="h-4 w-4 text-neutral-600" />
                <a href="mailto:tresbits010@gmail.com">tresbits010@gmail.com</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-neutral-500">Ingeniería & Soporte</h4>
            <p className="text-sm text-neutral-400 flex items-center gap-3 font-medium">
              <MapPin className="h-4 w-4 text-neutral-600" />
              <span>Viedma, Río Negro-Argentina</span>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between gap-4 text-xs text-neutral-600 font-mono font-medium">
          <span>© {new Date().getFullYear()} tresbits010. Elevando el estándar del Fitness. Todos los derechos reservados.</span>
        </div>
      </footer>
    </main>
  );
}