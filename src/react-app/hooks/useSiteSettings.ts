import { useState, useEffect } from 'react';

interface SiteSettings {
  [key: string]: {
    value: string;
    type: string;
  };
}

// Mock settings data
const mockSettings: SiteSettings = {
  site_name: { value: 'OLYMPUS', type: 'text' },
  site_description: { value: 'Excelência jurídica que você pode confiar', type: 'text' },
  hero_title: { value: 'Excelência Jurídica Que Você Pode Confiar', type: 'text' },
  hero_subtitle: { value: 'No Olympus Advogados, transformamos desafios jurídicos em soluções estratégicas. Sua segurança jurídica é nossa prioridade.', type: 'textarea' },
  about_title: { value: 'Tradição e Inovação Jurídica', type: 'text' },
  about_description: { value: 'Há mais de 25 anos oferecendo soluções jurídicas de excelência, combinando experiência consolidada com as mais modernas práticas do direito.', type: 'textarea' },
  primary_color: { value: '#eab308', type: 'color' },
  secondary_color: { value: '#1f2937', type: 'color' },
  contact_phone: { value: '(11) 3456-7890', type: 'text' },
  contact_email: { value: 'contato@olympusadvogados.com.br', type: 'email' },
  contact_address: { value: 'Av. Paulista, 1.400 - 15º andar\nBela Vista, São Paulo - SP\nCEP: 01310-100', type: 'textarea' },
  whatsapp_number: { value: '5511987654321', type: 'text' }
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        setSettings(mockSettings);
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const getSetting = (key: string, defaultValue = '') => {
    return settings[key]?.value || defaultValue;
  };

  return { settings, loading, getSetting };
}