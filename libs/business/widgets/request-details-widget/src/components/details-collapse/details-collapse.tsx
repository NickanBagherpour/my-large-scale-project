import React from 'react';
import { type CollapseProps, Tooltip } from 'antd';

import { InfoBox, Loading } from '@oxygen/ui-kit';
import { Collapse, NoResult } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { ROUTES } from '@oxygen/utils';

import RequestedServices from '../requested-services/requested-services';
import { SubmissionDetailType, UserRole } from '../../types';
import { useAppState } from '../../context';
import { renderRequestStatus } from '../../utils/request-status.util';
import { getOrganizationInfo, getRepresentativeInfo, getSubmissionInfo } from '../../utils/details-collapse.util';
import RequestResultBox from '../request-result-box/request-result-box';

import * as S from './details-collapse.style';

type Props = {
  data: SubmissionDetailType;
};

const DetailsCollapse: React.FC<Props> = (props) => {
  const { data } = props;
  const state = useAppState();
  const [t] = useTr();
  const userRole = state?.userRole;

  if (!data) return <NoResult isLoading={false} />;

  const { submissionInfoDto, organization, representativeSet, services } = data;
  const representativeName = (representativeSet && representativeSet.find((rep) => rep?.type === 1)?.name) ?? '';
  const status = submissionInfoDto?.submissionStatus;

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <S.CollapseTitle>
          {t('submission_info')}
          {renderRequestStatus(t, status)}
        </S.CollapseTitle>
      ),
      children: submissionInfoDto ? (
        <InfoBox data={getSubmissionInfo(submissionInfoDto, representativeName, t)} margin={0} />
      ) : (
        <S.StyledContainer>
          {' '}
          <NoResult isLoading={false} />
        </S.StyledContainer>
      ),
    },
    {
      key: '2',
      label: t('organization_info'),
      children: organization ? (
        <InfoBox data={getOrganizationInfo(organization, t)} margin={0} />
      ) : (
        <S.StyledContainer>
          <NoResult isLoading={false} />
        </S.StyledContainer>
      ),
      className: 'organization-info-box',
    },
    {
      key: '3',
      label: t('representative_info'),
      children: representativeSet ? (
        <InfoBox data={getRepresentativeInfo(representativeSet, t)} minColumnCount={3} margin={0} />
      ) : (
        <S.StyledContainer>
          <NoResult isLoading={false} />
        </S.StyledContainer>
      ),
      className: 'representative-info-box',
    },
    {
      key: '4',
      label: (
        <S.TitleWrapper>
          {t('requested_services')}
          {userRole !== UserRole.COMMERCIAL_BANKING_ADMIN && (
            <Tooltip title={t('edit_requested_services')}>
              <S.StyledButton
                type='primary'
                style={{ margin: 0 }}
                icon={<i className='icon-edit' />}
                // href={`${ROUTES.BUSINESS.REQUESTS_MANAGEMENT}?submissionId=${state?.submissionId}`}
              />
            </Tooltip>
          )}
        </S.TitleWrapper>
      ),
      children: services ? (
        <RequestedServices data={services} isLoading={false} />
      ) : (
        <S.StyledContainer>
          <NoResult isLoading={false} />
        </S.StyledContainer>
      ),
    },
  ];

  return (
    <S.Container>
      <Collapse items={items} collapsible={'icon'} />
      {data ? <RequestResultBox data={data as SubmissionDetailType} /> : <Loading spinning={true} />}
    </S.Container>
  );
};

export default DetailsCollapse;
