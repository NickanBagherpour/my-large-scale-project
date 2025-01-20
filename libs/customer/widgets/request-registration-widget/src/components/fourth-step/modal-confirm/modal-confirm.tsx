import Link from 'next/link';
import { ROUTES } from '@oxygen/utils';
import { useTr } from '@oxygen/translation';
import { Icons } from '@oxygen/ui-kit';
import * as S from './modal-confirm.style';
import { Card } from 'antd';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  trackCode: string;
};

export default function ConfirmModal(props: Props) {
  const [t] = useTr();
  const { isOpen, toggle, trackCode } = props;

  return (
    <S.ModalContainer
      centered
      open={isOpen}
      closable={false}
      keyboard={false}
      onCancel={toggle}
      footer={[]}
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
        <i className='icon-home' />
        <Link href={ROUTES.CUSTOMER.REQUEST_MANAGEMENT}>{t('return_to_request')}</Link>
      </S.ReturnToRequest>
    </S.ModalContainer>
  );
}
