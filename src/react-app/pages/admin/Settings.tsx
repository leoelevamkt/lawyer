import { useState, useEffect } from 'react';
import AdminLayout from '@/react-app/components/admin/AdminLayout';
import { Save, Palette, Settings as SettingsIcon, Globe } from 'lucide-react';

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

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>(mockSettings);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = async () => {
    setSaving(true);
    try {
      // In a real app, you would save to an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Erro ao salvar configurações');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        value
      }
    }));
  };

  const tabs = [
    { id: 'general', label: 'Geral', icon: Globe },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'contact', label: 'Contato', icon: SettingsIcon },
  ];

  return (
    <AdminLayout title="Configurações">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Configurações do Site</h2>
            <p className="text-gray-600">Personalize a aparência e conteúdo do seu site</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Salvando...' : 'Salvar Alterações'}</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-yellow-500 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Informações Gerais</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do Site
                    </label>
                    <input
                      type="text"
                      value={settings.site_name?.value || ''}
                      onChange={(e) => updateSetting('site_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição do Site
                    </label>
                    <input
                      type="text"
                      value={settings.site_description?.value || ''}
                      onChange={(e) => updateSetting('site_description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título Principal (Hero)
                  </label>
                  <input
                    type="text"
                    value={settings.hero_title?.value || ''}
                    onChange={(e) => updateSetting('hero_title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtítulo (Hero)
                  </label>
                  <textarea
                    rows={3}
                    value={settings.hero_subtitle?.value || ''}
                    onChange={(e) => updateSetting('hero_subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título da Seção Sobre
                  </label>
                  <input
                    type="text"
                    value={settings.about_title?.value || ''}
                    onChange={(e) => updateSetting('about_title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição da Seção Sobre
                  </label>
                  <textarea
                    rows={3}
                    value={settings.about_description?.value || ''}
                    onChange={(e) => updateSetting('about_description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Cores e Design</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cor Primária
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={settings.primary_color?.value || '#eab308'}
                        onChange={(e) => updateSetting('primary_color', e.target.value)}
                        className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.primary_color?.value || '#eab308'}
                        onChange={(e) => updateSetting('primary_color', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cor Secundária
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={settings.secondary_color?.value || '#1f2937'}
                        onChange={(e) => updateSetting('secondary_color', e.target.value)}
                        className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.secondary_color?.value || '#1f2937'}
                        onChange={(e) => updateSetting('secondary_color', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Preview das Cores</h4>
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-16 h-16 rounded-lg"
                      style={{ backgroundColor: settings.primary_color?.value || '#eab308' }}
                    ></div>
                    <div 
                      className="w-16 h-16 rounded-lg"
                      style={{ backgroundColor: settings.secondary_color?.value || '#1f2937' }}
                    ></div>
                    <div className="text-sm text-gray-600">
                      <p>Cor Primária: {settings.primary_color?.value || '#eab308'}</p>
                      <p>Cor Secundária: {settings.secondary_color?.value || '#1f2937'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Informações de Contato</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone Principal
                    </label>
                    <input
                      type="text"
                      value={settings.contact_phone?.value || ''}
                      onChange={(e) => updateSetting('contact_phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail Principal
                    </label>
                    <input
                      type="email"
                      value={settings.contact_email?.value || ''}
                      onChange={(e) => updateSetting('contact_email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Endereço Completo
                  </label>
                  <textarea
                    rows={3}
                    value={settings.contact_address?.value || ''}
                    onChange={(e) => updateSetting('contact_address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número do WhatsApp (formato internacional)
                  </label>
                  <input
                    type="text"
                    value={settings.whatsapp_number?.value || ''}
                    onChange={(e) => updateSetting('whatsapp_number', e.target.value)}
                    placeholder="ex: 5511987654321"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Formato: Código do país + DDD + Número (sem espaços ou símbolos)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}