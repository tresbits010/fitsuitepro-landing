import { X } from "lucide-react";

export default function SideSheet({ isOpen, onClose, title, children }: any) {
  return (
    <div 
      className={`fixed inset-0 z-[100] flex justify-end transition-all duration-500 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
      }`}
    >
      {/* Fondo oscuro con fade */}
      <div 
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`} 
        onClick={onClose} 
      />
      
      {/* Panel lateral deslizante */}
      <div 
        className={`relative w-full max-w-lg bg-neutral-950 border-l border-neutral-800 p-8 shadow-2xl overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-black uppercase text-white mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
}