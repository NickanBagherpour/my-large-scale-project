import { Form } from 'antd';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { Form } from 'antd';
import React from 'react';

import { i18nBase, useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { Button, Container, Loading } from '@oxygen/ui-kit';
import { GlobalMessageContainer, SecondaryTitle } from '@oxygen/reusable-components';
import { ROUTES } from '@oxygen/utils';
import { useApp } from '@oxygen/hooks';

import { useGetServiceInfoQuery } from '../../services/edit-service.api';
import EditService from '../edit-service/edit-service';
import { resetMessageAction, useAppDispatch, useAppState } from '../../context';

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
  const [form] = Form.useForm();
  const { notification } = useApp();
  const id = searchParams.get('id');
  if (!id) {
    notFound();
  }
  const { data: serviceInfo, isFetching } = useGetServiceInfoQuery(Number(id));
  const title =
    i18nBase.resolvedLanguage == 'en' ? serviceInfo?.serviceLatinName : serviceInfo?.servicePersianName ?? '';

  const handleReturn = () => {
    router.back();
  };
  const handleSubmit = (formValues: any) => {
    form.submit();
    console.log('formvalues', formValues);
    const success = true;
    //also hanlde errors
    router.push(
      `${ROUTES.BACKOFFICE.SERVICE_DETAILS}?id=${id}` // Replace 123 with your item ID
    );
    notification.success({
      message: t('alert.edit_success'),
    });
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
      <Button htmlType={'submit'} onClick={handleSubmit}>
        {t('button.apply')}
      </Button>
    </>
  );
  return (
    <>
      <GlobalMessageContainer message={message} onClose={() => resetMessageAction(dispatch)} />
      <Container title={title} footer={footer}>
        <SecondaryTitle text={t('subtitle')} />
        {isFetching ? (
          showLoadingSpinner()
        ) : (
          <EditService serviceInfo={serviceInfo} form={form} onSubmit={handleSubmit} />
        )}
      </Container>{' '}
    </>
  );
};

export default App;
