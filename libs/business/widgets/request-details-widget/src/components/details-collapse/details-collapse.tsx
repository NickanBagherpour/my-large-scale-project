import React from 'react';
import { type CollapseProps } from 'antd';

import { Divider, InfoBox, Loading } from '@oxygen/ui-kit';
import { Collapse, NoResult } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { getValueOrDash, ROUTES } from '@oxygen/utils';

import RequestedServices from '../requested-services/requested-services';
import { PanelType } from '../../types';
import { useAppState } from '../../context';
import { renderRequestStatus } from '../../utils/request-status.util';
import RequestResultBox from '../request-result-box/request-result-box';
import { useGetSubmissionDetailQuery } from '../../services';

import * as S from './details-collapse.style';

type Props = {
  //
};

const DetailsCollapse: React.FC<Props> = (props) => {
  const state = useAppState();
  const [t] = useTr();
  const userRole = state?.userRole;

  const { data, isFetching, error } = useGetSubmissionDetailQuery(prepareParams());

  function prepareParams() {
    const params = {
      submissionId: state?.submissionId,
    };
    return params;
  }

  if (error) return <NoResult isLoading={false} />;
  if (!data) return <Loading spinning={isFetching} />;

  data.submissionStatus = {
    commercial: {
      code: 2,
      title: 'درحال بررسی توسط بانکداری تجاری',
    },
    business: {
      code: 2,
      title: 'درحال بررسی توسط بانکداری تجاری',
    },
  };

  const { submissionInfoDto, organization, representativeSet, services, submissionStatus } = data;

  const status = userRole === PanelType.COMMERCIAL ? submissionStatus.commercial : submissionStatus.business;

  const submissionInfo = [
    {
      key: t('organization_name'),
      value: getValueOrDash(submissionInfoDto?.organizationName),
    },
    {
      key: t('client_name'),
      value: getValueOrDash(submissionInfoDto?.clientName),
    },
    {
      key: t('register_date'),
      value: getValueOrDash(submissionInfoDto?.createDate),
    },
    {
      key: t('representative_name'),
      value: getValueOrDash(submissionInfoDto?.representativeName),
    },
  ];

  const organizationInfo = [
    {
      key: t('legal_name'),
      value: getValueOrDash(organization?.legalName),
    },
    {
      key: t('national_id'),
      value: getValueOrDash(organization?.organizationNationalId),
    },
    {
      key: t('legal_type'),
      value: getValueOrDash(organization?.legalType.title),
    },
    {
      key: t('register_no'),
      value: getValueOrDash(organization?.registerNo),
    },
    {
      key: t('register_date'),
      value: getValueOrDash(organization?.registerDate),
    },
    {
      key: t('activity_industry'),
      value: getValueOrDash(organization?.activityIndustry),
    },
    {
      key: t('economic_code'),
      value: getValueOrDash(organization?.economicCode),
    },
    {
      fullwidth: true,
      key: '',
      value: <Divider />,
    },
    {
      key: t('registered_address'),
      value: getValueOrDash(organization?.registeredAddress),
    },
    {
      key: t('postal_code'),
      value: getValueOrDash(organization?.postalCode),
    },
    {
      key: t('phone'),
      value: getValueOrDash(organization?.phone),
    },
  ];

  const representativeInfo = [
    {
      key: t('representative_name'),
      value: getValueOrDash(representativeSet[0]?.name),
    },
    {
      key: t('mobile_number'),
      value: getValueOrDash(representativeSet[0]?.mobileNumber),
    },
    {
      key: t('fixed_phone'),
      value: getValueOrDash(representativeSet[0]?.fixedPhone),
    },
    {
      fullwidth: true,
      key: '',
      value: '',
    },
    {
      key: t('technical_representative_name'),
      value: getValueOrDash(representativeSet[1]?.name),
    },
    {
      key: t('mobile_number'),
      value: getValueOrDash(representativeSet[1]?.mobileNumber),
    },
    {
      key: t('fixed_phone'),
      value: getValueOrDash(representativeSet[1]?.fixedPhone),
    },
  ];

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <S.CollapseTitle>
          {t('submission_info')}
          {renderRequestStatus(t, status)}
        </S.CollapseTitle>
      ),
      children: <InfoBox data={submissionInfo} margin={0} />,
    },
    {
      key: '2',
      label: t('organization_info'),
      children: <InfoBox data={organizationInfo} margin={0} />,
      className: 'organization-info-box',
    },
    {
      key: '3',
      label: t('representative_info'),
      children: <InfoBox data={representativeInfo} minColumnCount={3} margin={0} />,
    },
    {
      key: '4',
      label:
        userRole === PanelType.COMMERCIAL ? (
          t('requested_services')
        ) : (
          <S.TitleWrapper>
            {t('requested_services')}
            <S.StyledButton
              type='primary'
              style={{ margin: 0 }}
              icon={<i className={'icon-edit'} />}
              href={ROUTES.BUSINESS.REQUESTS_MANAGEMENT}
            />
          </S.TitleWrapper>
        ),
      children: <RequestedServices data={services} isLoading={isFetching} />,
    },
  ];

  return (
    <S.Container>
      <Collapse items={items} />
      {data ? <RequestResultBox data={data} /> : <Loading />}
    </S.Container>
  );
};

export default DetailsCollapse;
