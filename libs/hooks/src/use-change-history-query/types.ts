import { type QueryKey } from '@tanstack/react-query';

export type Props = {
  url: string;
  queryKey: QueryKey;
  dispatch: React.Dispatch<any>;
  params: FetchParams;
};

export type FetchParams = { page: number; size: number } & Record<string, any>;
