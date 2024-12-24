import { Flex } from 'antd';
import { useTr } from '@oxygen/translation';
import { Button, Progress } from '@oxygen/ui-kit';
import { ROUTES } from '@oxygen/utils';
import { InquiryInfo } from '../../types/get-Inquiry-info.type';
import * as S from './complete-service.style';

type Props = {
  data?: InquiryInfo;
};
const CompleteService: React.FC<Props> = ({ data }) => {
  const [t] = useTr();
  const info = data?.serviceGeneralInfo;
  const progress = info?.statusProgressPercent || 0;
  return (
    <Flex vertical align='center' justify='center' gap={'2rem'}>
      <Flex align='center' gap={'1rem'}>
        <S.TickIcon className='icon-tick-circle-outlined'> </S.TickIcon>
        <S.StyledText>{t('complete_service_info')}</S.StyledText>
      </Flex>
      <S.ServiceCompletenessBox>
        <S.StyledText>{info?.name}</S.StyledText>
        <Progress isPrimary={true} showInfo={false} percent={progress}></Progress>
        <S.Percent>{progress + '%'}</S.Percent>
      </S.ServiceCompletenessBox>
      <Button
        href={ROUTES.BACKOFFICE.SERVICE_CREATION + `?id=${info?.serviceInfoId}`}
        color='primary'
        style={{ width: 'fit-content', marginBottom: '2rem' }}
        icon={<i className='icon-arrowLeft' />}
        iconPosition='end'
      >
        {t('buttons.complete_service_info')}
      </Button>
    </Flex>
  );
};
export default CompleteService;
