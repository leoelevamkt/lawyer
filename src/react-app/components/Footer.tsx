import { Scale, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const services = [
    "Direito Empresarial",
    "Direito Civil",
    "Direito Trabalhista",
    "Direito de Família",
    "Direito Imobiliário",
    "Direito do Consumidor"
  ];

  const quickLinks = [
    { name: "Sobre Nós", href: "#about" },
    { name: "Serviços", href: "#services" },
    { name: "Equipe", href: "#team" },
    { name: "Contato", href: "#contact" },
    { name: "Blog", href: "#" },
    { name: "Carreiras", href: "#" }
  ];

  const legalLinks = [
    { name: "Política de Privacidade", href: "#" },
    { name: "Termos de Uso", href: "#" },
    { name: "Código de Ética", href: "#" },
    { name: "LGPD", href: "#" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-2 rounded-lg">
                <Scale className="w-8 h-8 text-gray-900" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">OLYMPUS</h3>
                <p className="text-xs text-yellow-500 uppercase tracking-wide">Advogados</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Há mais de 25 anos oferecendo soluções jurídicas de excelência, 
              com compromisso, ética e resultados que fazem a diferença.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-yellow-500/20 p-2 rounded-lg transition-colors group">
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-yellow-500" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-yellow-500/20 p-2 rounded-lg transition-colors group">
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-yellow-500" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-yellow-500/20 p-2 rounded-lg transition-colors group">
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-yellow-500" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-yellow-500/20 p-2 rounded-lg transition-colors group">
                <Youtube className="w-5 h-5 text-gray-400 group-hover:text-yellow-500" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Áreas de Atuação</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#services" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Av. Paulista, 1.400 - 15º andar<br />
                    Bela Vista, São Paulo - SP<br />
                    CEP: 01310-100
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-gray-300 text-sm">(11) 3456-7890</p>
                  <p className="text-gray-400 text-xs">Segunda a Sexta: 8h às 18h</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-500" />
                <p className="text-gray-300 text-sm">contato@olympusadvogados.com.br</p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-6">
              <h5 className="text-yellow-500 font-semibold text-sm mb-2">Plantão 24h</h5>
              <p className="text-gray-300 text-sm">(11) 9 9999-0000</p>
              <p className="text-gray-400 text-xs">Para emergências jurídicas</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2024 Olympus Advogados. Todos os direitos reservados.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                OAB/SP 12.345 | CNPJ: 12.345.678/0001-90
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-yellow-500 transition-colors text-xs"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="border-t border-gray-800 py-6 text-center">
          <p className="text-yellow-500 font-semibold text-sm italic">
            "O que é importante para você, é importante para nós!"
          </p>
        </div>
      </div>
    </footer>
  );
}
