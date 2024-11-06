import { Button } from '@oxygen/ui-kit';
import * as S from './footer.style';
import { useTr } from '@oxygen/translation';
import { previousStep, useAppDispatch } from '../../context';

type Props = {
	onRegister: () => void;
};

export default function Footer(props: Props) {
	const { onRegister } = props;
	const dispatch = useAppDispatch();
	const [t] = useTr();

	return (
		<S.Footer>
			<Button variant={'outlined'} onClick={() => previousStep(dispatch)}>
				{t('button.return')}
			</Button>
			<Button htmlType={'submit'} onClick={onRegister}>
				{t('register_info')}
			</Button>
		</S.Footer>
	);
}
