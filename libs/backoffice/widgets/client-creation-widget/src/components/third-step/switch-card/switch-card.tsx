import { Switch } from '@oxygen/ui-kit';
import { useState } from 'react';
import { useToggle } from '@oxygen/hooks';

import * as S from './switch-card.style';
import LimitsModal from '../modal/limits-modal';
import { useTr } from '@oxygen/translation';

type Props = {
  idx: number;
  name: string;
  hasLimitations: boolean;
  serviceCount?: string;
};

export default function SwitchCard(props: Props) {
  const [t] = useTr();
  const { name, idx, hasLimitations, serviceCount } = props;
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, toggleModalOpen] = useToggle(false);
  return (
    <>
      <S.Card key={idx} isChecked={isChecked}>
        <S.CardHeader>
          <S.CardName>{name}</S.CardName>
          <Switch checked={isChecked} onChange={(e) => setIsChecked(e)} />
        </S.CardHeader>

        {hasLimitations && (
          <S.SettingBtn onClick={toggleModalOpen} disabled={!isChecked} color='primary' variant='text'>
            <S.Icon className='icon-setting' />
          </S.SettingBtn>
        )}
      </S.Card>
      <LimitsModal toggle={toggleModalOpen} isOpen={isModalOpen} services={serviceCount} />
    </>
  );
}
