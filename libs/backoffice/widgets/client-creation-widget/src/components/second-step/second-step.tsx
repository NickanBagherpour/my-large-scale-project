import React, { useState } from 'react';

import { Box, Button } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Services } from '@oxygen/reusable-components';

import { useAppDispatch, useAppState } from '../../context';

import * as S from './second-step.style';
import { usePutProgressQuery } from '../../services';

type SecondStep = PageProps & {
  setCurrentStep: any;
};

export const SecondStep: React.FC<SecondStep> = (props) => {
  const { setCurrentStep } = props;
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const clientName = state.clientName;
  const queryParams = {
    clientName: clientName!,
    progressCode: 2,
  };
  const { refetch, isLoading } = usePutProgressQuery(queryParams);

  const handleReturn = () => {
    setCurrentStep((perv) => perv - 1);
  };

  const handleSubmit = async () => {
    try {
      await refetch();
      setCurrentStep((perv) => perv + 1);
    } catch (e) {
      console.log('error:', e);
    }
  };

  return (
    <S.SecondStepContainer>
      <Box flexGrow={1}>
        <Services clientName={clientName!} dispatch={dispatch} pageType='creation' />
      </Box>
      <S.Footer>
        <Button variant={'outlined'} onClick={handleReturn}>
          {t('return')}
        </Button>
        <Button htmlType={'submit'} onClick={handleSubmit} loading={isLoading}>
          {t('submit_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </S.Footer>
    </S.SecondStepContainer>
  );
};
