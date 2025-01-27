import React, { useState, useEffect } from 'react';

import ConfirmModal from './modal-confirm/modal-confirm';
import { Card, Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, SearchItemsContainer, Box, Table, Loading, InfoBox } from '@oxygen/ui-kit';
import { useQueryParams } from '@oxygen/hooks';

import { InfoBoxType, requestRegistrationFormSchema } from '../../types';
import { useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns, getMobileColumns } from '../../utils/final-confirm-table-utils';
import { useGetRequestDataQuery, useFourthStepRequestRegistrationMutationQuery } from '../../services';

import * as S from './final-confirm-step.style';

type FinalConfirmStepProps = PageProps & {
  setCurrentStep: (prev) => void;
};

const FinalConfirmStep: React.FC<FinalConfirmStepProps> = (props) => {
  const { setCurrentStep } = props;
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

  const [organizationInfoData, setOrganizationInfoData] = useState<InfoBoxType[]>([]);
  const [representativeInfoData, setRepresentativeInfoData] = useState<InfoBoxType[]>([]);

  useEffect(() => {
    setOrganizationInfoData([
      { key: t('form.legal_person_name'), value: requestData?.organization.legalName },
      { key: t('form.national_id'), value: requestData?.organization.organizationNationalId },
      {
        key: t('form.legal_person_type'),
        value: requestData?.organization.legalType === 'PUBLIC' ? t('public') : t('private'),
      },
      { key: t('form.registration_number'), value: requestData?.organization.registerNo },
      { key: t('form.registration_date'), value: requestData?.organization.registerDate },
      { key: t('form.activity_field'), value: requestData?.organization.activityIndustry },
      { key: t('form.economy_code'), value: requestData?.organization.economicCode },
      {
        key: t('form.aggregator_status'),
        value: requestData?.organization?.isAggregator
          ? t('company_is_aggregator')
          : requestData?.organization?.aggregatorId
          ? `${t('company_has_aggregator')} - ${requestData?.organization?.aggregatorName}`
          : t('company_is_not_aggregator'),
      },
      { key: '', value: '', type: 'divider', fullwidth: true },
      { key: t('form.last_registration_address'), value: requestData?.organization.registeredAddress },
      { key: t('form.postal_code'), value: requestData?.organization.postalCode },
      { key: t('form.phone'), value: requestData?.organization.phone },
    ]);
  }, [requestData]);

  const toggleModal = () => {
    setConfirmModal(false);
  };
  const handleConfirmRequest = () => {
    const params = { submissionId: state.submissionId };
    fourthMutate(params, {
      onSuccess: (data) => {
        setTrackCode(data.headers['track-code']);
        // console.log('request registration final confirm step successful:', data);
        setConfirmModal(true);
      },
      onError: (error) => {
        // console.error('request registration final confirm step  failed:', error);
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
  const sortedRepresentatives = requestData?.representativeSet.sort(
    (a, b) => a.representativeType - b.representativeType
  );

  useEffect(() => {
    if (sortedRepresentatives) {
      setRepresentativeInfoData([
        { key: t('legal_name'), value: sortedRepresentatives[0].nameAndLastName },
        { key: t('form.mobile_number'), value: sortedRepresentatives[0].mobileNumber },
        {
          key: t('telephone'),
          value: sortedRepresentatives[0].fixedPhoneNumber,
        },
        { key: t('technical_name'), value: sortedRepresentatives[1].nameAndLastName },
        { key: t('form.mobile_number'), value: sortedRepresentatives[1].mobileNumber },
        { key: t('telephone'), value: sortedRepresentatives[1].fixedPhoneNumber },
      ]);
    }
  }, [sortedRepresentatives]);
  return (
    <Loading spinning={isRequestDataFetching}>
      {!isRequestDataFetching && (
        <S.FinalConfirmStepContainer>
          <ConfirmModal isOpen={confirmModal} toggle={() => toggleModal()} trackCode={trackCode} />
          <Form layout={'vertical'}>
            <S.TitleTxt className={'cards-title'}>{t('company_info')}</S.TitleTxt>
            {isRequestDataFetching ? (
              <Loading spinning={isRequestDataFetching} />
            ) : (
              <>
                <InfoBox margin={0} data={organizationInfoData} minColumnCount={4} />
                {/* <Card>
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
                      <span>
                        {requestData?.organization.isAggregator
                          ? t('company_is_aggregator')
                          : requestData?.organization.aggregatorId
                          ? `${t('company_has_aggregator')} - ${requestData?.organization.aggregatorName}`
                          : t('company_is_not_aggregator')}
                      </span>
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
                </Card> */}
                <S.TitleTxt className={'cards-title'}>{t('representatives_info')}</S.TitleTxt>
                <InfoBox margin={0} data={representativeInfoData} minColumnCount={3} />
                {/* <Card>
                  <SearchItemsContainer className='representativeInfo' $columnNumber='3'>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('legal_name')}</span>
                      <span>{sortedRepresentatives[0].nameAndLastName}</span>
                    </S.RepresentativesInfoItemContainer>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('form.mobile_number')}</span>
                      <span>{sortedRepresentatives[0].mobileNumber}</span>
                    </S.RepresentativesInfoItemContainer>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('telephone')}</span>
                      <span>{sortedRepresentatives[0].fixedPhoneNumber}</span>
                    </S.RepresentativesInfoItemContainer>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('technical_name')}</span>
                      <span>{sortedRepresentatives[1].nameAndLastName}</span>
                    </S.RepresentativesInfoItemContainer>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('form.mobile_number')}</span>
                      <span>{sortedRepresentatives[1].mobileNumber}</span>
                    </S.RepresentativesInfoItemContainer>
                    <S.RepresentativesInfoItemContainer>
                      <span>{t('telephone')}</span>
                      <span>{sortedRepresentatives[1].fixedPhoneNumber}</span>
                    </S.RepresentativesInfoItemContainer>
                  </SearchItemsContainer>
                </Card> */}
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
        </S.FinalConfirmStepContainer>
      )}
    </Loading>
  );
};

export default FinalConfirmStep;
