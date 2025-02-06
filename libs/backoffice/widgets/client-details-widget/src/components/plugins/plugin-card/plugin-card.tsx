import { Switch } from '@oxygen/ui-kit';
import * as S from './plugin-card.style';
import { PluginConfig } from '../utils/plugins.type';
// import { updateCurrentConfig, useAppDispatch } from '../../context';

type Props = {
  plugin: PluginConfig;
  onCheck: (isChecked: boolean) => void;
};

export default function PluginCard(props: Props) {
  const {
    plugin: { enabled, name },
    plugin,
    onCheck,
  } = props;
  // const dispatch = useAppDispatch();
  const hasSetting = name !== 'request-non-repudiation'; // TODO: clean this

  return (
    <S.Card isChecked={enabled}>
      <S.CardHeader>
        <S.CardName>{name}</S.CardName>
        <Switch checked={enabled} onChange={(isChecked) => void onCheck(isChecked)} />
      </S.CardHeader>

      {hasSetting && (
        <S.SettingBtn
          variant='link'
          color='primary'
          disabled={!enabled}
          // onClick={() => updateCurrentConfig(dispatch, plugin)}
        >
          <S.Icon className='icon-setting' />
        </S.SettingBtn>
      )}
    </S.Card>
  );
}
