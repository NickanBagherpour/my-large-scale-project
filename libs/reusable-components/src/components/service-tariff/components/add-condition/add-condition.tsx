import { useTr } from '@oxygen/translation';
import * as S from './add-condition.style';
import { TariffType } from '../../type';
import DisabledContext from 'antd/es/config-provider/DisabledContext';
import { use } from 'react';

type Props = {
  tariffType: TariffType;
  onClick: () => void;
};

// TODO: ADD A BTN TO THIS COMPONENT'S NAME
export default function AddCondition(props: Props) {
  const { tariffType, onClick } = props;
  const [t] = useTr();
  const disabled = use(DisabledContext);

  return (
    <S.Button variant='link' disabled={disabled} $tariffType={tariffType} onClick={onClick}>
      <i className='icon-plus-circle' />
      {t('reusable.add_condition')}
    </S.Button>
  );
}
