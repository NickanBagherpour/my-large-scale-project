export interface ReportCardsResponse {
  error: {
    code: string;
    message: string;
    timestamp: string;
    domain: string;
    errors: [
      {
        name: string;
        summary: string;
        detail: string;
      }
    ];
  };
  response: ReportCardResult;
  additionalProperties: {
    additionalProp1: object;
    additionalProp2: object;
    additionalProp3: object;
  };
}
export type ReportCardResult = {
  clientReport: {
    activeCount: number;
    inactiveCount: number;
    totalCount: number;
  };
  serviceReport: {
    activeCount: number;
    inactiveCount: number;
    totalCount: number;
  };
  mostValuedConsumer: {
    count: number;
    kongId: string;
    name: string;
    persianName: string;
  };
  mostValuedService: {
    count: number;
    kongId: string;
    name: string;
    persianName: string;
  };
  mostFinancialConsumer: {
    amount: number;
    kongId: string;
    name: string;
    persianName: string;
  };
  mostValuableConsumer: {
    amount: number;
    kongId: string;
    name: string;
    persianName: string;
  };
};
