import Link from 'next/link';
import { ROUTES } from '@oxygen/utils';
import { useTr } from '@oxygen/translation';
import { Icons } from '@oxygen/ui-kit';
import * as S from './modal-waiting.style';
import { Card } from 'antd';
import { Button } from '@oxygen/ui-kit';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  // trackCode: string;
};

export default function WaitingModal(props: Props) {
  const [t] = useTr();
  const { isOpen, toggle } = props;

  return (
    <S.ModalContainer centered open={isOpen} closable={false} keyboard={false} onCancel={toggle} footer={[]}>
      <Card>
        <S.Info>
          <S.IconWrapper>
            <Icons.Setting />
          </S.IconWrapper>
          {/* <span>{t('registered_request_successfully')}</span> */}
        </S.Info>
        <S.FollowCode>{t('waiting_msg')}</S.FollowCode>
      </Card>

      <S.ButtonContainer>
        {/* <Button
          className={'register-button'}
          color={'primary'}
          size={'large'}
          icon={<i className='icon-refresh' />}
          // disabled={isSubmitDisabled}
          // onClick={submitForm}
          // loading={firstIsPending}
        >
          {t('try_again')}
        </Button> */}
        <Button
          className={'register-button'}
          // color={'primary'}
          size={'large'}
          variant={'outlined'}
          // disabled={isSubmitDisabled}
          onClick={toggle}
          // loading={firstIsPending}
        >
          {t('cancel')}
        </Button>
      </S.ButtonContainer>

      {/* <S.ReturnToRequest>
        <i className='icon-home' />
        <Link href={ROUTES.CUSTOMER.REQUEST_MANAGEMENT} target={'_blank'}>
          {t('return_to_request')}
        </Link>
      </S.ReturnToRequest> */}
    </S.ModalContainer>
  );
}
