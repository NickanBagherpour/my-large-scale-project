import { useState } from 'react';
import { Flex, FormInstance } from 'antd';
import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import { ROUTES } from '@oxygen/utils';
import * as S from './service-not-found.style';
import { SERVICE_NAME } from '../../utils/consts';

type Props = {
  form: FormInstance<{
    [x: string]: string;
  }>;
};

const ServiceNotFound: React.FC<Props> = (props: Props) => {
  const { form } = props;
  const [t] = useTr();
  const [loading, setLoading] = useState(false);
  const serviceName = form.getFieldValue(SERVICE_NAME.ServiceName);
  return (
    <Flex vertical gap={'2rem'} justify='center' align='center'>
      <Flex justify='center' align='center' gap={'1rem'}>
        <S.TickIcon className='icon-tick-circle-outlined'> </S.TickIcon>
        <S.StyledText>{t('allowed_creation')}</S.StyledText>
      </Flex>
      <Button
        href={ROUTES.BACKOFFICE.SERVICE_CREATION + `?service-name=${serviceName}`}
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
