import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loading } from '@oxygen/ui-kit';

import { useTr } from '@oxygen/translation';
import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { Nullable } from '@oxygen/types';

import { useAppState, resetErrorMessageAction, useAppDispatch } from '../../context';
import { useGetUpstreamDetailsQuery } from '../../services';
import UpstreamDetailsList from '../upstream-details-list/upstream-details-list';
import { UpstreamDetailsTypeQuery } from '../../types';
import UpstreamDetailsInfo from '../upstream-details-info/upstream-details-info';

import * as S from './app.style';

const App = () => {
  const { errorMessage, ...fetchState } = useAppState();
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const searchParams = useSearchParams();
  const upstreamName: Nullable<string> = searchParams.get('upstreamName');
  // const title = upstreamName ? `${t('widget_name_details')} ${t(upstreamName)}` : t('widget_name_creation');
  const title = upstreamName ? upstreamName : '';

  const { data: upstreamDetailsInfo, isFetching: isUpstreamFetching } = useGetUpstreamDetailsQuery(upstreamName);

  const [upstreamServer, setUpstreamServer] = useState<UpstreamDetailsTypeQuery>({
    list: { name: '', persianName: '', serverList: [] },
  });

  useEffect(() => {
    if (upstreamDetailsInfo?.targets) {
      setUpstreamServer((prev) => ({
        ...prev,
        list: {
          ...prev.list,
          serverList: upstreamDetailsInfo.targets, // Update serverList with targets
        },
      }));
      console.log(upstreamServer);
    }
  }, [upstreamDetailsInfo]);

  return (
    <S.WidgetContainer>
      <S.UpstreamDetailsContainer title={title}>
        <GlobalMessageContainer
          containerProps={{ marginBottom: '2.4rem' }}
          message={state.errorMessage}
          onClose={() => {
            resetErrorMessageAction(dispatch);
          }}
        />
        <Loading spinning={isUpstreamFetching}>
          <UpstreamDetailsInfo
            loading={isUpstreamFetching}
            infoData={{
              name: upstreamDetailsInfo?.name,
              description: upstreamDetailsInfo?.description,
              id: upstreamDetailsInfo?.id,
            }}
          />
        </Loading>
      </S.UpstreamDetailsContainer>
      <S.BoxContainer className={'table-container'}>
        {
          <UpstreamDetailsList
            isFetching={isUpstreamFetching}
            data={upstreamServer?.list?.serverList}
            total={upstreamServer?.list?.serverList.length}
            upstreamName={upstreamName}
          />
        }
      </S.BoxContainer>
    </S.WidgetContainer>
  );
};

export default App;
