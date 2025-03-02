import { useTr } from '@oxygen/translation';
import Title from '../title/title';
import * as S from './servcie-tariff.style';
import TarrifRadio from '../tariff-radio/tarrif-radio';
import { useState } from 'react';
import FixedTariff from '../fixed-tariff/fixed-tariff';
import { Divider } from '@oxygen/ui-kit';
import { tariffTypes } from '../../utils';
import { TariffType } from '../../types';
import Tiered from '../tiered/tiered';
import Special from '../special/special';

const inputs: Record<TariffType, React.JSX.Element> = {
  fixed: <FixedTariff />,
  tiered: <Tiered />,
  special: <Special />,
};

export default function ServiceTarrif() {
  const [t] = useTr();
  const [selectedTariff, setSelectedTariff] = useState<TariffType | null>('tiered');

  const toggleTariffType = (value: TariffType) => {
    setSelectedTariff((prev) => (prev === value ? null : value));
  };

  return (
    <section>
      <Title>{t('service_tariff')}</Title>

      <S.Section>
        <S.TariffType>
          <S.Type>{t('tariff_type')}</S.Type>
          {tariffTypes.map((item, key) => (
            <TarrifRadio value={item} checked={selectedTariff === item} onChange={toggleTariffType} key={key} />
          ))}
        </S.TariffType>
        <Divider />
        {selectedTariff && inputs[selectedTariff]}
      </S.Section>
    </section>
  );
}
