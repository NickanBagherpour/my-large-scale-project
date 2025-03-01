import * as S from './plugin-services.style';
import { useTr } from '@oxygen/translation';
import { type ReactNode } from 'react';
import { Tooltip } from 'antd';
import { type ServicePlugin } from '../../types/plugins.type';
import { Tag } from '@oxygen/ui-kit';

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
    { name: t('uikit.upstream'), value: upstream },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.Index>
          {t('uikit.service')} {idx + 1}
        </S.Index>
        <S.ServiceName>{persianName}</S.ServiceName>
      </S.Header>
      <S.Body>
        <S.Grid>
          {data.map(({ name, value }, idx) => (
            <div key={idx}>
              <S.ItemName>{name}</S.ItemName>
              <Tooltip title={value} placement='top'>
                <S.ItemValue>{value}</S.ItemValue>
              </Tooltip>
            </div>
          ))}
        </S.Grid>

        <S.ItemName>{t('uikit.scope')}</S.ItemName>
        <S.Scopes>
          {scopes.map((scope, idx) => (
            <Tag type='processing' key={idx}>
              {scope}
            </Tag>
          ))}
        </S.Scopes>

        {children}
      </S.Body>
    </S.Container>
  );
}
