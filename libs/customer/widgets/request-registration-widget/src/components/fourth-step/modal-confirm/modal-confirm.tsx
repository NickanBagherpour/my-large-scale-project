import Link from 'next/link';
import { ROUTES } from '@oxygen/utils';
import { useTr } from '@oxygen/translation';
import { Icons } from '@oxygen/ui-kit';
import * as S from './modal-confirm.style';
import { Card } from 'antd';
import { useRouter } from 'next/navigation';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  trackCode: string;
};

export default function ConfirmModal(props: Props) {
  const [t] = useTr();
  const { isOpen, toggle, trackCode } = props;
  const router = useRouter();

  const handleCancel = () => {
    toggle();
    router.push(ROUTES.CUSTOMER.REQUEST_MANAGEMENT);
  };

  return (
    <S.ModalContainer
      centered
      open={isOpen}
      closable={false}
      keyboard={false}
      footer={[]}
      onCancel={handleCancel}
       maskClosable={false}
    >
      <Card>
        <S.Info>
          <S.IconWrapper>
            <Icons.TickCircleOutline />
          </S.IconWrapper>
          <span>{t('registered_request_successfully')}</span>
        </S.Info>
        <S.FollowCode>
          {t('follow_code')} {trackCode}
        </S.FollowCode>
      </Card>
      <S.ReturnToRequest>
        <i className='icon-home-empty' />
        <Link href={ROUTES.CUSTOMER.REQUEST_MANAGEMENT}>{t('return_to_request')}</Link>
      </S.ReturnToRequest>
    </S.ModalContainer>
  );
}
