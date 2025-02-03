import { Switch } from '@oxygen/ui-kit';
import * as S from './plugin-card.style';
import { useState } from 'react';
import LimitationsModal from '../limitations-modal/limitations-modal';
import { useToggle } from '@oxygen/hooks';
import { PluginConfig } from '../../types/plugins.type';

type Props = {
  plugin: PluginConfig;
};

export default function PluginCard(props: Props) {
  const {
    plugin: { enabled, name },
  } = props;
  const [isChecked, setIsChecked] = useState(enabled);
  const [isModalOpen, toggleModalOpen] = useToggle(false);

  return (
    <>
      <S.Card isChecked={isChecked}>
        <S.CardHeader>
          <S.CardName>{name}</S.CardName>
          <Switch checked={isChecked} onChange={(e) => setIsChecked(e)} />
        </S.CardHeader>

        {enabled && (
          <S.SettingBtn onClick={toggleModalOpen} disabled={!isChecked} color='primary' variant='link'>
            <S.Icon className='icon-setting' />
          </S.SettingBtn>
        )}
      </S.Card>

      {isModalOpen && <LimitationsModal toggle={toggleModalOpen} isOpen={isModalOpen} />}
    </>
  );
}
