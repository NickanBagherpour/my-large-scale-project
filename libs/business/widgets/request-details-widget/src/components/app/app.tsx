import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { GlobalMessageContainer, ReturnButton } from '@oxygen/reusable-components';
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

import * as S from './app.style';

type AppProps = PageProps & {
  role?: Nullable<string>;
};

const App: React.FC<AppProps> = (props) => {

  const role  = props.parentProps?.role as Nullable<string>;


  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();


  const { message } = state;

  const searchParams = useSearchParams();
  const submissionId: SubmissionId = searchParams.get('requestId');

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

  const footerButton = <ReturnButton size={'large'} onClick={handleReturn} />;

  return (
    <S.AppContainer title={t('request_details')} footer={footerButton}>
     
      <GlobalMessageContainer
        message={message}
        onClose={() => {
          resetMessageAction(dispatch);
        }}
      />
     
      {submissionId && role ? (
        <DetailsCollapse />
      ) : (
        <S.LoadingContainer>
          <Loading spinning={true} />
        </S.LoadingContainer>
      )}
    </S.AppContainer>
  );
};

export default App;
