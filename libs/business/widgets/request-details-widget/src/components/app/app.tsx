import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { GlobalMessageContainer, NoResult, ReturnButton } from '@oxygen/reusable-components';
import { Nullable, PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Loading } from '@oxygen/ui-kit';

import {
  resetMessageAction,
  updateSubmissionIdAction,
  updateUserRoleAction,
  useAppDispatch,
  useAppState,
} from '../../context';
import RequestResultBox from '../request-result-box/request-result-box';
import DetailsCollapse from '../details-collapse/details-collapse';
import { useGetSubmissionDetailQuery } from '../../services';
import { SubmissionId } from '../../types';

import * as S from './app.style';

type AppProps = PageProps & {
  role?: Nullable<string>;
};

const App: React.FC<AppProps> = (props) => {
  const role = props.parentProps?.role as Nullable<string>;

  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const { message } = state;

  const searchParams = useSearchParams();
  const submissionId: SubmissionId = searchParams.get('submissionId');

  useEffect(() => {
    updateSubmissionIdAction(dispatch, submissionId);
  }, [submissionId]);

  useEffect(() => {
    updateUserRoleAction(dispatch, role);
  }, [role]);

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };
  const { data: submissionData, isFetching, error } = useGetSubmissionDetailQuery(prepareParams());

  function prepareParams() {
    const params = {
      role: role,
      submissionId: submissionId,
    };
    return params;
  }

  const footerButton = <ReturnButton size={'large'} onClick={handleReturn} />;

  const clientName = submissionData?.submissionInfoDto?.clientName;

  if (!submissionId || !role || error) {
    return <NoResult isLoading={false} hasReturnButton={true} />;
  }

  return (
    <S.AppContainer
      title={clientName ? t('request_details_client', { clientName: clientName }) : t('request_details')}
      footer={footerButton}
    >
      <GlobalMessageContainer
        message={message}
        onClose={() => {
          resetMessageAction(dispatch);
        }}
      />

      {submissionData ? (
        <S.Container>
          <DetailsCollapse data={submissionData} />
          <RequestResultBox data={submissionData} />
        </S.Container>
      ) : (
        <S.LoadingContainer>
          <Loading spinning={isFetching} />
        </S.LoadingContainer>
      )}
    </S.AppContainer>
  );
};

export default App;
