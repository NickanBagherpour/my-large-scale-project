import React from 'react';
import { type CollapseProps } from 'antd';

import { InfoBox, Loading } from '@oxygen/ui-kit';
import { Collapse, NoResult } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { ROUTES } from '@oxygen/utils';

import RequestedServices from '../requested-services/requested-services';
import { SubmissionDetailType, UserRole } from '../../types';
import { useAppState } from '../../context';
import { renderRequestStatus } from '../../utils/request-status.util';
import RequestResultBox from '../request-result-box/request-result-box';
import { useGetSubmissionDetailQuery } from '../../services';
import { getOrganizationInfo, getRepresentativeInfo, getSubmissionInfo } from '../../utils/details-collapse.util';

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

  const { submissionInfoDto, organization, commercialExpertDto, businessExpertDto, representativeSet, services } = data;

  const status =
    userRole === UserRole.COMMERCIAL_BANKING_ADMIN
      ? commercialExpertDto.expertOpinion
      : businessExpertDto.expertOpinion;

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <S.CollapseTitle>
          {t('submission_info')}
          {renderRequestStatus(t, status)}
        </S.CollapseTitle>
      ),
      children: <InfoBox data={getSubmissionInfo(submissionInfoDto, t)} margin={0} />,
    },
    {
      key: '2',
      label: t('organization_info'),
      children: <InfoBox data={getOrganizationInfo(organization, t)} margin={0} />,
      className: 'organization-info-box',
    },
    {
      key: '3',
      label: t('representative_info'),
      children: <InfoBox data={getRepresentativeInfo(representativeSet, t)} minColumnCount={3} margin={0} />,
    },
    {
      key: '4',
      label:
        userRole === UserRole.COMMERCIAL_BANKING_ADMIN ? (
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
      {data ? <RequestResultBox data={data as SubmissionDetailType} /> : <Loading />}
    </S.Container>
  );
};

export default DetailsCollapse;
