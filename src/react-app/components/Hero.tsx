import { ArrowRight, Award, Users, Clock } from 'lucide-react';
import { useSiteSettings } from '@/react-app/hooks/useSiteSettings';

export default function Hero() {
  const { getSetting } = useSiteSettings();
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <img 
          src="https://mocha-cdn.com/019837ea-6653-789d-b2b6-1920481adc12/hero-bg-justice.jpg"
          alt="Justice background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-black/90"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-500/5 to-transparent opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-full px-6 py-2 mb-6">
            <Award className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-yellow-500 text-sm font-medium">
              +25 anos de excelência jurídica
            </span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-gray-100 to-yellow-500 bg-clip-text text-transparent">
            {getSetting('hero_title', 'Excelência Jurídica Que Você Pode Confiar')}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          {getSetting('hero_subtitle', 'No Olympus Advogados, transformamos desafios jurídicos em soluções estratégicas. Sua segurança jurídica é nossa prioridade.')}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button className="group bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 flex items-center space-x-2">
            <span>Consulta Gratuita</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
            Nossos Serviços
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <Users className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">1.500+</h3>
            <p className="text-gray-400">Clientes Atendidos</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <Award className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">98%</h3>
            <p className="text-gray-400">Taxa de Sucesso</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">24h</h3>
            <p className="text-gray-400">Atendimento Emergencial</p>
          </div>
        </div>
      </div>
    </section>
  );
}
