export type ClientPlugins = PluginConfig[];

export type RateLimitingConfig = {
  name: 'rate-limiting';
  enabled: boolean;
  title: string;
  config: Partial<{
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  }>;
};

export type RequestTerminationConfig = {
  name: 'request-termination';
  title: string;
  enabled: boolean;
  config: {
    echo: boolean;
    statusCode: number;
    message: string;
  };
};

export type PluginConfig = RateLimitingConfig | RequestTerminationConfig;

export type ClientServicePlugins = PluginConfig[];

type BasePluginConfigParams = {
  name: string;
  config: object;
  enabled: boolean;
};

export type ClientPluginParams = BasePluginConfigParams & {
  clientName: string;
};

export type ServicePluginParams = BasePluginConfigParams & {
  clientName: string;
  serviceName: string;
};

export type ServicePlugin = {
  persianName: string;
  serviceInfoId: number;
  name: string;
  isActive: boolean;
  version: string;
  scopes: string[];
  upstream: string;
  plugins: PluginConfig[];
};
