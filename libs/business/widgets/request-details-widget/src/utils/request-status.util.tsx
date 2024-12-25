import { CodeTitle, RequestStatus } from '../types';
import { Tag } from '@oxygen/ui-kit';
import React from 'react';

export function renderRequestStatus(t, requestStatus: CodeTitle) {
  const { code, title } = requestStatus;
  let type;
  const defaultTitle = t('common.unknown');
  switch (code) {
    case RequestStatus.PROCESS:
    case RequestStatus.PROCESS_BUSINESS_BANKING:
      type = 'processing';
      break;
    case RequestStatus.INITIAL_APPROVAL:
    case RequestStatus.FINAL_APPROVAL:
      type = 'success';
      break;
    case RequestStatus.REJECTED:
      type = 'error';
      break;
    default:
      type = 'default';
      break;
  }
  const statusIcon: React.ReactNode =
    code === RequestStatus.FINAL_APPROVAL ? <i className={'icon-tick-circle-outlined status-icon'} /> : <></>;

  return (
    <Tag
      icon={statusIcon}
      type={type}
      bordered={requestStatus.code === RequestStatus.FINAL_APPROVAL}
      text={title ?? defaultTitle}
      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', height: '2.4rem' }}
    />
  );
}
