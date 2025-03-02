import { useTr } from '@oxygen/translation';
import * as S from './tarrif-radio.style';
import { Radio } from 'antd';

export type Value = 'fixed' | 'tiered' | 'special';

type Props = {
  value: Value;
  checked: boolean;
  onChange: (value: Value) => void;
};

const icons: Record<Value, string> = {
  fixed: 'icon-folder',
  special: 'icon-star',
  tiered: 'icon-3square',
};

export default function TarrifRadio(props: Props) {
  const { value, checked, onChange } = props;
  const [t] = useTr();

  const titles: Record<Value, string> = {
    fixed: t('fixed_tariff'),
    tiered: t('tiered_tariff'),
    special: t('special_tariff'),
  };

  return (
    <S.Label $checked={checked} $type={value}>
      <S.Icon $value={value} className={icons[value]} />
      <S.Txt>{titles[value]}</S.Txt>
      <Radio checked={checked} value={value} onChange={(e) => onChange(e.target.value)} />
    </S.Label>
  );
}
