import React, { useEffect, useState } from 'react';

import { i18nBase, useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';

//import { useGetReportDataQuery } from '../../services';

import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useGetServiceInfoQuery } from '../../services/get-report.api';
import { Button, Divider, Loading } from '@oxygen/ui-kit';
import * as S from './app.style';
import ServiceEdit from '../service-edit/service-edit';
import { Form } from 'antd';
import MainContainer from '../containers/main-container';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();

  const id: Nullable<string> = searchParams.get('id');

  const [title, setTitle] = useState(t('subtitle'));

  const { data: serviceInfo, isFetching } = useGetServiceInfoQuery({ id });

  if (!id || (!isFetching && !serviceInfo)) {
    redirect('/not-found');
  }

  const handleReturn = () => {
    router.back();
  };
  const handleSubmitButtonClick = () => {
    form.submit();
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
      <Button htmlType={'submit'} onClick={handleSubmitButtonClick}>
        {t('button.apply')}
      </Button>
    </>
  );
  return (
    // <S.AppContainer title={title}>
    //   <S.SubtitleContainer>{t('subtitle')}</S.SubtitleContainer>
    //   <S.ContentContainer>
    //     {isFetching ? showLoadingSpinner() : <ServiceEdit serviceInfo={serviceInfo} form={form} />}
    //   </S.ContentContainer>

    //   <Divider />
    //   <S.FooterContainer>
    //     <Button variant='outlined' onClick={handleReturn}>
    //       {t('button.cancel')}
    //     </Button>
    //     <Button htmlType={'submit'} onClick={handleSubmitButtonClick}>
    //       {t('button.apply')}
    //     </Button>
    //   </S.FooterContainer>
    // </S.AppContainer>
    <MainContainer title={title} subtitle={t('subtitle')} footer={footer}>
      {isFetching ? showLoadingSpinner() : <ServiceEdit serviceInfo={serviceInfo} form={form} />}
    </MainContainer>
  );
};

export default App;
