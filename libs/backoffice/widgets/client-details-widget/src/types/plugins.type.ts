export type ClientPlugins = PluginConfig[];

type RateLimitingConfig = {
  name: 'rate-limiting';
  enabled: boolean;
  config: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  };
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

type RequestTerminationConfig = {
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
