import React, { useState } from 'react';

import { uuid } from '@oxygen/utils';
import { Card, Form } from 'antd';
import { useRouter } from 'next/navigation';
import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Box, Table, InfoBox } from '@oxygen/ui-kit';

import { getDesktopColumns, getMobileColumns } from '../../utils/details-info';

import * as S from './detail-info.style';
import { InfoBoxType } from '../../types';

type DetailsInfoProps = PageProps & {
  data?: any;
};

const DetailsInfo: React.FC<DetailsInfoProps> = (props) => {
  const { data } = props;

  const [t] = useTr();

  const organizationTotalInfoData: InfoBoxType[] = [
    { key: t('form.org_name'), value: data?.organization.aggregatorName },
    { key: t('form.client_name'), value: data?.organization.legalName },
    {
      key: t('form.registration_date'),
      value: data?.organization.registerDate,
    },
    {
      key: t('form.company_representative_name'),
      value: data?.representativeSet.length > 1 && data?.representativeSet[1].nameAndLastName,
    },
  ];

  const organizationInfoData: InfoBoxType[] = [
    { key: t('form.legal_person_name'), value: data?.organization.legalName },
    { key: t('form.national_id'), value: data?.organization.organizationNationalId },
    {
      key: t('form.legal_person_type'),
      value: data?.organization.legalType === 'PUBLIC' ? t('public') : t('private'),
    },
    { key: t('form.registration_number'), value: data?.organization.registerNo },
    { key: t('form.registration_date'), value: data?.organization.registerDate },
    { key: t('form.activity_field'), value: data?.organization.activityIndustry },
    { key: t('form.economy_code'), value: data?.organization.economicCode },
    {
      key: t('form.aggregator_status'),
      value: data?.organization?.isAggregator
        ? t('company_is_aggregator')
        : data?.organization?.aggregatorId
        ? `${t('company_has_aggregator')} - ${data?.organization?.aggregatorName}`
        : t('company_is_not_aggregator'),
    },
  ];

  const secondPartOffOrganizationInfoData: InfoBoxType[] = [
    { key: t('form.last_registration_address'), value: data?.organization.registeredAddress },
    { key: t('form.postal_code'), value: data?.organization.postalCode },
    { key: t('form.phone'), value: data?.organization.phone },
  ];

  const sortedRepresentatives = data?.representativeSet.sort((a, b) => a.representativeType - b.representativeType);
  const representativeInfoData: InfoBoxType[] = [];

  if (sortedRepresentatives?.length) {
    const { nameAndLastName, mobileNumber, fixedPhoneNumber } = sortedRepresentatives[0];
    representativeInfoData.push(
      { key: t('legal_name'), value: nameAndLastName },
      { key: t('form.mobile_number'), value: mobileNumber },
      { key: t('telephone'), value: fixedPhoneNumber }
    );
  }

  if (sortedRepresentatives?.[1]) {
    const { nameAndLastName, mobileNumber, fixedPhoneNumber } = sortedRepresentatives[1];
    representativeInfoData.push(
      { key: t('technical_name'), value: nameAndLastName },
      { key: t('form.mobile_number'), value: mobileNumber },
      { key: t('telephone'), value: fixedPhoneNumber }
    );
  }

  const desktopColumns = getDesktopColumns({ t });
  const mobileColumns = getMobileColumns({ t });

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  return (
    <S.DetailsInfoContainer>
      <Form layout={'vertical'}>
        <S.TitleTxt className={'cards-title'}>{t('details_info')}</S.TitleTxt>
        <S.StatusContainer>{data?.submissionInfoDto.submissionStatus.title}</S.StatusContainer>
        <InfoBox margin={0} data={organizationTotalInfoData} minColumnCount={4} />

        <S.TitleTxt className={'cards-title'}>{t('company_info')}</S.TitleTxt>
        <Card>
          <InfoBox margin={0} data={organizationInfoData} minColumnCount={4} isChild={true} />
          <S.Divider orientation='center' />
          <InfoBox margin={0} data={secondPartOffOrganizationInfoData} minColumnCount={3} isChild={true} />
        </Card>

        <S.TitleTxt className={'cards-title'}>{t('representatives_info')}</S.TitleTxt>
        <InfoBox margin={0} data={representativeInfoData} minColumnCount={3} />

        <S.TitleTxt className={'cards-title'}>{t('requested_services')}</S.TitleTxt>
        <Box flexGrow={1}>
          <Table
            rowKey={() => uuid()}
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
    </S.DetailsInfoContainer>
  );
};

export default DetailsInfo;
