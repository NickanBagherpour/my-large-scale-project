export type ClientPlugins = PluginConfig[];

export type RateLimitingConfig = {
  name: 'rate-limiting';
  enabled: boolean;
  config: Partial<{
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  }>;
};

type RequestNonReputationConfig = {
  name: 'request-non-repudiation';
  enabled: boolean;
  config: {
    url: string;
    timeout: number;
    keepalive: number;
  };
};

export type RequestTerminationConfig = {
  name: 'request-termination';
  enabled: boolean;
  config: {
    echo: boolean;
    statusCode: number;
    message: string;
  };
};

export type PluginConfig = RateLimitingConfig | RequestNonReputationConfig | RequestTerminationConfig;

export type ClientServicePlugins = PluginConfig[];

type BasePluginConfigParams = {
  name: string;
  config: object; // TODO: use the real type
  enabled: boolean;
};

export type ClientPluginParams = BasePluginConfigParams & {
  clientName: string;
};

export type ServicePluginParams = BasePluginConfigParams & {
  clientName: string;
  serviceId: number;
};
