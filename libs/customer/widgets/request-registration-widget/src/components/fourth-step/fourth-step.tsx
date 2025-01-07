import React, { useState } from 'react';

import ConfirmModal from './modal-confirm/modal-confirm';
import { Card, Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, SearchItemsContainer, Box, Table, Loading } from '@oxygen/ui-kit';
import { useQueryParams } from '@oxygen/hooks';

import { requestRegistrationFormSchema } from '../../types';
import { useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns, getMobileColumns } from '../../utils/fourth-step-table-utils';
import {
  useGetRequestDataQuery,
  useFourthStepRequestRegistrationMutationQuery,
} from '../../services/fourth-step/fourth-step-data';

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

  const queryParams = useQueryParams();
  const submissionId = queryParams.get('submissionId');

  const desktopColumns = getDesktopColumns({ t });
  const mobileColumns = getMobileColumns({ t });

  const rule = createSchemaFieldRule(requestRegistrationFormSchema(t));
  const [confirmModal, setConfirmModal] = useState(false);
  const [trackCode, setTrackCode] = useState('');
  const { data: requestData, isFetching: isRequestDataFetching } = useGetRequestDataQuery(
    submissionId ? submissionId : state.submissionId
  );
  const { mutate: fourthMutate, isPending: fourthIsPending } = useFourthStepRequestRegistrationMutationQuery();

  const toggleModal = () => {
    setConfirmModal(false);
  };
  const handleConfirmRequest = () => {
    const params = { submissionId: state.submissionId };
    fourthMutate(params, {
      onSuccess: (data) => {
        setTrackCode(data.headers['track-code']);
        console.log('request registration first step successful:', data);
        setConfirmModal(true);
      },
      onError: (error) => {
        console.error('request registration first step  failed:', error);
      },
    });
  };

  const handleReturn = () => {
    setCurrentStep((perv) => perv - 1);
  };

  const isAggregator = requestData?.organization?.isAggregator;
  const aggregatorName = requestData?.organization?.aggregatorName;
  const aggregatorStatus = isAggregator
    ? t('company_is_aggregator')
    : aggregatorName
    ? t(`company_has_aggregator_with_name`, { aggregatorName })
    : t('company_has_not_aggregator');

  return (
    <Loading spinning={loading}>
      {!loading && (
        <S.FourthStepContainer>
          <ConfirmModal isOpen={confirmModal} toggle={() => toggleModal()} trackCode={trackCode} />
          <Form layout={'vertical'}>
            <S.TitleTxt className={'cards-title'}>{t('company_info')}</S.TitleTxt>
            {isRequestDataFetching ? (
              <Loading spinning={isRequestDataFetching} />
            ) : (
              <>
                <Card>
                  <SearchItemsContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.legal_person_name')}</span>
                      <span>{requestData?.organization.legalName}</span>
                    </S.InfoItemContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.national_id')}</span>
                      <span>{requestData?.organization.organizationNationalId}</span>
                    </S.InfoItemContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.legal_person_type')}</span>
                      <span>{requestData?.organization.legalType === 'PUBLIC' ? t('public') : t('private')}</span>
                    </S.InfoItemContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.registration_number')}</span>
                      <span>{requestData?.organization.registerNo}</span>
                    </S.InfoItemContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.registration_date')}</span>
                      <span>{requestData?.organization.registerDate}</span>
                    </S.InfoItemContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.activity_field')}</span>
                      <span>{requestData?.organization.activityIndustry}</span>
                    </S.InfoItemContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.economy_code')}</span>
                      <span>{requestData?.organization.economicCode}</span>
                    </S.InfoItemContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.aggregator_status')}</span>
                      <span>{aggregatorStatus}</span>
                    </S.InfoItemContainer>
                  </SearchItemsContainer>
                  <S.Divider orientation='center' />
                  <SearchItemsContainer $columnNumber='3'>
                    <S.InfoItemContainer>
                      <span>{t('form.last_registration_address')}</span>
                      <span>{requestData?.organization.registeredAddress}</span>
                    </S.InfoItemContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.postal_code')}</span>
                      <span>{requestData?.organization.postalCode}</span>
                    </S.InfoItemContainer>
                    <S.InfoItemContainer>
                      <span>{t('form.phone')}</span>
                      <span>{requestData?.organization.phone}</span>
                    </S.InfoItemContainer>
                  </SearchItemsContainer>
                </Card>
                <S.TitleTxt className={'cards-title'}>{t('representatives_info')}</S.TitleTxt>
                <Card>
                  <SearchItemsContainer className='representativeInfo' $columnNumber='3'>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('legal_name')}</span>
                      <span>{requestData?.representativeSet[0].nameAndLastName}</span>
                    </S.RepresentativesInfoItemContainer>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('form.mobile_number')}</span>
                      <span>{requestData?.representativeSet[0].mobileNumber}</span>
                    </S.RepresentativesInfoItemContainer>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('telephone')}</span>
                      <span>{requestData?.representativeSet[0].fixedPhoneNumber}</span>
                    </S.RepresentativesInfoItemContainer>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('technical_name')}</span>
                      <span>{requestData?.representativeSet[1].nameAndLastName}</span>
                    </S.RepresentativesInfoItemContainer>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('form.mobile_number')}</span>
                      <span>{requestData?.representativeSet[1].mobileNumber}</span>
                    </S.RepresentativesInfoItemContainer>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('telephone')}</span>
                      <span>{requestData?.representativeSet[1].fixedPhoneNumber}</span>
                    </S.RepresentativesInfoItemContainer>
                  </SearchItemsContainer>
                </Card>
                <S.TitleTxt className={'cards-title'}>{t('requested_services')}</S.TitleTxt>
                <Box flexGrow={1}>
                  <Table
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
            <Button onClick={handleConfirmRequest} loading={fourthIsPending}>
              {t('submit_info')}
            </Button>
          </S.Footer>
        </S.FourthStepContainer>
      )}
    </Loading>
  );
};

export default FourthStep;
