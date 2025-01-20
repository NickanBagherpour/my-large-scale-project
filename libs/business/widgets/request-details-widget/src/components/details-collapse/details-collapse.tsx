import React from 'react';
import { type CollapseProps, Tooltip } from 'antd';

import { InfoBox } from '@oxygen/ui-kit';
import { Collapse, NoResult } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { ROUTES } from '@oxygen/utils';

import RequestedServices from '../requested-services/requested-services';
import { RepresentativeType, RequestStatus, SubmissionDetailType, UserRole } from '../../types';
import { useAppState } from '../../context';
import { renderRequestStatus } from '../../utils/request-status.util';
import { getOrganizationInfo, getRepresentativeInfo, getSubmissionInfo } from '../../utils/details-collapse.util';

import * as S from './details-collapse.style';

type Props = {
  data: SubmissionDetailType;
};

const DetailsCollapse: React.FC<Props> = (props) => {
  const { data } = props;
  const state = useAppState();
  const [t] = useTr();
  const userRole = state?.userRole;

  const { submissionInfoDto, organization, representativeSet, services } = data;
  const representativeName =
    (representativeSet && representativeSet?.find((rep) => rep?.type === RepresentativeType.STANDARD)?.name) ?? '';
  const status = submissionInfoDto?.submissionStatus;
  const showEditService =
    userRole !== UserRole.COMMERCIAL_BANKING_ADMIN &&
    (submissionInfoDto?.submissionStatus?.code === RequestStatus.APPROVED_BY_COMMERCIAL_BANK ||
      submissionInfoDto?.submissionStatus?.code === RequestStatus.UNDER_REVIEW_BUSINESS_UNIT);
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
          {showEditService && (
            <Tooltip title={t('edit_requested_services')}>
              <S.StyledButton
                type='primary'
                style={{ margin: 0 }}
                icon={<i className='icon-edit' />}
                onClick={(e) => e.stopPropagation()}
                href={`${ROUTES.BUSINESS.EDIT_REQUEST_LIST}?submissionId=${state?.submissionId}`}
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

  return <Collapse items={items} />;
};

export default DetailsCollapse;
