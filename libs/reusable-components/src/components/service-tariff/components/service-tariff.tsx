import { useTr } from '@oxygen/translation';
import * as S from './servcie-tariff.style';
import { Divider } from '@oxygen/ui-kit';
import { TARIFF } from '../utils';
import { Form } from 'antd';
import { FormInstance, RuleRender } from 'antd/es/form';
import Fixed from './fixed/fixed';
import Tiered from './tiered/tiered';
import Special from './special/special';
import { TariffType } from '../type';
import Tarrif from './tariff/tariff';

type Props = {
  rule: RuleRender | null;
  form: FormInstance<any>;
  type: 'details' | 'upsert';
};

export function ServiceTariff(props: Props) {
  const { rule, form, type } = props;
  const rules: RuleRender[] = rule ? [rule] : [];
  const [t] = useTr();
  const tariffType = Form.useWatch([TARIFF.type], form) as TariffType;
  const hasNotice = type === 'upsert' && tariffType !== 'fixed';

  const inputs: Record<TariffType, React.JSX.Element> = {
    fixed: <Fixed rules={rules} />,
    tiered: <Tiered rules={rules} />,
    special: <Special rules={rules} />,
  };

  return (
    <>
      <Form.Item rules={rules} name={[TARIFF.type]}>
        <Tarrif />
      </Form.Item>
      {hasNotice && (
        <S.Notice>
          <S.Icon className='icon-info-circle' />
          <span>{t('enter_infinity_value')}</span>
        </S.Notice>
      )}
      <Divider />
      {tariffType && inputs[tariffType]}
    </>
  );
}
