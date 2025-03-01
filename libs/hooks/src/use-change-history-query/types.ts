import { PaginatedData } from '@oxygen/types';
import { type QueryKey } from '@tanstack/react-query';

export type Props<TContent extends object> = {
  url: string;
  queryKey: QueryKey;
  dispatch: React.Dispatch<any>;
  params: FetchParams;
  normalizer?: (val: PaginatedData<TContent>) => any;
  nestedKeyAccessor?: string;
};

export type FetchParams = { page: number; size: number; sortBy?: string } & Record<string, any>;

export type DifferenceMap<T extends object> = {
  [K in keyof T]: { value: T[K] extends object ? DifferenceMap<T[K]> : T[K]; isDifferent: boolean };
};
