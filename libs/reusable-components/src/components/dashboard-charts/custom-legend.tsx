import { useTr } from '@oxygen/translation';
import { ActiveChartType } from './call-rate-chart';
import { Flex } from 'antd';
import * as S from './custom-legend.style';

type Props = {
  data: any;
  successColor: string;
  failColor: string;
  activeChart: ActiveChartType;
  onActiveChartChange: (val: ActiveChartType) => void;
  isLoading: boolean;
};
const CustomLegend: React.FC<Props> = ({
  data,
  successColor,
  failColor,
  activeChart,
  onActiveChartChange,
  isLoading,
}: Props) => {
  const [t] = useTr();
  const removeSeconds = (time: string) => time?.slice(0, -3);
  return (
    <S.LegendContainer>
      <S.LegendInfoContainer>
        {!isLoading ? (
          <>
            <S.DateContainer>
              <S.Date>{removeSeconds(data?.fromDate)}</S.Date>
              {data?.fromDate && data?.toDate && <span>{t('common.to')}</span>}
              <S.Date>{removeSeconds(data?.toDate)}</S.Date>
            </S.DateContainer>
            <S.CallRate $iconColor={successColor}>
              <S.CallResultIcon className='icon-tick-circle-outlined' />
              <S.TotalCount>{data?.totalCount}</S.TotalCount>
              <S.Subtitle>{t('uikit.success_call', { element: t('element.service') })}</S.Subtitle>
            </S.CallRate>
            <S.CallRate $iconColor={failColor}>
              <S.CallResultIcon className='icon-close-circle' />
              <S.TotalCount>{data?.totalCount}</S.TotalCount>
              <S.Subtitle>{t('uikit.unsuccessfull_call', { element: t('element.service') })}</S.Subtitle>
            </S.CallRate>
          </>
        ) : (
          <Flex style={{ width: '100%' }} gap={8} justify='start'>
            <S.SkeletonText active shape='round' size='small' block />
            <S.SkeletonText active shape='round' size='small' block />
            <S.SkeletonText active shape='round' size='small' block />
            <S.SkeletonText active shape='round' size='small' block />
          </Flex>
        )}
      </S.LegendInfoContainer>

      <S.ChartTypeContainer>
        <S.BarChartButton
          $isActive={activeChart === 'bar'}
          onClick={() => onActiveChartChange('bar')}
          variant='outlined'
          icon={<S.ChartIcon className='icon-bar-chart' />}
        >
          {t('uikit.bar_chart_type')}
        </S.BarChartButton>
        <S.LineChartButton
          variant='outlined'
          $isActive={activeChart === 'line'}
          onClick={() => onActiveChartChange('line')}
          icon={<S.ChartIcon className='icon-linear-chart' />}
        >
          {t('uikit.line_chart_type')}
        </S.LineChartButton>
      </S.ChartTypeContainer>
    </S.LegendContainer>
  );
};
export default CustomLegend;
