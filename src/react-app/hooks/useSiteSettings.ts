import { useState, useEffect } from 'react';

interface SiteSettings {
  [key: string]: {
    value: string;
    type: string;
  };
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          setSettings(data.settings);
        }
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
