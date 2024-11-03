import { Switch } from '@oxygen/ui-kit';
import { useState } from 'react';
import { useToggle } from '@oxygen/hooks';

import * as S from './switch-card.style';

type Props = {
  idx: number;
  name: string;
  hasLimitations: boolean;
};

export default function SwitchCard(props: Props) {
  const { name, idx, hasLimitations } = props;
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <S.Card key={idx} isChecked={isChecked}>
        <S.CardHeader>
          <S.CardName>{name}</S.CardName>
          <Switch checked={isChecked} onChange={(e) => setIsChecked(e)} />
        </S.CardHeader>

        {hasLimitations && (
          <S.SettingBtn disabled={!isChecked} color='primary' variant='text'>
            <S.Icon className='icon-setting' />
          </S.SettingBtn>
        )}
      </S.Card>
    </>
  );
}
