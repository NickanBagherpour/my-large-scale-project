import { Nullable } from '@oxygen/types';

export type OrganizationInfoParamsType = {
  orgNationalId?: Nullable<string>;
};

export interface ApiErrorResponseType {
  code: string;
  config: unknown;
  message: string;
  name: string;
  request: unknown;
  response: unknown;
  status: number;
  stack: string;
}
