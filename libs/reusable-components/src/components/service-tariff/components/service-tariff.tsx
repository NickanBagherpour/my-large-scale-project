import { useTr } from '@oxygen/translation';
import * as S from './servcie-tariff.style';
import { Divider } from '@oxygen/ui-kit';
import { TARIFF, tariffTypes } from '../utils';
import { Form } from 'antd';
import { FormInstance, RuleRender } from 'antd/es/form';
import Fixed from './fixed/fixed';
import Tiered from './tiered/tiered';
import Special from './special/special';
import TarrifRadio from './tariff-radio/tarrif-radio';
import { TariffType } from '../type';

type Props = {
  rule: RuleRender;
  form: FormInstance<any>; // TODO: FIX THIS
};

export function ServiceTariff(props: Props) {
  const { rule, form } = props;
  const [t] = useTr();
  const tariffType = Form.useWatch([TARIFF.type], form);

  const inputs: Record<TariffType, React.JSX.Element> = {
    fixed: <Fixed rule={rule} />,
    tiered: <Tiered rule={rule} />,
    special: <Special rule={rule} />,
  };

  return (
    <>
      <S.Title>{t('service_tariff')}</S.Title>
      <S.Section>
        <Form.Item rules={[rule]} name={[TARIFF.type]}>
          <Tarrifs />
        </Form.Item>
        <Divider />
        {tariffType && inputs[tariffType]}
      </S.Section>
    </>
  );
}

type TariffProps =
  | {
      value?: TariffType | null;
      onChange?: (value: TariffType) => void;
    }
  | Record<string, never>;

// TODO: create a new file for this???
function Tarrifs(props: TariffProps) {
  const { value, onChange } = props;
  const [t] = useTr();

  return (
    <S.TariffType>
      <S.Type>{t('tariff_type')}</S.Type>
      {tariffTypes.map((item, key) => (
        <TarrifRadio value={item} checked={value === item} onChange={onChange} key={key} />
      ))}
    </S.TariffType>
  );
}
