import React, { useState } from 'react';

import { Card, Form } from 'antd';
import { useRouter } from 'next/navigation';
import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, SearchItemsContainer, Box, Table, Loading } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';

import { getDesktopColumns, getMobileColumns } from '../../utils/details-info';

import * as S from './detail-info.style';

type DetailsInfoProps = PageProps & {
  // setCurrentStep: (prev) => void;
  data?: any;
  loading?: boolean;
  // submissionId: string;
};

const DetailsInfo: React.FC<DetailsInfoProps> = (props) => {
  const { data, loading } = props;

  const [t] = useTr();

  const desktopColumns = getDesktopColumns({ t });
  const mobileColumns = getMobileColumns({ t });

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  return (
    // <Loading spinning={loading}>
    //   {!loading && (
    <S.FourthStepContainer>
      <Form layout={'vertical'}>
        <S.TitleTxt className={'cards-title'}>{t('details_info')}</S.TitleTxt>
        <S.StatusContainer>{data?.submissionInfoDto.submissionStatus.title}</S.StatusContainer>
        <Card>
          <SearchItemsContainer>
            <S.InfoItemContainer>
              <span>{t('form.org_name')}</span>

              <span>{getValueOrDash(data?.organization.aggregatorName)}</span>
            </S.InfoItemContainer>
            <S.InfoItemContainer>
              <span>{t('form.client_name')}</span>
              <span>{data?.organization.legalName}</span>
            </S.InfoItemContainer>
            <S.InfoItemContainer>
              <span>{t('form.registration_date')}</span>
              <span>{data?.organization.registerDate}</span>
            </S.InfoItemContainer>
            <S.InfoItemContainer>
              <span>{t('form.company_representative_name')}</span>
              <span>{data?.representativeSet.length > 1 && data?.representativeSet[1].nameAndLastName}</span>
            </S.InfoItemContainer>
          </SearchItemsContainer>
        </Card>
        <S.TitleTxt className={'cards-title'}>{t('company_info')}</S.TitleTxt>

        <Card>
          <SearchItemsContainer>
            <S.InfoItemContainer>
              <span>{t('form.legal_person_name')}</span>
              <span>{data?.organization.legalName}</span>
            </S.InfoItemContainer>
            <S.InfoItemContainer>
              <span>{t('form.national_id')}</span>
              <span>{data?.organization.organizationNationalId}</span>
            </S.InfoItemContainer>
            <S.InfoItemContainer>
              <span>{t('form.legal_person_type')}</span>
              <span>{data?.organization.legalType === 'PUBLIC' ? t('public') : t('private')}</span>
            </S.InfoItemContainer>
            <S.InfoItemContainer>
              <span>{t('form.registration_number')}</span>
              <span>{data?.organization.registerNo}</span>
            </S.InfoItemContainer>
            <S.InfoItemContainer>
              <span>{t('form.registration_date')}</span>
              <span>{data?.organization.registerDate}</span>
            </S.InfoItemContainer>
            <S.InfoItemContainer>
              <span>{t('form.activity_field')}</span>
              <span>{data?.organization.activityIndustry}</span>
            </S.InfoItemContainer>
            <S.InfoItemContainer>
              <span>{t('form.economy_code')}</span>
              <span>{data?.organization.economicCode}</span>
            </S.InfoItemContainer>
            <S.InfoItemContainer>
              <span>{t('form.aggregator_status')}</span>
              <span>
                {data?.organization.isAggregator
                  ? t('company_is_aggregator')
                  : data?.organization.aggregatorId
                  ? `${t('company_has_aggregator')} - ${data?.organization.aggregatorName}`
                  : t('company_is_not_aggregator')}
              </span>
            </S.InfoItemContainer>
          </SearchItemsContainer>
          <S.Divider orientation='center' />
          <SearchItemsContainer $columnNumber='3'>
            <S.InfoItemContainer>
              <span>{t('form.last_registration_address')}</span>
              <span>{data?.organization.registeredAddress}</span>
            </S.InfoItemContainer>
            <S.InfoItemContainer>
              <span>{t('form.postal_code')}</span>
              <span>{data?.organization.postalCode}</span>
            </S.InfoItemContainer>
            <S.InfoItemContainer>
              <span>{t('form.phone')}</span>
              <span>{data?.organization.phone}</span>
            </S.InfoItemContainer>
          </SearchItemsContainer>
        </Card>
        <S.TitleTxt className={'cards-title'}>{t('representatives_info')}</S.TitleTxt>
        <Card>
          <SearchItemsContainer className='representativeInfo' $columnNumber='3'>
            <S.RepresentativesInfoItemContainer>
              <span>{t('legal_name')}</span>
              <span>{data?.representativeSet.length > 1 && data?.representativeSet[0].nameAndLastName}</span>
            </S.RepresentativesInfoItemContainer>
            <S.RepresentativesInfoItemContainer>
              <span>{t('form.mobile_number')}</span>
              <span>{data?.representativeSet.length > 1 && data?.representativeSet[0].mobileNumber}</span>
            </S.RepresentativesInfoItemContainer>
            <S.RepresentativesInfoItemContainer>
              <span>{t('telephone')}</span>
              <span>{data?.representativeSet.length > 1 && data?.representativeSet[0].fixedPhoneNumber}</span>
            </S.RepresentativesInfoItemContainer>
            <S.RepresentativesInfoItemContainer>
              <span>{t('technical_name')}</span>
              <span>{data?.representativeSet.length > 1 && data?.representativeSet[1].nameAndLastName}</span>
            </S.RepresentativesInfoItemContainer>
            <S.RepresentativesInfoItemContainer>
              <span>{t('form.mobile_number')}</span>
              <span>{data?.representativeSet.length > 1 && data?.representativeSet[1].mobileNumber}</span>
            </S.RepresentativesInfoItemContainer>
            <S.RepresentativesInfoItemContainer>
              <span>{t('telephone')}</span>
              <span>{data?.representativeSet.length > 1 && data?.representativeSet[1].fixedPhoneNumber}</span>
            </S.RepresentativesInfoItemContainer>
          </SearchItemsContainer>
        </Card>
        <S.TitleTxt className={'cards-title'}>{t('requested_services')}</S.TitleTxt>
        <Box flexGrow={1}>
          <Table
            dataSource={data?.services}
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
      </S.Footer>
    </S.FourthStepContainer>
    //   )}
    // </Loading>
  );
};

export default DetailsInfo;
