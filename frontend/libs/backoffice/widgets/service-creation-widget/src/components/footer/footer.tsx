import { Button } from '@oxygen/ui-kit';
import * as S from './footer.style';
import { useTr } from '@oxygen/translation';

type Props = {
	onRegister: () => void;
  onReturn: () => void;
};

export default function Footer(props: Props) {
	const { onRegister, onReturn } = props;
	const [t] = useTr();

	return (
		<S.Footer>
			<Button variant={'outlined'} onClick={onReturn}>
				{t('button.return')}
			</Button>
			<Button htmlType={'submit'} onClick={onRegister}>
				{t('register_info')}
			</Button>
		</S.Footer>
	);
}
