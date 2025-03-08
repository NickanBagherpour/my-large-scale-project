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
  rule: RuleRender;
  form: FormInstance<any>; // TODO: FIX THIS
  type: 'details' | 'upsert';
};

export function ServiceTariff(props: Props) {
  const { rule, form, type } = props;
  const [t] = useTr();
  const tariffType = Form.useWatch([TARIFF.type], form);

  const inputs: Record<TariffType, React.JSX.Element> = {
    fixed: <Fixed rule={rule} />,
    tiered: <Tiered rule={rule} />,
    special: <Special rule={rule} />,
  };

  return (
    <>
      {type === 'upsert' && <S.Title>{t('reusable.service_tariff')}</S.Title>}
      <S.Section>
        <Form.Item rules={[rule]} name={[TARIFF.type]}>
          <Tarrif />
        </Form.Item>
        <Divider />
        {tariffType && inputs[tariffType]}
      </S.Section>
    </>
  );
}
