export interface ISettings {
    tenantId: string;
    theme?: 'light' | 'dark';
    notifications?: {
      email?: boolean;
      sms?: boolean;
    };
    language?: string;
    timezone?: string;
  }
  