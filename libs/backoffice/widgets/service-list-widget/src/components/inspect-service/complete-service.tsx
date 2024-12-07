import { Flex } from 'antd';
import { useTr } from '@oxygen/translation';
import { Button, Progress } from '@oxygen/ui-kit';
import { ROUTES } from '@oxygen/utils';
import { ArrowLeft, TickCircleSecondary } from '../../assets';
import * as S from './complete-service.style';

type Props = {
  id: string;
};
const CompleteService: React.FC<Props> = ({ id }) => {
  const [t] = useTr();
  return (
    <Flex vertical align='center' justify='center' gap={'2rem'}>
      <Flex align='center' gap={'1rem'}>
        <TickCircleSecondary />
        <S.StyledText>{t('complete_service_info')}</S.StyledText>
      </Flex>
      <S.ServiceCompletenessBox>
        <S.StyledText>svc-gfg-bhhj-ngdc-zxzxc-zxc</S.StyledText>
        <Progress isPrimary={true} showInfo={false} percent={60}></Progress>
        <S.Percent>60%</S.Percent>
      </S.ServiceCompletenessBox>
      <Button
        href={ROUTES.BACKOFFICE.SERVICE_DETAILS + `?id=${id}`}
        color='primary'
        style={{ width: 'fit-content', marginBottom: '2rem' }}
        icon={<ArrowLeft />}
        iconPosition='end'
      >
        {t('buttons.complete_service_info')}
      </Button>
    </Flex>
  );
};
export default CompleteService;
