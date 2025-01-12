import { useTr } from '@oxygen/translation';
import { Icons } from '@oxygen/ui-kit';
import * as S from './modal-success.style';
import { Card } from 'antd';
import { Button } from '@oxygen/ui-kit';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  id?: number | null;
};

export default function SuccessModal(props: Props) {
  const [t] = useTr();
  const { isOpen, toggle, id } = props;

  return (
    <S.ModalContainer centered open={isOpen} closable={false} keyboard={false} onCancel={toggle} footer={[]}>
      <Card>
        <S.Info>
          <S.IconWrapper>
            <Icons.SuccessTick />
          </S.IconWrapper>
        </S.Info>
        <S.FollowCode>{id ? t('edit_msg') : t('success_msg')}</S.FollowCode>
      </Card>

      <S.ButtonContainer>
        <Button className={'register-button'} size={'large'} variant={'outlined'} onClick={toggle}>
          {t('return')}
        </Button>
      </S.ButtonContainer>
    </S.ModalContainer>
  );
}
