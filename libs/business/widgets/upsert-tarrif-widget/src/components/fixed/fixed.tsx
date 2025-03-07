import { useTr } from '@oxygen/translation';
import * as S from './fixed.style';
import { RuleRender } from 'antd/es/form';
import { newTariff } from '../../utils';
import { Input } from '@oxygen/ui-kit';

type Props = {
  rule: RuleRender;
};

export default function FixedTariff(props: Props) {
  const { rule } = props;
  const [t] = useTr();
  return (
    <S.FormItem name={[newTariff.fixed]} colon label={t('tariff_amount_irr')} rules={[rule]}>
      <Input.Money
        changeOnBlur={false}
        placeholder={t('enter_amount')}
        showLetter={false}
        formatter={(value) => (value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '')}
        parser={(value) => value?.replace(/,/g, '') as unknown as number}
      />
    </S.FormItem>
  );
}
