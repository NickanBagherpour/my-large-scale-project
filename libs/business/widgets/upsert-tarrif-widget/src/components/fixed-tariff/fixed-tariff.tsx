import { useTr } from '@oxygen/translation';
import { Input } from 'antd';
import * as S from './fixed-tariff.style';
import { RuleRender } from 'antd/es/form';
import { serviceTariffName, tariffPrice } from '../../utils';

type Props = {
  rule: RuleRender;
};

export default function FixedTariff(props: Props) {
  const { rule } = props;
  const [t] = useTr();
  return (
    <S.FormItem name={[serviceTariffName, tariffPrice]} colon label={t('tariff_amount_irr')} rules={[rule]}>
      <Input placeholder={t('enter_amount')} />
    </S.FormItem>
  );
}
