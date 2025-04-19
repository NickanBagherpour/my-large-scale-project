import { Nullable } from '@oxygen/types';

export type TableRowValueType = {
  id: Nullable<number>;
  name: Nullable<string>;
  persianName: string;
  fee: Nullable<number>;
  version: Nullable<number>;
  isCommercial: boolean;
  isFinancial: boolean;
};
