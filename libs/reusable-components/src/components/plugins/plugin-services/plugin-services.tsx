import * as S from './plugin-services.style';
import { useTr } from '@oxygen/translation';
import PluginCard from '../plugin-card/plugin-card';
import { PluginConfig } from '../utils/plugins.type';

type Props = {
  idx: number;
  plugins: PluginConfig[];
  onUpdateConfig: (config: PluginConfig | null) => void;
};

export default function PluginServices(props: Props) {
  const { idx, plugins, onUpdateConfig /* name, englishName, status, version, scope, upstream */ } = props;
  const [t] = useTr();

  // const data = [
  // 	{ name: t('english_name'), value: englishName },
  // 	{ name: t('status'), value: status },
  // 	{ name: t('version'), value: version },
  // 	{ name: t('scope'), value: scope },
  // 	{ name: t('upstream'), value: upstream },
  // ];

  return (
    <S.Container>
      <S.Header>
        <S.Tag>
          {t('service')} {idx + 1}
        </S.Tag>
        {/* <S.ServiceName>{name}</S.ServiceName> */}
      </S.Header>
      <div>
        {/*
        <S.Items>
          {data.map(({ name, value }, idx) => (
            <div key={idx}>
              <S.ItemName>{name}</S.ItemName>
              <Tooltip title={value} placement='top'>
                <S.ItemValue>{value}</S.ItemValue>
              </Tooltip>
            </div>
          ))}
        </S.Items>
        */}

        <S.Cards>
          {plugins.map((plugin) => (
            <PluginCard plugin={plugin} onCheck={(isChecked) => onUpdateConfig({ ...plugin, enabled: isChecked })} />
          ))}
        </S.Cards>
      </div>
    </S.Container>
  );
}
