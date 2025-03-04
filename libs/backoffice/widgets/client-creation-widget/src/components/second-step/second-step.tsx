import React, { useState } from 'react';

import { Box, Button, Loading } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Services } from '@oxygen/reusable-components';

import { useAppDispatch, useAppState } from '../../context';

import * as S from './second-step.style';
import { usePutProgressQuery } from '../../services';
import { queryClient } from '@oxygen/client';
import { PROGRESS_CODE } from '../../utils/consts';

type SecondStep = PageProps & {
  setCurrentStep: (prev) => void;
};

export const SecondStep: React.FC<SecondStep> = (props) => {
  const { setCurrentStep } = props;
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const [hasValue, setHasValue] = useState(true);
  const clientName = state.clientName;
  const queryParams = {
    clientName: clientName!,
    progressCode: PROGRESS_CODE.SERVICE_ASSIGNED,
  };
  const { mutate, isPending } = usePutProgressQuery();

  const handleReturn = () => {
    setCurrentStep((perv) => perv - 1);
  };

  const handleSubmit = async () => {
    mutate(queryParams, {
      onSuccess: async () => {
        setCurrentStep((pervStep) => pervStep + 1);
      },
    });
  };

  return (
    <S.SecondStepContainer>
      <Box flexGrow={1}>
        {clientName ? (
          <Services
            clientName={clientName!}
            dispatch={dispatch}
            pageType='creation'
            hasServices={(hasData) => setHasValue(!hasData)}
          />
        ) : (
          <Loading />
        )}
      </Box>
      <S.Footer>
        <S.ReturnButton onClick={handleReturn} />
        <Button htmlType={'submit'} onClick={handleSubmit} disabled={hasValue} loading={isPending}>
          {t('submit_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </S.Footer>
    </S.SecondStepContainer>
  );
};
