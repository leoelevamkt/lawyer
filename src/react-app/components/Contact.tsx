import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Endereço",
      details: [
        "Av. Paulista, 1.400 - 15º andar",
        "Bela Vista, São Paulo - SP",
        "CEP: 01310-100"
      ]
    },
    {
      icon: Phone,
      title: "Telefones",
      details: [
        "(11) 3456-7890",
        "(11) 9 8765-4321",
        "0800 123 4567"
      ]
    },
    {
      icon: Mail,
      title: "E-mails",
      details: [
        "contato@olympusadvogados.com.br",
        "atendimento@olympusadvogados.com.br",
        "emergencia@olympusadvogados.com.br"
      ]
    },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      details: [
        "Segunda a Sexta: 8h às 18h",
        "Sábados: 8h às 12h",
        "Emergências: 24h"
      ]
    }
  ];

  const subjects = [
    "Consulta Geral",
    "Direito Empresarial",
    "Direito Civil",
    "Direito Trabalhista",
    "Direito de Família",
    "Direito Imobiliário",
    "Direito do Consumidor",
    "Emergência Jurídica"
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-full px-6 py-2 mb-6">
            <MessageSquare className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-yellow-500 text-sm font-medium uppercase tracking-wide">
              Contato
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Fale <span className="text-yellow-500">Conosco</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Estamos aqui para ajudá-lo. Entre em contato e descobra como podemos 
            resolver suas questões jurídicas com excelência e agilidade.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3 rounded-lg">
                  <info.icon className="w-6 h-6 text-gray-900" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-4 text-center">
                {info.title}
              </h3>
              <div className="space-y-2">
                {info.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className="text-gray-300 text-center text-sm">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">
              Envie sua Mensagem
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Assunto *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  >
                    <option value="">Selecione um assunto</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject} className="bg-gray-800">
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none"
                  placeholder="Descreva sua situação jurídica ou dúvida..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 py-3 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          </div>

          {/* Map and Additional Info */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">
                Nossa Localização
              </h3>
              <div className="bg-gray-800 rounded-lg h-64 flex items-center justify-center mb-6">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <p className="text-white font-semibold">Av. Paulista, 1.400</p>
                  <p className="text-gray-400">15º andar - Bela Vista</p>
                  <p className="text-gray-400">São Paulo - SP</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Localizado no coração de São Paulo, na prestigiosa Avenida Paulista, 
                nosso escritório oferece fácil acesso por transporte público e possui 
                estacionamento conveniado nas proximidades.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20">
              <h4 className="text-xl font-bold text-white mb-4">
                Atendimento de Emergência
              </h4>
              <p className="text-gray-300 mb-4">
                Questões jurídicas urgentes? Nosso plantão 24h está disponível 
                para situações que não podem esperar.
              </p>
              <div className="flex items-center space-x-2 text-yellow-500 font-semibold">
                <Phone className="w-4 h-4" />
                <span>(11) 9 9999-0000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
