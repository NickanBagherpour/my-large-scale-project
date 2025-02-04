import { Switch } from '@oxygen/ui-kit';
import * as S from './plugin-card.style';
import { PluginConfig } from '../../types/plugins.type';
import { updateCurrentConfig, useAppDispatch } from '../../context';

type Props = {
  plugin: PluginConfig;
};

export default function PluginCard(props: Props) {
  const {
    plugin: { enabled, name },
    plugin,
  } = props;
  const dispatch = useAppDispatch();

  const hasSetting = name !== 'request-non-repudiation'; // TODO: clean this

  return (
    <S.Card isChecked={enabled}>
      <S.CardHeader>
        <S.CardName>{name}</S.CardName>
        <Switch checked={enabled} onChange={() => void 1} />
      </S.CardHeader>

      {hasSetting && (
        <S.SettingBtn
          variant='link'
          color='primary'
          disabled={!enabled}
          onClick={() => updateCurrentConfig(dispatch, plugin)}
        >
          <S.Icon className='icon-setting' />
        </S.SettingBtn>
      )}
    </S.Card>
  );
}
