import React from 'react';
import { notFound, useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Container } from '@oxygen/ui-kit';
import { GlobalMessageContainer, ReturnButton } from '@oxygen/reusable-components';
import { useChangeHistoryQuery } from '@oxygen/hooks';
import { getWidgetTitle, RQKEYS } from '@oxygen/utils';
import { API_PREFIX } from '@oxygen/client';

import { resetMessageAction, useAppDispatch, useAppState } from '../../context';
import DataTable from '../data-table/data-table';
import { ServiceHistoryContent } from '../../types';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};
const backofficeKey = RQKEYS.BACKOFFICE;

const App: React.FC<AppProps> = () => {
  const { message, table } = useAppState();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [t] = useTr();
  const id = Number(searchParams.get('id'));
  if (!id) {
    notFound();
  }
  type NormalizedService = Record<string, any>;

  // const normalizer = (
  //   val: PaginatedData<ServiceHistoryContent>
  // ): PaginatedData<Omit<ServiceHistoryContent, 'service'> & NormalizedService> => {
  //   const content = val.content.map((c) => {
  //     const { service, ...rest } = c;
  //     const { tags, ...otherProps } = service;
  //     const normalizedService = Object.fromEntries(
  //       Object.entries(otherProps).map(([key, value]) => [
  //         key,
  //         typeof value === 'object' && 'title' in value ? value?.title : value,
  //       ])
  //     );
  //     return { ...rest, ...normalizedService };
  //   });
  //   return { ...val, content };
  // };
  function prepareParams() {
    const params = {
      url: `${API_PREFIX.PUBLISHER}/v1/services/${id}/history`,
      queryKey: [backofficeKey.SERVICE, backofficeKey.SERVICE_HISTORY.GET_LIST, id],
      params: { page: table?.pagination.page - 1, size: table?.pagination.limit },
      dispatch,
      // normalizer,
    };
    return params;
  }
  const { data, isFetching } = useChangeHistoryQuery<ServiceHistoryContent>(prepareParams());
  const firstItem = data?.content?.[0];
  const title = getWidgetTitle({
    defaultTitle: t('widget_name'),
    primaryTitle: firstItem?.service?.persianName.value,
    secondaryTitle: firstItem?.service?.name?.value,
  });

  return (
    <Container title={title} footer={<ReturnButton />}>
      <GlobalMessageContainer
        containerProps={{ margin: '1.6rem 0' }}
        message={message}
        onClose={() => {
          resetMessageAction(dispatch);
        }}
      />
      <S.TableContainer>
        <DataTable data={data} isFetching={isFetching} />
      </S.TableContainer>
    </Container>
  );
};

export default App;
