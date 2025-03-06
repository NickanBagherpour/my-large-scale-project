export interface ChartResponse {
  fromDate: string;
  toDate: string;
  totalCount: number;
  data: {
    time: string;
    count: number;
  }[];
}
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
  response: {
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
      count: number;
      kongId: string;
      name: string;
      persianName: string;
    };
  };
  additionalProperties: {
    additionalProp1: object;
    additionalProp2: object;
    additionalProp3: object;
  };
}
