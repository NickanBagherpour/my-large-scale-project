import * as React from 'react';

import { MessageType, Nullable } from '@oxygen/types';

import { ApplicantId, FormFieldsType } from '../types';

export type FiltersType = FormFieldsType;

export type PaginationType = {
  page: number;
  rowsPerPage: number;
};

export type WidgetStateType = {
  table: {
    pagination: PaginationType;
  };
  message: Nullable<MessageType>;
  applicantId: ApplicantId;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_PAGINATION';
      payload: PaginationType;
    }
  | {
      type: 'UPDATE_APPLICANT_ID';
      payload: ApplicantId;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
