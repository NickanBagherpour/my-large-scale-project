import * as S from './plugin-services.style';
import { useTr } from '@oxygen/translation';
import PluginCard from '../plugin-card/plugin-card';
import { Button } from '@oxygen/ui-kit';
import { Plugin } from '@oxygen/types';
import { Tooltip } from 'antd';

export default function PluginServices(props: Plugin) {
  const { idx, name, englishName, status, version, scope, upstream } = props;
  const [t] = useTr();

  const data = [
    { name: t('english_name'), value: englishName },
    { name: t('status'), value: status },
    { name: t('version'), value: version },
    { name: t('scope'), value: scope },
    { name: t('upstream'), value: upstream },
  ];

  const cardsData = [
    { name: t('rate_limit_plugin'), isChecked: false },
    { name: t('non_denial'), isChecked: true },
    { name: t('new_request_validation'), isChecked: true },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.Tag>
          {t('service')} {idx}
        </S.Tag>
        <S.ServiceName>{name}</S.ServiceName>
      </S.Header>
      <div>
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

        <S.Cards>
          {cardsData.map(({ name }, idx) => (
            <PluginCard name={name} idx={idx} />
          ))}

          <S.Divider orientation='center' type='vertical' />

          <Button shape='circle'>
            <S.PlusIcon className='icon-plus' />
          </Button>
        </S.Cards>
      </div>
    </S.Container>
  );
}
