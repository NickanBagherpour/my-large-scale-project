import { useTr } from '@oxygen/translation';
import * as S from './add-condition.style';
import { TariffType } from '../../types';

type Props = {
  tariffType: TariffType;
  onClick: () => void;
};

// TODO: ADD A BTN TO THIS COMPONENT'S NAME
export default function AddCondition(props: Props) {
  const { tariffType, onClick } = props;
  const [t] = useTr();

  return (
    <S.Button variant='link' $tariffType={tariffType} onClick={onClick}>
      <i className='icon-plus-circle' />
      {t('add_condition')}
    </S.Button>
  );
}
