import { useTr } from '@oxygen/translation';
import Title from '../title/title';
import * as S from './servcie-tariff.style';
import TarrifRadio, { type Value } from '../tariff-radio/tarrif-radio';
import { useState } from 'react';

export default function ServiceTarrif() {
  const [t] = useTr();
  const [selectedTariff, setSelectedTariff] = useState<Value | null>(null);

  const toggleTariffType = (value: Value) => {
    setSelectedTariff((prev) => (prev === value ? null : value));
  };

  const tariffs = [
    { value: 'fixed', checked: selectedTariff === 'fixed', onChange: toggleTariffType },
    { value: 'tiered', checked: selectedTariff === 'tiered', onChange: toggleTariffType },
    { value: 'special', checked: selectedTariff === 'special', onChange: toggleTariffType },
  ] as const;

  return (
    <section>
      <Title>{t('service_tariff')}</Title>

      <S.Section>
        <S.Type>{t('tariff_type')}</S.Type>
        {tariffs.map((item, key) => (
          <TarrifRadio {...item} key={key} />
        ))}
      </S.Section>
    </section>
  );
}
