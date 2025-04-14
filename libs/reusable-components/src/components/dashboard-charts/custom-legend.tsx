import { useTr } from '@oxygen/translation';
import { ActiveChartType } from './call-rate-chart';
import * as S from './custom-legend.style';

type Props = {
  data: any;
  successColor: string;
  failColor: string;
  activeChart: ActiveChartType;
  onActiveChartChange: (val: ActiveChartType) => void;
};
const CustomLegend: React.FC<Props> = ({ data, successColor, failColor, activeChart, onActiveChartChange }: Props) => {
  const [t] = useTr();
  return (
    <S.LegendContainer>
      <S.LegendInfoContainer>
        <S.DateContainer>
          <S.Date>{data?.fromDate}</S.Date>
          <span>{t('common.to')}</span>
          <S.Date>{data?.toDate}</S.Date>
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
