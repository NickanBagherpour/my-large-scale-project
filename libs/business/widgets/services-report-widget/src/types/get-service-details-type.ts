export type ServiceClientsResponse = {
  error: ErrorInfo;
  response: ClientInfo[];
};

type ErrorInfo = {
  code: string;
  message: string;
  timestamp: string;
  domain: string | null;
  errors: any | null;
};

export type ClientInfo = {
  clientName: string;
  clientPersianName: string;
};
