import { Flex } from 'antd';
import { useTr } from '@oxygen/translation';
import * as S from './report-section.style';
type Props = {
  color: string;
  iconClassName: string;
  title: string;
};
const ReportSection: React.FC<Props> = ({ color, iconClassName, title }) => {
  const [t] = useTr();

  const active = 10;
  const inactive = 20;
  const total = 213;

  const subText = '(' + 30 + t('common.days_ago') + ')';
  return (
    <S.Container $color={color}>
      <Flex justify='space-between' align='center'>
        <Flex gap={10} align='center'>
          <S.Icon $color={color} className={iconClassName} />
          <S.Title>{title}</S.Title>
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
                {active} {t('common.active')}
              </S.Text>
              <S.SubText>{subText}</S.SubText>
            </Flex>
            <Flex align='center' gap={5}>
              <S.InactiveFlag />
              <S.Text>
                {inactive} {t('common.inactive')}
              </S.Text>
              <S.SubText>{subText}</S.SubText>
            </Flex>
          </div>
          <S.Total $color={color}>{total}</S.Total>
        </Flex>
      </S.Body>
    </S.Container>
  );
};
export default ReportSection;
