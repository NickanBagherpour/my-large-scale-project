import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { GlobalMessageContainer, ReturnButton } from '@oxygen/reusable-components';
import { Nullable, PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { useAuth } from '@oxygen/hooks';
import { Loading } from '@oxygen/ui-kit';

import {
  resetMessageAction,
  updateSubmissionIdAction,
  updateUserRoleAction,
  useAppDispatch,
  useAppState,
} from '../../context';
import DetailsCollapse from '../details-collapse/details-collapse';
import { SubmissionId, UserRole } from '../../types';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const { user } = useAuth();
  const userRole: Nullable<UserRole> = UserRole.BUSINESS_ADMIN; //user?.role;

  const { message } = state;

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

  const footerButton = <ReturnButton size={'large'} onClick={handleReturn} />;

  return (
    <S.AppContainer title={t('request_details')} footer={footerButton}>
      <GlobalMessageContainer
        message={message}
        onClose={() => {
          resetMessageAction(dispatch);
        }}
      />
      {submissionId && userRole ? <DetailsCollapse /> : <Loading spinning={true} />}
    </S.AppContainer>
  );
};

export default App;
