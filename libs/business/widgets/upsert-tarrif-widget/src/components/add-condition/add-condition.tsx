import { useTr } from '@oxygen/translation';
import * as S from './add-condition.style';

// TODO: ADD A BTN TO THIS COMPONENT
export default function AddCondition() {
  const [t] = useTr();

  return (
    <S.Button variant='link' color='secondary'>
      <i className='icon-plus-circle' />
      {t('add_condition')}
    </S.Button>
  );
}
