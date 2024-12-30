import { useState } from 'react';
import { Flex } from 'antd';
import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import { ROUTES } from '@oxygen/utils';
import * as S from './service-not-found.style';

const ServiceNotFound: React.FC = () => {
  const [t] = useTr();
  const [loading, setLoading] = useState(false);
  return (
    <Flex vertical gap={'2rem'} justify='center' align='center'>
      <Flex justify='center' align='center' gap={'1rem'}>
        <S.TickIcon className='icon-tick-circle-outlined'> </S.TickIcon>
        <S.StyledText>{t('allowed_creation')}</S.StyledText>
      </Flex>
      <Button
        href={ROUTES.BACKOFFICE.SERVICE_CREATION}
        style={{ width: 'fit-content' }}
        block={false}
        color='secondary'
        icon={<i className='icon-plus' />}
        onClick={() => setLoading(true)}
        loading={loading}
      >
        {t('create_new_service')}
      </Button>
    </Flex>
  );
};
export default ServiceNotFound;
