import { Switch } from '@oxygen/ui-kit';
import * as S from './plugin-card.style';
import { PluginConfig } from '../utils/plugins.type';

type Props = {
  plugin: PluginConfig;
  onCheck: (isChecked: boolean) => void;
  onSetting: () => void;
};

export default function PluginCard(props: Props) {
  const {
    plugin: { enabled, title },
    onCheck,
    onSetting,
  } = props;

  return (
    <S.Card $isChecked={enabled}>
      <S.CardHeader>
        <S.CardName>{title}</S.CardName>
        <Switch checked={enabled} onChange={(isChecked) => void onCheck(isChecked)} />
      </S.CardHeader>

      <S.SettingBtn variant='link' color='primary' disabled={!enabled} onClick={onSetting}>
        <S.Icon className='icon-setting' />
      </S.SettingBtn>
    </S.Card>
  );
}
