import { useQuery, type QueryKey } from '@tanstack/react-query';
import { client, portalUrl } from '@oxygen/client';
import { withErrorHandling } from '@oxygen/utils';

type Props = {
  url: string;
  queryKey: QueryKey;
  // TODO: add the ability to pass more params like sort, etc.
  page: number;
  size: number;
};

type Params<T extends object = Record<string, never>> = {
  page: number;
  size: number;
} & T;

type Upstream = {
  id: number;
  name: string;
  description: string;
  activeServerCount: number;
};

const api = {
  async getList<TContent extends Array<any>, TParams extends object = Record<string, any>>({
    url,
    params,
  }: {
    url: string;
    params: Params<TParams>;
  }) {
    return client.get<ApiResponse<TContent>>(`${portalUrl}${url}`, {
      params,
    });
  },
};

export default function useChangeHistoryQuery(props: Props) {
  const { queryKey, url, page, size } = props;

  const { data, isFetching: isFetchingCurrentPage } = useQuery({
    queryKey,
    // 'http://uat.bo.oxygenpro.ir/publisher/api/v1/upstreams?page=0&size=10&sort=createDate%2CDESC'
    queryFn: withErrorHandling(
      /* TODO: pass dispatch to this */ () => api.getList<Upstream[]>({ url, params: { page, size } })
    ),
  });

  const nextItemPage = page * size + size + 1;

  const { data: nextItemData, isFetching: isFetchingPreviousItem } = useQuery({
    queryKey: [...queryKey, 'previousItem'],
    queryFn: withErrorHandling(
      /* TODO: pass dispatch to this */ () => api.getList<Upstream[]>({ url, params: { page: nextItemPage, size: 1 } })
    ),
  });

  const isFetching = isFetchingCurrentPage || isFetchingPreviousItem;

  if (data && nextItemData) {
    const combinedData = [...data.content, ...nextItemData.content];

    const newData = combinedData.map((item, index) => {
      return Object.entries(item).reduce((acc, [key, value]) => {
        const nextItemValue = combinedData?.[index + 1]?.[key];
        const isDifferent = nextItemValue !== value;
        return {
          ...acc,
          [key]: {
            isDifferent,
            value,
          },
        };
      }, {} as any);
    });

    newData.pop();

    return {
      data: { ...data, content: newData },
      isFetching,
    };
  } else {
    return {
      data: undefined,
      isFetching,
    };
  }
}

type ApiResponse<TContent extends Array<any>> = {
  totalPages: number;
  totalElements: number;
  pageable: {
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    offset: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
  };
  last: boolean;
  numberOfElements: number;
  first: boolean;
  size: number;
  content: TContent;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  empty: boolean;
};
