import { Button } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { FooterContainer } from '@oxygen/reusable-components';

type Props = {
  onRegister: () => void;
  onReturn: () => void;
};

export default function Footer(props: Props) {
  const { onRegister, onReturn } = props;
  const [t] = useTr();

  return (
    <FooterContainer>
      <Button variant={'outlined'} onClick={onReturn}>
        {t('button.return')}
      </Button>
      <Button htmlType={'submit'} onClick={onRegister}>
        {t('register_info')}
      </Button>
    </FooterContainer>
  );
}
