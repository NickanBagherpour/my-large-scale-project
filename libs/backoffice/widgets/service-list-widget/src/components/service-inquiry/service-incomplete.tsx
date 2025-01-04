import { Flex } from 'antd';
import { useTr } from '@oxygen/translation';
import { Button, Progress } from '@oxygen/ui-kit';
import { ROUTES } from '@oxygen/utils';
import { InquiryInfo } from '../../types/get-Inquiry-info.type';
import * as S from './service-incomplete.style';

type Props = {
  data?: InquiryInfo;
};
const ServiceIncomplete: React.FC<Props> = ({ data }) => {
  const [t] = useTr();
  const progress = data?.serviceProgress?.percent || 0;
  return (
    <Flex vertical align='center' justify='center' gap={'2rem'}>
      <Flex align='center' gap={'1rem'}>
        <S.TickIcon className='icon-tick-circle-outlined'> </S.TickIcon>
        <S.StyledText>{t('complete_service_info')}</S.StyledText>
      </Flex>
      <S.ServiceCompletenessBox>
        <S.StyledText>{data?.serviceName}</S.StyledText>
        <Progress isPrimary={true} showInfo={false} percent={progress}></Progress>
        <S.Percent>{progress + '%'}</S.Percent>
      </S.ServiceCompletenessBox>
      <Button
        href={ROUTES.BACKOFFICE.SERVICE_CREATION + `?service-name=${data?.serviceName ?? ''}`}
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
export default ServiceIncomplete;
