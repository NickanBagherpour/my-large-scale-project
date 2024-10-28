import { Switch } from '@oxygen/ui-kit';
import * as S from './plugin-card.style';
import { useState } from 'react';

type Props = {
  idx: number;
  name: string;
};

export default function PluginCard(props: Props) {
  const { name, idx } = props;
  const [isChecked, setIsChecked] = useState(false);

  return (
    <S.Card key={idx} isChecked={isChecked}>
      <S.CardHeader>
        <S.CardName>{name}</S.CardName>
        <Switch checked={isChecked} onChange={(e) => setIsChecked(e)} />
      </S.CardHeader>

      <S.SettingBtn color='primary' variant='text'>
        <S.Icon className='icon-setting' />
      </S.SettingBtn>
    </S.Card>
  );
}
