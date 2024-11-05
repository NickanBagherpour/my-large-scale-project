import { upstreamsList } from './data/upstream-list.data';
import { UpstreamParamsType, UpstreamType } from '@oxygen/types';

export const UPSTREAM_LIST_LIMIT = 16;

export const getUpstreams = async ({ searchTerm, page }: UpstreamParamsType) => {
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
