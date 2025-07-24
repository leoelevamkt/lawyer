import { CheckCircle, Scale, Shield, Users } from 'lucide-react';
import { useSiteSettings } from '@/react-app/hooks/useSiteSettings';

export default function About() {
  const { getSetting } = useSiteSettings();
  const values = [
    {
      icon: Scale,
      title: "Justiça",
      description: "Buscamos sempre a solução mais justa e equilibrada para todos os envolvidos."
    },
    {
      icon: Shield,
      title: "Integridade",
      description: "Mantemos os mais altos padrões éticos em todas as nossas relações profissionais."
    },
    {
      icon: Users,
      title: "Compromisso",
      description: "Cada cliente recebe nossa dedicação total e acompanhamento personalizado."
    }
  ];

  const achievements = [
    "Escritório fundado em 1998 com tradição familiar",
    "Especialização em Direito Empresarial e Civil",
    "Atuação em todo território nacional",
    "Parcerias com escritórios internacionais",
    "Reconhecimento pelos principais rankings jurídicos",
    "Equipe multidisciplinar altamente qualificada"
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="https://mocha-cdn.com/019837ea-6653-789d-b2b6-1920481adc12/about-bg-library.jpg"
          alt="Law library background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/95 to-gray-100/95"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-yellow-500/10 rounded-full px-6 py-2 mb-6">
            <Scale className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-yellow-600 text-sm font-medium uppercase tracking-wide">
              Sobre Nós
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {getSetting('about_title', 'Tradição e Inovação Jurídica').split(' ').map((word, index, array) => 
              index === array.length - 2 ? (
                <span key={index} className="text-yellow-600">{word} </span>
              ) : (
                <span key={index}>{word} </span>
              )
            )}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {getSetting('about_description', 'Há mais de 25 anos oferecendo soluções jurídicas de excelência, combinando experiência consolidada com as mais modernas práticas do direito.')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Nossa História
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              O <strong className="text-yellow-600">Olympus Advogados</strong> nasceu da visão de criar um escritório que 
              combinasse a tradição jurídica com a inovação necessária para enfrentar 
              os desafios do direito contemporâneo.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Fundado em 1998, nosso escritório cresceu de forma consistente, 
              sempre mantendo os valores de excelência, ética e compromisso com 
              nossos clientes. Hoje, somos referência em advocacia empresarial e civil.
            </p>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-500 rounded-full opacity-10"></div>
              
              <div className="relative z-10">
                <h4 className="text-2xl font-bold text-white mb-6">Nossa Missão</h4>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  "Oferecer soluções jurídicas inovadoras e eficazes, construindo 
                  relacionamentos duradouros baseados na confiança, transparência 
                  e resultados excepcionais."
                </p>
                
                <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                  <p className="text-yellow-400 font-semibold text-center">
                    "O que é importante para você, é importante para nós!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {value.title}
              </h4>
              <p className="text-gray-600 text-center leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
