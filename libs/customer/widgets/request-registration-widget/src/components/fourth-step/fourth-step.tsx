import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'styled-components';

import { Modal } from '../../types/modal.type';
import ConfirmModal from './modal-confirm/modal-confirm';
import { Card, Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, SearchItemsContainer, Box, Table, Loading } from '@oxygen/ui-kit';

import { requestRegistrationFormSchema } from '../../types';
import { updateFirstStepAction, useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns, getMobileColumns } from '../../utils/fourth-step-table-utils';
import { useGetRequestDataQuery } from '../../services/fourth-step/fourth-step-data';

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
  const [modals, setModals] = useState<Modal>({
    confirm: false,
    removeService: false,
    serviceId: undefined,
    serviceName: '',
  });

  const theme = useTheme();

  const router = useRouter();
  const [form] = Form.useForm();
  const desktopColumns = getDesktopColumns({ t });
  const mobileColumns = getMobileColumns({ t });

  const rule = createSchemaFieldRule(requestRegistrationFormSchema(t));
  const { data: requestData, isFetching: isRequestDataFetching } = useGetRequestDataQuery(30);

  const toggleModal = (modal: keyof Modal) => {
    setModals((prev) => ({
      ...prev,
      [modal]: !prev[modal],
    }));
  };

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
          <ConfirmModal isOpen={modals['confirm']} toggle={() => toggleModal('confirm')} />
          <Form layout={'vertical'} onFinish={onFinish} form={form} initialValues={state.firstStep}>
            <S.TitleTxt className={'cards-title'}>{t('company_info')}</S.TitleTxt>
            {isRequestDataFetching ? (
              <Loading spinning={isRequestDataFetching} />
            ) : (
              <>
                <Card>
                  <SearchItemsContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.legal_person_name')}</span>
                      {/* <span>{data.list.legal_person_name}</span> */}
                      <span>{requestData?.organization.legalName}</span>
                    </S.InfoItemContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.national_id')}</span>
                      {/* <span>{data.list.national_id}</span> */}
                      <span>{requestData?.organization.organizationNationalId}</span>
                    </S.InfoItemContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.legal_person_type')}</span>
                      {/* <span>{data.list.legal_person_type}</span> */}
                      <span>{requestData?.organization.legalType}</span>
                    </S.InfoItemContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.registration_number')}</span>
                      {/* <span>{data.list.registration_number}</span> */}
                      <span>{requestData?.organization.registerNo}</span>
                    </S.InfoItemContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.registration_date')}</span>
                      {/* <span>{data.list.registration_date}</span> */}
                      <span>{requestData?.organization.registerDate}</span>
                    </S.InfoItemContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.activity_field')}</span>
                      {/* <span>{data.list.activity_field}</span> */}
                      <span>{requestData?.organization.activityIndustry}</span>
                    </S.InfoItemContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.economy_code')}</span>
                      {/* <span>{data.list.economy_code}</span> */}
                      <span>{requestData?.organization.economicCode}</span>
                    </S.InfoItemContainer>
                  </SearchItemsContainer>
                  <S.Divider orientation='center' />
                  <SearchItemsContainer $columnNumber='3'>
                    <S.InfoItemContainer>
                      <span>{t('form.last_registration_address')}</span>
                      {/* <span>{data.list.last_registration_address}</span> */}
                      <span>{requestData?.organization.registeredAddress}</span>
                    </S.InfoItemContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.postal_code')}</span>
                      {/* <span>{data.list.postal_code}</span> */}
                      <span>{requestData?.organization.postalCode}</span>
                    </S.InfoItemContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.phone')}</span>
                      {/* <span>{data.list.phone}</span> */}
                      <span>{requestData?.organization.phone}</span>
                    </S.InfoItemContainer>
                  </SearchItemsContainer>
                </Card>
                <S.TitleTxt className={'cards-title'}>{t('representatives_info')}</S.TitleTxt>
                <Card>
                  <SearchItemsContainer className='representativeInfo' $columnNumber='3'>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('legal_name')}</span>
                      {/* <span>{data.list.legal_name}</span> */}
                      <span>{requestData?.representativeSet[0].nameAndLastName}</span>
                    </S.RepresentativesInfoItemContainer>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('form.mobile_number')}</span>
                      {/* <span>{data.list.mobile_number}</span> */}
                      <span>{requestData?.representativeSet[0].mobileNumber}</span>
                    </S.RepresentativesInfoItemContainer>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('telephone')}</span>
                      {/* <span>{data.list.telephone}</span> */}
                      <span>{requestData?.representativeSet[0].fixedPhoneNumber}</span>
                    </S.RepresentativesInfoItemContainer>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('technical_name')}</span>
                      {/* <span>{data.list.technical_name}</span> */}
                      <span>{requestData?.representativeSet[1].nameAndLastName}</span>
                    </S.RepresentativesInfoItemContainer>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('form.mobile_number')}</span>
                      {/* <span>{data.list.mobile_number}</span> */}
                      <span>{requestData?.representativeSet[1].mobileNumber}</span>
                    </S.RepresentativesInfoItemContainer>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('telephone')}</span>
                      {/* <span>{data.list.telephone}</span> */}
                      <span>{requestData?.representativeSet[1].fixedPhoneNumber}</span>
                    </S.RepresentativesInfoItemContainer>
                  </SearchItemsContainer>
                </Card>
                <S.TitleTxt className={'cards-title'}>{t('requested_services')}</S.TitleTxt>
                <Box flexGrow={1}>
                  <Table
                    // dataSource={data.list.requestedServiceDat}
                    dataSource={requestData?.services}
                    columns={desktopColumns}
                    mobileColumns={mobileColumns}
                    pagination={false}
                  />
                </Box>
              </>
            )}
          </Form>
          <S.Footer>
            <Button variant={'outlined'} onClick={handleReturn}>
              {t('return')}
            </Button>
            <Button onClick={() => toggleModal('confirm')}>{t('submit_info')}</Button>
          </S.Footer>
        </S.FourthStepContainer>
      )}
    </Loading>
  );
};

export default FourthStep;
