export interface ClientServicesDto {
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
  response: [
    {
      serviceName: string;
      serviceEnglishName: string;
    }
  ];
  additionalProperties: {
    additionalProp1: any;
    additionalProp2: any;
    additionalProp3: any;
  };
}
