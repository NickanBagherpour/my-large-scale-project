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
    <S.FormItem layout='horizontal' name={[TARIFF.fixed]} colon label={t('reusable.tariff_amount_irr')} rules={rules}>
      <Input.Money placeholder={t('reusable.enter_amount')} showLetter={false} />
    </S.FormItem>
  );
}
