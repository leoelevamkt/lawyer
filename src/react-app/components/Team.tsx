import { Linkedin, Mail, Award, BookOpen } from 'lucide-react';

export default function Team() {
  const team = [
    {
      name: "Dr. Ricardo Olympus",
      role: "Sócio Fundador",
      specialization: "Direito Empresarial e Tributário",
      experience: "28 anos de experiência",
      education: "Doutor em Direito pela USP",
      achievements: [
        "Especialista em Fusões e Aquisições",
        "Membro da Comissão de Direito Empresarial OAB/SP",
        "Autor de 3 livros sobre Direito Tributário"
      ],
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Dra. Marina Silva",
      role: "Sócia Diretora",
      specialization: "Direito Civil e de Família",
      experience: "22 anos de experiência",
      education: "Mestre em Direito Civil pela PUC-SP",
      achievements: [
        "Especialista em Mediação Familiar",
        "Membro do IBDFAM",
        "Palestrante em congressos nacionais"
      ],
      image: "https://images.unsplash.com/photo-1594736797933-d0f501ba2fe6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Dr. Carlos Mendoza",
      role: "Sócio",
      specialization: "Direito Trabalhista e Previdenciário",
      experience: "20 anos de experiência",
      education: "Especialista em Direito do Trabalho pela FGV",
      achievements: [
        "Ex-procurador do Trabalho",
        "Especialista em Compliance Trabalhista",
        "Consultor de grandes empresas"
      ],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Dra. Ana Paula Costa",
      role: "Advogada Sênior",
      specialization: "Direito Imobiliário e Contratos",
      experience: "15 anos de experiência",
      education: "Pós-graduada em Direito Imobiliário",
      achievements: [
        "Especialista em Incorporações",
        "Consultora do setor imobiliário",
        "Membro da ABEDI"
      ],
      image: "https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Dr. Fernando Reis",
      role: "Advogado Sênior",
      specialization: "Direito do Consumidor e Cível",
      experience: "12 anos de experiência",
      education: "Especialista em Direito do Consumidor",
      achievements: [
        "Especialista em Mediação",
        "Membro do BRASILCON",
        "Consultor em relações de consumo"
      ],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Dra. Juliana Santos",
      role: "Advogada Sênior",
      specialization: "Direito Empresarial e Societário",
      experience: "10 anos de experiência",
      education: "MBA em Gestão Empresarial pela FGV",
      achievements: [
        "Especialista em Startups",
        "Consultora em Governança Corporativa",
        "Membro da ABDE"
      ],
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-yellow-500/10 rounded-full px-6 py-2 mb-6">
            <Award className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-yellow-600 text-sm font-medium uppercase tracking-wide">
              Nossa Equipe
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Profissionais de <span className="text-yellow-600">Excelência</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossa equipe é formada por advogados altamente qualificados, 
            com vasta experiência e reconhecimento no mercado jurídico brasileiro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="flex space-x-3">
                    <button className="bg-white/20 backdrop-blur-sm p-2 rounded-lg hover:bg-white/30 transition-colors">
                      <Linkedin className="w-4 h-4 text-white" />
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm p-2 rounded-lg hover:bg-white/30 transition-colors">
                      <Mail className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-yellow-600 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 mb-3">{member.specialization}</p>
                
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{member.education}</span>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{member.experience}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Especializações:</h4>
                  <ul className="space-y-1">
                    {member.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Junte-se à Nossa Equipe
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Estamos sempre em busca de talentos excepcionais para integrar nossa equipe. 
              Se você é um profissional de excelência, conheça nossas oportunidades.
            </p>
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300">
              Ver Oportunidades
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
