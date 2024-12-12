import { Calendar } from '../../assets';
import { useTheme } from 'styled-components';
import { Tooltip } from 'antd';
import { Status, type ButtonProps } from '@oxygen/ui-kit';

import * as S from './grid-card.style';
import { useTr } from '@oxygen/translation';

export type StatusType = 'active' | 'inactive';

type CardProps = ButtonProps & {
  title: string;
  subTitle?: string;
  hasSetting?: boolean;
  status?: StatusType;
  date?: string;
  wordToHighlight?: string;
  isActive?: boolean;
  serversCount?: number;
  href?: string;
  onClick?: () => void;
  className?: string;
  isHeaderLtr?: boolean;
};

export default function GridCard(props: CardProps) {
  const {
    title,
    subTitle,
    hasSetting = true,
    status = 'active',
    date,
    wordToHighlight = '',
    isActive = false,
    serversCount,
    isHeaderLtr = false,
    ...restOfProps
  } = props;

  const [t] = useTr();
  const theme = useTheme();

  const translation: Record<StatusType, string> = {
    active: t('common.active'),
    inactive: t('common.inactive'),
  };

  return (
    <S.Button {...restOfProps} $isActive={isActive} variant='link' color='primary'>
      <S.Header $isHeaderLtr={isHeaderLtr}>
        <Tooltip title={title}>
          <S.Title text={title} highlightColor={theme.secondary.main} wordToHighlight={wordToHighlight} />
        </Tooltip>

        {hasSetting && <S.Settings />}
      </S.Header>

      {subTitle && <S.Subtitle>{subTitle}</S.Subtitle>}

      <S.Footer>
        <Status status={status} />

        <S.StatusTxt>
          {serversCount === undefined /* serversCount could be zero */
            ? translation[status]
            : t('grid_card.active_servers_count', { count: serversCount })}
        </S.StatusTxt>

        {date && (
          <>
            <Calendar />
            <S.Date>{date}</S.Date>
          </>
        )}
      </S.Footer>
    </S.Button>
  );
}
