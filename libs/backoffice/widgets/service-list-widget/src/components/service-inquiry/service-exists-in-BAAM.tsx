import { useRouter } from 'next/navigation';
import { Flex } from 'antd';
import { useState } from 'react';
import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import { ROUTES } from '@oxygen/utils';
import { useUploadServiceMutation } from '../../services/upload-service.api';
import * as S from './service-exists-in-BAAM.style';

type Props = {
  serviceName?: string;
};
const ServiceExistsInBAAM: React.FC<Props> = ({ serviceName }) => {
  const [t] = useTr();
  const [loading, setLoading] = useState(false);
  const { mutateAsync: uploadService, isSuccess } = useUploadServiceMutation();
  const router = useRouter();
  const handleClick = async () => {
    setLoading(true);
    await uploadService(serviceName ?? '');
    if (isSuccess) router.push(ROUTES.BACKOFFICE.SERVICE_CREATION);
  };
  return (
    <Flex vertical gap={'2rem'} justify='center' align='center'>
      <Flex justify='center' align='center' gap={'1rem'}>
        <S.TickIcon className='icon-tick-circle-outlined'> </S.TickIcon>
        <S.StyledText>{t('allowed_creation_BAAM')}</S.StyledText>
      </Flex>
      <Button
        href={ROUTES.BACKOFFICE.SERVICE_CREATION + `?service-name=${serviceName}`}
        style={{ width: 'fit-content' }}
        block={false}
        color='primary'
        icon={<i className='icon-arrow-left' />}
        iconPosition='end'
        onClick={handleClick}
        loading={loading}
      >
        {t('create_new_service')}
      </Button>
    </Flex>
  );
};
export default ServiceExistsInBAAM;
