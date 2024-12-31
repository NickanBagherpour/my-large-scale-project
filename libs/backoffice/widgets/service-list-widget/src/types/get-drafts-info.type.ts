export interface DraftDto {
  serviceInfoId: number;
  serviceName: string;
  serviceProgress: {
    statusCode: number;
    statusTitle: string;
    percent: number;
    step: 1 | 2 | 3 | 4;
  };
}
