import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function GymProfile() {
  const { gymSlug } = useParams(); // Ahora gymSlug es el subdominio (ej: "nicheas")
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // El Worker ahora hace el trabajo sucio: 
    // recibe "nicheas", busca el mapeo y devuelve los datos correctos
    fetch(`https://rescate-gym-offline.tresbits010.workers.dev/api/get/`)
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
      <div className="animate-pulse text-orange-500 font-bold text-xl">Cargando info...</div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6 text-center">
      <p>No pudimos encontrar la información de este gimnasio. Por favor, verifica la configuración.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-10">
      <div className="max-w-2xl mx-auto bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl">
        
        {/* Cabecera */}
        <h1 className="text-4xl md:text-5xl font-black text-orange-500 mb-4">{data.nombre}</h1>
        
        {/* Historia / Descripción */}
        <p className="text-neutral-400 mb-8 leading-relaxed italic">
          {data.historia || "Bienvenidos a nuestro centro de entrenamiento. Estamos comprometidos con tu progreso y bienestar."}
        </p>

        {/* Info Box */}
        <div className="grid gap-4 mb-8">
          <div className="p-4 bg-neutral-800/50 rounded-xl border border-neutral-700 flex items-center gap-3">
            <span className="text-orange-500 text-xl">🕒</span>
            <div>
              <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Horarios</p>
              <p className="text-sm font-medium">{data.horario || "Consultar en recepción"}</p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col gap-3">
          {data.whatsapp && (
            <a 
              href={`https://wa.me/${data.whatsapp.replace(/\D/g, '')}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-green-600 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-900/20"
            >
              Contactar por WhatsApp
            </a>
          )}

          {data.direccion && (
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.direccion)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-neutral-800 border border-neutral-700 py-4 rounded-xl font-bold hover:bg-neutral-700 transition-all"
            >
              Ver ubicación
            </a>
          )}
          
          {data.instagram && (
            <a 
              href={`https://instagram.com/${data.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-sm text-neutral-500 hover:text-orange-500 transition-colors mt-2"
            >
              Seguinos en Instagram
            </a>
          )}
        </div>
      </div>
    </div>
  );
}