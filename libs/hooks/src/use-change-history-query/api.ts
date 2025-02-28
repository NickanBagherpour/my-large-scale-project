import { client, portalUrl } from '@oxygen/client';
import { FetchParams } from './types';
import { PaginatedData } from '@oxygen/types';

export const api = {
  async getList<TContent extends object>(props: { url: string; params: FetchParams }) {
    const {
      url,
      params: { sortBy = 'modifyDate', page, size },
    } = props;
    return client.get<PaginatedData<TContent>>(`${portalUrl}${url}`, {
      params: {
        page,
        size,
        sort: `${sortBy},DESC`,
      },
    });
  },
};
