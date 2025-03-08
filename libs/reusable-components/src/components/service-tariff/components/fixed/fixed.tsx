import { useTr } from '@oxygen/translation';
import * as S from './fixed.style';
import { RuleRender } from 'antd/es/form';
import { TARIFF } from '../../utils';
import { Input } from '@oxygen/ui-kit';

type Props = {
  rules: RuleRender[];
};

export default function FixedTariff(props: Props) {
  const { rules } = props;
  const [t] = useTr();
  return (
    <S.FormItem name={[TARIFF.fixed]} colon label={t('reusable.tariff_amount_irr')} rules={rules}>
      <Input.Money
        changeOnBlur={false}
        placeholder={t('reusable.enter_amount')}
        showLetter={false}
        formatter={(value) => (value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '')}
        parser={(value) => value?.replace(/,/g, '') as unknown as number}
      />
    </S.FormItem>
  );
}
