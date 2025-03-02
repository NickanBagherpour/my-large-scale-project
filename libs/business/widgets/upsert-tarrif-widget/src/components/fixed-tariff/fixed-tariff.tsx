import { useTr } from '@oxygen/translation';
import { Input } from 'antd';
import * as S from './fixed-tariff.style';

export default function FixedTariff() {
  const [t] = useTr();
  return (
    <S.FormItem colon label={t('tariff_amount_irr')}>
      <Input placeholder={t('enter_amount')} />
    </S.FormItem>
  );
}
