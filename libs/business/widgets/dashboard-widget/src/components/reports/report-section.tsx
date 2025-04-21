import { Flex } from 'antd';
import { useTr } from '@oxygen/translation';
import { getValueOrDash } from '@oxygen/utils';
import * as S from './report-section.style';
type Props = {
  color: string;
  iconClassName: string;
  title: string;
  subtitle: string;
  active?: number;
  inactive?: number;
  total?: number;
};
const ReportSection: React.FC<Props> = ({ color, iconClassName, title, subtitle, active, inactive, total }) => {
  const [t] = useTr();

  const subText = '(' + 30 + t('common.days_ago') + ')';
  return (
    <S.Container $color={color}>
      <Flex justify='space-between' align='center'>
        <Flex gap={18} align='center'>
          <S.Icon $color={color} className={iconClassName} />
          <Flex vertical gap={15}>
            <S.Title>{title}</S.Title>
            <S.Subtitle>{subtitle}</S.Subtitle>
          </Flex>
        </Flex>
        <S.Link $color={color}>
          <i style={{ fontSize: '2.4rem' }} className='icon-arrow-left' />
        </S.Link>
      </Flex>
      <S.Body $color={color}>
        <Flex align='center' justify='space-between'>
          <div>
            <Flex align='center' gap={5}>
              <S.ActiveFlag />
              <S.Text>
                {getValueOrDash(active)} {t('common.active')}
              </S.Text>
              <S.SubText>{subText}</S.SubText>
            </Flex>
            <Flex align='center' gap={5}>
              <S.InactiveFlag />
              <S.Text>
                {getValueOrDash(inactive)} {t('common.inactive')}
              </S.Text>
              <S.SubText>{subText}</S.SubText>
            </Flex>
          </div>
          <S.Total $color={color}>{getValueOrDash(total)}</S.Total>
        </Flex>
      </S.Body>
    </S.Container>
  );
};
export default ReportSection;
