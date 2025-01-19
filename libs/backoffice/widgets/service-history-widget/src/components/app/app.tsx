import React from 'react';
import { notFound, useSearchParams } from 'next/navigation';

import { i18nBase, useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Container } from '@oxygen/ui-kit';
import { GlobalMessageContainer, ReturnButton } from '@oxygen/reusable-components';
import { useChangeHistoryQuery } from '@oxygen/hooks';
import { RQKEYS } from '@oxygen/utils';

import { resetMessageAction, useAppDispatch, useAppState } from '../../context';
import DataTable from '../data-table/data-table';
import { ServiceHistoryContent } from '../../types';
import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = () => {
  const { message, table } = useAppState();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [t] = useTr();
  const id = Number(searchParams.get('id'));
  if (!id) {
    notFound();
  }
  function prepareParams() {
    const params = {
      url: `/v1/services/${id}/history`,
      queryKey: [RQKEYS.BACKOFFICE.SERVICE_HISTORY.GET_LIST, id],
      params: { page: table?.pagination.page - 1, size: table?.pagination.limit },
      dispatch,
    };
    return params;
  }
  const { data, isFetching } = useChangeHistoryQuery<ServiceHistoryContent>(prepareParams());

  const firstItem = data?.content?.[0]?.service.value;
  let title = '';
  if (firstItem) {
    title =
      i18nBase.resolvedLanguage === 'en'
        ? firstItem?.name?.value + ' service'
        : `سرویس ` + firstItem?.persianName.value;
  } else if (!firstItem && !isFetching) {
    title = t('subtitle');
  }

  return (
    <Container title={title} footer={<ReturnButton />}>
      <GlobalMessageContainer
        containerProps={{ margin: '1.6rem 0' }}
        message={message}
        onClose={() => {
          resetMessageAction(dispatch);
        }}
      />
      {/* <SecondaryTitle text={t('subtitle')} /> */}
      <S.TableContainer>
        <DataTable data={data} isFetching={isFetching} />
      </S.TableContainer>
    </Container>
  );
};

export default App;
