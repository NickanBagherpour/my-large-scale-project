import { Flex } from 'antd';
import { Divider, Tooltip } from '@oxygen/ui-kit';
import { useAppTheme } from '@oxygen/hooks';
import { useTr } from '@oxygen/translation';
import * as S from './top-metrics-section.style';
type Props = {
  icon: string;
  title: string;
  name: string;
  value: string;
  backgroundColor: string;
  color: string;
  timeRange?: number;
  showDivider?: boolean;
};
const TopMetricsSection: React.FC<Props> = ({
  icon,
  color,
  backgroundColor,
  timeRange,
  title,
  name,
  value,
  showDivider = true,
}) => {
  const theme = useAppTheme();
  const [t] = useTr();
  return (
    <S.Container>
      <S.IconBackground $color={backgroundColor}>
        <S.Icon className={icon} $color={color} />
      </S.IconBackground>
      <span style={{ width: '100%', display: 'flex', flexDirection: 'column', maxWidth: '100%', flexShrink: 1 }}>
        <S.ClientInfoContainer>
          <S.ClientInfo>
            <S.Title $color={color}>{title}</S.Title>
            <S.CustomTooltip color={theme.secondary._50}>
              <Tooltip
                title={name}
                getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement} // Custom popup container
              >
                <Flex style={{ width: '100%', flexShrink: 1, flexGrow: 1 }}>
                  <S.Name>{name}</S.Name>
                </Flex>
              </Tooltip>
            </S.CustomTooltip>
          </S.ClientInfo>
          <S.Value>
            {value}
            {timeRange && <span className='subtitle'>{'(' + timeRange + t('common.days_ago') + ')'}</span>}
          </S.Value>
        </S.ClientInfoContainer>
        {showDivider && <S.Divider />}
      </span>
    </S.Container>
  );
};
export default TopMetricsSection;
