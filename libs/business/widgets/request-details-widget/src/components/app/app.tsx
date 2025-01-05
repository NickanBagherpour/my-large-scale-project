import React, { useEffect } from 'react';
import { notFound, useRouter, useSearchParams } from 'next/navigation';

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
import DetailsCollapse from '../details-collapse/details-collapse';
import { SubmissionId } from '../../types';
import { useGetSubmissionDetailQuery } from '../../services';

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
  const submissionId: SubmissionId = searchParams.get('requestId');

  useEffect(() => {
    if (!submissionId) notFound();
    updateSubmissionIdAction(dispatch, submissionId);
  }, [submissionId]);

  useEffect(() => {
    if (!role) notFound();
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

  if (error) return <NoResult isLoading={false} />;
  if (!submissionData) return <Loading spinning={isFetching} />;

  const footerButton = <ReturnButton size={'large'} onClick={handleReturn} />;

  const clientName = submissionData?.submissionInfoDto?.clientName;

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
        <DetailsCollapse data={submissionData} />
      ) : (
        <S.LoadingContainer>
          <Loading spinning={true} />
        </S.LoadingContainer>
      )}
    </S.AppContainer>
  );
};

export default App;
