import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import { ROUTES } from '@oxygen/utils';
import { MutationStatus } from '@tanstack/react-query';
import { StatusModal } from '@oxygen/reusable-components';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  status: MutationStatus;
};

export default function ResultModal(props: Props) {
  const { isOpen, status } = props;
  const [t] = useTr();

  const content = {
    success: 'success',
    pending: 'loading',
    idle: 'loading',
    error: 'error',
  } as const;

  return (
    <StatusModal
      isOpen={isOpen}
      status={content[status]}
      loadingProps={{
        description: t('we_are_processing_please_wait'),
        footer: (
          <Button block variant='outlined' color='primary' disabled>
            <i className='icon-home-empty' />
            {t('service_managment')}
          </Button>
        ),
      }}
      successProps={{
        description: t('register_request_was_submitted'),
        footer: (
          <Button block variant='outlined' color='primary' href={ROUTES.BACKOFFICE.SERVICE_LIST}>
            <i className='icon-home-empty' />
            {t('service_managment')}
          </Button>
        ),
      }}
      errorProps={{
        description: t('date_wasnt_registered'),
        footer: [
          <Button block href={ROUTES.BACKOFFICE.SERVICE_LIST}>
            <i className='icon-home-empty' />
            {t('service_managment')}
          </Button>,
          <Button block variant='outlined' color='primary' href={ROUTES.BACKOFFICE.SERVICE_LIST}>
            {t('save_in_draft')}
          </Button>,
        ],
      }}
    />
  );
}

// const BadRequestErorr = () => {
//   const [t] = useTr();
//   const state = useAppState();
//   const dispatch = useAppDispatch();
//
//   const errors = state.stepStatuses.reduce((acc, step) => {
//     if (step.error) {
//       const newErrors = Object.values(step.error).map((value) => ({ code: null, message: value }));
//       return [...acc, ...newErrors];
//     }
//     return acc;
//   }, [] as Array<{ code: string | null; message: string }>);
//
//   return (
//     <>
//       <S.Container>
//         <LazyLottie loop={false} animationData={failureAnimationData} style={lottieStyle} />
//         <S.ErrorsList>
//           {errors.map(({ message, code }, idx) => (
//             <S.RequestError key={idx}>
//               <S.ErrIcon className='icon-warning' />
//               <S.ErrMsg>{message}</S.ErrMsg>
//               {code && <S.ErrCode>{`(${t('err')} ${code})`}</S.ErrCode>}
//             </S.RequestError>
//           ))}
//         </S.ErrorsList>
//       </S.Container>
//       <S.TopBtn block onClick={() => goToFirstError(dispatch)}>
//         <i className='icon-edit' />
//         {t('edit_data')}
//       </S.TopBtn>
//       <Button href={ROUTES.BACKOFFICE.SERVICE_LIST} block variant='outlined' color='primary'>
//         {t('save_in_draft')}
//       </Button>
//     </>
//   );
// };
