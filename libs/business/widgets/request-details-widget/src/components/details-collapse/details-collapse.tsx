import React from 'react';
import { type CollapseProps } from 'antd';

import { Divider, InfoBox, Loading } from '@oxygen/ui-kit';
import { Collapse, NoResult } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { ROUTES } from '@oxygen/utils';

import RequestedServices from '../requested-services/requested-services';
import RequestResultBox from '../request-result-box/request-result-box';
import { useGetRequestInfoQuery } from '../../services';
import { PanelType } from '../../types';
import { useAppState } from '../../context';
import { renderRequestStatus } from '../../utils/request-status.util';

import * as S from './details-collapse.style';

type Props = {
  //
};

const DetailsCollapse: React.FC<Props> = (props) => {
  const state = useAppState();
  const [t] = useTr();
  const userRole = state?.userRole;

  const { data, isFetching, error } = useGetRequestInfoQuery(prepareParams());

  function prepareParams() {
    const params = {
      requestId: state?.requestId,
    };
    return params;
  }

  if (error) return <NoResult isLoading={false} />;
  if (!data) return <Loading spinning={isFetching} />;

  const { requestGeneralInfo, companyInfo, agentsInfo } = data;
  const status =
    userRole === PanelType.BUSINESS_BANKING
      ? requestGeneralInfo?.requestStatus?.businessBankingStatus
      : requestGeneralInfo?.requestStatus?.businessUnitStatus;

  const requestInfoData = [
    {
      key: t('organization_name'),
      value: requestGeneralInfo?.organizationName,
    },
    {
      key: t('client_name'),
      value: requestGeneralInfo?.clientName,
    },
    {
      key: t('register_date'),
      value: requestGeneralInfo?.registerDate,
    },
    {
      key: t('company_agent_name'),
      value: requestGeneralInfo?.companyAgentName,
    },
  ];

  const companyInfoData = [
    {
      key: t('legal_person_name'),
      value: companyInfo?.legalPersonName,
    },
    {
      key: t('national_id'),
      value: companyInfo?.nationalId,
    },
    {
      key: t('legal_person_type'),
      value: companyInfo?.legalPersonType,
    },
    {
      key: t('register_number'),
      value: companyInfo?.registerNumber,
    },
    {
      key: t('register_date'),
      value: companyInfo?.registerDate,
    },
    {
      key: t('activity_field'),
      value: companyInfo?.activityField,
    },
    {
      key: t('economic_code'),
      value: companyInfo?.economicCode,
    },
    {
      fullwidth: true,
      key: '',
      value: <Divider />,
    },
    {
      key: t('last_registered_address'),
      value: companyInfo?.lastRegisteredAddress,
    },
    {
      key: t('postal_code'),
      value: companyInfo?.postalCode,
    },
    {
      key: t('phone'),
      value: companyInfo?.phone,
    },
  ];

  const agentsInfoData = [
    {
      key: t('agent_full_name'),
      value: agentsInfo?.agentFullName,
    },
    {
      key: t('mobile_number'),
      value: agentsInfo?.mobile,
    },
    {
      key: t('phone_number'),
      value: agentsInfo?.phone,
    },
    {
      fullwidth: true,
      key: '',
      value: '',
    },
    {
      key: t('technical_agent_full_name'),
      value: agentsInfo?.technicalAgentFullName,
    },
    {
      key: t('mobile_number'),
      value: agentsInfo?.technicalAgentMobile,
    },
    {
      key: t('phone_number'),
      value: agentsInfo?.technicalAgentPhone,
    },
  ];

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <S.CollapseTitle>
          {t('request_general_info')}
          {renderRequestStatus(t, status)}
        </S.CollapseTitle>
      ),
      children: <InfoBox data={requestInfoData} />,
    },
    {
      key: '2',
      label: t('company_info'),
      children: <InfoBox data={companyInfoData} />,
    },
    {
      key: '3',
      label: t('agents_info'),
      children: <InfoBox data={agentsInfoData} />,
    },
    {
      key: '4',
      label:
        userRole === PanelType.BUSINESS_BANKING ? (
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
      children: <RequestedServices />,
    },
  ];

  return (
    <S.Container>
      <Collapse items={items} />
      {requestGeneralInfo ? <RequestResultBox requestData={requestGeneralInfo} /> : <Loading />}
    </S.Container>
  );
};

export default DetailsCollapse;
