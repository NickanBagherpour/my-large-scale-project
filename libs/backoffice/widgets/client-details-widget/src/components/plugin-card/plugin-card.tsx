import { Switch } from '@oxygen/ui-kit';
import * as S from './plugin-card.style';
import { useState } from 'react';
import LimitationsModal from '../limitations-modal/limitations-modal';
import { useToggle } from '@oxygen/hooks';

type Props = {
  idx: number;
  name: string;
  hasLimitations: boolean;
};

export default function PluginCard(props: Props) {
  const { name, idx, hasLimitations } = props;
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
          <S.SettingBtn onClick={toggleModalOpen} disabled={!isChecked} color='primary' variant='link'>
            <S.Icon className='icon-setting' />
          </S.SettingBtn>
        )}
      </S.Card>

      {isModalOpen && <LimitationsModal toggle={toggleModalOpen} isOpen={isModalOpen} />}
    </>
  );
}
