import { useTr } from '@oxygen/translation';
import Title from '../title/title';
import * as S from './servcie-tariff.style';
import TarrifRadio from '../tariff-radio/tarrif-radio';
import FixedTariff from '../fixed-tariff/fixed-tariff';
import { Divider } from '@oxygen/ui-kit';
import { tariff, tariffTypes } from '../../utils';
import { TariffType } from '../../types';
import Tiered from '../tiered/tiered';
import Special from '../special/special';
import { Form } from 'antd';
import { FormInstance, RuleRender } from 'antd/es/form';
import { AppSchemaType } from '../../types/app.schema';

type Props = {
  rule: RuleRender;
  form: FormInstance<AppSchemaType>;
};

export default function ServiceTarrif(props: Props) {
  const { rule, form } = props;
  const [t] = useTr();
  const tariffType = Form.useWatch([tariff.serviceTariff, tariff.tariff], form);

  const inputs: Record<TariffType, React.JSX.Element> = {
    // TODO: add tariff to all components or remove it from all.
    fixed: <FixedTariff rule={rule} />,
    tiered: <Tiered rule={rule} />,
    special: <Special rule={rule} />,
  };

  return (
    <section>
      <Title>{t('service_tariff')}</Title>
      <S.Section>
        <Form.Item rules={[rule]} name={[tariff.serviceTariff, tariff.tariff]}>
          <Tarrifs />
        </Form.Item>
        <Divider />
        {tariffType && inputs[tariffType]}
      </S.Section>
    </section>
  );
}

type TariffProps = {
  value?: TariffType | null;
  onChange?: (value: TariffType) => void;
};

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
