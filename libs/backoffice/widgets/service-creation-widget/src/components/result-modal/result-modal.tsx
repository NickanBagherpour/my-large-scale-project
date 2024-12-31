import { useTr } from '@oxygen/translation';
import { Button, Modal } from '@oxygen/ui-kit';
import * as S from './result-modal.style';
import LazyLottie from 'libs/reusable-components/src/components/animation-loader/lazy-lottie';
import processingAnimationData from '../../assets/media/processing.json';
import successAnimationData from '../../assets/media/success.json';
import failureAnimationData from '../../assets/media/failure.json';
import { ROUTES } from '@oxygen/utils';
import { MutationStatus } from '@tanstack/react-query';
import { goToFirstError, useAppDispatch, useAppState } from '../../context';
import { ReactNode } from 'react';
import GeneralInfo from '../general-info/general-info';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  status: MutationStatus;
};

const lottieStyle = {
  width: '10rem',
  height: '10rem',
};

export default function RemoveServerModal(props: Props) {
  const { isOpen, toggle, status } = props;
  const content: Record<MutationStatus, ReactNode> = {
    success: <Success />,
    pending: <Processing />,
    idle: <Processing />,
    error: <GeneralError closeModal={toggle} />,
  };

  return (
    <Modal
      centered
      open={isOpen}
      closable={false}
      onCancel={toggle}
      headerDivider={false}
      destroyOnClose
      footer={false}
      maskClosable={false}
    >
      {content[status]}
    </Modal>
  );
}

const Processing = () => {
  const [t] = useTr();
  return (
    <>
      <S.Container>
        <LazyLottie animationData={processingAnimationData} style={lottieStyle} />
        <S.ProcessingMsg>{t('we_are_processing_please_wait')}</S.ProcessingMsg>
      </S.Container>
      <Button block variant='outlined' color='primary' disabled>
        <i className='icon-home-empty' />
        {t('service_managment')}
      </Button>
    </>
  );
};

const Success = () => {
  const [t] = useTr();
  return (
    <>
      <S.Container>
        <LazyLottie loop={false} animationData={successAnimationData} style={lottieStyle} />
        <S.SuccessMsg>{t('register_request_was_submitted')}</S.SuccessMsg>
      </S.Container>
      <Button block variant='outlined' color='primary' href={ROUTES.BACKOFFICE.SERVICE_LIST}>
        <i className='icon-home-empty' />
        {t('service_managment')}
      </Button>
    </>
  );
};

const BadRequestErorr = () => {
  const [t] = useTr();
  const state = useAppState();
  const dispatch = useAppDispatch();

  const errors = state.stepStatuses.reduce((acc, step) => {
    if (step.error) {
      const newErrors = Object.values(step.error).map((value) => ({ code: null, message: value }));
      return [...acc, ...newErrors];
    }
    return acc;
  }, [] as Array<{ code: string | null; message: string }>);

  return (
    <>
      <S.Container>
        <LazyLottie loop={false} animationData={failureAnimationData} style={lottieStyle} />
        <S.ErrorsList>
          {errors.map(({ message, code }, idx) => (
            <S.RequestError key={idx}>
              <S.ErrIcon className='icon-warning' />
              <S.ErrMsg>{message}</S.ErrMsg>
              {code && <S.ErrCode>{`(${t('err')} ${code})`}</S.ErrCode>}
            </S.RequestError>
          ))}
        </S.ErrorsList>
      </S.Container>
      <S.TopBtn block onClick={() => goToFirstError(dispatch)}>
        <i className='icon-edit' />
        {t('edit_data')}
      </S.TopBtn>
      <Button href={ROUTES.BACKOFFICE.SERVICE_LIST} block variant='outlined' color='primary'>
        {t('save_in_draft')}
      </Button>
    </>
  );
};

const GeneralError = ({ closeModal }: { closeModal: () => void }) => {
  const [t] = useTr();
  return (
    <>
      <S.Container>
        <LazyLottie loop={false} animationData={failureAnimationData} style={lottieStyle} />
        {t('date_wasnt_registered')}
        <S.ConnectionErrMsg>{}</S.ConnectionErrMsg>
      </S.Container>
      <S.TopBtn block onClick={closeModal}>
        {/* <i className='icon-refresh' /> */}
        {t('button.confirm')}
      </S.TopBtn>
      {/*
			<Button block variant='outlined' color='primary'>
				{t('save_in_draft')}
			</Button>
      */}
    </>
  );
};
