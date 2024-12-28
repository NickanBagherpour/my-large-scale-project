import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { GlobalMessageContainer, NoResult, ReturnButton } from '@oxygen/reusable-components';
import { Nullable, PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { useAuth } from '@oxygen/hooks';

import { updateSubmissionIdAction, useAppDispatch, useAppState } from '../../context';
import { resetMessageAction, updateUserRoleAction } from '../../context';
import DetailsCollapse from '../details-collapse/details-collapse';
import { SubmissionId } from '../../types';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const { user } = useAuth();
  const userRole: Nullable<string> = user?.userInfo?.role;

  const { message, ...fetchState } = state;

  const searchParams = useSearchParams();
  const submissionId: SubmissionId = searchParams.get('requestId');

  useEffect(() => {
    updateSubmissionIdAction(dispatch, submissionId);
  }, [submissionId]);

  useEffect(() => {
    updateUserRoleAction(dispatch, userRole);
  }, [userRole]);

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  const footerButton = (
    <ReturnButton size={'large'} variant={'outlined'} onClick={handleReturn}>
      {t('button.return')}
    </ReturnButton>
  );

  return (
    <S.AppContainer title={t('request_details')} footer={footerButton}>
      <GlobalMessageContainer
        message={message}
        onClose={() => {
          resetMessageAction(dispatch);
        }}
      />
      {submissionId ? <DetailsCollapse /> : <NoResult isLoading={false} />}
    </S.AppContainer>
  );
};

export default App;
