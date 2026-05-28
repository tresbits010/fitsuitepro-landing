import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideSheet from './SideSheet';
import {
  Dumbbell,
  Flame,
  Music2,
  HeartPulse,
  Check,
  MapPin,
  Clock,
  Menu,
  X,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

const claseIcono = (nombre: string) => {
  const n = nombre.toLowerCase();
  if (n.includes("cross")) return Flame;
  if (n.includes("zumba")) return Music2;
  if (n.includes("yoga") || n.includes("pilates")) return HeartPulse;
  return Dumbbell;
};

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#galeria", label: "Instalaciones" },
  { href: "#clases", label: "Clases" },
  { href: "#planes", label: "Planes" },
  { href: "#contacto", label: "Contacto" },
];

export default function GymProfile() {
  // 🔥 ESTADOS REACT (Siempre adentro del componente) 🔥
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'terminos' | 'privacidad'>('terminos');
  
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const { gymSlug } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [imagenAmpliada, setImagenAmpliada] = useState<string | null>(null);
const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
const [countdown, setCountdown] = useState(5);
  // Ícono de Instagram manual para evitar el error de lucide-react
  const InstagramIcon = ({ size = 16, className = "" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );

  useEffect(() => {
    // 🔥 Agregamos el timestamp para evitar la caché del navegador
    fetch(`https://rescate-gym-offline.tresbits010.workers.dev/api/get/${gymSlug}?t=${Date.now()}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando datos:", err);
        setLoading(false);
      });
  }, [gymSlug]);

  if (loading) return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
      <div className="animate-pulse font-bold text-xl" style={{ color: '#f97316' }}>Cargando info...</div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6 text-center">
      <p>No pudimos encontrar la información de este gimnasio. Por favor, verifica la configuración.</p>
    </div>
  );

  // --- FALLBACKS ---
  const logoUrl = data.logo_url || "https://placehold.co/150x150/111/f97316?text=Logo";
  const bannerUrl = data.banner_url || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop";
  const historia = data.historia || "Bienvenidos a nuestro centro de entrenamiento. Estamos comprometidos con tu progreso y bienestar físico y mental.";
  const galeriaData = data.galeria?.length > 0 ? data.galeria : [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574680093668-39f50e4568b5?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  ];
  
  const clasesData = data.clases?.length > 0 ? data.clases : [];
  
  const planesData = data.planes?.length > 0 ? data.planes : [
    { nombre: "Pase Libre Diario", precio: "$15.000", beneficios: ["Musculación libre", "Duchas"] },
    { nombre: "Premium Mensual", precio: "$25.000", beneficios: ["Musculación", "Todas las clases", "Nutrición"] },
  ];

  // 🔥 AGRUPACIÓN INTELIGENTE CON PROTECCIÓN 🔥
  const clasesAgrupadas = Object.values(
    clasesData.reduce((acc: any, curr: any) => {
      // Si el objeto no tiene nombre, lo saltamos para evitar errores
      if (!curr.nombre) return acc; 
      
      const key = `${curr.nombre}-${curr.profe}`;
      
      if (!acc[key]) {
        acc[key] = {
          nombre: curr.nombre,
          profe: curr.profe,
          schedules: {} 
        };
      }
      
      const horario = curr.horario || "Horario no definido";
      const dia = curr.dia !== undefined ? curr.dia : 0; // Fallback a Domingo si falta el día

      if (!acc[key].schedules[horario]) {
        acc[key].schedules[horario] = new Set();
      }
      acc[key].schedules[horario].add(dia);
      return acc;
    }, {})
  ).map((c: any) => {
    const nombresDias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    
    const turnos = Object.keys(c.schedules).map((horario) => {
      const diasOrdenados = Array.from(c.schedules[horario]).sort((a: any, b: any) => a - b) as number[];
      const diasTexto = diasOrdenados.map(d => nombresDias[d]).join(", ");
      
      return {
        dias: diasTexto,
        horario: horario
      };
    });

    return {
      nombre: c.nombre,
      profe: c.profe,
      turnos: turnos
    };
  });

  // Links limpios
  const waLink = data.whatsapp ? `https://wa.me/${data.whatsapp.replace(/\D/g, '')}` : "#";
const mapLink = data.direccion ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.direccion)}` : "#";
  const igLink = data.instagram ? `https://instagram.com/${data.instagram.replace("@", "")}` : "#";

  // 🔥 VARIABLES CSS DINÁMICAS BASADAS EN C# 🔥
  const themeStyle = {
    '--primary-color': data.color_tema || '#f97316',
    '--glow-color': data.glow_tema || '#f97316'
  } as React.CSSProperties;

  return (
    <main style={themeStyle} className="min-h-screen bg-neutral-950 text-white scroll-smooth">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-800/60 bg-neutral-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#inicio" className="flex items-center gap-2">
            {/* Globo estilo neón */}
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--primary-color)', boxShadow: '0 0 12px var(--glow-color)' }} />
            <span className="text-sm font-black uppercase tracking-widest text-white">
              {data.nombre}
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-semibold text-neutral-400 transition"
                style={{ transition: 'color 0.3s' }}
                onMouseOver={(e) => (e.currentTarget.style.color = data.color_tema || '#f97316')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#9ca3af')} // neutral-400
              >
                {l.label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-md p-2 text-white hover:bg-neutral-800"
            aria-label="Menú"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <nav className="md:hidden border-t border-neutral-800/60 bg-neutral-950">
            <div className="mx-auto flex max-w-6xl flex-col px-5 py-3">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-semibold text-neutral-400 transition"
                  onMouseOver={(e) => (e.currentTarget.style.color = data.color_tema || '#f97316')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#9ca3af')}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section
        id="inicio"
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-16"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/70 to-neutral-950" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center">
          <img
            src={logoUrl}
            alt={`${data.nombre} logo`}
            className="h-56 w-56 md:h-56 md:w-56 rounded-full border-4 object-cover"
            style={{ borderColor: 'var(--primary-color)', boxShadow: '0 0 40px -5px var(--glow-color)' }}
          />
          <span className="mt-6 text-xs font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--primary-color)' }}>
            Entrená sin excusas
          </span>
          <h1 className="mt-4 text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-8xl">
            {data.nombre} 
          </h1>
          <p className="mt-6 max-w-xl text-base italic text-neutral-400 md:text-lg">
            Tu fuerza, tu ritmo, tu transformación. Forjá la mejor versión de vos.
          </p>
          <a
            href="#contacto"
            className="mt-10 inline-flex items-center gap-3 rounded-full px-10 py-4 text-base font-black uppercase tracking-wider text-white transition hover:scale-105"
            style={{ backgroundColor: 'var(--primary-color)', boxShadow: '0 0 30px -5px var(--glow-color)' }}
          >
            <Flame size={20} />
            Comenzar ahora
          </a>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="border-t border-neutral-800/60 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--primary-color)' }}>
            Sobre nosotros
          </span>
          <h2 className="mt-4 text-4xl font-black uppercase tracking-tight md:text-6xl">
            Más que un <span style={{ color: 'var(--primary-color)' }}>gimnasio</span>
          </h2>
          <p className="mt-8 text-lg italic leading-relaxed text-neutral-400 md:text-xl">
            “{historia}”
          </p>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="border-t border-neutral-800/60 bg-neutral-950 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--primary-color)' }}>
              El Gimnasio
            </span>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-tight md:text-6xl">
              Instalaciones
            </h2>
            <p className="mt-3 italic text-neutral-400">
              Conocé el lugar donde vas a forjar tu mejor versión.
            </p>
          </div>

          {/* Grilla de fotos */}
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5">
            {galeriaData.map((imgUrl: string, idx: number) => (
              <div
                key={idx}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-neutral-900 cursor-pointer border border-transparent transition-all duration-300"
                onClick={() => setImagenAmpliada(imgUrl)}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = data.color_tema || '#f97316')}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = 'transparent')}
              >
                {/* Capa oscura que desaparece al hacer hover */}
                <div className="absolute inset-0 z-10 bg-black/40 transition-opacity duration-300 group-hover:opacity-0" />
                
                <img
                  src={imgUrl}
                  alt={`Instalación ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLASES */}
      <section
        id="clases"
        className="border-t border-neutral-800/60 bg-neutral-900/40 px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--primary-color)' }}>
              Disciplinas
            </span>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-tight md:text-6xl">
              Nuestras Clases
            </h2>
            <p className="mt-3 italic text-neutral-400">
              Encontrá la que te haga sudar.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clasesAgrupadas.length === 0 && (
               <p className="col-span-full text-center text-neutral-500 italic">Aún no hay clases disponibles.</p>
            )}
            
            {clasesAgrupadas.map((c: any, index: number) => {
              const Icon = claseIcono(c.nombre);
              const tieneProfe = c.profe && c.profe.trim() !== "" && c.profe.trim() !== "Staff";

              return (
                <article
                  key={`${c.nombre}-${index}`}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-7 transition hover:-translate-y-1"
                  style={{ transition: 'all 0.3s' }}
                  onMouseOver={(e) => (e.currentTarget.style.borderColor = data.color_tema || '#f97316')}
                  onMouseOut={(e) => (e.currentTarget.style.borderColor = '#262626')} // neutral-800
                >
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl transition opacity-10 group-hover:opacity-20" style={{ backgroundColor: 'var(--primary-color)' }} />
                  <div className="relative flex flex-col h-full">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-800" style={{ color: 'var(--primary-color)' }}>
                      <Icon size={28} />
                    </div>
                    <h3 className="mt-6 text-2xl font-black uppercase">
                      {c.nombre}
                    </h3>
                    
                    {/* Renderizado de las etiquetas de horarios */}
                    <div className="mt-4 flex flex-col gap-2 flex-1">
                      {c.turnos.map((turno: any, idx: number) => (
                        <div key={idx} className="flex flex-col gap-1 rounded-lg bg-neutral-950 p-2.5 border border-neutral-800/60">
                          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                            {turno.dias}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                            <Clock size={12} style={{ color: 'var(--primary-color)' }} />
                            {turno.horario}
                          </span>
                        </div>
                      ))}
                    </div>

                    {tieneProfe && (
                      <p className="mt-5 text-sm italic text-neutral-400">
                        con <span className="text-white font-semibold">{c.profe}</span>
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="border-t border-neutral-800/60 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
          
            <h2 className="mt-4 text-4xl font-black uppercase tracking-tight md:text-6xl">
              Planes y Precios <span style={{ color: 'var(--primary-color)' }}>Vigentes</span>
            </h2>
            <p className="mt-3 italic text-neutral-400">
              Elegí el que mejor se adapte a tu ritmo.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {planesData.map((p: any) => {
              const featured = p.es_destacado === true;
              return (
                <article
                  key={p.nombre}
                  className={`relative flex flex-col rounded-2xl border p-8 transition hover:-translate-y-1`}
                  style={{
                    borderColor: featured ? 'var(--primary-color)' : '#262626',
                    backgroundColor: featured ? '#171717' : 'rgba(23, 23, 23, 0.6)',
                    boxShadow: featured ? '0 0 60px -20px var(--glow-color)' : 'none'
                  }}
                >
                  {featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
                      Más elegido
                    </span>
                  )}
                  <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400">
                    {p.nombre}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-5xl font-black tracking-tight">
                      {p.precio}
                    </span>
                  </div>
                  <ul className="mt-8 space-y-3 flex-1">
                    {p.beneficios.map((b: string) => (
                      <li
                        key={b}
                        className="flex items-center gap-3 text-sm text-neutral-400"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800" style={{ color: 'var(--primary-color)' }}>
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={data.whatsapp ? `https://wa.me/${data.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola! Quiero info del plan ${p.nombre}`)}` : "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-10 flex items-center justify-center rounded-xl px-5 py-3 text-sm font-black uppercase tracking-wider transition"
                    style={{
                      backgroundColor: featured ? 'var(--primary-color)' : '#262626',
                      color: featured ? 'white' : '#d4d4d8',
                      border: featured ? 'none' : '1px solid #3f3f46'
                    }}
                    onMouseOver={(e) => {
                      if (!featured) {
                        e.currentTarget.style.borderColor = data.color_tema || '#f97316';
                        e.currentTarget.style.color = data.color_tema || '#f97316';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!featured) {
                        e.currentTarget.style.borderColor = '#3f3f46';
                        e.currentTarget.style.color = '#d4d4d8';
                      }
                    }}
                  >
                    Lo quiero
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section
        id="contacto"
        className="border-t border-neutral-800/60 bg-neutral-900/40 px-6 py-24"
      >
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--primary-color)' }}>
            Contacto
          </span>
          <h2 className="mt-4 text-4xl font-black uppercase tracking-tight md:text-6xl">
            Vení a entrenar
          </h2>

          <div className="mx-auto mt-10 inline-flex flex-col items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-900 px-8 py-6">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--primary-color)' }}>
              <Clock size={16} /> Horarios
            </div>
            <p className="text-base italic text-neutral-400 md:text-lg">
              {data.horario || "Consultar horarios"}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4">
            {data.whatsapp && (
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 px-8 py-6 text-lg font-black uppercase tracking-wider text-white transition hover:scale-[1.02]"
                style={{ boxShadow: '0 0 40px -10px #16a34a' }}
              >
                <MessageCircle size={26} className="transition group-hover:rotate-12" />
                Escribinos por WhatsApp
              </a>
            )}
            
            {data.direccion && (
              <a
                href={mapLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-800 px-8 py-4 text-sm font-black uppercase tracking-wider text-white transition"
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = data.color_tema || '#f97316';
                  e.currentTarget.style.color = data.color_tema || '#f97316';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#262626';
                  e.currentTarget.style.color = 'white';
                }}
              >
                <MapPin size={18} />
                Ver ubicación
              </a>
            )}
          </div>

          <div className="mt-12 flex flex-col items-center gap-3 text-sm text-neutral-400">
           
            {(
              <a
                href={igLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-semibold transition"
                onMouseOver={(e) => (e.currentTarget.style.color = data.color_tema || '#f97316')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                <InstagramIcon size={34} />
              
              </a>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER DEL GIMNASIO */}
      <footer className="border-t border-neutral-800/60 bg-neutral-950 px-6 py-8 text-center">
        <p className="text-xs uppercase tracking-widest text-neutral-400">
          © {new Date().getFullYear()} {data.nombre} — Forjá tu fuerza.
        </p>
      </footer>

      {/* CONTENEDOR PRINCIPAL TRESBITS010 */}
      <div className="flex justify-center border-t border-neutral-900 bg-[#050505] px-6 py-8">
        <div className="flex w-full max-w-6xl items-center justify-between">
          
          {/* 1. IZQUIERDA: Links de Soporte (Solo visible en pantallas grandes) */}
          <div className="hidden md:flex flex-col gap-1 text-left">
            <button onClick={() => setIsSupportOpen(true)} className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 hover:text-emerald-500 transition text-left">
              Soporte Técnico
            </button>
            <button onClick={() => setIsTermsOpen(true)} className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 hover:text-emerald-500 transition text-left">
              Términos de Uso
            </button>
          </div>

          {/* 2. CENTRO: Tu cápsula */}
          <a
            href="https://www.instagram.com/tresbits010"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-full bg-neutral-900/40 px-4 py-2.5 ring-1 ring-neutral-800/60 transition-all duration-300 hover:bg-neutral-800/60 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:ring-neutral-700"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 transition-colors group-hover:bg-neutral-800">
              <ShieldCheck size={16} className="text-emerald-500" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">
                Tecnología y Gestión por
              </span>
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <span className="text-sm font-black tracking-wide text-white">
                  FitSuite<span style={{ color: 'var(--primary-color)' }}>Pro</span>
                </span>
                <span className="text-[10px] font-medium text-neutral-500 transition-colors group-hover:text-neutral-400">
                  by tresbits010
                </span>
              </div>
            </div>
          </a>

          {/* 3. DERECHA: Social / Info extra */}
          <div className="hidden md:flex items-center gap-6">
            <a href="https://fitsuitepro.com" target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 hover:text-white transition">
              Web Oficial
            </a>
            <a href="https://instagram.com/tresbits010" target="_blank" rel="noreferrer" className="text-neutral-600 hover:text-emerald-500 transition">
              <InstagramIcon size={18} />
            </a>
          </div>

        </div>
      </div>

      {/* LIGHTBOX (VISOR DE IMÁGENES AMPLIADAS) */}
      {imagenAmpliada && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm transition-opacity"
          onClick={() => setImagenAmpliada(null)}
        >
          <button 
            className="absolute right-6 top-6 rounded-full bg-neutral-800/50 p-3 text-white transition hover:bg-neutral-700 hover:text-white"
            onClick={() => setImagenAmpliada(null)}
          >
            <X size={28} />
          </button>
          <img 
            src={imagenAmpliada} 
            alt="Vista ampliada" 
            className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
<SideSheet isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} title="Información Legal">
  
  {/* Selector de Pestañas */}
  <div className="flex border-b border-neutral-800 mb-6">
    <button 
      className={`pb-2 px-4 text-sm font-bold uppercase tracking-widest transition ${activeTab === 'terminos' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-neutral-500'}`}
      onClick={() => setActiveTab('terminos')}
    >
      Términos
    </button>
    <button 
      className={`pb-2 px-4 text-sm font-bold uppercase tracking-widest transition ${activeTab === 'privacidad' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-neutral-500'}`}
      onClick={() => setActiveTab('privacidad')}
    >
      Privacidad
    </button>
  </div>

  {/* Contenido Dinámico */}
  <div className="text-neutral-300 text-sm space-y-5 leading-relaxed">
   {activeTab === 'terminos' ? (
   <div className="space-y-4 text-neutral-300">
     <h4 className="font-bold text-white text-base">1. Condiciones Generales</h4>
     <p>El uso de este sitio web y de los servicios ofrecidos por <strong>{data.nombre}</strong> implica la aceptación plena y sin reservas de todos los puntos detallados en estos términos.</p>
     
     <h4 className="font-bold text-white text-base">2. Salud y Seguridad</h4>
     <p>La práctica de actividad física conlleva riesgos inherentes. Todo usuario que utilice nuestras instalaciones o participe en clases (ya sea presenciales o guiadas por nuestros instructores) declara estar en condiciones físicas aptas para el ejercicio. Es responsabilidad exclusiva del usuario realizarse los chequeos médicos pertinentes y consultar a un profesional de la salud antes de comenzar.</p>
     
     <h4 className="font-bold text-white text-base">3. Información sobre Planes y Precios</h4>
     <p>Los valores publicados en este sitio son orientativos y pueden variar según promociones vigentes, impuestos aplicables o cambios en la política de precios de <strong>{data.nombre}</strong>. Los mismos serán confirmados fehacientemente al momento de formalizar la inscripción en nuestras instalaciones.</p>
     
     <h4 className="font-bold text-white text-base">4. Propiedad Intelectual</h4>
     <p>Todo el contenido presente en este sitio (logos, imágenes, textos, diseño de rutinas) es propiedad exclusiva de <strong>{data.nombre}</strong> o de sus creadores tecnológicos. Queda prohibida la copia, distribución o uso comercial sin autorización expresa.</p>
     
     <h4 className="font-bold text-white text-base">5. Exención de Responsabilidad</h4>
     <p><strong>{data.nombre}</strong> no se hace responsable por la pérdida o daño de objetos personales dentro de las instalaciones, ni por cualquier incidente derivado del uso indebido de la maquinaria o de la omisión de las instrucciones brindadas por nuestros profesionales.</p>
     
     <h4 className="font-bold text-white text-base">6. Ley Aplicable</h4>
     <p>Para cualquier controversia que pudiera derivarse del uso de nuestros servicios, las partes se someten a la jurisdicción de los tribunales competentes de nuestra localidad.</p>
   </div>
) : (
   <div className="space-y-4 text-neutral-300">
     <h4 className="font-bold text-white text-base">1. Información Recopilada</h4>
     <p>En <strong>{data.nombre}</strong> valoramos tu confianza. Recopilamos datos personales básicos (nombre, DNI, teléfono, email) exclusivamente para gestionar tu ficha de socio, enviarte recordatorios de tu rutina y mantenerte al tanto de nuestras promociones.</p>
     
     <h4 className="font-bold text-white text-base">2. Uso de WhatsApp y IA</h4>
     <p>Utilizamos canales digitales (como WhatsApp) para mejorar tu experiencia. Al contactarnos, permites que utilicemos herramientas de Inteligencia Artificial para automatizar respuestas, agilizar tu consulta y brindarte un mejor servicio de entrenamiento. Tus chats son procesados con fines de optimización y mejora continua del servicio técnico y deportivo.</p>
     
     <h4 className="font-bold text-white text-base">3. Seguridad de tus Datos</h4>
     <p>Toda la información es gestionada a través de nuestra plataforma propia <strong>FitSuitePro</strong>. Aplicamos medidas de seguridad para evitar accesos no autorizados. Bajo ninguna circunstancia vendemos o cedemos tus datos a terceros con fines publicitarios ajenos a <strong>{data.nombre}</strong>.</p>
     
     <h4 className="font-bold text-white text-base">4. Tus Derechos</h4>
     <p>Puedes solicitar el acceso, modificación o eliminación total de tus datos personales de nuestras bases de datos en cualquier momento comunicándote con nosotros en recepción.</p>
     
     <h4 className="font-bold text-white text-base">5. Cookies y Navegación</h4>
     <p>Este sitio web puede utilizar herramientas de análisis para mejorar la navegación. Al continuar, aceptas el uso de cookies técnicas necesarias para el correcto funcionamiento de nuestra landing page.</p>
   </div>
)}
  </div>
</SideSheet>

     <SideSheet isOpen={isSupportOpen} onClose={() => { setIsSupportOpen(false); setStatus('idle'); }} title="Soporte Técnico">
  {status === 'success' ? (
    <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 mb-4">
        <Check size={32} className="text-emerald-500" />
      </div>
      <h3 className="text-xl font-bold text-white">¡Mensaje enviado!</h3>
      <p className="text-neutral-400 mt-2">Gracias por contactarnos.</p>
      <div className="mt-6 text-neutral-500 text-sm">
        Cerrando en <span className="font-bold text-white">{countdown}</span> segundos...
      </div>
      
      {/* Tu firma en el cartel de éxito */}
      <div className="mt-10 flex flex-col items-center gap-1 opacity-50">
        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Tecnología por</span>
        <span className="font-black tracking-wide text-white">FitSuite<span style={{ color: 'var(--primary-color)' }}>Pro</span></span>
      </div>
    </div>
  ) : (
    <form 
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus('submitting');
        const formData = new FormData(e.currentTarget);
        
        try {
          await fetch("https://formspree.io/f/xkoepqao", {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
          });
          
          setStatus('success');
          // Contador de 5 segundos
          let i = 5;
          const timer = setInterval(() => {
            i -= 1;
            setCountdown(i);
            if (i <= 0) {
              clearInterval(timer);
              setIsSupportOpen(false);
              setStatus('idle');
              setCountdown(5);
            }
          }, 1000);
        } catch {
          setStatus('idle');
          alert("Error al enviar. Intentá de nuevo.");
        }
      }}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="Gym_Nombre" value={data.nombre} />
      <input type="hidden" name="Gym_Slug" value={gymSlug} />
      
      <input required name="Nombre" placeholder="Tu nombre" className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:border-emerald-500 outline-none transition" />
      <input required type="email" name="Email" placeholder="Tu email" className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white focus:border-emerald-500 outline-none transition" />
      <textarea required name="Mensaje" placeholder="¿En qué te podemos ayudar?" className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white h-32 resize-none focus:border-emerald-500 outline-none transition" />
      
      <button disabled={status === 'submitting'} className="w-full bg-emerald-600 font-bold py-3 rounded-lg hover:bg-emerald-500 transition disabled:opacity-50">
        {status === 'submitting' ? "Enviando..." : "Enviar Consulta"}
      </button>
    </form>
  )}
</SideSheet>

    </main>
  );
}