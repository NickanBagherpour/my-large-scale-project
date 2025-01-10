import { useRouter } from 'next/navigation';
import { Flex } from 'antd';

import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import { ROUTES } from '@oxygen/utils';

import { useUploadServiceMutation } from '../../services/upload-service.api';

import * as S from './service-exists-in-BAAM.style';

type Props = {
  serviceName: string;
};
const ServiceExistsInBAAM: React.FC<Props> = ({ serviceName }) => {
  const [t] = useTr();
  const router = useRouter();
  const navigateToServiceCreation = () =>
    router.push(ROUTES.BACKOFFICE.SERVICE_CREATION + `?service-name=${serviceName}`);
  const { mutate: uploadService, isPending } = useUploadServiceMutation(navigateToServiceCreation);
  const handleClick = async () => {
    uploadService(serviceName);
  };
  return (
    <Flex vertical gap={'2rem'} justify='center' align='center'>
      <Flex justify='center' align='center' gap={'1rem'}>
        <S.TickIcon className='icon-tick-circle-outlined'> </S.TickIcon>
        <S.StyledText>{t('allowed_creation_BAAM')}</S.StyledText>
      </Flex>
      <Button
        style={{ width: 'fit-content' }}
        block={false}
        color='primary'
        icon={<i className='icon-arrow-left' />}
        iconPosition='end'
        onClick={handleClick}
        loading={isPending}
      >
        {t('create_new_service')}
      </Button>
    </Flex>
  );
};
export default ServiceExistsInBAAM;
