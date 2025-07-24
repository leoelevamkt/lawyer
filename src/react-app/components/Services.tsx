import { Building2, Users, Briefcase, Home, Car, Heart, ArrowRight } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Building2,
      title: "Direito Empresarial",
      description: "Consultoria completa para empresas, contratos comerciais, fusões e aquisições, compliance e reestruturações societárias.",
      features: ["Contratos Comerciais", "Compliance Corporativo", "Fusões e Aquisições", "Reestruturação Societária"]
    },
    {
      icon: Users,
      title: "Direito Trabalhista",
      description: "Defesa de direitos trabalhistas, assessoria em relações de trabalho, processos administrativos e judiciais.",
      features: ["Processos Trabalhistas", "Assessoria Sindical", "Compliance Trabalhista", "Negociações Coletivas"]
    },
    {
      icon: Briefcase,
      title: "Direito Civil",
      description: "Resolução de conflitos civis, contratos, responsabilidade civil, direitos reais e sucessões.",
      features: ["Contratos Civis", "Responsabilidade Civil", "Direito Sucessório", "Direitos Reais"]
    },
    {
      icon: Home,
      title: "Direito Imobiliário",
      description: "Assessoria completa em transações imobiliárias, incorporações, financiamentos e regularizações.",
      features: ["Compra e Venda", "Incorporações", "Financiamentos", "Regularizações"]
    },
    {
      icon: Car,
      title: "Direito do Consumidor",
      description: "Defesa dos direitos do consumidor, relações de consumo, indenizações e resolução de conflitos.",
      features: ["Defesa do Consumidor", "Indenizações", "Relações de Consumo", "Mediação de Conflitos"]
    },
    {
      icon: Heart,
      title: "Direito de Família",
      description: "Questões familiares, divórcios, guarda, pensão alimentícia, inventários e planejamento sucessório.",
      features: ["Divórcio e Separação", "Guarda de Filhos", "Pensão Alimentícia", "Inventários"]
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="https://mocha-cdn.com/019837ea-6653-789d-b2b6-1920481adc12/services-bg-courtroom.jpg"
          alt="Courtroom background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-black/95"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-full px-6 py-2 mb-6">
            <Briefcase className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-yellow-500 text-sm font-medium uppercase tracking-wide">
              Nossos Serviços
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Soluções Jurídicas <span className="text-yellow-500">Completas</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Oferecemos assessoria jurídica especializada em diversas áreas do direito, 
            com foco na excelência e resultados efetivos para nossos clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-yellow-500/30 transition-all duration-300">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-gray-900" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 text-center group-hover:text-yellow-500 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed text-center">
                {service.description}
              </p>
              
              <div className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full bg-transparent border border-yellow-500/30 text-yellow-500 py-3 rounded-lg font-semibold hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 flex items-center justify-center space-x-2 group">
                <span>Saiba Mais</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Precisa de Assessoria Jurídica Especializada?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Nossa equipe está pronta para analisar seu caso e oferecer a melhor solução jurídica. 
              Agende uma consulta gratuita e descubra como podemos ajudá-lo.
            </p>
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 flex items-center space-x-2 mx-auto">
              <span>Agendar Consulta Gratuita</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
