import { useTr } from '@oxygen/translation';
import { TariffType } from '../../type';
import { use } from 'react';
import DisabledContext from 'antd/es/config-provider/DisabledContext';
import * as S from './tariff.style';
import { tariffTypes } from '../../utils';
import { Radio } from 'antd';

type TariffProps =
  | {
      value?: TariffType | null;
      onChange?: (value: TariffType) => void;
    }
  | Record<string, never>;

const icons: Record<TariffType, string> = {
  fixed: 'icon-folder',
  special: 'icon-star',
  tiered: 'icon-3square',
};

export default function Tarrif(props: TariffProps) {
  const { value, onChange } = props;
  const [t] = useTr();
  const disabled = use(DisabledContext);

  const titles: Record<TariffType, string> = {
    fixed: t('reusable.fixed_tariff'),
    tiered: t('reusable.tiered_tariff'),
    special: t('reusable.special_tariff'),
  };

  if (!value) return null;

  return disabled ? (
    <>
      <S.DisabledTitle>{t('reusable.tariff_type')}</S.DisabledTitle>
      <S.Badge $type={value}>
        <S.Icon $type={value} className={icons[value]} />
        <S.DisabledTxt>{titles[value]}</S.DisabledTxt>
      </S.Badge>
    </>
  ) : (
    <S.RadioRow>
      <S.RadioTitle>{t('reusable.tariff_type')}:</S.RadioTitle>
      {tariffTypes.map((item, key) => (
        <S.Label key={key} $checked={value === item} $type={value}>
          <S.Icon $type={item} className={icons[value]} />
          <S.Txt>{titles[item]}</S.Txt>
          <Radio checked={value === item} value={item} onChange={(e) => onChange?.(e.target.value)} />
        </S.Label>
      ))}
    </S.RadioRow>
  );
}
