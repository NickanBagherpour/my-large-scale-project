import { useTr } from '@oxygen/translation';
import { looper, Calendar } from '../../assets';
import { useTheme } from 'styled-components';
import { Tooltip } from 'antd';
import { Status } from '@oxygen/ui-kit';

import * as S from './grid-card.style';

function isUpstreamCard(props: ClientCardProps | UpstreamCardProps): props is UpstreamCardProps {
  return 'activeServersCount' in props;
}

export default function GridCard(props: ClientCardProps | UpstreamCardProps) {
  if (isUpstreamCard(props)) {
    return <UpstreamCard {...props} />;
  }
  return <ClientCard {...props} />;
}

export type StatusType = 'active' | 'inactive';

type ClientCardProps = {
  name: string;
  englishName: string;
  status: StatusType;
  date: string;
  href: string;
  wordToHighlight: string;
};

function ClientCard(props: ClientCardProps) {
  const { date, name, englishName, status, href, wordToHighlight } = props;
  const [t] = useTr();
  const theme = useTheme();

  const translation: Record<StatusType, string> = {
    active: t('common.active'),
    inactive: t('common.inactive'),
  };

  return (
    <S.Container href={href}>
      <S.Header>
        <Tooltip title={name}>
          <S.Title text={name} highlightColor={theme.secondary.main} wordToHighlight={wordToHighlight} />
        </Tooltip>
        <S.Settings className='icon-setting' />
      </S.Header>

      <S.EName>{englishName}</S.EName>

      <S.Footer>
        <Status status={status} />
        <S.StatusTxt>{translation[status]}</S.StatusTxt>

        <Calendar />
        <S.Date>{date}</S.Date>
      </S.Footer>

      <S.Looper alt='' width={276} height={112} src={looper} />
    </S.Container>
  );
}

type UpstreamCardProps = {
  href: string;
  name: string;
  activeServersCount: number;
  wordToHighlight: string;
};

function UpstreamCard(props: UpstreamCardProps) {
  const { name, href, activeServersCount, wordToHighlight } = props;
  const [t] = useTr();
  const theme = useTheme();

  return (
    <S.Container href={href}>
      <S.Header isUpstream={isUpstreamCard(props)}>
        <S.Title
          text={name}
          highlightColor={theme.secondary.main}
          wordToHighlight={wordToHighlight}
          isUpstream={isUpstreamCard(props)}
        />
        <S.Settings className='icon-setting' isUpstream={isUpstreamCard(props)} />
      </S.Header>
      <S.Footer isUpstream={isUpstreamCard(props)}>
        <Status status={'active'} />
        <S.StatusTxt>{t('grid_card.active_servers_count', { count: activeServersCount })}</S.StatusTxt>
      </S.Footer>

      <S.Looper alt='' width={276} height={112} src={looper} />
    </S.Container>
  );
}
