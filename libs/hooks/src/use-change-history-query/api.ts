import { client, portalUrl } from '@oxygen/client';
import { FetchParams } from './types';
import { PaginatedData } from '@oxygen/types';

export const api = {
  async getList<TContent extends object>({ url, params }: { url: string; params: FetchParams }) {
    return client.get<PaginatedData<TContent>>(`${portalUrl}${url}`, {
      params: {
        ...params,
        sort: 'createDate,DESC',
      },
    });
  },
};
