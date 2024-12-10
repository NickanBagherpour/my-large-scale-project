import { Flex } from 'antd';
import * as S from './service-creation-allowed.style';
import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import { ROUTES } from '@oxygen/utils';
import { PlusIcon, TickCircleIcon } from '../../assets';
import { useState } from 'react';

const ServiceCreationAllowed: React.FC = () => {
  const [t] = useTr();
  const [loading, setLoading] = useState(false);
  return (
    <Flex vertical gap={'2rem'} justify='center' align='center'>
      <Flex justify='center' align='center' gap={'1rem'}>
        <TickCircleIcon />
        <S.StyledText>{t('allowed_Creation')}</S.StyledText>
      </Flex>
      <Button
        href={ROUTES.BACKOFFICE.SERVICE_CREATION}
        style={{ width: 'fit-content' }}
        block={false}
        color='secondary'
        icon={<PlusIcon />}
        onClick={() => setLoading(true)}
        loading={loading}
      >
        {t('create_new_service')}
      </Button>
    </Flex>
  );
};
export default ServiceCreationAllowed;
