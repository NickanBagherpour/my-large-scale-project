import * as S from './plugin-services.style';
import { useTr } from '@oxygen/translation';
import { type ReactNode } from 'react';
import { ServicePlugin } from '../utils/plugins.type';
import { Tooltip } from 'antd';

type Props = {
  idx: number;
  children: ReactNode;
} & Omit<ServicePlugin, 'plugins' | 'serviceInfoId'>;

export default function PluginServices(props: Props) {
  const { idx, children, name, version, upstream, scopes, isActive, persianName } = props;
  const [t] = useTr();

  const data = [
    { name: t('uikit.english_name'), value: name },
    { name: t('uikit.status'), value: isActive ? t('common.active') : t('common.inactive') },
    { name: t('uikit.version'), value: version },
    { name: t('uikit.scope'), value: scopes.join(' , ') },
    { name: t('uikit.upstream'), value: upstream },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.Tag>
          {t('uikit.service')} {idx + 1}
        </S.Tag>
        <S.ServiceName>{persianName}</S.ServiceName>
      </S.Header>
      <S.Body>
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

        {children}
      </S.Body>
    </S.Container>
  );
}
