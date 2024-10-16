import { useTr } from '@oxygen/translation';
import * as S from './client-card.style';
import { Calendar, looper } from '@oxygen/ui-kit';

export type Status = 'active' | 'inactive';

type Props = {
  name: string;
  englishName: string;
  status: Status;
  date: string;
  href: string;
};

export function ClientCard(props: Props) {
  const { date, name, englishName, status, href } = props;
  const [t] = useTr();

  const translation: Record<Status, string> = {
    active: t('common.active'),
    inactive: t('common.inactive'),
  };

  return (
    <S.Container href={href}>
      <S.Header>
        <div>
          <S.Title>{name}</S.Title>
          <S.EName>{englishName}</S.EName>
        </div>
        <S.Settings className='icon-setting' />
      </S.Header>

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
