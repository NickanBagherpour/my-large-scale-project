import { Flex } from 'antd';
import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import { ROUTES } from '@oxygen/utils';
import { PlusIcon, TickCircleIcon } from '../../assets';
import * as S from './service-creation-allowed.style';

const ServiceCreationAllowed: React.FC = () => {
  const [t] = useTr();
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
      >
        {t('create_new_service')}
      </Button>
    </Flex>
  );
};
export default ServiceCreationAllowed;
