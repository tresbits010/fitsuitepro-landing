import { Zap, ShieldCheck, CreditCard, ArrowRight } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      {/* Header */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tighter">FIT<span className="text-orange-500">SUITE</span> PRO</h1>
        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-colors">
          Solicitar Demo
        </button>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto text-center py-20 px-4">
        <h2 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
          El cerebro de tu <span className="text-orange-500">gimnasio</span>
        </h2>
        <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
          Automatizá accesos, pagos y gestión. Dejá de administrar planillas y empezá a hacer crecer tu negocio.
        </p>
        <button className="bg-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all flex items-center gap-2 mx-auto">
          Empezar a automatizar <ArrowRight size={20} />
        </button>
      </header>

      {/* Características */}
      <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-3 gap-8">
        {[
          { icon: ShieldCheck, title: "Control de Accesos", desc: "Gestión inteligente para molinetes y puertas." },
          { icon: CreditCard, title: "Pagos Automatizados", desc: "Cobros sin fricción y recordatorios automáticos." },
          { icon: Zap, title: "Gestión Offline", desc: "Tu gimnasio no para, aunque se caiga el internet." }
        ].map((feature, i) => (
          <div key={i} className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 hover:border-orange-500 transition-colors">
            <feature.icon className="text-orange-500 mb-4" size={40} />
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-neutral-400">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer simple */}
      <footer className="text-center py-10 text-neutral-600 text-sm">
        © 2026 FitSuite Pro. Potenciando gimnasios de alto rendimiento.
      </footer>
    </div>
  );
}