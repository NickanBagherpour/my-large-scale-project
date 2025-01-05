import React from 'react';

import { CodeTitle, RequestStatus } from '../types';

import * as S from '../components/details-collapse/details-collapse.style';
import { Tag } from '@oxygen/ui-kit';

export function renderRequestStatus(t, requestStatus: CodeTitle) {
  const { code, title } = requestStatus;

  let type;
  const defaultTitle = t('common.unknown');
  switch (code) {
    case RequestStatus.UNDER_REVIEW_COMMERCIAL_BANK:
    case RequestStatus.UNDER_REVIEW_BUSINESS_UNIT:
      type = 'processing';
      break;
    case RequestStatus.APPROVED_BY_COMMERCIAL_BANK:
      type = 'initialApproval';
      break;
    case RequestStatus.APPROVED_BY_BUSINESS_UNIT:
      type = 'finalApproval';
      break;
    case RequestStatus.REJECTED_BY_COMMERCIAL_BANK:
    case RequestStatus.REJECTED_BY_BUSINESS_UNIT:
      type = 'error';
      break;
    default:
      type = 'default';
      break;
  }
  const statusIcon: React.ReactNode =
    code === RequestStatus.APPROVED_BY_BUSINESS_UNIT ? (
      <i className={'icon-tick-circle-outlined status-icon'} />
    ) : (
      <></>
    );

  return (
    <Tag
      icon={statusIcon}
      type={type}
      bordered={requestStatus?.code === RequestStatus.APPROVED_BY_BUSINESS_UNIT}
      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
    >
      {title ?? defaultTitle}
    </Tag>
  );
}
