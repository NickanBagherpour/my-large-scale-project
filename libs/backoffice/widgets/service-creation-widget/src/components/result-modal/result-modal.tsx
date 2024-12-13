import { useTr } from '@oxygen/translation';
import { Button, Modal } from '@oxygen/ui-kit';
import * as S from './result-modal.style';
import LazyLottie from 'libs/reusable-components/src/components/animation-loader/lazy-lottie';
import processingAnimationData from '../../assets/media/processing.json';
import successAnimationData from '../../assets/media/success.json';
import failureAnimationData from '../../assets/media/failure.json';
import { ROUTES } from '@oxygen/utils';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

const lottieStyle = {
  width: '10rem',
  height: '10rem',
};

export default function RemoveServerModal(props: Props) {
  const { isOpen, toggle } = props;
  return (
    <Modal
      centered
      open={isOpen}
      closable={false}
      onCancel={toggle}
      headerDivider={false}
      destroyOnClose
      footer={false}
      // maskClosable={false}
    >
      <Processing />
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
        <i className='icon-home' />
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
        <i className='icon-home' />
        {t('service_managment')}
      </Button>
    </>
  );
};

const BadRequestErorr = () => {
  const [t] = useTr();
  const errors = [
    { message: 'مقدار پروتوکل اشتباه وارد شده است. ', code: 123 },
    { message: 'مقدار دسترسی اشتباه وارد شده است. ', code: 123 },
    { message: 'مقدار دسته‌بندی با مقادیر دیگر همخوانی ندارد.', code: 123 },
  ];
  return (
    <>
      <S.Container>
        <LazyLottie loop={false} animationData={failureAnimationData} style={lottieStyle} />
        <S.ErrorsList>
          {errors.map(({ message, code }, idx) => (
            <S.RequestError key={idx}>
              <S.ErrIcon className='icon-warning' />
              <S.ErrMsg>{message}</S.ErrMsg>
              <S.ErrCode>{`(${t('err')} ${code})`}</S.ErrCode>
            </S.RequestError>
          ))}
        </S.ErrorsList>
      </S.Container>
      <S.TopBtn block>
        <i className='icon-edit' />
        {t('edit_data')}
      </S.TopBtn>
      <Button block variant='outlined' color='primary'>
        {t('save_in_draft')}
      </Button>
    </>
  );
};

const ConnectionError = () => {
  const [t] = useTr();
  return (
    <>
      <S.Container>
        <LazyLottie loop={false} animationData={failureAnimationData} style={lottieStyle} />
        <S.ConnectionErrMsg>{t('couldnt_connect_try_again')}</S.ConnectionErrMsg>
      </S.Container>
      <S.TopBtn block>
        <i className='icon-refresh' />
        {t('try_again')}
      </S.TopBtn>
      <Button block variant='outlined' color='primary'>
        {t('save_in_draft')}
      </Button>
    </>
  );
};
