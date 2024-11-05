import { FetchParamsType } from '../../backoffice/widgets/upstream-list-widget/src/types';

import { upstreamsList } from './data/upstream-list.data';

export type UpstreamType = {
  name: string;
  activeServersCount: number;
};

export const UPSTREAM_LIST_LIMIT = 16;

export const getUpstreams = async ({ searchTerm, page }: FetchParamsType) => {
  const data = upstreamsList
    // .slice(0, upstreamsList.length)
    .filter((upstream) => {
      const searchMatches = upstream.name.includes(searchTerm);
      return searchMatches;
    })
    .slice(0, page * UPSTREAM_LIST_LIMIT);

  return new Promise<{ data: { list: UpstreamType[]; total: number } }>((resolve) => {
    setTimeout(() => {
      resolve({ data: { list: data, total: upstreamsList.length } });
    }, 700);
  });
};
