import { notFound, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { i18nBase, useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { Button, Container, Loading } from '@oxygen/ui-kit';

//import { useGetReportDataQuery } from '../../services';

import { useGetServiceInfoQuery } from '../../services/edit-service.api';
import { Form } from 'antd';
import EditService from '../edit-service/edit-service';

import * as S from './app.style';
import { SecondaryTitle } from '@oxygen/reusable-components';
import { ROUTES } from '@oxygen/utils';
import { useApp } from '@oxygen/hooks';

type AppProps = PageProps & {
  //
};
const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  const { notification } = useApp();
  const id: Nullable<string> = searchParams.get('id');

  const [title, setTitle] = useState(t('subtitle'));

  const { data: serviceInfo, isFetching } = useGetServiceInfoQuery({ id });

  if (!id || (!isFetching && !serviceInfo)) {
    notFound();
  }

  const handleReturn = () => {
    router.back();
  };
  const handleSubmit = () => {
    form.submit();
    const success = true;
    //also hanlde errors
    if (success) {
      router.push(
        `${ROUTES.BACKOFFICE.SERVICE_DETAILS}?id=${id}` // Replace 123 with your item ID
      );
      notification.success({
        message: t('alert.edit_success'),
      });
    }
  };
  useEffect(() => {
    if (serviceInfo && title === t('subtitle')) {
      setTitle(serviceInfo?.[i18nBase.resolvedLanguage + 'Name']);
    }
  }, [serviceInfo, title]);
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
    <Container title={title} footer={footer}>
      <SecondaryTitle text={t('subtitle')} />
      {isFetching ? showLoadingSpinner() : <EditService serviceInfo={serviceInfo} form={form} />}
    </Container>
  );
};

export default App;
