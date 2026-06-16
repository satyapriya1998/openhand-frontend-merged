export interface TenantConfig {
  id: string;
  name: string;
  logoUrl?: string;
  theme?: {
    primaryColor?: string;
  };
  modules: string[];
  features: Record<string, boolean>;
}
