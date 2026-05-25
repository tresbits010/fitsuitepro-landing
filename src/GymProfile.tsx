import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  { href: "#clases", label: "Clases" },
  { href: "#planes", label: "Planes" },
  { href: "#contacto", label: "Contacto" },
];

export default function GymProfile() {
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
  
  const { gymSlug } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

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
  
  const clasesData = data.clases?.length > 0 ? data.clases : [];
  
  const planesData = data.planes?.length > 0 ? data.planes : [
    { nombre: "Pase Libre Diario", precio: "$15.000", beneficios: ["Musculación libre", "Duchas"] },
    { nombre: "Premium Mensual", precio: "$25.000", beneficios: ["Musculación", "Todas las clases", "Nutrición"] },
  ];

  // 🔥 AGRUPACIÓN INTELIGENTE DE CLASES 🔥
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
  const mapLink = data.direccion ? `http://googleusercontent.com/maps.google.com/?q=${encodeURIComponent(data.direccion)}` : "#";
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
            className="h-128 w-128 md:h-48 md:w-48 rounded-full border-2 object-cover"
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
            <span className="text-xs font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--primary-color)' }}>
              Membresías
            </span>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-tight md:text-6xl">
              Planes y Precios
            </h2>
            <p className="mt-3 italic text-neutral-400">
              Elegí el que mejor se adapte a tu ritmo.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {planesData.map((p: any, i: number) => {
              const featured = i === planesData.length - 1;
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
            {data.direccion && <p className="italic">{data.direccion}</p>}
            {data.instagram && (
              <a
                href={igLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-semibold transition"
                onMouseOver={(e) => (e.currentTarget.style.color = data.color_tema || '#f97316')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                <InstagramIcon size={16} />
                {data.instagram}
              </a>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-800/60 px-6 py-8 text-center">
        <p className="text-xs uppercase tracking-widest text-neutral-400">
          © {new Date().getFullYear()} {data.nombre} — Forjá tu fuerza.
        </p>
      </footer>
    </main>
  );
}