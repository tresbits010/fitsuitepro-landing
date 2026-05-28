// src/components/TermsOfService.tsx
export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-neutral-950 p-10 text-neutral-300">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-black uppercase text-white">Términos y Condiciones</h1>
        <div className="space-y-6 text-sm leading-relaxed">
          <p>Última actualización: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-lg font-bold text-white">1. Uso del Servicio</h2>
          <p>Bienvenido a nuestra plataforma. Al utilizar nuestros servicios, aceptas estos términos...</p>
          
          <h2 className="text-lg font-bold text-white">2. Responsabilidad</h2>
          <p>El uso del software FitSuitePro es responsabilidad del gimnasio...</p>
          
          {/* Agregá todo tu texto legal acá */}
        </div>
        <button 
          onClick={() => window.history.back()} 
          className="mt-10 rounded-full bg-neutral-800 px-6 py-2 text-white hover:bg-neutral-700"
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
}