import { Button, type ButtonProps } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import * as S from './footer.style';

type Props = {
  onRegister: () => void;
  onReturn: () => void;
  registerButtonProps?: ButtonProps;
  className?: string;
};

export default function Footer(props: Props) {
  const { onRegister, onReturn, registerButtonProps = {}, className } = props;
  const [t] = useTr();

  return (
    <S.FooterContainer className={className}>
      <Button variant={'outlined'} onClick={onReturn}>
        {t('button.return')}
      </Button>
      <Button htmlType={'submit'} onClick={onRegister} {...registerButtonProps}>
        {t('button.register_info')}
      </Button>
    </S.FooterContainer>
  );
}
