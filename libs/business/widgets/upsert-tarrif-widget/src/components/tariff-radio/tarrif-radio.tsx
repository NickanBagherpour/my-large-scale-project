import { useTr } from '@oxygen/translation';
import * as S from './tarrif-radio.style';
import { Radio } from 'antd';
import { TariffType } from '../../types';

type Props = {
  value: TariffType;
  checked: boolean;
  onChange?: (value: TariffType) => void;
};

const icons: Record<TariffType, string> = {
  fixed: 'icon-folder',
  special: 'icon-star',
  tiered: 'icon-3square',
};

export default function TarrifRadio(props: Props) {
  const { value, checked, onChange } = props;
  const [t] = useTr();

  const titles: Record<TariffType, string> = {
    fixed: t('fixed_tariff'),
    tiered: t('tiered_tariff'),
    special: t('special_tariff'),
  };

  return (
    <S.Label $checked={checked} $type={value}>
      <S.Icon $value={value} className={icons[value]} />
      <S.Txt>{titles[value]}</S.Txt>
      <Radio checked={checked} value={value} onChange={(e) => onChange?.(e.target.value)} />
    </S.Label>
  );
}
