import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { GlobalMessageContainer, NoResult, ReturnButton } from '@oxygen/reusable-components';
import { Nullable, PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Loading } from '@oxygen/ui-kit';
import { useAuth } from '@oxygen/hooks';

import { updateRequestIdAction, useAppDispatch, useAppState } from '../../context';
import { resetMessageAction, updateUserRoleAction } from '../../context';
import DetailsCollapse from '../details-collapse/details-collapse';
import { useGetRequestInfoQuery } from '../../services';
import { PanelType, RequestId } from '../../types';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const userRole: Nullable<string> = user?.userInfo?.role;

  const state = useAppState();
  const [t] = useTr();

  const { message, ...fetchState } = state;

  const searchParams = useSearchParams();
  const requestId: RequestId = searchParams.get('requestId');

  useEffect(() => {
    updateRequestIdAction(dispatch, requestId);
  }, [requestId]);

  useEffect(() => {
    updateUserRoleAction(dispatch, userRole);
  }, [userRole]);

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  const { data, isFetching, error } = useGetRequestInfoQuery(prepareParams());

  function prepareParams() {
    const params = {
      requestId: state?.requestId,
    };
    return params;
  }

  if (error) return <NoResult isLoading={false} />;
  if (!data) return <Loading spinning={isFetching} />;

  const { requestGeneralInfo } = data;

  const footerButton = (
    <ReturnButton size={'large'} variant={'outlined'} onClick={handleReturn}>
      {t('button.return')}
    </ReturnButton>
  );

  const subtitle =
    userRole === PanelType.BUSINESS_BANKING
      ? requestGeneralInfo?.requestStatus?.businessBankingStatus?.title
      : requestGeneralInfo?.requestStatus?.businessUnitStatus?.title;

  return (
    <S.AppContainer title={t('request_details')} subtitle={subtitle} footer={footerButton}>
      <GlobalMessageContainer
        message={message}
        onClose={() => {
          resetMessageAction(dispatch);
        }}
      />
      {requestId ? <DetailsCollapse data={data} /> : <NoResult isLoading={false} />}
    </S.AppContainer>
  );
};

export default App;
