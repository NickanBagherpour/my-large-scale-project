import { Form } from 'antd';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { getWidgetTitle } from '@oxygen/utils';
import { Button, Container, Loading } from '@oxygen/ui-kit';
import { GlobalMessageContainer, SecondaryTitle } from '@oxygen/reusable-components';

import { useGetServiceInfoQuery } from '../../services/get-edit-service.api';
import EditService from '../edit-service/edit-service';
import { resetMessageAction, useAppDispatch, useAppState } from '../../context';
import { EditServiceFormFieldsType } from '../../types';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};
const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { message } = useAppState();
  const searchParams = useSearchParams();
  const [form] = Form.useForm<EditServiceFormFieldsType>();

  const serviceName = searchParams.get('service-name');
  if (!serviceName) {
    notFound();
  }

  const { data: serviceInfo, isFetching } = useGetServiceInfoQuery(serviceName);
  const title = getWidgetTitle({
    defaultTitle: t('widget_name'),
    primaryTitle: serviceInfo?.persianName,
    secondaryTitle: serviceInfo?.name,
  });

  const handleReturn = () => {
    router.back();
  };

  const showLoadingSpinner = () => {
    return (
      <S.LoadingContainer>
        <Loading />
      </S.LoadingContainer>
    );
  };
  const footer = (
    <>
      <Button variant='outlined' onClick={handleReturn}>
        {t('button.cancel')}
      </Button>
      <Button htmlType={'submit'} onClick={() => form.submit()}>
        {t('button.apply')}
      </Button>
    </>
  );
  return (
    <>
      <GlobalMessageContainer message={message} onClose={() => resetMessageAction(dispatch)} />
      <Container title={title} footer={footer}>
        <SecondaryTitle text={t('subtitle')} />
        {isFetching ? showLoadingSpinner() : <EditService serviceInfo={serviceInfo} form={form} />}
      </Container>{' '}
    </>
  );
};

export default App;
