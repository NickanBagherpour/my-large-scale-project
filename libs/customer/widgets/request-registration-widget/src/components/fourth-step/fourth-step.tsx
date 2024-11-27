import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'styled-components';

import { Card, Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, SearchItemsContainer, Box, Table, Loading } from '@oxygen/ui-kit';

import { requestRegistrationFormSchema } from '../../types';
import { updateFirstStepAction, useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns, getMobileColumns } from '../../utils/fourth-step-table-utils';

import * as S from './fourth-step.style';

type FourthStepProps = PageProps & {
  setCurrentStep: (prev) => void;
  data?: any;
  loading?: boolean;
};

const FourthStep: React.FC<FourthStepProps> = (props) => {
  const { setCurrentStep, data, loading } = props;
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const theme = useTheme();

  const router = useRouter();
  const [form] = Form.useForm();
  const desktopColumns = getDesktopColumns({ t });
  const mobileColumns = getMobileColumns({ t });

  const rule = createSchemaFieldRule(requestRegistrationFormSchema(t));

  const onFinish = (values) => {
    updateFirstStepAction(dispatch, values);
    setCurrentStep((perv) => perv + 1);
  };

  const handleReturn = () => {
    setCurrentStep((perv) => perv - 1);
  };

  return (
    <Loading spinning={loading}>
      {!loading && (
        <S.FourthStepContainer>
          <Form layout={'vertical'} onFinish={onFinish} form={form} initialValues={state.firstStep}>
            <S.TitleTxt className={'cards-title'}>{t('company_info')}</S.TitleTxt>
            <Card>
              <SearchItemsContainer>
                <S.InfoItemContainer>
                  <span>{t('form.legal_person_name')}</span>
                  <span>{data.list.legal_person_name}</span>
                </S.InfoItemContainer>
                <S.InfoItemContainer>
                  <span>{t('form.national_id')}</span>
                  <span>{data.list.national_id}</span>
                </S.InfoItemContainer>
                <S.InfoItemContainer>
                  <span>{t('form.legal_person_type')}</span>
                  <span>{data.list.legal_person_type}</span>
                </S.InfoItemContainer>
                <S.InfoItemContainer>
                  <span>{t('form.registration_number')}</span>
                  <span>{data.list.registration_number}</span>
                </S.InfoItemContainer>
                <S.InfoItemContainer>
                  <span>{t('form.registration_date')}</span>
                  <span>{data.list.registration_date}</span>
                </S.InfoItemContainer>
                <S.InfoItemContainer>
                  <span>{t('form.activity_field')}</span>
                  <span>{data.list.activity_field}</span>
                </S.InfoItemContainer>
                <S.InfoItemContainer>
                  <span>{t('form.economy_code')}</span>
                  <span>{data.list.economy_code}</span>
                </S.InfoItemContainer>
              </SearchItemsContainer>
              <S.Divider orientation='center' />
              <SearchItemsContainer $columnNumber='3'>
                <S.InfoItemContainer>
                  <span>{t('form.last_registration_address')}</span>
                  <span>{data.list.last_registration_address}</span>
                </S.InfoItemContainer>
                <S.InfoItemContainer>
                  <span>{t('form.postal_code')}</span>
                  <span>{data.list.postal_code}</span>
                </S.InfoItemContainer>
                <S.InfoItemContainer>
                  <span>{t('form.phone')}</span>
                  <span>{data.list.phone}</span>
                </S.InfoItemContainer>
              </SearchItemsContainer>
            </Card>
            <S.TitleTxt className={'cards-title'}>{t('representatives_info')}</S.TitleTxt>
            <Card>
              <SearchItemsContainer $columnNumber='3'>
                <S.InfoItemContainer>
                  <span>{t('legal_name')}</span>
                  <span>{data.list.legal_name}</span>
                </S.InfoItemContainer>
                <S.InfoItemContainer>
                  <span>{t('form.mobile_number')}</span>
                  <span>{data.list.mobile_number}</span>
                </S.InfoItemContainer>
                <S.InfoItemContainer>
                  <span>{t('telephone')}</span>
                  <span>{data.list.telephone}</span>
                </S.InfoItemContainer>
                <S.InfoItemContainer>
                  <span>{t('technical_name')}</span>
                  <span>{data.list.technical_name}</span>
                </S.InfoItemContainer>
                <S.InfoItemContainer>
                  <span>{t('form.mobile_number')}</span>
                  <span>{data.list.mobile_number}</span>
                </S.InfoItemContainer>
                <S.InfoItemContainer>
                  <span>{t('telephone')}</span>
                  <span>{data.list.telephone}</span>
                </S.InfoItemContainer>
              </SearchItemsContainer>
            </Card>
            <S.TitleTxt className={'cards-title'}>{t('requested_services')}</S.TitleTxt>
            <Box flexGrow={1}>
              <Table
                dataSource={data.list.requestedServiceDat}
                columns={desktopColumns}
                mobileColumns={mobileColumns}
                pagination={false}
              />
            </Box>
          </Form>
          <S.Footer>
            <Button variant={'outlined'} onClick={handleReturn}>
              {t('return')}
            </Button>
            <Button htmlType={'submit'} onClick={form.submit}>
              {t('submit_info')}
            </Button>
          </S.Footer>
        </S.FourthStepContainer>
      )}
    </Loading>
  );
};

export default FourthStep;
