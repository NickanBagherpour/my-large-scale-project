import { Tooltip } from 'antd';

import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import { Plugin } from '@oxygen/types';

import SwitchCard from '../switch-card/switch-card';

import * as S from './main-card.style';

export default function MainCard(props: Plugin) {
  const { idx, name, englishName, status, version, scope, upstream } = props;
  const [t] = useTr();

  const data = [
    { name: t('step_three.english_name'), value: englishName },
    { name: t('step_three.status'), value: status },
    { name: t('step_three.version'), value: version },
    { name: t('step_three.scope'), value: scope },
    { name: t('step_three.upstream'), value: upstream },
  ];

  const cardsData = [
    { name: t('rate_limit_plugin'), hasLimitations: true },
    { name: t('non_denial'), hasLimitations: false },
    { name: t('new_request_validation'), hasLimitations: true },
  ];
  const serviceCount = `${t('step_three.service')} ${idx}`;
  return (
    <S.Container>
      <S.Header>
        <S.Tag>{serviceCount}</S.Tag>
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
          {cardsData.map((data, idx) => (
            <SwitchCard {...data} idx={idx} serviceCount={serviceCount} />
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
