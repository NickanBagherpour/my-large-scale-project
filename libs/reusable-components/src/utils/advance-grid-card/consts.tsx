import React from 'react';

// Enum for submission status codes
export enum SubmissionStatusCode {
  Pending = 2,
  Rejected = 3,
  InProgress = 4,
  Completed = 5,
  Failed = 6,
  Approved = 7,
}

// Define the type for a single status configuration
export interface StatusConfig {
  textColor: string;
  bankColor: string;
  bankIcon: React.ReactNode;
  businessColor: string;
  businessIcon: React.ReactNode;
  descriptionText: string;
  isBlack?: boolean;
}

export type StatusConfigMap = {
  [key in SubmissionStatusCode]?: StatusConfig;
} & {
  default: StatusConfig;
};

export const statusConfig: StatusConfigMap = {
  [SubmissionStatusCode.Pending]: {
    textColor: 'warning',
    bankColor: 'warning',
    bankIcon: <i className='icon-warning-2' />,
    businessColor: 'default',
    businessIcon: <i className='icon-info-hint' />,
    descriptionText: 'advance_grid_card.two',
    isBlack: true,
  },
  [SubmissionStatusCode.Rejected]: {
    textColor: 'error',
    bankColor: 'error',
    bankIcon: <i className='icon-close' />,
    businessColor: 'default',
    businessIcon: <i className='icon-info-hint' />,
    descriptionText: 'advance_grid_card.three',
    isBlack: true,
  },
  [SubmissionStatusCode.InProgress]: {
    textColor: 'warning',
    bankColor: 'success',
    bankIcon: <i className='icon-checkmark' />,
    businessColor: 'warning',
    businessIcon: <i className='icon-warning-2' />,
    descriptionText: 'advance_grid_card.four',
  },
  [SubmissionStatusCode.Completed]: {
    textColor: 'warning',
    bankColor: 'success',
    bankIcon: <i className='icon-checkmark' />,
    businessColor: 'warning',
    businessIcon: <i className='icon-warning-2' />,
    descriptionText: 'advance_grid_card.five',
  },
  [SubmissionStatusCode.Failed]: {
    textColor: 'error',
    bankColor: 'success',
    bankIcon: <i className='icon-checkmark' />,
    businessColor: 'error',
    businessIcon: <i className='icon-close' />,
    descriptionText: 'advance_grid_card.six',
  },
  [SubmissionStatusCode.Approved]: {
    textColor: 'success',
    bankColor: 'success',
    bankIcon: <i className='icon-checkmark' />,
    businessColor: 'success',
    businessIcon: <i className='icon-checkmark' />,
    descriptionText: 'advance_grid_card.seven',
  },
  default: {
    textColor: 'default',
    bankColor: 'default',
    bankIcon: '-',
    businessColor: 'default',
    businessIcon: '-',
    descriptionText: '-',
  },
};

export const getStatusConfig = (code: number): StatusConfig =>
  statusConfig[code as SubmissionStatusCode] || statusConfig.default;
