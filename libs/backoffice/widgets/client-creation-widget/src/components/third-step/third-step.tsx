import { useRouter } from 'next/navigation';

import { useApp } from '@oxygen/hooks';
import { Box, Loading } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { queryClient } from '@oxygen/client';
import { ROUTES, RQKEYS } from '@oxygen/utils';
import { Plugins } from '@oxygen/reusable-components';

import { PROGRESS_CODE } from '../../utils/consts';
import { usePutProgressQuery } from '../../services';
import { useAppDispatch, useAppState } from '../../context';

import * as S from './third-step.style';

type ThirdStepProps = PageProps & {
  setCurrentStep: (prev) => void;
};

export const ThirdStep: React.FC<ThirdStepProps> = (props) => {
  const { setCurrentStep } = props;
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const { notification } = useApp();
  const router = useRouter();

  const clientName = state.clientName!;
  const queryParams = {
    clientName: clientName,
    progressCode: PROGRESS_CODE.PLUGIN_ASSIGNED,
  };
  const { mutate, isPending } = usePutProgressQuery();

  const handleReturn = () => {
    setCurrentStep((perv) => perv - 1);
  };

  const handleSubmit = async () => {
    mutate(queryParams, {
      onSuccess: async () => {
        notification.success({
          message: t('success_notif'),
        });
        await queryClient.invalidateQueries({
          queryKey: [RQKEYS.BACKOFFICE.CLIENTS_LIST.CLIENTS],
          refetchType: 'none',
        });

        router.push(ROUTES.BACKOFFICE.CLIENT_LIST);
      },
    });
  };

  return (
    <S.ThirdStepContainer>
      <Box flexGrow={1}>{clientName ? <Plugins clientName={clientName} dispatch={dispatch} /> : <Loading />}</Box>
      <S.Footer>
        <S.ReturnButton onClick={handleReturn} />
        <S.RegisterButton htmlType={'submit'} onClick={handleSubmit} loading={isPending}>
          {t('submit_info')}
          <i className={'icon-arrow-left'}></i>
        </S.RegisterButton>
      </S.Footer>
    </S.ThirdStepContainer>
  );
};
