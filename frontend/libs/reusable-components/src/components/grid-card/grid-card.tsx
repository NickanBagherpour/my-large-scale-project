import { useTr } from '@oxygen/translation';
import * as S from './grid-card.style';
import { looper, Calendar } from '../../assets';

function isUpstreamCard(props: ClientCardProps | UpstreamCardProps): props is UpstreamCardProps {
  return 'activeServersCount' in props;
}

export default function GridCard(props: ClientCardProps | UpstreamCardProps) {
  if (isUpstreamCard(props)) {
    return <UpstreamCard {...props} />;
  }
  return <ClientCard {...props} />;
}

export type Status = 'active' | 'inactive';

type ClientCardProps = {
  name: string;
  englishName: string;
  status: Status;
  date: string;
  href: string;
};

function ClientCard(props: ClientCardProps) {
  const { date, name, englishName, status, href } = props;
  const [t] = useTr();

  const translation: Record<Status, string> = {
    active: t('common.active'),
    inactive: t('common.inactive'),
  };

  return (
    <S.Container href={href}>
      <S.Header>
        <S.Title>{name}</S.Title>
        <S.Settings className='icon-setting' />
      </S.Header>

      <S.EName>{englishName}</S.EName>

      <S.Footer>
        <S.Indicator status={status} />
        <S.Status>{translation[status]}</S.Status>

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
};

function UpstreamCard(props: UpstreamCardProps) {
  const { name, href, activeServersCount } = props;
  const [t] = useTr();

  return (
    <S.Container href={href}>
      <S.Header flip>
        <S.Title>{name}</S.Title>
        <S.Settings className='icon-setting' />
      </S.Header>

      <S.Footer>
        <S.Indicator status={'active'} />
        <S.Status>{t('grid_card.active_servers_count', { count: activeServersCount })}</S.Status>
      </S.Footer>

      <S.Looper alt='' width={276} height={112} src={looper} />
    </S.Container>
  );
}
