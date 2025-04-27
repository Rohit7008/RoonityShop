import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
  Store,
  CreditCard,
  Mail,
  Bell,
  Shield,
  Save
} from 'lucide-react';

interface SettingSection {
  id: string;
  title: string;
  icon: any;
  fields: {
    id: string;
    label: string;
    type: 'text' | 'email' | 'select' | 'toggle';
    value: string | boolean;
    options?: string[];
  }[];
}

const SettingsPage = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('store');
  
  const [settings, setSettings] = useState<SettingSection[]>([
    {
      id: 'store',
      title: 'Store Settings',
      icon: Store,
      fields: [
        {
          id: 'storeName',
          label: 'Store Name',
          type: 'text',
          value: 'Roonity Shop'
        },
        {
          id: 'currency',
          label: 'Default Currency',
          type: 'select',
          value: 'USD',
          options: ['USD', 'EUR', 'GBP', 'JPY']
        },
        {
          id: 'timezone',
          label: 'Timezone',
          type: 'select',
          value: 'UTC',
          options: ['UTC', 'EST', 'PST', 'GMT']
        }
      ]
    },
    {
      id: 'payment',
      title: 'Payment Settings',
      icon: CreditCard,
      fields: [
        {
          id: 'paymentGateway',
          label: 'Payment Gateway',
          type: 'select',
          value: 'stripe',
          options: ['stripe', 'paypal', 'square']
        },
        {
          id: 'testMode',
          label: 'Test Mode',
          type: 'toggle',
          value: true
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      fields: [
        {
          id: 'orderNotifications',
          label: 'Order Notifications',
          type: 'toggle',
          value: true
        },
        {
          id: 'stockAlerts',
          label: 'Low Stock Alerts',
          type: 'toggle',
          value: true
        }
      ]
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      fields: [
        {
          id: 'twoFactor',
          label: 'Two-Factor Authentication',
          type: 'toggle',
          value: false
        },
        {
          id: 'sessionTimeout',
          label: 'Session Timeout (minutes)',
          type: 'text',
          value: '30'
        }
      ]
    }
  ]);

  const handleSave = () => {
    // Here you would typically make an API call to save the settings
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
      variant: "default"
    });
  };

  const handleFieldChange = (sectionId: string, fieldId: string, value: string | boolean) => {
    setSettings(settings.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          fields: section.fields.map(field => {
            if (field.id === fieldId) {
              return { ...field, value };
            }
            return field;
          })
        };
      }
      return section;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-neon-purple text-white rounded-lg hover:bg-neon-purple/90 transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="space-y-1">
          {settings.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-neon-purple/20 text-neon-purple'
                  : 'text-gray-400 hover:bg-neon-purple/10 hover:text-neon-purple'
              }`}
            >
              <section.icon className="w-5 h-5 mr-3" />
              {section.title}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/5 border border-neon-purple/20 rounded-lg p-6">
            {settings.map((section) => (
              section.id === activeSection && (
                <div key={section.id} className="space-y-6">
                  <h2 className="text-lg font-medium text-white">{section.title}</h2>
                  <div className="space-y-4">
                    {section.fields.map((field) => (
                      <div key={field.id} className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                        <label className="text-sm font-medium text-gray-400">
                          {field.label}
                        </label>
                        <div className="lg:col-span-2">
                          {field.type === 'toggle' ? (
                            <button
                              onClick={() => handleFieldChange(section.id, field.id, !field.value)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                field.value ? 'bg-neon-purple' : 'bg-gray-700'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  field.value ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          ) : field.type === 'select' ? (
                            <select
                              value={field.value as string}
                              onChange={(e) => handleFieldChange(section.id, field.id, e.target.value)}
                              className="w-full px-4 py-2 bg-white/5 border border-neon-purple/20 rounded-lg text-white focus:outline-none focus:border-neon-purple"
                            >
                              {field.options?.map((option) => (
                                <option key={option} value={option} className="bg-black">
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              value={field.value as string}
                              onChange={(e) => handleFieldChange(section.id, field.id, e.target.value)}
                              className="w-full px-4 py-2 bg-white/5 border border-neon-purple/20 rounded-lg text-white focus:outline-none focus:border-neon-purple"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 